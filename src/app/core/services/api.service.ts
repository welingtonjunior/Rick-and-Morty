import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter, FilterCharactersParams } from '../../shared/models/filter-characters.interface';
import { FilterEpisodesParams } from '../../shared/models/filter-episodes.interface';
import { ApiResponse, Character } from '../../shared/models/character.interface';
import { EpisodesApi } from '../../shared/models/episodes.interface';
import { OpitionEndPoint } from '../../shared/models/global.types';


@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private apiUrl = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) {}

  public getCharacters(params?: FilterCharactersParams, page?: number): Observable<ApiResponse> {
    const options = this.__createHttpParams(params, page);

    return this.http.get<ApiResponse>(`${this.apiUrl}${OpitionEndPoint.character}`, {
      params: options,
      })
  }

  public getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}${OpitionEndPoint.character}/${id}`);
  }
  
  public getEpisodes(params?: FilterEpisodesParams, page: number = 1): Observable<EpisodesApi> {
    const options = this.__createHttpParams(params, page);

    return this.http.get<EpisodesApi>(`${this.apiUrl}${OpitionEndPoint.episode}`, { params: options })
  }

  private __createHttpParams(params?: Filter, page?: number): HttpParams {
    let options = new HttpParams();

    if (page !== undefined) {
      options = options.set('page', page.toString());
    }

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          options = options.set(key, String(value));
        }
      });
    }

    return options;
  }
}
