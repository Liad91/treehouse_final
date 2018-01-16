import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { mapTo, retry, catchError, timeout, switchMap } from 'rxjs/operators';

import {
  YelpBusinessResponse,
  YelpReviewsResponse,
  YelpSearchParams,
  YelpSearchResponse
} from './../models/yelp.model';
import { ConnectionService } from './../core/services/connection.service';
import { State } from './filters/store/filters.reducer';

@Injectable()
export class PlacesService {

  constructor(private http: HttpClient, private connectionService: ConnectionService) {}

  public getPlaces(state: State) {
    const params = new YelpSearchParams();

    params.limit = state.limit;
    params.offset = state.offset;
    params.radius = state.radius;
    params.latitude = state.coordinates.lat;
    params.longitude = state.coordinates.lng;
    params.price = state.selectedPrices.join(', ');

    if (state.selectedCategory.alias === 'restaurants' && state.selectedCuisines.length > 0) {
      params.categories = state.selectedCuisines.join(',');
    }
    else {
      params.categories = state.selectedCategory.alias;
    }

    return this.http.post<YelpSearchResponse>(`${this.connectionService.serverUrl}/yelp/search`, params)
      .pipe(
        timeout(this.connectionService.reqTimeout)
      );
  }

  public getFavorites(favorites: string[]): Observable<YelpBusinessResponse[]> {
    const requests: Observable<YelpBusinessResponse>[] = [];

    favorites.forEach(id => {
      const request = this.getPlaceById(id)
        .pipe(
          retry(2),
          catchError(() => of(this.catchFavoriteError(id)))
        );

      requests.push(request);
    });
    return forkJoin(requests);
  }

  private catchFavoriteError(id: string) {
    const place = new YelpBusinessResponse();

    place.id = id;
    return place;
  }

  public addToFavorites(id: string): Observable<YelpBusinessResponse> {
    return this.getPlaceById(id)
      .pipe(
        switchMap(response => {
          return this.http.put(`${this.connectionService.serverUrl}/users/favorites/add`, { id }, {
            headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
          })
            .pipe(
              timeout(this.connectionService.reqTimeout),
              mapTo(response)
            );
        })
      );
  }

  public removeFromFavorites(id: string): Observable<any> {
    return this.http.put(`${this.connectionService.serverUrl}/users/favorites/remove`, { id }, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
    })
      .pipe(
        timeout(this.connectionService.reqTimeout)
      );
  }

  public removeManyFromFavorites(ids: string[]): Observable<any> {
    const requests: Observable<any>[] = [];

    ids.forEach(id => {
      const request = this.http.put(`${this.connectionService.serverUrl}/users/favorites/remove`, { id }, {
        headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
      })
        .pipe(
          timeout(this.connectionService.reqTimeout)
        );

      requests.push(request);
    });
    return forkJoin(requests);
  }

  public getPlaceById(id: string): Observable<YelpBusinessResponse> {
    return this.http.get<YelpBusinessResponse>(`${this.connectionService.serverUrl}/yelp/business`, {
      params: new HttpParams().set('id', id)
    })
      .pipe(
        timeout(this.connectionService.reqTimeout)
      );
  }

  public getReviewsById(id: string): Observable<YelpReviewsResponse> {
    return this.http.get<YelpReviewsResponse>(`${this.connectionService.serverUrl}/yelp/reviews`, {
      params: new HttpParams().set('id', id)
    })
      .pipe(
        timeout(this.connectionService.reqTimeout)
      );
  }

  public getPlaceDetail(id: string): Observable<(YelpReviewsResponse | YelpBusinessResponse)[]> {
    return forkJoin([this.getPlaceById(id), this.getReviewsById(id)]);
  }
}
