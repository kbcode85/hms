require("dotenv").config();
module.exports = {
  apps: [
    {
      name: "HMS",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
