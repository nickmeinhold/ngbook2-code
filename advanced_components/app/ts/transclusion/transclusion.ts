import { Component, Directive, ElementRef } from 'angular2/core';


@Component({
  selector: '[message]',
  inputs: ['header'],
  host: {
    'class': 'ui message'
  },
  template: `
  <div>
    <div class="header">
      {{ header }}
    </div>
    <p>
      <ng-content></ng-content>
    </p>
  </div>
  `
})
class Message {
  header: string;

  ngOnInit(): void {
    console.log('header', this.header);
  }
}

@Component({
  selector: 'transclusion-sample-app',
  directives: [Message],
  template: `
  <div message header="My Message">
    This is the content of the message
  </div>
  `
})
export class TransclusionSampleApp {
}


