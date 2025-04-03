import fs from 'fs';

const ICONS_FOLDER = "./raw-svg";

export function getSvgFiles() {
  if (!fs.existsSync(ICONS_FOLDER)) {
    console.error("❌ Error: Icons folder not found!");
    process.exit(1);
  }

  return fs.readdirSync(ICONS_FOLDER).filter(file => file.endsWith(".svg"));
}
