import {
  it,
  describe,
  fdescribe,
  expect,
  inject,
  injectAsync,
  afterEach,
  fakeAsync,
  tick,
  beforeEachProviders,
  TestComponentBuilder,
  ComponentFixture,
} from 'angular2/testing';
import { dispatchEvent } from 'angular2/testing_internal';
import { By } from 'angular2/platform/browser';
import { FormBuilder } from 'angular2/common';

import { DemoFormWithEvents } from '../../app/ts/forms/demo_form_with_events';

describe('DemoFormWithEvents', () => {
  var _console;
  var fakeConsole;
  var el, input, form;

  beforeEach(() => {
    // declare a fake console to track all the logs
    fakeConsole = {};
    fakeConsole._logs = [];
    fakeConsole.log = (...theArgs) => fakeConsole._logs.push(theArgs.join(' '));

    // replace the real console with our fake version
    _console = window.console;
    window.console = fakeConsole;
  });

  // restores the real console
  afterAll(() => window.console = _console);

  beforeEachProviders(() => {
    return [FormBuilder];
  });

  function createComponent(tcb: TestComponentBuilder): Promise<ComponentFixture> {
    return tcb.createAsync(DemoFormWithEvents).then((fixture) => {
      el = fixture.debugElement.nativeElement;
      input = fixture.debugElement.query(By.css("input")).nativeElement;
      form = fixture.debugElement.query(By.css("form")).nativeElement;
      fixture.detectChanges();

      return fixture;
    });
  }

  it('displays errors with no sku', injectAsync([TestComponentBuilder], (tcb) => {
    return createComponent(tcb).then((fixture) => {
      input.value = '';
      dispatchEvent(input, 'input');
      fixture.detectChanges();

      // no value on sku field, all error messages are displayed
      let msgs = el.querySelectorAll('.ui.error.message');
      expect(msgs[0]).toHaveText('SKU is invalid');
      expect(msgs[1]).toHaveText('SKU is required');
    });
  }));

  it('displays no errors when sku has a value', injectAsync([TestComponentBuilder], (tcb) => {
    return createComponent(tcb).then((fixture) => {
      input.value = 'XYZ';
      dispatchEvent(input, 'input');
      fixture.detectChanges();

      let msgs = el.querySelectorAll('.ui.error.message');
      expect(msgs.length).toEqual(0);
    });
  }));

  it('handles sku value changes', inject([TestComponentBuilder],
    fakeAsync((tcb) => {
      createComponent(tcb).then((fixture) => {
        input.value = 'XYZ';
        dispatchEvent(input, 'input');
        tick();

        expect(fakeConsole._logs).toContain('sku changed to: XYZ');
      });
    })
  ));

  it('handles form changes', inject([TestComponentBuilder],
    fakeAsync((tcb) => {
      createComponent(tcb).then((fixture) => {
        input.value = 'XYZ';
        dispatchEvent(input, 'input');
        tick();

        expect(fakeConsole._logs).toContain('form changed to: [object Object]');
      });
    })
  ));

  it('handles form submission', inject([TestComponentBuilder],
    fakeAsync((tcb) => {
      createComponent(tcb).then((fixture) => {
        input.value = 'ABC';
        dispatchEvent(input, 'input');
        tick();

        fixture.detectChanges();
        dispatchEvent(form, 'submit');
        tick();

        expect(fakeConsole._logs).toContain('you submitted value: ABC');
      });
    })
  ));

});
