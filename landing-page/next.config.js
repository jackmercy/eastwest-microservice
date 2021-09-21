const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: true,
    dest: 'public',
    scope: '/',
    sw: 'service-worker.js',
  },
  distDir: 'build',
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000, must-revalidate, proxy-revalidate', // 1 year
          },
        ],
      },
      {
        source: '/service-worker.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate', // 1 day
          },
        ],
      },
    ];
  },
});
