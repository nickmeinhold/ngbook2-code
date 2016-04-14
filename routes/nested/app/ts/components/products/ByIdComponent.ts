/*
 * Angular
 */
import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
  selector: 'byid',
  template: `You selected product: {{ id }}`
})
export class ByIdComponent {
  id: string;

  constructor(public routeParams: RouteParams) {
    this.id = routeParams.get('id');
  }
}
