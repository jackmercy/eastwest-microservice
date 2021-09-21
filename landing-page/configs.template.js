/** ********** INDENTIFICATION ********* */
export const APP_NAME = 'eastwest-landing-page';

/** ********** DEFAULT LANGUAGE ********* */
export const DEFAULT_LOCALE = 'en';

/** ********** DURATION/TIMEOUT ********* */
export const FETCHING_TIMEOUT = 60 * 1000; // 60 seconds
export const RESEND_EMAIL_TIMEOUT = 60; // 60 seconds
export const TOAST_NOTIFICATION_DURATION = 5 * 1000; // 5 seconds

/** ********** INTERAL LINKS ********* */
export const API_ENDPOINT = 'API_ENDPOINT_HERE';
export const LANDING_PAGE_DOMAIN = 'LANDING_PAGE_DOMAIN_HERE';

/** ********** EXTERNAL LINKS ********* */
export const LINKS = {
  SOCIALS: {
    TWITTER: 'https://twitter.com/E2W_Rabih',
    FACEBOOK: 'https://www.facebook.com/e2wlive',
    INSTAGRAM: '',
    LINKEDIN: 'https://www.linkedin.com/company/e2wlive',
    YOUTUBE: 'https://www.youtube.com/channel/UCgCfYEIWpTziQzjQ7i85-zA',
    MESSENGER: 'https://m.me/e2wlive',
  },
  HOMEPAGE: {
    INTRO_VIDEO: 'https://www.youtube.com/embed/CueWrmany8A',
  },
};

