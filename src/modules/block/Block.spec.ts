/* eslint-disable import/no-extraneous-dependencies, max-classes-per-file */
import { expect } from 'chai';
import '../../shared/patchNodeGlobalForTests';
import Block from './Block';

describe('Block', function () {
  const lifecycleTriggered = {
    mount: false,
    update: false,
    unmount: false,
    shouldUpdate: false,
  };

  let DOMeventTriggered = 0;

  class Child extends Block {
    static template = '<div class="child">test: {{test}}, param.prop: {{param.prop}}</div>';
  }

  class Component extends Block {
    static template = '<div class="parent">{{>child param=data test="test"}}</div>';

    static deps = { Child };

    componentDidMount() {
      lifecycleTriggered.mount = true;
    }

    componentDidUpdate() {
      lifecycleTriggered.update = true;
    }

    componentWillUnmount() {
      lifecycleTriggered.unmount = true;
    }

    shouldComponentUpdate(_oldProps: Props, _newProps: Props): boolean {
      lifecycleTriggered.shouldUpdate = true;
      return super.shouldComponentUpdate(_oldProps, _newProps);
    }
  }

  const component = new Component({
    data: {
      prop: 2,
    },
    prop: 1,
    events: {
      myevent() {
        DOMeventTriggered = 1;
      },
    },
  });

  describe('Basic', function () {
    it('should init with props', function () {
      expect(component.props.prop).to.equal(1);
    });

    it('should init with DOM events', function () {
      component.element.dispatchEvent(new CustomEvent('myevent'));
      expect(DOMeventTriggered).to.equal(1);
    });
  });

  describe('Lifecycle', function () {
    it('should have componentDidMount hook working', function () {
      component.mount('body');
      expect(lifecycleTriggered.mount).to.equal(true);
    });

    it('should have componentDidUpdate hook working', function (done) {
      component.setProps({ prop: 2 });

      setTimeout(() => {
        expect(lifecycleTriggered.update).to.equal(true);
        done();
      }, 20);
    });

    it('should have shouldComponentUpdate hook working', function (done) {
      component.setProps({ prop: 22 });

      setTimeout(() => {
        expect(lifecycleTriggered.shouldUpdate).to.equal(true);
        done();
      }, 20);
    });

    it('should have componentWillUnmount hook working', function () {
      component.unmount();

      expect(lifecycleTriggered.unmount).to.equal(true);
    });
  });

  describe('Components', function () {
    it('should instantiate child component', function () {
      const components = Object.values(component.components);

      expect(components.length).to.equal(1);
      expect(components[0]).to.be.an.instanceof(Child);
    });

    it('should pass props to child component', function () {
      const child = Object.values(component.components)[0];

      expect((child.props.param as Record<string, unknown>).prop).to.equal(2);
      expect(child.props.test as string).to.equal('test');
    });

    it('should render components into the DOM', function () {
      component.mount('body');

      expect(document.querySelectorAll('.parent').length).to.equal(1);
      expect(document.querySelectorAll('.child').length).to.equal(1);
    });
  });
});
