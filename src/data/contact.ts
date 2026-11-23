// Centralized contact information for Alliance Medical Supply & Rental
// This is the single source of truth for all contact data across the application

export type Address = {
  street: string;
  suite: string;
  city: string;
  state: string;
  zip: string;
  full: string;
  cityState: string; // e.g., "San Jose, CA"
};

export type Hours = {
  callHours: string;
  storeHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  storeHoursSummary: string; // Weekday and Saturday retail hours
};

export type SocialLinks = {
  google?: string;
  yelp?: string;
  facebook?: string;
  instagram?: string;
};

export type ServiceArea = {
  primary: string[];
  description: string;
};

export type ContactInfo = {
  businessName: string;
  businessNameShort: string;
  tagline: string;
  phone: {
    display: string; // Formatted for display: (408) 942-9000
    raw: string; // For tel: links: 4089429000
    href: string; // Full tel: link
  };
  fax: {
    display: string;
    raw: string;
  };
  email: {
    primary: string;
    href: string;
  };
  address: Address;
  hours: Hours;
  mapsUrl: string;
  social: SocialLinks;
  serviceAreas: ServiceArea;
  accreditation: string;
  accreditationOrg: string;
  accreditationUrl: string;
};

export const contact: ContactInfo = {
  businessName: 'Alliance Medical Supply & Rental',
  businessNameShort: 'Alliance Medical',
  tagline: 'Supply and Rental',

  phone: {
    display: '(408) 942-9000',
    raw: '4089429000',
    href: 'tel:4089429000',
  },

  fax: {
    display: '(408) 251-1015',
    raw: '4082511015',
  },

  email: {
    primary: 'hello@alliancemedsupply.com',
    href: 'mailto:hello@alliancemedsupply.com',
  },

  address: {
    street: '1630 Oakland Road',
    suite: 'Suite A110',
    city: 'San Jose',
    state: 'CA',
    zip: '95131',
    full: '1630 Oakland Road, Suite A110, San Jose, CA 95131',
    cityState: 'San Jose, CA',
  },

  hours: {
    callHours: 'Mon-Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 2:00 PM',
    storeHours: {
      weekdays: '10:00 AM - 4:00 PM',
      saturday: '10:00 AM - 2:00 PM',
      sunday: 'Closed',
    },
    storeHoursSummary:
      'Mon-Fri: 10:00 AM - 4:00 PM\nSat: 10:00 AM - 2:00 PM',
  },

  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=1630+Oakland+Road,+Suite+A110,+San+Jose,+CA+95131',

  social: {
    google:
      'https://www.google.com/search?q=Alliance+Medical+Supply+%26+Rental+San+Jose+CA',
    yelp: 'https://www.yelp.com/biz/alliance-medical-supply-and-rental-san-jose-2',
  },

  serviceAreas: {
    primary: [
      'San Jose',
      'San Francisco',
      'Oakland',
      'Fremont',
      'Sunnyvale',
      'Santa Clara',
      'Hayward',
      'Berkeley',
      'Palo Alto',
      'Walnut Creek',
      'San Mateo',
      'Concord',
    ],
    description:
      'Serving San Jose, San Francisco, Oakland, Fremont, Sunnyvale, Santa Clara, Hayward, Berkeley, Palo Alto, Walnut Creek, San Mateo, Concord, and surrounding Bay Area communities',
  },

  accreditation: 'Exemplary Provider',
  accreditationOrg: 'The Compliance Team',
  accreditationUrl: 'https://www.thecomplianceteam.org',
};

// Helper function to get formatted phone link text
export const getPhoneCallText = (prefix?: string) =>
  prefix ? `${prefix} ${contact.phone.display}` : contact.phone.display;

// Helper to get address for maps embed
export const getAddressForMapsEmbed = () =>
  encodeURIComponent(contact.address.full);
