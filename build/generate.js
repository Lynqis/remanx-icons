import { getSvgFiles } from './get-svgs.js';
import { optimizeSvg } from './optimize.js';
import { buildCss } from './build-css.js';
import { buildJson } from './build-json.js';

import chalk from 'chalk';

const files = getSvgFiles();

// Afficher un message d'introduction
console.log(chalk.bold.cyan('🌟 Traitement des fichiers SVG en cours... 🌟'));
console.log(chalk.yellow(`Nombre de fichiers SVG trouvés : ${files.length}`));

// Optimisation des fichiers SVG
console.log(chalk.blue('\nOptimisation des fichiers SVG...'));
optimizeSvg(files)
  .then(() => {
    console.log(chalk.green('✅ Optimisation terminée avec succès!'));
  })
  .catch((error) => {
    console.error(chalk.red('❌ Erreur lors de l\'optimisation des SVG:', error));
  });

// Construction des fichiers CSS et JSON
console.log(chalk.blue('\nGénération des fichiers CSS et JSON...'));
try {
  buildCss(files);
  console.log(chalk.green('✅ CSS généré avec succès!'));
} catch (error) {
  console.error(chalk.red('❌ Erreur lors de la génération du CSS:', error));
}

try {
  buildJson(files);
  console.log(chalk.green('✅ JSON généré avec succès!'));
} catch (error) {
  console.error(chalk.red('❌ Erreur lors de la génération du JSON:', error));
}

console.log(chalk.bold.cyan('\n🎉 Processus terminé avec succès! 🎉'));
