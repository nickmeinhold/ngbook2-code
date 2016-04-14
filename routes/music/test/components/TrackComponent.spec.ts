import {
  it,
  describe,
  expect,
  inject,
  injectAsync,
  afterEach,
  beforeEachProviders,
  TestComponentBuilder,
} from 'angular2/testing';

import {MockRouterProvider} from "../mocks/routes";
import {MockSpotifyService} from "../mocks/spotify";
import {TestHelper} from "../mocks/helper";

import {TrackComponent} from "../../app/ts/components/TrackComponent";

let mockSpotifyService: MockSpotifyService = new MockSpotifyService();
let mockRouterProvider: MockRouterProvider = new MockRouterProvider();

describe("TrackComponent", () => {
  var mockSpotifyService: MockSpotifyService;
  var mockRouterProvider: MockRouterProvider;
  var template = `<h1 *ngIf="track">{{track.name}}</h1>`;

  beforeEachProviders(() => {
    mockSpotifyService = new MockSpotifyService();
    mockRouterProvider = new MockRouterProvider();

    return [
      mockSpotifyService.getProviders(), mockRouterProvider.getProviders()
    ];
  });

  describe("initialization", () => {
    it("retrieves the track", injectAsync([TestComponentBuilder], (tcb) => {
      // makes the RouteParams return 1 as the track id
      mockRouterProvider.setRouteParam('id', 1);

      return tcb.overrideTemplate(TrackComponent, template)
        .createAsync(TrackComponent).then((fixture) => {
          fixture.detectChanges();
          expect(mockSpotifyService.getTrackSpy).toHaveBeenCalledWith(1);
        });
    }));
  });

  describe('back', () => {
    it('returns to the previous location',
      injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.overrideTemplate(TrackComponent, template)
          .createAsync(TrackComponent).then((fixture) => {
            var trackComponent = fixture.debugElement.componentInstance;
            var backSpy = mockRouterProvider.mockLocationStrategy.spy('back');

            trackComponent.back();
            expect(backSpy).toHaveBeenCalled();
          });
      })
    );
  });

  describe('renderTrack', () => {
    it('renders track info', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(TrackComponent, template)
        .createAsync(TrackComponent).then((fixture) => {
          var trackComponent = fixture.debugElement.componentInstance;
          mockSpotifyService.setResponse({name: 'TRACK NAME'});

          fixture.detectChanges();

          var compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelector('h1')).toHaveText('TRACK NAME');
        });
    }));
  });
});
