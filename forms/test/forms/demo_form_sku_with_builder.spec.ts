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
} from 'angular2/testing';
import { FormBuilder } from 'angular2/common';

import { DemoFormSkuBuilder } from '../../app/ts/forms/demo_form_sku_with_builder';

beforeEachProviders(() => {
  return [FormBuilder];
});

describe('DemoFormSkuBuilder', () => {
  it('initializes sku', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(DemoFormSkuBuilder).then((fixture) => {
      let comp = fixture.debugElement.componentInstance;
      let el = fixture.debugElement.nativeElement;

      fixture.detectChanges();

      // checks SKU on myForm
      expect(comp.myForm.controls.sku.value).toEqual('ABC123');

      // checks SKU on the input element
      expect(el.querySelector('form input').value).toEqual('ABC123');
    });
  }));
});
