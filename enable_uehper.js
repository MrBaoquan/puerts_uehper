const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;

const _uehperRoot = path.join(__dirname);
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
process.chdir(puertsPath);
console.log(execSync("node enable_puerts_module.js", { encoding: "utf-8" })); // the default is 'buffer'

const _dstJavascriptDir = path.join(projectRoot, "Content/JavaScript/");
const _packagePath = path.join(projectRoot, "package.json");
process.chdir(_uehperRoot);
if (!fs.existsSync(_packagePath)) {
    copyFileSync("./__messy/package.json", _packagePath);
}
const _tsconfigPath = path.join(projectRoot, "tsconfig.json");
copyFileSync("./__messy/tsconfig.json", _tsconfigPath);

// 项目开发包安装
process.chdir(projectRoot);
console.log(execSync("npm install .", { encoding: "utf-8" }));

// 发布目录包安装
copyFileSync("./package.json", _dstJavascriptDir);
process.chdir(_dstJavascriptDir);
execSync("npm install .", { encoding: "utf-8" });

process.chdir(projectRoot);
execSync("tsc --build ./tsconfig.json");

const _gameDir = path.join(__dirname, "../game");
if (!fs.existsSync(_gameDir)) {
    fs.mkdirSync(_gameDir);
}
