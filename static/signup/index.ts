import Signup from '../../src/pages/signup';
import mountInto from '../../src/utils/mountInto';

const signup = new Signup();

mountInto('body', signup.element);
