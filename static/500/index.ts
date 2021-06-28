import Page500 from '../../src/pages/page-500';
import mountInto from '../../src/utils/mountInto';

const page500 = new Page500();

mountInto('body', page500.element);