/** ********** DEFAULT SEO ********* */
export const DEFAULT_SEO = {
  TITLE: 'The East West Initiative',
  KEYWORDS: [
    'Eastwest',
    'EastWest',
    'East 2 West',
    'e2w',
    'East West',
    'The East West',
    'East West Initiative',
    'The East West Initiative',
    'eXtreme Programming',
    'User-Centered Design',
    'Lean Product Management',
    'Growth Marketing',
    'Business Analysis',
    'software development Vietnam',
    'software development',
    'vietnam software company',
    'oursource',
    'IT VietNam',
  ].join(', '),
  CREATOR: 'East West Initiative',
  PHONENUMBER: '+31 85 560 73 28',
  DESCRIPTION:
    'eXtreme Programming | User-Centered Design | Lean Product Management | Growth Marketing | Business Analysis',
  URL: LANDING_PAGE_DOMAIN,
  PAGES: {
    HOME: {
      url: LANDING_PAGE_DOMAIN,
      title: 'The East West Initiative',
      description:
        'Build, Innovate & Scale Products - Work with the world’s most comprehensive and reliable product development tools. Build and Scale products using eXtreme Programming, User-Centered Design, Lean product Management Growth marketing & Business Analysis',
    },
    ABOUT_US: {
      url: `${LANDING_PAGE_DOMAIN}/company`,
      title: 'About East West Company',
      description:
        'We are here to support, guide and provide the tools you need to build and scale your business. Let us help you scale your product and secure product continuity, free from bad practices and unnecessary technical debt and risk.',
    },
    TALENT_LABS: {
      url: `${LANDING_PAGE_DOMAIN}/talent-labs`,
      title: 'East West - Talent Labs',
      description:
        'Our world-class team of agile engineers, product managers, and designers works alongside you to build and deploy products differently than you have before. In the process, you become enabled to do this work self-sufficiently in the future. Your team learns cutting-edge technology and best practices the best way possible: by doing it. The knowledge you absorb while working with Talent Labs is just as valuable as the finished product itself.',
    },
    DATA_LABS: {
      url: `${LANDING_PAGE_DOMAIN}/data-labs`,
      title: 'East West - Data Labs',
      description:
        'Adopt a data driven strategy - We build large authenticated and differentiated communities of users that is willing to provide continuous feedback on branding, product development and marketing strategies. Become more user-centered and leverage value. Activate Data Labs for your brand or join Data Labs as an Influencer',
    },
    CONTACT: {
      url: `${LANDING_PAGE_DOMAIN}/contact`,
      title: 'East West - Contact Us',
      description:
        'Hi! Drop us a line. Ask us everything and we will guide you to your next level. A modern mindset and methodology that turns technology into business outcomes and scales Tech Ventures to the next level. East to West unifies these concepts in comprehensive products.',
    },
    SUPPORT: {
      url: `${LANDING_PAGE_DOMAIN}/support`,
      title: 'East West - Support',
      description: 'Description here',
    },
    CAREERS: {
      url: `${LANDING_PAGE_DOMAIN}/careers`,
      title: 'East West - Careers',
      description:
        'We are on a mission to help everyone achieve product scalability through adoption of our products and methodology. Our partners have unleashed innovation and reduced time-to-market, spending less to maintain their existing application portfolio.',
    },
    NEWS_AND_MEDIA: {
      url: `${LANDING_PAGE_DOMAIN}/news-and-media`,
      title: 'East West - News & Media',
      keywords:
        'East West, XP, News, Engineering, Product development, eXtreme Programming, UCD, User-centered design, Tech News, Lean Product Management, Growth, Remote, Freelance, Vietnam, Ireland',
      description:
        'Latest, Insights, Tips & Tricks, Articles, Data Talk & More East West News!',
    },
    CREATE_TICKET: {
      url: `${LANDING_PAGE_DOMAIN}/create-a-ticket`,
      title: 'East West - Create a ticket',
      description:
        'A modern mindset and methodology that turns technology into business outcomes and scales Tech Ventures to the next level. East to West unifies these concepts in comprehensive products.',
    },
    INTERNSHIP: {
      url: `${LANDING_PAGE_DOMAIN}/internship-program`,
      title: 'East West - Internship Program',
      description: 'Description here',
    },
    TERMS: {
      url: `${LANDING_PAGE_DOMAIN}/terms`,
      title: 'Terms of East West',
      description:
        'Please review these Terms of Use (the “Terms”) carefully before using The East West Initiative and its subsidiaries (“East West”) websites and services. By accessing, browsing or using these websites or services, you fully acknowledge that you have read, understood and agree to abide by these Terms and comply with all applicable laws and regulations. If you do not agree to these Terms, you are not authorized to use East West websites and services, including but not limited to Dashboard, Talent Labs, ART, Router, Cultivator, Nova, Admin and Data Labs. These terms control your use of the websites and services, any content (such as text, data, information, software, graphics or photographs) that East West may make available through the websites (collectively, “Materials”) and any services that East West may provide through the websites (collectively, “Services”). The websites, Materials and Services are referred to in these terms collectively as the “East West Websites.”',
    },
    PRIVACY: {
      url: `${LANDING_PAGE_DOMAIN}/privacy`,
      title: 'Privacy Policy of East West',
      description:
        'This policy (“Privacy Policy”) explains what information the East West Initiative and its subsidiaries (“East West”) or our service providers collect from or about users of the East West websites, including any content East West may provide through the websites (collectively, the “East West Websites”), the East West services, including but not limited to, Talent Labs. Dashboard, ART, RMT, Admin, Data Labs, or any other services that East West may provide through the East West Websites (collectively, the “Service Offerings”), our mobile applications, and other interactions (e.g., customer service inquiries, user conferences, etc.), and states our practices regarding such information. If you are outside the European Economic Area (EEA), by accessing files, browsing, or otherwise using the East West Websites, you have agreed to the use of your data as described in this Privacy Policy. If you are in the EEA, by accessing the East West Websites, you have agreed to the use of my data as described in this Privacy Policy. It also describes the choices regarding use, access and collection of personal information as well as your rights to your personal data that we process. If you do not agree with the terms, please do not access or use the East West Websites, Service Offerings, mobile applications, or any other aspect of East West’s business.',
    },
    COOKIES: {
      url: `${LANDING_PAGE_DOMAIN}/cookies`,
      title: 'East West - Cookie Statement',
      description:
        'This policy (“Privacy Policy”) explains what information the East West Initiative and its subsidiaries (“East West”) or our service providers collect from or about users of the East West websites, including any content East West may provide through the websites (collectively, the “East West Websites”), the East West services, including but not limited to, Talent Labs. Dashboard, ART, RMT, Admin, Data Labs, or any other services that East West may provide through the East West Websites (collectively, the “Service Offerings”), our mobile applications, and other interactions (e.g., customer service inquiries, user conferences, etc.), and states our practices regarding such information. If you are outside the European Economic Area (EEA), by accessing files, browsing, or otherwise using the East West Websites, you have agreed to the use of your data as described in this Privacy Policy. If you are in the EEA, by accessing the East West Websites, you have agreed to the use of my data as described in this Privacy Policy. It also describes the choices regarding use, access and collection of personal information as well as your rights to your personal data that we process. If you do not agree with the terms, please do not access or use the East West Websites, Service Offerings, mobile applications, or any other aspect of East West’s business.',
    },
  },
};

/** ********** OTHERS ********* */
export const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID_HERE';
export const FACEBOOK_APP_ID = 'FACEBOOK_APP_ID_HERE';
export const GOOGLE_CLIENT_ID = 'GOOGLE_CLIENT_ID_HERE';
