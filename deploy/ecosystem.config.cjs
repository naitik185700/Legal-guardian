module.exports = {
  apps: [
    {
      name: 'guardian-legal',
      script: 'npm',
      args: 'start -- -p 3002',
      cwd: '/var/www/guardian-legal',
      autorestart: true,
      watch: false,
      max_memory_restart: '800M',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
        NEXT_PUBLIC_APP_URL: 'https://legal.guardianfinancialexperts.com',
      },
    },
  ],
};
