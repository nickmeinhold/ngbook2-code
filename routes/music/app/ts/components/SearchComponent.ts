/*
 * Angular
 */

import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {
  Router,
  RouterLink,
  RouteParams,
} from 'angular2/router';

/*
 * Services
 */
import {SpotifyService} from 'services/SpotifyService';

@Component({
  selector: 'search',
  directives: [RouterLink, CORE_DIRECTIVES],
  template: `
  <h1>Search</h1>

  <p>
    <input type="text" #newquery
      [value]="query"
      (keydown.enter)="submit(newquery.value)">
    <button (click)="submit(newquery.value)">Search</button>
  </p>

  <div *ngIf="results">
    <div *ngIf="!results.length">
      No tracks were found with the term '{{ query }}'
    </div>

    <div *ngIf="results.length">
      <h1>Results</h1>

      <div class="row">
        <div class="col-sm-6 col-md-4" *ngFor="#t of results">
          <div class="thumbnail">
            <div class="content">
              <img src="{{ t.album.images[0].url }}" class="img-responsive">
              <div class="caption">
                <h3>
                  <a [routerLink]="['/Artists', {id: t.artists[0].id}]">
                    {{ t.artists[0].name }}
                  </a>
                </h3>
                <br>
                <p>
                  <a [routerLink]="['/Tracks', {id: t.id}]">
                    {{ t.name }}
                  </a>
                </p>
              </div>
              <div class="attribution">
                <h4>
                  <a [routerLink]="['/Albums', {id: t.album.id}]">
                    {{ t.album.name }}
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class SearchComponent implements OnInit {
  query: string;
  results: Object;

  constructor(public spotify: SpotifyService, public router: Router,
              public routeParams: RouteParams) {
  }

  ngOnInit(): void {
    this.search();
  }

  submit(query: string): void {
    this.router.navigate(['/Search', {query: query}]);
    this.search();
  }

  search(): void {
    this.query = this.routeParams.get('query');
    if (!this.query) {
      return;
    }

    this.spotify
      .searchTrack(this.query)
      .subscribe((res: any) => this.renderResults(res));
  }

  renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }
}
