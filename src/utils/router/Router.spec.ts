/* eslint-disable import/no-extraneous-dependencies, max-classes-per-file */
import { expect } from 'chai';
import '../../shared/patchNodeGlobalForTests';
import Router from './Router';
import Route from './Route';
import Block from '../../modules/block';

describe('Router', function () {
  const router = new Router();

  class Page extends Block {
    static template = '';
  }
  class AnotherPage extends Block {
    static template = '';
  }

  router.use('/', Page).use('/404', AnotherPage);

  it('should register routes', function () {
    expect(router.routes[0]).to.be.an.instanceof(Route);
    expect(router.routes[1]).to.be.an.instanceof(Route);
  });

  it('should allow getting routes by pathname', function () {
    const route = router.getRoute('/404');

    route.activate('body', {}, {}, null);
    expect(route.component).to.be.an.instanceof(AnotherPage);
  });

  it('should start with a correct page/route pair', function () {
    router.start();

    expect(router.currentRoute!.component).to.be.an.instanceof(Page);
  });

  it('should go to a correct page/route pair ', function () {
    router.go('/404');

    expect(router.currentRoute!.component).to.be.an.instanceof(AnotherPage);
  });

  it('should affect window history', function () {
    const currentHistoryLen = window.history.length;

    router.go('/404');

    expect(window.history.length).to.eq(currentHistoryLen + 1);
  });
});
