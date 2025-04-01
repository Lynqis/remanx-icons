const fs = require("fs");
const path = require("path");

const ICONS_FOLDER = "./raw-svg";
const OUTPUT_JSON = "./assets/icons.json";
const OUTPUT_CSS = "./assets/icons.css";

if (!fs.existsSync(ICONS_FOLDER)) {
  console.error("❌ Error: Icons folder not found!");
  process.exit(1);
}

const files = fs.readdirSync(ICONS_FOLDER).filter(file => file.endsWith(".svg"));

if (files.length === 0) {
  console.error("⚠️ No SVG files found in the directory.");
  process.exit(1);
}

const iconsJson = {
  icons: {}
};

files.forEach(file => {
  const iconName = path.basename(file, ".svg");
  iconsJson.icons[iconName] = `${ICONS_FOLDER}/${file}`;
});

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(iconsJson, null, 2));
console.log("✅ icons.json generated successfully!");

let cssContent = `@layer rx-icons {
  :root {
    --icon-size: 24px;
    --icon-stroke-width: 2;
    --icon-color: black;
  }

  .rx-icon {
    display: inline-block;
    width: var(--icon-size);
    height: var(--icon-size);
    background-color: var(--icon-color);
    -webkit-mask-size: contain;
    mask-size: contain;
    mask-repeat: no-repeat;
  }
`;

files.forEach(file => {
  const iconName = path.basename(file, ".svg");
  cssContent += `
  .rx-icon.${iconName} {
    -webkit-mask-image: url('${ICONS_FOLDER}/${file}');
    mask-image: url('${ICONS_FOLDER}/${file}');
  }`;
});

cssContent += "\n}";

// Écrit le fichier CSS
fs.writeFileSync(OUTPUT_CSS, cssContent);
console.log("✅ icons.css generated successfully!");
