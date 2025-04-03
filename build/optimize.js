import { optimize } from 'svgo';

export function optimize(files) {
  files.forEach(file => {
    const svg = fs.readFileSync(path.join(IN_DIR, file));
    svgo(svg).then(svg =>
      fs.writeFileSync(path.join(IN_DIR, file), svg),
    );
  });
}

function svgo(svg) {
  return new Promise(resolve => {
    optimize(svg, ({ data }) => resolve(data));
  });
}
