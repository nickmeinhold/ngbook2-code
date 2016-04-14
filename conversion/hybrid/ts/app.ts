/**
 *  Copyright (c) 2016, Fullstack.io
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { UpgradeAdapter } from 'angular2/upgrade';
import * as angular from 'angular2/src/upgrade/angular_js';
import 'interestAppNg1'; // "bare import" for side-effects
import { AddPinComponent } from './components/AddPinComponent';
import { PinControlsComponent } from './components/PinControlsComponent';
import { AnalyticsService } from './services/AnalyticsService';

/*
 * Create our upgradeAdapter
 */
const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter();

/*
 * Expose our ng2 content to ng1
 */
angular.module('interestApp')
  .directive('pinControls',
             upgradeAdapter.downgradeNg2Component(PinControlsComponent))
  .directive('addPin',
             upgradeAdapter.downgradeNg2Component(AddPinComponent));

upgradeAdapter.addProvider(AnalyticsService);
angular.module('interestApp')
  .factory('AnalyticsService',
           upgradeAdapter.downgradeNg2Provider(AnalyticsService));

/*
 * Expose our ng1 content to ng2
 */
upgradeAdapter.upgradeNg1Provider('PinsService');
upgradeAdapter.upgradeNg1Provider('$state');

/*
 * Bootstrap the App
 */
upgradeAdapter.bootstrap(document.body, ['interestApp']);

