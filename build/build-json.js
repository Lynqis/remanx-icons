import path from "path";
import fs from 'fs';

const OUTPUT_JSON = "./dist/icons.json";
const ICONS_FOLDER = "../raw-svg";

export function buildJson(files) {
  return new Promise((resolve, reject) => {
    try {
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
      resolve();
    } catch (error) {
      reject(`Erreur lors du traitement des fichiers SVG: ${error}`);
    }
  })
}
