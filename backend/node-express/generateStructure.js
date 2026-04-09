const dirTree = require("directory-tree");
const fs = require("fs");

const tree = dirTree("./", { exclude: [/node_modules/, /\.git/] });

function formatTree(node, indent = "") {
  let output = `${indent}- ${node.name}\n`;
  if (node.children) {
    node.children.forEach(child => {
      output += formatTree(child, indent + "  ");
    });
  }
  return output;
}

const formatted = formatTree(tree);
fs.writeFileSync("STRUCTURE.md", formatted);

console.log("Structure generated!");