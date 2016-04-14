/*
 * Angular
 */
import {
  Component,
  provide,
  Inject,
} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

/*
 * Services
 */
import {ApiService} from 'services/ApiService';

/*
 * Webpack
 */
require('css/styles.scss');
require('images/ng-book-2-minibook.png');

@Component({
  selector: 'di-sample-app',
  template: `
  <button (click)="invokeApi()">Invoke API</button>
  `
})
class DiSampleApp {
  apiService: ApiService;
  constructor(@Inject(ApiService) apiService) {
    this.apiService = apiService;
  }

  invokeApi(): void {
    this.apiService.get();
  }
}

bootstrap(DiSampleApp, [
  provide(ApiService, { useClass: ApiService })
])
  .catch((err: any) => console.error(err));
