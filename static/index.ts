import IndexPage from '../src/pages/index-page';
import mountInto from '../src/utils/mountInto';

const indexPage = new IndexPage();

mountInto('body', indexPage.element);
