module.exports = {
  apps: [
    {
      name: 'guardian-legal',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3002',
      cwd: '/var/www/guardian-legal',
      instances: 'max',
      exec_mode: 'cluster',
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
