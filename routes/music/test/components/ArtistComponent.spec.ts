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

import {ArtistComponent} from "../../app/ts/components/ArtistComponent";

describe("ArtistComponent", () => {
  var mockSpotifyService: MockSpotifyService;
  var mockRouterProvider: MockRouterProvider;

  beforeEachProviders(() => {
    mockSpotifyService = new MockSpotifyService();
    mockRouterProvider = new MockRouterProvider();

    return [
      mockSpotifyService.getProviders(), mockRouterProvider.getProviders()
    ];
  });

  describe("initialization", () => {
    it("retrieves the artist", injectAsync([TestComponentBuilder], (tcb) => {
      // makes the RouteParams return 2 as the artist id
      mockRouterProvider.setRouteParam('id', 2);

      return tcb.createAsync(ArtistComponent).then((fixture) => {
        fixture.detectChanges();
        expect(mockSpotifyService.getArtistSpy).toHaveBeenCalledWith(2);
      });
    }));
  });

  describe('back', () => {
    it('returns to the previous location', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(ArtistComponent).then((fixture) => {
        let artistComponent = fixture.debugElement.componentInstance;
        let backSpy = mockRouterProvider.mockLocationStrategy.spy('back');

        artistComponent.back();
        expect(backSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('renderArtist', () => {
    it('renders artist info', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(ArtistComponent).then((fixture) => {
        let artistComponent = fixture.debugElement.componentInstance;
        let artist = {name: 'ARTIST NAME', images: [{url: 'IMAGE_1'}]};

        mockSpotifyService.setResponse(artist);
        fixture.detectChanges();

        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1')).toHaveText('ARTIST NAME');
        expect(compiled.querySelector('img').src).toContain('IMAGE_1');
      });
    }));
  });
});
