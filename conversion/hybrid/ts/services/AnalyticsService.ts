import {Injectable, bind} from 'angular2/core';

/**
 * Analytics Service records metrics about what the user is doing
 */
@Injectable()
export class AnalyticsService {
  events: string[] = [];

  public recordEvent(event: string): void {
    console.log(`Event: ${event}`);
    this.events.push(event);
  }
}

export var analyticsServiceInjectables: Array<any> = [
  bind(AnalyticsService).toClass(AnalyticsService)
];
