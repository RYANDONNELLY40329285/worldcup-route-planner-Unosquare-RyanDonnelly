const dirTree = require("directory-tree");
const fs = require("fs");


const FRONTEND_PATH = "./";

const tree = dirTree(FRONTEND_PATH, {
  exclude: [
    /node_modules/,
    /\.git/,
    /dist/,
    /build/,
    /\.next/,
    /coverage/,
    /\.cache/
  ]
});

// Safety check
if (!tree) {
  console.error("❌ Failed to generate tree. Check your path.");
  process.exit(1);
}

function formatTree(node, indent = "") {
  // Extra safety
  if (!node || !node.name) return "";

  let output = `${indent}- ${node.name}\n`;

  if (node.children && Array.isArray(node.children)) {
    node.children.forEach(child => {
      output += formatTree(child, indent + "  ");
    });
  }

  return output;
}

const formatted = `##Frontend Structure\n\n${formatTree(tree)}`;

fs.writeFileSync("FRONTEND_STRUCTURE.md", formatted);

console.log("Frontend structure generated!");