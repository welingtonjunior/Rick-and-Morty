import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { Store, select } from '@ngrx/store';
import { selectCharacters } from '../../shared/selector/load-characters.selector';
import { loadCharactersRequest } from '../../shared/action/load-characters.action';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import {
  ApiResponse,
  Character,
  CharacterList,
} from '../../shared/models/character.interface';
import { loadCharactersState } from '../../shared/reducer/load-characters.reducer';
import { ErrorApi } from '../../shared/models/episodes.interface';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    RouterLink,
    SearchBarComponent,
    InfiniteScrollModule,
  ],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnDestroy {
  public characters!: CharacterList;
  public loading: boolean = false;
  public currentPage = 1;
  public totalPages!: number;
  public error!: ErrorApi;
  private charactersSubscription: Subscription;

  constructor(private store: Store) {
    this.fetchCharacters();
    this.charactersSubscription = this.store
      .pipe(select(selectCharacters))
      .subscribe((response: loadCharactersState) => {
        if (response.data) {
          const apiResponse = response.data as ApiResponse;
          this.updateCharacters(apiResponse);
          this.updateLoadingAndError(response);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.charactersSubscription) {
      this.charactersSubscription.unsubscribe();
    }
  }

  public onScroll(): void {
    if (this.currentPage < this.totalPages && !this.loading) {
      this.currentPage++;
      this.fetchCharacters(this.currentPage);
    }
  }
  
  private fetchCharacters(page: number = 1): void {
    this.store.dispatch(loadCharactersRequest({ page }));
  }

  private updateCharacters(apiResponse: ApiResponse): void {
    const { results, info } = apiResponse;
    this.characters = results;
    this.totalPages = info.pages || 1;
  }


  private updateLoadingAndError(response: loadCharactersState): void {
    this.loading = response.loading;
    this.error = response.error;
  }
}
