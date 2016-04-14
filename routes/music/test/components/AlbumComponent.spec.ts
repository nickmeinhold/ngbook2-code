import {
  it,
  describe,
  fdescribe,
  expect,
  inject,
  injectAsync,
  afterEach,
  beforeEachProviders,
  TestComponentBuilder,
} from 'angular2/testing';

import {MockRouterProvider} from '../mocks/routes';
import {MockSpotifyService} from '../mocks/spotify';

import {AlbumComponent} from '../../app/ts/components/AlbumComponent';

describe('AlbumComponent', () => {
  var mockSpotifyService: MockSpotifyService;
  var mockRouterProvider: MockRouterProvider;

  beforeEachProviders(() => {
    mockSpotifyService = new MockSpotifyService();
    mockRouterProvider = new MockRouterProvider();

    return [
      mockSpotifyService.getProviders(), mockRouterProvider.getProviders()
    ];
  });

  describe('initialization', () => {
    it('retrieves the album', injectAsync([TestComponentBuilder], (tcb) => {
      // makes the RouteParams return 1 as the album id
      mockRouterProvider.setRouteParam('id', 1);

      return tcb.createAsync(AlbumComponent).then((fixture) => {
        fixture.detectChanges();
        expect(mockSpotifyService.getAlbumSpy).toHaveBeenCalledWith(1);
      });
    }));
  });

  describe('back', () => {
    it('returns to the previous location', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(AlbumComponent).then((fixture) => {
        let albumComponent = fixture.debugElement.componentInstance;
        let backSpy = mockRouterProvider.mockLocationStrategy.spy('back');

        albumComponent.back();
        expect(backSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('renderAlbum', () => {
    it('renders album info', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(AlbumComponent).then((fixture) => {
        let albumComponent = fixture.debugElement.componentInstance;
        let album = {
          name: 'ALBUM NAME',
          artists: [{name: 'ARTIST NAME'}],
          images: [null, {url: 'IMAGE_2'}],
          tracks: {
            items: [{id: 1, name: 'TRACK 1'},{id: 2, name: 'TRACK 2'}]
          }
        };

        mockSpotifyService.setResponse(album);
        fixture.detectChanges();

        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1')).toHaveText('ALBUM NAME');
        expect(compiled.querySelector('h2')).toHaveText('ARTIST NAME');

        var links = compiled.querySelectorAll('a');
        expect(links[0].innerText).toContain('TRACK 1');
        expect(links[1].innerText).toContain('TRACK 2');
      });
    }));
  });
});
