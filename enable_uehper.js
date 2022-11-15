const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;

const projectRoot = path.join(__dirname, "../../");
const puertsPath = path.join(__dirname, "../../Plugins/Puerts");

function copyFileSync(source, target) {
    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

console.log("enable puerts , please wait...");
// process.chdir(puertsPath);
// const output = execSync("node enable_puerts_module.js", { encoding: "utf-8" }); // the default is 'buffer'
//console.log(output);
const _dstJavascriptDir = path.join(projectRoot, "Content/JavaScript/");
const _packagePath = path.join(projectRoot, "package.json");
if (!fs.existsSync(_packagePath)) {
    copyFileSync("./__messy/package.json", _packagePath);
}

// 项目开发包安装
process.chdir(projectRoot);
console.log(execSync("npm install .", { encoding: "utf-8" }));

// 发布目录包安装
copyFileSync("./package.json", _dstJavascriptDir);
process.chdir(_dstJavascriptDir);
execSync("npm install .", { encoding: "utf-8" });

const _gameDir = path.join(__dirname, "../game");
if (!fs.existsSync(_gameDir)) {
    fs.mkdirSync(_gameDir);
}
