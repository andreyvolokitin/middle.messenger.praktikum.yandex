// eslint-disable-next-line import/no-extraneous-dependencies
import SVGSprite from 'svg-sprite';
import path from 'path';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import glob from 'glob';

const cwd = path.resolve('static/assets/img/icons');
const spriter = new SVGSprite({
  transform: [],
  mode: {
    symbol: true,
  },
});

glob.glob('*.svg', { cwd }, (err, files) => {
  files.forEach((file) => {
    const fullPath = path.join(cwd, file);

    spriter.add(fullPath, path.basename(file), fs.readFileSync(fullPath, { encoding: 'utf-8' }));
  });

  spriter.compile((error, result) => {
    fs.writeFileSync(path.join(cwd, '..', 'icons.svg'), result.symbol.sprite.contents);
  });
});
