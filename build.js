const fs = require("fs");
const path = require("path");
const {
  minify
} = require("terser");
const {
  parse
} = require("node-html-parser");
const CleanCSS = require("clean-css");

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist', 0744);
  fs.mkdirSync('./dist/assets', 0744);
}

var index = fs.readFileSync("./src/index.html", "utf8");
fs.writeFileSync("./dist/index.html", index, "utf8");

var data = [];
data.script = "";
data.style = "";
data.template = "";

const folder = "./src/components/";
let files = fs.readdirSync(folder);
let i = 0;
files.forEach(function(file) {
  extractTags(folder + file, data);
  i++;
});

var output = new CleanCSS().minify(data.style);
fs.writeFileSync("./dist/assets/app.min.css", output.styles, "utf8");

minifyJs(data);

// helpers

function extractTags(filepath, data) {
  var file = fs.readFileSync(filepath, "utf8");
  var filename = path.basename(filepath, '.html');

  const root = parse(file);
  data.template +=
    'document.querySelectorAll("' + filename + '").forEach(function(e){' +
    'e.innerHTML = `' +
    root.querySelector("template").innerHTML +
    '`' +
    "})\n";
  data.script += root.querySelector("script").text + "\n";
  data.style += root.querySelector("style").text;

  //console.log(data);
}

async function minifyJs(data) {
  var result = await minify(data.template, {
    sourceMap: true
  });
  fs.writeFileSync("./dist/assets/template.min.js", result.code, "utf8");

  var result2 = await minify(data.script, {
    sourceMap: true
  });
  fs.writeFileSync("./dist/assets/app.min.js", result2.code, "utf8");
}