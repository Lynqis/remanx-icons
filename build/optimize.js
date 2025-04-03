import { optimize } from 'svgo';
import fs from 'fs';
import path from 'path';

const IN_DIR = path.resolve(new URL(import.meta.url).pathname, '../../raw-svg');

export function optimizeSvg(files) {
  return new Promise((resolve, reject) => {
    try {
      files.forEach(file => {
        const filePath = path.join(IN_DIR, file);

        // Vérification que le fichier existe avant de tenter de le lire
        if (!fs.existsSync(filePath)) {
          return reject(`Le fichier ${filePath} n'existe pas.`);
        }

        const svg = fs.readFileSync(filePath);

        svgo(svg)
          .then((optimizedSvg) => {
            fs.writeFileSync(filePath, optimizedSvg);
          })
          .catch(err => reject(`Erreur d'optimisation pour le fichier ${file}: ${err}`));
      });

      resolve();  // Indiquer que tout est terminé correctement.
    } catch (error) {
      reject(`Erreur lors du traitement des fichiers SVG: ${error}`);
    }
  });
}

function svgo(svg) {
  return new Promise((resolve, reject) => {
    optimize(svg, ({ data }) => {
      if (data) {
        resolve(data);
      } else {
        reject('Erreur lors de l\'optimisation SVG');
      }
    });
  });
}
