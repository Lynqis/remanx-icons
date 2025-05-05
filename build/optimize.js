import { optimize } from 'svgo';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IN_DIR = path.resolve(__dirname, '../raw-svg');
const OUTPUT_SVG = './dist/svg';

export async function optimizeSvg(files) {
  try {
    for (const file of files) {
      const filePath = path.join(IN_DIR, file);

      try {
        await fs.access(filePath);
      } catch {
        throw new Error(`❌ Le fichier ${filePath} n'existe pas.`);
      }

      const svg = await fs.readFile(filePath, 'utf8');

      const { data: optimizedSvg } = optimize(svg);

      await fs.writeFile(filePath, optimizedSvg);
    }

    await fs.cp(IN_DIR, OUTPUT_SVG, { recursive: true });

    console.log("✅ All files have been optimized and copied.");
  } catch (error) {
    console.error(`❌ Erreur : ${error}`);
    throw error;
  }
}
