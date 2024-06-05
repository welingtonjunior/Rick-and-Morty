import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { FilterCharacters } from '../../models/filter.interface';
import { FilterEpisodes } from '../../models/filter-episodes.interface';
import { forkJoin, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public search = new FormControl('');
  public characters: any[] = [];
  public episodes: any[] = [];
  public placeholderText!: string;

  constructor(private apiService: ApiService, private router: Router) {
    this.handleSearchValueChanges()
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/characters') {
          this.placeholderText = 'Digite o nome do personagem';
          this.apiService.getCharacters().subscribe((characters) => {
            this.characters = this.getUniqueValues(characters.results, 'name');
          });
        } else if (event.url === '/episodes') {
          this.placeholderText = 'Digite o nome do episódio';
          this.apiService.getEpisodes().subscribe((episodes) => {
            this.episodes = this.getUniqueValues(episodes, 'name');
          });
        }
      }
    });
  }
  handleSearchValueChanges(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((name: string | null) => {
          return forkJoin([
            this.apiService.getCharacters({ name } as FilterCharacters),
            this.apiService.getEpisodes({ name } as FilterEpisodes),
          ]);
        })
      )
      .subscribe(([characters, episodes]) => {
        this.characters = this.getUniqueValues(characters.results, 'name');
        this.episodes = this.getUniqueValues(episodes, 'name');
      });
  }

  private getUniqueValues<T>(array: T[], key: keyof T): T[] {
    return array.reduce((acc, obj) => {
      if (!acc.find((item) => item[key] === obj[key])) {
        acc.push(obj);
      }
      return acc;
    }, [] as T[]);
  }

}
