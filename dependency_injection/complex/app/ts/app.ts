/*
 * Angular
 */
import {
  Component,
  Inject,
  Injector,
  provide,
} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

/*
 * Services
 */
import {ApiService} from 'services/ApiService';
import {ViewPortService} from 'services/ViewPortService';

/*
 * Webpack
 */
require('css/styles.scss');

@Component({
  selector: 'di-sample-app',
  template: `
  <button (click)="invokeApi()">Invoke API</button>
  <button (click)="useInjectors()">Use Injectors</button>
  `
})
class DiSampleApp {
  constructor(private apiService: ApiService,
              @Inject('ApiServiceAlias') private aliasService: ApiService,
              @Inject('SizeService') private sizeService: any) {
  }

  invokeApi(): void {
    this.apiService.get();
    this.aliasService.get();
    this.sizeService.run();
  }

  useInjectors(): void {
    let injector: any = Injector.resolveAndCreate([
      ViewPortService,
      provide('OtherSizeService', {useFactory: (viewport: any) => {
        return viewport.determineService();
      }, deps: [ViewPortService]})
    ]);
    let sizeService: any = injector.get('OtherSizeService');
    sizeService.run();
  }
}

bootstrap(DiSampleApp, [
  ApiService,
  ViewPortService,
  provide('ApiServiceAlias', {useExisting: ApiService}),
  provide('SizeService', {useFactory: (viewport: any) => {
    return viewport.determineService();
  }, deps: [ViewPortService]})
]).catch((err: any) => console.error(err));
