import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterCharacters } from '../../shared/models/filter.interface';
import { FilterEpisodes } from '../../shared/models/filter-episodes.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://rickandmortyapi.com/api/';
  private charactersSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getCharacters(params?: FilterCharacters): Observable<any> {
    const characterEndPoint = "character";
    const options = params ? { params: this.__getParamsFilter(params)}: {} 
    return this.http
      .get<any>(`${this.apiUrl}${characterEndPoint}`, options)
      .pipe(
        map((response) => {
          this.charactersSubject.next(response.results);
          return response;
        })
      );
  }
  
  getEpisodes(params?: FilterEpisodes): Observable<any> {
    const episode = "episode"
    const options = params ? {params: this.__getParamsFilter(params)}:{}
    return this.http.get<any>(`${this.apiUrl}${episode}`, options).pipe(
      map((response) => response.results)
    )
  }


  getCharactersList(): Observable<any[]> {
    return this.charactersSubject.asObservable();
  }

  private __getParamsFilter(params: FilterCharacters): HttpParams  {
    let dataFilter = new HttpParams();
    Object.keys(params).forEach(key => {
      const value = (params as any)[key];
      if(value){
        dataFilter = dataFilter.set(key, value);
      }
    })
  
    return dataFilter
  }
}
