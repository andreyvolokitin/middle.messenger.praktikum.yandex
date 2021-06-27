import IndexPage from '../src/pages/index-page';
import mountInto from '../src/utils/mountInto';

console.time('index');

const indexPage = new IndexPage();
console.timeEnd('index');

mountInto('body', indexPage.element);
