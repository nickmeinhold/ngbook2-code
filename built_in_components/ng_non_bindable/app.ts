import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';

@Component({
  selector: 'ng-non-bindable-sample-app',
  template: `
  <div>
    <span class="bordered">{{ content }}</span>
    <span class="pre" ngNonBindable>
      &larr; This is what {{ content }} rendered
    </span>
  </div>
  `
})
class NgNonBindableSampleApp {
  content: string;

  constructor() {
    this.content = 'Some text';
  }
}

bootstrap(NgNonBindableSampleApp);
