import {
  it,
  fdescribe,
  describe,
  expect,
  inject,
  injectAsync,
  afterEach,
  beforeEachProviders,
  TestComponentBuilder,
} from 'angular2/testing';
import {Router} from "angular2/router";
import {DebugElement} from 'angular2/src/core/debug/debug_node';

import {MockRouterProvider} from '../mocks/routes';
import {MockSpotifyService} from '../mocks/spotify';
import {TestHelper} from '../mocks/helper';

import {SearchComponent} from '../../app/ts/components/SearchComponent';

describe('SearchComponent', () => {
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
    it(`doesn't search for a track without a query`,
      injectAsync([TestComponentBuilder], (tcb) => {
        var search = mockSpotifyService.spy('searchTrack');
        return tcb.createAsync(SearchComponent).then((fixture) => {
          fixture.detectChanges();
          expect(search).not.toHaveBeenCalled();
        });
      })
    );

    it('searches for a track if a query is provided',
      injectAsync([TestComponentBuilder], (tcb) => {
        var search = mockSpotifyService.spy('searchTrack');
        mockRouterProvider.setRouteParam('query', 'QUERY');

        return tcb.createAsync(SearchComponent).then((rootTC) => {
          rootTC.detectChanges();
          expect(search).toHaveBeenCalled();
        });
      })
    );
  });

  describe('submit', () => {
    describe('testing the method', () => {
      it('navigates to the Search route',
        injectAsync([TestComponentBuilder], (tcb) => {
          var navigate = mockRouterProvider.mockRouter.spy('navigate');

          return tcb.createAsync(SearchComponent).then((fixture) => {
            let searchComponent = fixture.debugElement.componentInstance;
            searchComponent.submit("QUERY");
            expect(navigate).toHaveBeenCalledWith(["/Search", {query: "QUERY"}]);
          });
        })
      );

      it('performs the search',
        injectAsync([TestComponentBuilder], (tcb) => {
          return tcb.createAsync(SearchComponent).then((fixture) => {
            let searchComponent = fixture.debugElement.componentInstance;
            let search = spyOn(searchComponent, 'search');

            searchComponent.submit("QUERY");
            expect(search).toHaveBeenCalled();
          });
        })
      );
    });

    describe('testing the interaction', () => {
      it('navigates to the Search route',
        injectAsync([TestComponentBuilder], (tcb) => {
          let navigate = mockRouterProvider.mockRouter.spy('navigate');

          return tcb.createAsync(SearchComponent).then((fixture) => {
            var compiled = fixture.debugElement.nativeElement;
            var input = compiled.querySelector('input');
            var button = compiled.querySelector('button');

            fixture.detectChanges();

            // sets the value of the search field to "QUERY"
            // and clicks the search button
            input.value = "QUERY";
            button.click();

            expect(navigate).toHaveBeenCalledWith(["/Search", {query: "QUERY"}]);
          })
        })
      );
    });
  });

  describe('search', () => {
    it('searches when a query is present',
      injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(SearchComponent).then((fixture) => {
          var searchComponent = fixture.debugElement.componentInstance;
          mockRouterProvider.setRouteParam('query', 'QUERY')

          searchComponent.search();
          expect(mockSpotifyService.searchTrackSpy).toHaveBeenCalledWith("QUERY")
        })
      })
    );

    it(`doesn't search when a query is absent`,
      injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(SearchComponent).then((fixture) => {
          var searchComponent = fixture.debugElement.componentInstance;

          searchComponent.search();
          expect(mockSpotifyService.searchTrackSpy).not.toHaveBeenCalled();
        });
      })
    );
  });

  describe('renderResults', () => {
    it('display a message when no results are found',
      injectAsync([Router, TestComponentBuilder], (router, tcb) => {
        return tcb.createAsync(SearchComponent).then((fixture) => {
          mockSpotifyService.setResponse({tracks: {items: []}});
          mockRouterProvider.setRouteParam('query', 'QUERY');

          var searchComponent = fixture.debugElement.componentInstance;
          var compiled = fixture.debugElement.nativeElement;
          var input = compiled.querySelector('input');
          var button = compiled.querySelector('button');

          fixture.detectChanges();

          // sets the value of the search field to "QUERY"
          // and clicks the search button
          input.value = "QUERY";
          button.click();

          expect(compiled.innerText)
            .toContain("No tracks were found with the term 'QUERY'");
        })
      })
    );

    it('display results',
      injectAsync([Router, TestComponentBuilder], (router, tcb) => {
        return tcb.createAsync(SearchComponent).then((fixture) => {
          var searchComponent = fixture.debugElement.componentInstance;
          var response = {
            tracks: {
              items: [
                {
                  id: 1,
                  name: 'TRACK',
                  album: { id: 2, name: 'ALBUM', images: [{url: 'IMAGE_1'}] },
                  artists: [ {id: 3, name: 'ARTIST'} ]
                }
              ]
            }
          };

          searchComponent.renderResults(response);
          fixture.detectChanges();

          // checks the album URL matches
          var compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelector('img').src).toContain('IMAGE_1');

          // checks the artist, track and album information
          var links = compiled.querySelectorAll('a');
          expect(links.length).toEqual(3);
          expect(links[0].innerText).toEqual('ARTIST');
          expect(links[1].innerText).toEqual('TRACK');
          expect(links[2].innerText).toEqual('ALBUM');
        })
      })
    );
  });
});
