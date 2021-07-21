/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import '../../shared/patchNodeGlobalForTests';
import Router from './Router';
import Block from '../../modules/block';

describe('Route', function () {
  const router = new Router();

  class Page extends Block {
    static template = '';
  }

  router.use('/some/:param', Page);

  it('should properly match pathname', function () {
    const route = router.routes[0];

    expect(route.match('/some/one')).to.equal(true);
  });

  it('should activate owned component', function () {
    const route = router.routes[0];

    route.activate('body', {}, {}, null);

    expect(route.component!.isMounted).to.equal(true);
  });

  it('should deactivate owned component', function () {
    const route = router.routes[0];

    route.deactivate();

    expect(route.component!.isMounted).to.equal(false);
  });
});
