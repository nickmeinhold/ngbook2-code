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

describe('DemoFormWithEvents (bad)', () => {
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

  it('validates and trigger events', inject([TestComponentBuilder],
    fakeAsync((tcb) => {
      tcb.createAsync(DemoFormWithEvents).then((fixture) => {
        let el = fixture.debugElement.nativeElement;
        let input = fixture.debugElement.query(By.css("input")).nativeElement;
        let form = fixture.debugElement.query(By.css("form")).nativeElement;
        fixture.detectChanges();

        input.value = '';
        dispatchEvent(input, 'input');
        fixture.detectChanges();
        tick();

        // no value on sku field, all error messages are displayed
        let msgs = el.querySelectorAll('.ui.error.message');
        expect(msgs[0]).toHaveText('SKU is invalid');
        expect(msgs[1]).toHaveText('SKU is required');

        // displays no errors when sku has a value
        input.value = 'XYZ';
        dispatchEvent(input, 'input');
        fixture.detectChanges();
        tick()

        msgs = el.querySelectorAll('.ui.error.message');
        expect(msgs.length).toEqual(0);

        fixture.detectChanges();
        dispatchEvent(form, 'submit');
        tick();

        // checks for the form submitted message
        expect(fakeConsole._logs).toContain('you submitted value: XYZ');
      });
    })
  ));

});
