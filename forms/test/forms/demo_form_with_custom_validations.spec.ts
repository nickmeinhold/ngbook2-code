import {
  it,
  describe,
  fdescribe,
  expect,
  inject,
  injectAsync,
  afterEach,
  beforeEachProviders,
  TestComponentBuilder,
  ComponentFixture,
} from 'angular2/testing';
import { dispatchEvent } from 'angular2/testing_internal';
import { By } from 'angular2/platform/browser';
import { FormBuilder } from 'angular2/common';

import { DemoFormWithCustomValidations } from '../../app/ts/forms/demo_form_with_custom_validations';

describe('DemoFormWithCustomValidations', () => {
  var el, input, form;

  beforeEachProviders(() => { return [FormBuilder]; });

  function createComponent(tcb: TestComponentBuilder): Promise<ComponentFixture> {
    return tcb.createAsync(DemoFormWithCustomValidations).then((fixture) => {
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

      let msgs = el.querySelectorAll('.ui.error.message');
      expect(msgs[0]).toHaveText('SKU is invalid');
      expect(msgs[1]).toHaveText('SKU is required');
      expect(msgs[2]).toHaveText('SKU must begin with 123');
      expect(msgs[3]).toHaveText('Form is invalid');
    });
  }));

  it('removes the required error when sku has a value', injectAsync([TestComponentBuilder], (tcb) => {
    return createComponent(tcb).then((fixture) => {
      input.value = 'ABC';
      dispatchEvent(input, 'input');
      fixture.detectChanges();

      let msgs = el.querySelectorAll('.ui.error.message');
      expect(msgs[0]).toHaveText('SKU is invalid');
      expect(msgs[1]).toHaveText('SKU must begin with 123');
      expect(msgs[2]).toHaveText('Form is invalid');
    });
  }));

  it('removes all errors when sku starts with 123', injectAsync([TestComponentBuilder], (tcb) => {
    return createComponent(tcb).then((fixture) => {
      input.value = '123ABC';
      dispatchEvent(input, 'input');
      fixture.detectChanges();

      let msgs = el.querySelectorAll('.ui.error.message');
      expect(msgs.length).toEqual(0);
    });
  }));
});
