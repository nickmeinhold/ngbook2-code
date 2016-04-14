import { Component, Directive, ElementRef } from 'angular2/core';


@Directive({
  selector: '[popup]'
})
class Popup {
  constructor(_elementRef: ElementRef) {
    console.log(_elementRef);
  }
}

@Component({
  selector: 'host-sample-app',
  directives: [Popup],
  template: `
  <div class="ui message" popup>
    <div class="header">
      Learning Directives
    </div>

    <p>
      This should use our Popup diretive
    </p>
  </div>

  <i class="alarm icon" popup></i>
  `
})
export class HostSampleApp2 {
}


