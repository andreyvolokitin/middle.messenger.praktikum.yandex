import Handlebars from '@andreyvolokitin/handlebars.js';

import './helpers/comparison/default';
import './helpers/comparison/is';
import './helpers/comparison/isnt';
import './helpers/comparison/and';
import './helpers/comparison/or';
import './helpers/comparison/gt';
import './helpers/comparison/eq';
import './helpers/math/float';
import './helpers/math/substract';
import './helpers/math/multiply';
import './helpers/math/divide';
import './helpers/array/withLast';
import './helpers/array/itemAt';
import './helpers/string/reverse';
import './helpers/string/truncate';
import './helpers/string/append';
import './helpers/string/replaceFirst';
import './helpers/isSameDate';
import './helpers/length';
import './helpers/filename';
import './helpers/resourseURL';
import './helpers/formatJsonDate';
import './helpers/string/startsWith';

import helpers from './helpers';

Object.keys(helpers).forEach((name) => {
  Handlebars.registerHelper(name, helpers[name]);
});
