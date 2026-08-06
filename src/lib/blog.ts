import { img } from '@/lib/images';

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogSource = {
  label: string;
  url: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  keywords: string[];
  introduction: string;
  sections: BlogSection[];
  sources?: BlogSource[];
  takeaway: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-choose-full-electric-hospital-bed',
    title: 'Why Choose a Full Electric Hospital Bed at Home?',
    excerpt:
      'Discover how a full electric hospital bed can support safer transfers, comfortable positioning, caregiver access, and greater independence at home.',
    category: 'Home Care',
    publishedAt: '2026-08-06',
    readingTime: '6 min read',
    image: img('/hero-section/hero-6.jpg'),
    imageAlt: 'Full electric hospital bed prepared for comfortable home care',
    featured: true,
    keywords: [
      'full electric hospital bed',
      'electric hospital bed for home',
      'hospital bed rental San Jose',
      'home hospital bed safety',
      'adjustable hospital bed Bay Area',
    ],
    introduction:
      'When someone needs more positioning support than an ordinary bed can provide, a full electric hospital bed can make home care feel safer, more comfortable, and more manageable. With powered adjustments for the head, knees, and overall bed height, it gives the user and caregiver more control throughout the day.',
    sections: [
      {
        heading: 'What makes a hospital bed “full electric”?',
        paragraphs: [
          'A full electric hospital bed uses powered controls to adjust the upper body, knee or foot section, and the height of the entire sleep surface. The exact controls vary by model, but the goal is the same: make common position changes possible without manually cranking the bed.',
          'That extra height control is the main difference from many semi-electric beds, which commonly power the head and foot sections but use a manual crank for overall bed height.',
        ],
      },
      {
        heading: '1. Adjustable height can support safer daily routines',
        paragraphs: [
          'The ability to raise or lower the entire bed can help match the sleep surface to different activities. A lower position may be more appropriate while resting, while a clinician-recommended height may make certain transfers easier. Caregivers can also raise the bed to a more workable height for personal care, linen changes, and repositioning.',
          'A powered bed does not prevent falls by itself. Transfer height, mobility aids, supervision, and the surrounding room should be assessed for the individual by the care team.',
        ],
      },
      {
        heading: '2. More positioning options can improve comfort',
        paragraphs: [
          'Powered head and knee adjustments make it easier to find a supportive position for reading, eating, resting, or receiving care. Small adjustments can often be made without the effort and disruption of manually repositioning the entire bed.',
          'Anyone with breathing, circulation, swallowing, pain, pressure-injury, or post-surgical concerns should follow positioning guidance from a qualified healthcare professional. The bed creates options; the care plan determines how those options should be used.',
        ],
      },
      {
        heading: '3. Electric controls may support independence',
        paragraphs: [
          'For a person who can safely use the hand control, powered adjustments can reduce the need to call a caregiver for every position change. Being able to sit up, recline, or adjust the knees can provide a welcome sense of control during recovery or long-term home care.',
          'Controls should remain within reach only when the user can operate them safely. Caregivers should learn how to lock controls when the model and care plan call for it.',
        ],
      },
      {
        heading: '4. A better working height can help caregivers',
        paragraphs: [
          'Frequent bending over a low bed can make everyday care more difficult. Raising the sleep surface may improve access for tasks such as changing linens, assisting with hygiene, or following a clinician-taught repositioning routine. The bed should be returned to the recommended safe height when care is complete.',
        ],
      },
      {
        heading: '5. The right bed system can support a safer setup',
        paragraphs: [
          'Safety depends on the complete bed system—not only the powered frame. The mattress, rails, accessories, room layout, electrical connection, and user’s abilities all need to work together. FDA guidance emphasizes assessing entrapment risk, especially for people who are frail, confused, or unable to reposition themselves.',
          'Use only compatible mattresses and accessories identified for the bed. Bed rails are not automatically the safest choice for every person and should be considered with the healthcare team rather than added as a general fall-prevention measure.',
        ],
        bullets: [
          'Confirm the bed, mattress, rails, and accessories are compatible',
          'Use a properly grounded outlet and keep cords clear of moving parts',
          'Lock the casters after the bed is placed',
          'Learn the controls, emergency procedures, and manual backup features',
          'Keep enough clear space for transfers and caregiver access',
        ],
      },
      {
        heading: 'Will insurance cover a full electric hospital bed?',
        paragraphs: [
          'Coverage depends on the plan, medical documentation, and exact bed type. Medicare may cover certain medically necessary hospital beds, but CMS currently treats the powered height adjustment on a total or full electric bed as a convenience feature and generally does not cover that model under the DME benefit.',
          'A semi-electric bed may qualify under specific medical-necessity criteria. Before choosing a bed, ask the insurer and supplier to explain covered alternatives, documentation requirements, rental terms, and expected out-of-pocket costs.',
        ],
      },
    ],
    sources: [
      {
        label: 'FDA — Hospital bed safety and entrapment guidance',
        url: 'https://www.fda.gov/medical-devices/general-hospital-devices-and-supplies/hospital-beds',
      },
      {
        label: 'CMS — Hospital beds and accessories coverage guidance',
        url: 'https://www.cms.gov/training-education/medicare-learning-networkr-mln/compliance/medicare-provider-compliance-tips/hospital-beds',
      },
    ],
    takeaway:
      'A full electric hospital bed can be a strong choice when powered height and positioning adjustments match the user’s care needs. Choose the complete bed system with professional guidance, plan the room carefully, and verify coverage before renting or buying.',
  },
  {
    slug: 'how-to-choose-the-right-wheelchair',
    title: 'How to Choose the Right Wheelchair for Everyday Comfort',
    excerpt:
      'A practical guide to wheelchair sizing, comfort, transport, and the questions to ask before renting or buying.',
    category: 'Mobility Guides',
    publishedAt: '2026-08-05',
    readingTime: '6 min read',
    image: img('/hero-section/hero-1.jpg'),
    imageAlt: 'A modern wheelchair prepared for everyday use',
    keywords: [
      'choose a wheelchair',
      'wheelchair rental San Jose',
      'wheelchair sizing guide',
      'medical equipment Bay Area',
    ],
    introduction:
      'The right wheelchair should support comfort, safety, mobility, and the routines that matter most. Before choosing a model, take a few minutes to think about the user, the home, transportation, and how often the chair will be used.',
    sections: [
      {
        heading: 'Start with the user and daily routine',
        paragraphs: [
          'A chair used for occasional appointments has different requirements than one used throughout the day. Consider whether the person will propel independently, need caregiver assistance, or use the chair primarily for transport.',
        ],
        bullets: [
          'How many hours per day will the chair be used?',
          'Will it need to fit through narrow doorways or hallways?',
          'Does it need to fold and fit inside a vehicle?',
          'Are pressure relief, elevating leg rests, or extra positioning support needed?',
        ],
      },
      {
        heading: 'Get the fit right',
        paragraphs: [
          'Seat width and depth affect both comfort and posture. A chair that is too narrow can create pressure, while one that is too wide may make positioning and self-propulsion more difficult. Footrest height and armrest position matter too.',
          'A medical professional should assess anyone with complex positioning, skin-integrity, or mobility needs. A local equipment specialist can then help match those recommendations to available models.',
        ],
      },
      {
        heading: 'Compare manual and transport wheelchairs',
        paragraphs: [
          'Standard manual wheelchairs have large rear wheels that may allow independent propulsion. Transport chairs are typically lighter and more compact, but require a caregiver to push them. The best choice depends on independence, caregiver capacity, and travel needs.',
        ],
      },
      {
        heading: 'Renting can make sense for short-term needs',
        paragraphs: [
          'Rental is often useful during recovery, for visiting family, or while deciding which features work best. Purchasing may be more practical for long-term, frequent use. Ask what is included with delivery, setup, maintenance, and accessories before deciding.',
        ],
      },
    ],
    takeaway:
      'Choose for fit and daily function—not appearance alone. A short conversation about the user, home, vehicle, and expected length of use can quickly narrow the options.',
  },
  {
    slug: 'hospital-bed-rental-home-checklist',
    title: 'Hospital Bed Rental at Home: A Room-Ready Checklist',
    excerpt:
      'Prepare your home for a hospital bed delivery with a simple checklist covering space, power, access, and caregiver needs.',
    category: 'Home Care',
    publishedAt: '2026-08-04',
    readingTime: '5 min read',
    image: img('/hero-section/hero-6.jpg'),
    imageAlt: 'Electric hospital bed for home care',
    keywords: [
      'hospital bed rental checklist',
      'hospital bed rental Bay Area',
      'home hospital bed setup',
      'medical bed delivery San Jose',
    ],
    introduction:
      'A little preparation can make hospital bed delivery faster and safer. Use this checklist before the delivery team arrives, and confirm any patient-specific needs with the care team.',
    sections: [
      {
        heading: 'Choose a practical room',
        paragraphs: [
          'The room should allow caregivers to reach the bed, provide a clear route to the bathroom when appropriate, and support privacy and comfort. Ground-floor placement may simplify access when stairs are difficult.',
        ],
        bullets: [
          'Clear space around the bed for transfers and care',
          'Use a nearby grounded electrical outlet',
          'Remove loose rugs, cords, and clutter from walking paths',
          'Check doorway, hallway, elevator, and stair dimensions',
        ],
      },
      {
        heading: 'Plan the delivery route',
        paragraphs: [
          'Measure the narrowest doorway and identify tight turns before delivery day. Tell the equipment provider about stairs, elevators, parking restrictions, or building access rules so the team can arrive prepared.',
        ],
      },
      {
        heading: 'Match the mattress to the care plan',
        paragraphs: [
          'Foam, gel, alternating-pressure, and low-air-loss surfaces serve different needs. Pressure-injury risk, transfers, moisture, and comfort should be discussed with a clinician before selecting a support surface.',
        ],
      },
      {
        heading: 'Ask for a hands-on setup review',
        paragraphs: [
          'Before the delivery team leaves, learn how to raise and lower the bed, lock the casters, operate the rails, use the hand control, and respond to a power interruption. Keep the provider’s contact information nearby.',
        ],
      },
    ],
    takeaway:
      'Prepare the room, delivery path, outlet, and care plan in advance. The safest setup is one that supports both the patient and the people providing daily care.',
  },
  {
    slug: 'fall-prevention-home-safety-check',
    title: 'A 10-Minute Home Safety Check to Help Prevent Falls',
    excerpt:
      'Walk room by room and spot common trip hazards, poor lighting, and support gaps before they become a problem.',
    category: 'Safety & Wellness',
    publishedAt: '2026-08-03',
    readingTime: '4 min read',
    image: img('/categories/rollator.png'),
    imageAlt: 'Rollator mobility aid for safer walking support',
    keywords: [
      'fall prevention at home',
      'senior home safety checklist',
      'walker and rollator safety',
      'Bay Area home medical equipment',
    ],
    introduction:
      'Falls can happen when several small risks overlap: a dim hallway, a loose rug, rushed movement, or an aid that does not fit correctly. A quick home check can reveal easy improvements.',
    sections: [
      {
        heading: 'Clear the path',
        paragraphs: [
          'Walk the routes used most often—from the bed to the bathroom, favorite chair, kitchen, and front door. Look at the floor from the perspective of someone using a walker, rollator, or wheelchair.',
        ],
        bullets: [
          'Secure or remove loose rugs and curled edges',
          'Move electrical cords out of walkways',
          'Keep frequently used items within easy reach',
          'Create enough turning space for the mobility aid',
        ],
      },
      {
        heading: 'Improve light and contrast',
        paragraphs: [
          'Add night-lights along the route to the bathroom and make switches easy to reach. Contrasting colors on steps and thresholds can make changes in floor height easier to see.',
        ],
      },
      {
        heading: 'Check the mobility aid',
        paragraphs: [
          'Worn tips, loose brakes, incorrect handle height, and cluttered storage bags can affect stability. If a person’s strength, balance, or gait has changed, ask a clinician to reassess the most appropriate aid.',
        ],
      },
      {
        heading: 'Pay attention to transitions',
        paragraphs: [
          'Transfers in and out of bed, the shower, and a favorite chair are common moments of risk. Stable seating, appropriate grab bars, and clinician-recommended transfer equipment can help.',
        ],
      },
    ],
    takeaway:
      'Start with the most-used walking routes, then address lighting, clutter, floor hazards, and equipment fit. Small changes can make everyday movement feel more predictable.',
  },
  {
    slug: 'knee-scooter-vs-crutches',
    title: 'Knee Scooter vs. Crutches: Which Fits Your Recovery?',
    excerpt:
      'Compare stability, upper-body effort, space, and lifestyle considerations for common non-weight-bearing mobility options.',
    category: 'Recovery',
    publishedAt: '2026-08-02',
    readingTime: '5 min read',
    image: img('/categories/knee-scooters.png'),
    imageAlt: 'Knee scooter used during lower-leg recovery',
    keywords: [
      'knee scooter vs crutches',
      'knee scooter rental San Jose',
      'non weight bearing mobility aid',
      'foot surgery recovery equipment',
    ],
    introduction:
      'Both crutches and knee scooters can support non-weight-bearing recovery, but they place different demands on the body and home environment. Your clinician’s restrictions come first.',
    sections: [
      {
        heading: 'Where a knee scooter can help',
        paragraphs: [
          'A knee scooter supports the injured leg on a padded platform and may reduce the upper-body effort required by crutches. It can be useful on smooth, level surfaces for people who can safely balance and steer.',
        ],
      },
      {
        heading: 'Where crutches may be more practical',
        paragraphs: [
          'Crutches are easier to carry, navigate on stairs when properly trained, and use in compact spaces. They require adequate strength, coordination, and technique.',
        ],
      },
      {
        heading: 'Consider your environment',
        paragraphs: [
          'Measure narrow doorways, identify thresholds, and think about how you will manage transportation. Knee scooters are not designed for every surface, and neither option should be used beyond the restrictions given by your clinician.',
        ],
        bullets: [
          'Home layout and stair access',
          'Balance and upper-body strength',
          'Work, school, and transportation needs',
          'Expected recovery timeline',
        ],
      },
      {
        heading: 'Try the equipment before deciding',
        paragraphs: [
          'A correctly adjusted device should feel stable and manageable. Ask for instruction on fit, braking, turning, and safe transfers. Stop and contact your care team if use causes pain or feels unsafe.',
        ],
      },
    ],
    takeaway:
      'The best device is the one your clinician approves and you can use safely in your actual environment. A short-term rental can be useful when recovery needs may change.',
  },
  {
    slug: 'rent-or-buy-medical-equipment',
    title: 'Should You Rent or Buy Medical Equipment?',
    excerpt:
      'Use expected duration, changing needs, maintenance, and total cost to make a more confident equipment decision.',
    category: 'Equipment Basics',
    publishedAt: '2026-08-01',
    readingTime: '5 min read',
    image: img('/categories/mobility-scooters.png'),
    imageAlt: 'Mobility equipment available for rental or purchase',
    keywords: [
      'rent or buy medical equipment',
      'medical equipment rental Bay Area',
      'DME rental San Jose',
      'home medical supplies',
    ],
    introduction:
      'Renting and buying can both be sensible choices. The right answer depends on how long the equipment is needed, whether the user’s needs may change, and what services are included.',
    sections: [
      {
        heading: 'When renting may be a good fit',
        paragraphs: [
          'Rental often works well for short recoveries, visiting relatives, travel, temporary home care, or a trial period before purchase. It can also simplify service when maintenance is included.',
        ],
      },
      {
        heading: 'When buying may make more sense',
        paragraphs: [
          'Purchase may offer better long-term value for equipment used regularly over an extended period. It can also allow more personalization, provided the chosen equipment continues to fit the user’s needs.',
        ],
      },
      {
        heading: 'Compare the complete cost',
        paragraphs: [
          'Look beyond the daily or monthly rate. Ask about delivery, setup, pickup, cleaning, accessories, maintenance, deposits, and minimum rental periods. For purchases, ask about warranty and service options.',
        ],
        bullets: [
          'Expected length of use',
          'Likelihood that needs or sizing will change',
          'Delivery, setup, and training',
          'Maintenance and warranty coverage',
        ],
      },
      {
        heading: 'Confirm coverage separately',
        paragraphs: [
          'Insurance policies and eligibility vary. Contact the plan directly to confirm covered items, documentation requirements, approved suppliers, and out-of-pocket costs before relying on reimbursement.',
        ],
      },
    ],
    takeaway:
      'Estimate the duration of use and compare the full cost of ownership or rental. Include service, changing needs, and convenience—not only the sticker price.',
  },
  {
    slug: 'safe-rollator-setup-guide',
    title: 'Five Rollator Setup Checks Before the First Walk',
    excerpt:
      'Check handle height, brakes, seat, folding locks, and walking posture before putting a new rollator into daily use.',
    category: 'Mobility Guides',
    publishedAt: '2026-07-31',
    readingTime: '4 min read',
    image: img('/categories/rollator.png'),
    imageAlt: 'Four-wheel rollator with seat and hand brakes',
    keywords: [
      'how to adjust a rollator',
      'rollator safety guide',
      'walker with seat setup',
      'rollator rental San Jose',
    ],
    introduction:
      'A rollator can support mobility and provide a convenient seat, but correct adjustment and brake use are essential. Follow the manufacturer’s instructions and any guidance from your clinician.',
    sections: [
      {
        heading: 'Set a comfortable handle height',
        paragraphs: [
          'When standing upright inside the frame, the handles are commonly adjusted near wrist-crease height with the arms relaxed. Individual needs differ, so a clinician’s recommendation should take priority.',
        ],
      },
      {
        heading: 'Test both brake modes',
        paragraphs: [
          'Practice squeezing the hand brakes to slow and engaging the parking brakes before sitting. Both sides should hold securely and release smoothly.',
        ],
      },
      {
        heading: 'Inspect the frame and seat',
        paragraphs: [
          'Confirm the frame is fully opened and locked, the seat is secure, and accessories do not interfere with the wheels or brakes. Follow the stated user and storage weight limits.',
        ],
      },
      {
        heading: 'Practice turns and transitions',
        paragraphs: [
          'Start on a clear, level surface. Keep the rollator close enough to avoid leaning forward, take wider turns, and approach thresholds slowly. Always lock the brakes before sitting or standing.',
        ],
        bullets: [
          'Wear supportive, non-slip footwear',
          'Keep bags within the manufacturer-approved storage area',
          'Do not use the seat as a transport chair',
          'Recheck brake tension and wheel condition regularly',
        ],
      },
    ],
    takeaway:
      'A few minutes spent adjusting and practicing can make a rollator easier to control. Reassess the fit if posture, balance, or strength changes.',
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return blogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .sort((a, b) => {
      const aMatches = a.category === post.category ? 1 : 0;
      const bMatches = b.category === post.category ? 1 : 0;
      return bMatches - aMatches;
    })
    .slice(0, limit);
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}
