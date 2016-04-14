/**
 * Copyright 2016, Fullstack.io, LLC.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import {
  provide,
  Component,
} from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import {
  APP_BASE_HREF,
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS,
  HashLocationStrategy,
  LocationStrategy,
  RouteDefinition,
  Router
} from 'angular2/router';
import { IntroComponent } from './app/intro_component';
import { StyleSampleApp } from './styling/styling';
import { HostSampleApp } from './host/host';
import { HostSampleApp1 } from './host/steps/host_01';
import { HostSampleApp2 } from './host/steps/host_02';
import { HostSampleApp3 } from './host/steps/host_03';
import { HostSampleApp4 } from './host/steps/host_04';
import { TabsSampleApp } from './tabs/tabs';
import { LifecycleSampleApp1 } from './lifecycle-hooks/lifecycle_01';
import { LifecycleSampleApp2 } from './lifecycle-hooks/lifecycle_02';
import { LifecycleSampleApp3 } from './lifecycle-hooks/lifecycle_03';
import { LifecycleSampleApp4 } from './lifecycle-hooks/lifecycle_04';
import { ForTemplateSampleApp } from './templates/for';
import { IfTemplateSampleApp } from './templates/if';
import { TransclusionSampleApp } from './transclusion/transclusion';
import { OnPushChangeDetectionSampleApp } from './change-detection/onpush';
import { ObservableChangeDetectionSampleApp } from './change-detection/observables';
import { ExampleDef } from './app/example';
import { SidebarComponent } from './app/sidebar';
import './assets';

/*
 * Here's the master list of our examples for this chapter.
 */
let examples: ExampleDef[] = [ /* tslint:disable:max-line-length */
  {label: 'Intro',                            name: 'Root',                       path: '/',                       component: IntroComponent},
  {label: 'Styling',                          name: 'Styling',                    path: '/styling',                component: StyleSampleApp },
  {label: 'Modifying the Host (Step 1)',      name: 'Host1',                      path: '/host-step-1',            component: HostSampleApp1, dev: true},
  {label: 'Modifying the Host (Step 2)',      name: 'Host2',                      path: '/host-step-2',            component: HostSampleApp2, dev: true},
  {label: 'Modifying the Host (Step 3)',      name: 'Host3',                      path: '/host-step-3',            component: HostSampleApp3, dev: true},
  {label: 'Modifying the Host (Step 4)',      name: 'Host4',                      path: '/host-step-4',            component: HostSampleApp4, dev: true},
  {label: 'Modifying the Host',               name: 'Host',                       path: '/host-final',             component: HostSampleApp},
  {label: 'Tabs - Component Querying',        name: 'Tabs',                       path: '/tabs',                   component: TabsSampleApp},
  {label: 'Lifecycle 1 - OnInit / OnDestroy', name: 'Lifecycle1',                 path: '/lifecycle-hooks-1',      component: LifecycleSampleApp1 },
  {label: 'Lifecycle 2 - OnChanges',          name: 'Lifecycle2',                 path: '/lifecycle-hooks-2',      component: LifecycleSampleApp2 },
  {label: 'Lifecycle 3 - Differs',            name: 'Lifecycle3',                 path: '/lifecycle-hooks-3',      component: LifecycleSampleApp3 },
  {label: 'Lifecycle 4 - Full',               name: 'Lifecycle4',                 path: '/lifecycle-hooks-4',      component: LifecycleSampleApp4 },
  {label: 'ngBookFor',                        name: 'NgBookFor',                  path: '/ng-book-for',            component: ForTemplateSampleApp },
  {label: 'ngBookIf',                         name: 'NgBookIf',                   path: '/ng-book-if',             component: IfTemplateSampleApp },
  {label: 'Transclusion',                     name: 'Transclusion',               path: '/transclusion',           component: TransclusionSampleApp },
  {label: 'Change Detection - OnPush',        name: 'ChangeDetectionOnPush',      path: 'change-detection-onpush', component: OnPushChangeDetectionSampleApp },
  {label: 'Change Detection - Observables',   name: 'ChangeDetectionObservables', path: 'change-detection-observ', component: ObservableChangeDetectionSampleApp },
]; /* tslint:enable:max-line-length */

@Component({
  selector: 'advanced-components-app',
  directives: [ SidebarComponent, ROUTER_DIRECTIVES ],
  template: `
  <!-- Menu Bar -->
  <div class="ui menu">
    <div class="ui container">
      <a href="#" class="header item">
        <img class="logo" 
             src="${require('images/logos/ng-book-2-minibook.png')}" />
        ng-book 2
      </a>
      <div class="header item borderless">
        <h1 class="ui header">
          Angular 2 Advanced Components
        </h1>
      </div>
    </div>
  </div>

  <div class="ui grid container">
    <div class="four wide column">
      <sidebar [items]="examples"></sidebar>
    </div>

    <div class="ui main text container eight wide column">
      <router-outlet></router-outlet>
    </div>
  </div>
  `
})
class AdvancedComponentsApp {
  examples: ExampleDef[];

  constructor(private router: Router) {
    this.examples = examples; // store the outer examples

    // dynamically configure the router based on our ExampleDefs
    let routeDefinitions: RouteDefinition[] = examples
      .map( (example: ExampleDef) => <RouteDefinition>({
        path: example.path, name: example.name, component: example.component
      }));
    router.config(routeDefinitions);
  }
}

bootstrap(AdvancedComponentsApp, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF,            {useValue: '/'}),
  provide(LocationStrategy,         {useClass: HashLocationStrategy})
]).catch((err: any) => console.error(err));

