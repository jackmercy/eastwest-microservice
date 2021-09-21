module.exports = {
  siteUrl: process.env.LANDING_PAGE_DOMAIN
    ? process.env.LANDING_PAGE_DOMAIN
    : 'http://localhost:3000',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'monthly',
  priority: 0.7,
  // exclude: ['/server-sitemap.xml'],
  sourceDir: 'build',
  robotsTxtOptions: {
    // additionalSitemaps: [
    //   `${process.env.LANDING_PAGE_DOMAIN}/server-sitemap.xml`,
    // ],
    policies: [
      {
        userAgent: '*',
        allow: '/*',
        disallow: '/api/*',
      },
    ],
  },
};
