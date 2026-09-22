import { AdminNotificationEmail, ConfirmationEmail } from '@/lib/emails';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL =
  process.env.CONTACT_FORM_ADMIN_EMAIL ?? 'hello@alliancemedsupply.com';

export async function POST(request: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      recaptchaToken,
    } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA directly — no internal HTTP round-trip
    const recaptchaResult = await verifyRecaptcha(
      recaptchaToken,
      'contact_form'
    );

    if (!recaptchaResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Security verification failed. Please try again.',
        },
        { status: 403 }
      );
    }

    // Log submission
    console.log('Contact form submission:', {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
      recaptchaScore: recaptchaResult.score,
    });

    // Send both emails via Resend using verified domain
    const [confirmationResult, adminResult] = await Promise.all([
      resend.emails.send({
        from: 'Alliance Medical Supply <noreply@alliancemedsupply.com>',
        to: email,
        subject: 'We Received Your Message',
        html: ConfirmationEmail({ firstName, subject, message }),
      }),
      resend.emails.send({
        from: 'Alliance Medical Supply <noreply@alliancemedsupply.com>',
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        html: AdminNotificationEmail({
          firstName,
          lastName,
          email,
          phone,
          subject,
          message,
        }),
      }),
    ]);

    const error = confirmationResult.error ?? adminResult.error;
    if (error) {
      console.error('Email sending error:', error);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to send email: ${error.message}. Please try again later.`,
        },
        { status: 500 }
      );
    }

    console.log('Emails sent successfully:', {
      confirmationId: confirmationResult.data?.id,
      adminId: adminResult.data?.id,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to process your request. Please try again later.',
      },
      { status: 500 }
    );
  }
}
