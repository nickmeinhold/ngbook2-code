/**
 * Copyright 2016, Fullstack.io, LLC.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */
import {
  Component,
  Input
} from 'angular2/core';
import {
  ROUTER_DIRECTIVES,
  Router
} from 'angular2/router';
import { ExampleDef } from './example';

/*
 * SidebarItemComponent
 *
 * Defines a single item in the sidebar. Links to the designated component and
 * marks the current item as active.
 * 
 */
@Component({
  selector: 'sidebar-item',
  inputs: [ 'item' ],
  directives: [ ROUTER_DIRECTIVES ],
  template: `
<a class="item" 
  [ngClass]="{ active: isActive() }"
  [routerLink]="[item.name]">
  {{ item.label }}
</a>
  `
})
class SidebarItemComponent {
  @Input('item') item: ExampleDef;

  constructor(private router: Router) {
  }

  // Checks if this current example is the selected one
  isActive(): boolean {
    return this.isRouteActive(this.item.name);
  }

  // Here's how you determine if a current route is active in ng2
  isRouteActive(route: string): boolean {
    return this.router.isRouteActive(this.router.generate([route]));
  }
}

/*
 * SidebarComponent
 *
 * Given a list of ExampleDefs, creates a sidebar for those items.
 * 
 */
@Component({
  selector: 'sidebar',
  inputs: [ 'items' ],
  directives: [ SidebarItemComponent ],
  template: `
<div class="ui vertical pointing menu">
  <sidebar-item 
    [item]="item"
    *ngFor="#item of items">
    </sidebar-item>
</div>
  `
})
export class SidebarComponent {
  @Input('items') items: ExampleDef[];
}

