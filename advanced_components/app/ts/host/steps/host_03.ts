import { Component, Directive, ElementRef } from 'angular2/core';


@Directive({
  selector: '[popup]',
  inputs: ['message'],
  host: {
    '(click)': 'displayMessage()'
  }
})
class Popup {
  message: String;

  constructor(_elementRef: ElementRef) {
    console.log(_elementRef);
  }

  displayMessage(): void {
    alert(this.message);
  }
}

@Component({
  selector: 'host-sample-app',
  directives: [Popup],
  template: `
  <div class="ui message" popup
       message="Clicked the message">
    <div class="header">
      Learning Directives
    </div>

    <p>
      This should use our Popup diretive
    </p>
  </div>

  <i class="alarm icon" popup
     message="Clicked the alarm icon"></i>
  `
})
export class HostSampleApp3 {
}


