import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';

@Component({
  selector: 'switch-sample-app',
  template: `
    <h4 class="ui horizontal divider header">
      Current choice is {{ choice }}
    </h4>

    <div class="ui raised segment">
      <ul [ngSwitch]="choice">
        <li *ngSwitchWhen="1">First choice</li>
        <li *ngSwitchWhen="2">Second choice</li>
        <li *ngSwitchWhen="3">Third choice</li>
        <li *ngSwitchWhen="4">Fourth choice</li>
        <li *ngSwitchWhen="2">Second choice, again</li>
        <li *ngSwitchDefault>Default choice</li>
      </ul>
    </div>

    <div style="margin-top: 20px;">
      <button class="ui primary button" (click)="nextChoice()">
        Next choice
      </button>
    </div>
  `
})
class SwitchSampleApp {
  choice: number;

  constructor() {
    this.choice = 1;
  }

  nextChoice() {
    this.choice += 1;

    if (this.choice > 5) {
      this.choice = 1;
    }
  }
}

bootstrap(SwitchSampleApp);
