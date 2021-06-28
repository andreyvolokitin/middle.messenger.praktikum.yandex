import Page404 from '../../src/pages/page-404';
import mountInto from '../../src/utils/mountInto';

const page404 = new Page404();

mountInto('body', page404.element);
