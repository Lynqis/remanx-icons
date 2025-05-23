import { getSvgFiles } from './get-svgs.js';
import { optimizeSvg } from './optimize.js';
import { buildCss } from './build-css.js';
import { buildJson } from './build-json.js';
import fs from 'fs';

import chalk from 'chalk';

fs.mkdir('./dist', () => {

});
const files = getSvgFiles();

console.log(chalk.bold.cyan('🌟 Processing SVG files... 🌟'));
console.log(chalk.yellow(`Number of SVG files found: ${files.length}`));

console.log(chalk.blue('\nOptimizing SVG files...'));
const a = await optimizeSvg(files)
  .then(() => {
    console.log(chalk.green('✅ Optimization completed successfully!'));
  })
  .catch((error) => {
    console.error(chalk.red('❌ Error during SVG optimization:', error));
  });

console.log(chalk.blue('\nGenerating CSS and JSON files...'));
const b = buildCss(files)
  .then(() => {
    console.log(chalk.green('✅ CSS generated successfully!'));
  })
  .catch((error) => {
    console.error(chalk.red('❌ Error generating CSS:', error));
  });

const c = buildJson(files)
  .then(() => {
    console.log(chalk.green('✅ JSON generated successfully!'));
  })
  .catch((error) => {
    console.error(chalk.red('❌ Error generating JSON:', error));
  });

Promise.all([a, b, c])
  .then(() => {
    console.log(chalk.bold.cyan('\n🎉 Process completed successfully! 🎉'));
  });

console.log(chalk.white('\n Copy files'));
fs.copyFile('./package.json', './dist/package.json', () => {});
fs.copyFile('./README.md', './dist/README.md', () => {});
console.log(chalk.green('\n Task completed!'));
