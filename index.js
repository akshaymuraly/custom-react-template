#!/usr/bin/env node
const fs = require("fs").promises;
const path = require("path");
const { init } = require("./npminstallcommand");

// process.exit(1);

async function foldercreation(array_files, folder_name) {
  console.log("creating...", folder_name);
  try {
    if (folder_name !== folder) {
      await fs.mkdir(folder_name);

      await Promise.all(
        array_files.map(async (file) => {
          await filecreaction(file, folder_name);
        })
      );
    } else {
      array_files.forEach((file) => {
        filecreaction(file, folder_name);
      });
    }
  } catch (err) {
    console.log(err);
  }
  return init(path.resolve(process.cwd(), folder_name));
}
async function filecreaction(f_name, folder_name) {
  try {
    // console.log(path.resolve(`${folder_name}/${file_name}`));
    const data = await fs.readFile(`${__dirname}/temp/${f_name}`);
    if (folder_name !== folder) {
      if (f_name === "index.js" || f_name === "index.html") {
        const type = f_name === "index.js" ? "src" : "public";
        console.log("test", path.resolve(process.cwd(), folder_name, type));
        await fs.mkdir(path.resolve(process.cwd(), folder_name, type));
        await fs.writeFile(
          path.resolve(`${folder_name}/${type}/${f_name}`),
          data
        );
      } else {
        await fs.writeFile(path.resolve(`${folder_name}/${f_name}`), data);
      }
    } else {
      console.log(path.resolve(process.cwd(), f_name));
      if (f_name === "index.js" || f_name === "index.html") {
        const type = f_name === "index.js" ? "src" : "public";
        console.log("test", path.resolve(process.cwd(), type));
        await fs.mkdir(path.resolve(process.cwd(), type));
        await fs.writeFile(
          path.resolve(`${process.cwd()}/${type}/${f_name}`),
          data
        );
      } else {
        await fs.writeFile(path.resolve(process.cwd(), f_name), data);
      }
    }
  } catch (err) {
    process.exit(1);
  }
}
const cwd = process.cwd().split("\\");
const folder = cwd[cwd.length - 1];
console.log(folder);
foldercreation(
  [
    "webpack.prod.js",
    "webpack.dev.js",
    ".gitignore",
    "babel.config.js",
    "index.js",
    "package.json",
    "README.md",
    "webpack.config.js",
    "index.html",
  ],
  process.argv[2] === "." ? folder : process.argv[2] || "default"
);
console.log("This is the last one....");
