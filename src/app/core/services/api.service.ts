import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FilterCharacters } from '../../shared/models/filter.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) {}

  getCharacters(params?: FilterCharacters, page?: number): Observable<any> {
    let characterEndPoint = 'character';

    if (params?.id !== undefined) {
      characterEndPoint += `/${params.id}`;
    }

    let options = new HttpParams();

    if (page !== undefined) {
      options = options.set('page', page.toString());
    }

    for (const key in params) {
      if (params[key] && key !== 'id') {
        options = options.set(key, params[key]);
      }
    }

    return this.http
      .get<any>(`${this.apiUrl}${characterEndPoint}`, { params: options })
      .pipe(map((response) => response));
  }

  getEpisodes(params: any = {}, page: number = 1): Observable<any> {
    const episodeEndPoint = 'episode';
    let options = new HttpParams().set('page', page.toString());
    if (page !== undefined) {
      options = options.set('page', page.toString());
    }

    for (const key in params) {
      if (params[key]) {
        options = options.set(key, params[key]);
      }
    }
    return this.http
      .get<any>(`${this.apiUrl}${episodeEndPoint}`, { params: options })
      .pipe(
        map((response) => {
          return response.results ? response : { results: [] };
        })
      );
  }
}
