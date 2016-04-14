/**
 * This file shows the intermediate components in the hello-world app.
 */

import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";

@Component({
  selector: 'hello-world',
  template: `<div>Hello {{ name }}</div>`
})
class HelloWorldWithName {
  name: string;

  constructor() {
    this.name = 'Felipe';
  }
}

@Component({
  selector: 'hello-world',
  template: `
  <ul>
    <li *ngFor="#name of names">Hello {{ name }}</li>
  </ul>
`
})
class HelloWorldWithNames {
  names: string[];

  constructor() {
    this.names = ['Ari', 'Carlos', 'Felipe', 'Nate'];
  }
}

bootstrap(HelloWorldWithNames);
