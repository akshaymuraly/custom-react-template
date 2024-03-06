const { exec } = require("child_process");

function init(cwd_path) {
  console.log("installing dependencies...", cwd_path);
  exec(
    `cd ${cwd_path} && npm install && npm i -D optimize-css-assets-webpack-plugin --legacy-peer-deps`,
    (err, stdout) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    }
  );
}
module.exports = {
  init,
};
