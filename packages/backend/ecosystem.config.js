module.exports = {
  apps: [
    {
      name: "veedeo-library-api",
      script: "packages/backend/dist/index.js",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
