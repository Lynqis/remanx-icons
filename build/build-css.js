import path from "path";
import fs from 'fs';

const OUTPUT_CSS = "./dist/icons.css";
const ICONS_FOLDER = "../raw-svg";

export function buildCss(files) {
return new Promise((resolve, reject) => {
  try {
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

    fs.writeFileSync(OUTPUT_CSS, cssContent);
    console.log("✅ icons.css generated successfully!");
    resolve();
  } catch (error) {
    reject(`Erreur lors du traitement des fichiers SVG: ${error}`);
  }
})
}
