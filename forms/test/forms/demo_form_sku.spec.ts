import {
  it,
  describe,
  fdescribe,
  expect,
  inject,
  injectAsync,
  fakeAsync,
  tick,
  afterEach,
  beforeEachProviders,
  TestComponentBuilder,
  ComponentFixture,
} from 'angular2/testing';
import { dispatchEvent } from 'angular2/testing_internal';
import { By } from 'angular2/platform/browser';

import { DemoFormSku } from '../../app/ts/forms/demo_form_sku';

describe('DemoFormSku', () => {
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

  function createComponent(tcb: TestComponentBuilder): Promise<ComponentFixture> {
    return tcb.createAsync(DemoFormSku).then((fixture) => {
      el = fixture.debugElement.nativeElement;
      input = fixture.debugElement.query(By.css("input")).nativeElement;
      form = fixture.debugElement.query(By.css("form")).nativeElement;
      fixture.detectChanges();

      return fixture;
    });
  }

  it('logs the submitted value', inject([TestComponentBuilder],
    fakeAsync((tcb) => {
      createComponent(tcb).then((fixture) => {
        input.value = 'MY-SKU';
        dispatchEvent(input, 'input');
        fixture.detectChanges();
        tick();

        fixture.detectChanges();
        dispatchEvent(form, 'submit');
        tick();

        expect(fakeConsole._logs).toContain('you submitted value: [object Object]');
      });
    })
  ));
});
