module.exports = {
    apps: [
      {
        name: 'jcwdol130201-web',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 2705,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwdol130201.purwadhikabootcamp.com/apps/web',
      },
      {
        name: 'jcwdol130201-api',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 2805,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwdol130201.purwadhikabootcamp.com/apps/api',
      },
    ],
}
