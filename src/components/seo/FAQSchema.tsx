'use client';

import { contact } from '@/data/contact';
import { generateFAQSchema, jsonLdScriptProps } from '@/lib/seo';

// Common FAQs about the business - great for featured snippets and local SEO
const businessFAQs = [
  {
    question: 'What types of medical equipment do you rent?',
    answer: `${contact.businessName} offers a wide range of medical equipment for rent including wheelchairs (standard, pediatric, bariatric), electric wheelchairs, transport chairs, knee scooters, rollators, hospital beds, patient lifts, mobility scooters, CPM machines, lift chairs, and PureWick systems. We serve ${contact.serviceAreas.primary.join(', ')}, and surrounding Bay Area communities.`,
  },
  {
    question: 'Do you offer same-day delivery for medical equipment?',
    answer: `Yes, ${contact.businessName} offers same-day and next-day delivery throughout the Bay Area, including ${contact.serviceAreas.primary.slice(0, 4).join(', ')}, and surrounding cities. Call us at ${contact.phone.display} to arrange delivery.`,
  },
  {
    question: 'What areas do you serve in the Bay Area?',
    answer: `We proudly serve ${contact.serviceAreas.description}. Our delivery service covers Santa Clara County, parts of Alameda County, and other Bay Area communities.`,
  },
  {
    question: `Where is ${contact.businessName} located?`,
    answer: `We are located at ${contact.address.full}. Our retail store hours are ${contact.hours.storeHours.weekdays} Monday through Friday and ${contact.hours.storeHours.saturday} on Saturdays. We are closed on Sundays. Call us at ${contact.phone.display} for directions or to schedule a visit.`,
  },
  {
    question: 'Are you accredited?',
    answer: `Yes, ${contact.businessName} is an ${contact.accreditation} accredited by ${contact.accreditationOrg}. All our equipment meets FDA standards and is properly maintained and sanitized for your safety.`,
  },
  {
    question: 'Can I rent a wheelchair near me in San Jose?',
    answer: `Yes! ${contact.businessName} is your local wheelchair rental provider in San Jose and the Bay Area. We offer standard wheelchairs, pediatric wheelchairs, bariatric wheelchairs, and reclining wheelchairs for both short-term and long-term rental. Same-day pickup or delivery is available.`,
  },
  {
    question: 'How do I rent a hospital bed in the Bay Area?',
    answer: `Renting a hospital bed from ${contact.businessName} is easy. Call us at ${contact.phone.display} or visit our store. We offer full electric, semi-electric, and bariatric hospital beds with delivery and setup included. We serve all Bay Area communities including ${contact.serviceAreas.primary.slice(0, 3).join(', ')}, and more.`,
  },
  {
    question: 'Do you offer both rental and purchase options?',
    answer: `Yes, ${contact.businessName} offers flexible rental and purchase options for all our medical equipment. Whether you need a short-term rental during recovery or want to purchase equipment for long-term use, we can help you find the right solution for your needs and budget.`,
  },
];

/**
 * FAQ Schema Component for SEO
 * Renders JSON-LD structured data for FAQs
 * Critical for featured snippets in Google search results
 */
export function FAQSchema() {
  const faqSchema = generateFAQSchema(businessFAQs);

  return <script {...jsonLdScriptProps(faqSchema)} />;
}

export default FAQSchema;
