import {
  Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy 
} from 'angular2/core';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'observable',
  inputs: ['items'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div>
    <div>Total items: {{counter}}</div>
  </div>
  `
})
class ObservableCmp {
  @Input() items: Observable<number>;
  counter = 0;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.items.subscribe((v) => {
      console.log('got value', v);
      this.counter++;
      if (this.counter % 5 == 0) {
        this.changeDetector.markForCheck();
      }
    }, null, () => {
      this.changeDetector.markForCheck();
    });
  }
}

@Component({
  selector: 'change-detection-sample-app',
  directives: [ObservableCmp],
  template: `
  <observable [items]="itemObservable"></observable>
  `
})
export class ObservableChangeDetectionSampleApp {
  itemObservable: Observable<number>;

  constructor() {
    this.itemObservable = Observable.timer(100, 100).take(101);
  }
}


