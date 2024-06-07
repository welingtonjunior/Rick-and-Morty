import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { Store, select } from '@ngrx/store';
import { selectCharacters } from '../../shared/selector/load-characters.selector';
import { loadCharactersRequest } from '../../shared/action/load-characters.action';
import { ApiResponse } from '../../shared/models/character.interface';

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
  ],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent {
  public characters: any;
  public characters$ = this.store.pipe(select(selectCharacters));
  public loading: boolean = false;
  public currentPage = 1;
  public totalPages = 1;
  public visiblePages: number[] = [];
  public error: any;

  constructor(
    private store: Store

  ) {
    this.handleCharacters();
    this.fetchCharacters();
  }

  handleCharacters(): void {
    this.characters$.subscribe((data) => {
      this.characters = data.characters;
      this.totalPages = data.info?.pages || 1;
      this.currentPage = data.info?.page || 1;
      this.loading = data.loading;
      this.error = data.error
      this.updateVisiblePages();
    });
  }

  fetchCharacters(page: number = 1): void {
    this.store.dispatch(loadCharactersRequest({ page: page }));
  }

  updateVisiblePages(): void {
    const maxVisiblePages = 4;
    const startPage = Math.max(1, Math.min(this.currentPage - Math.floor(maxVisiblePages / 2), this.totalPages - maxVisiblePages + 1));
    this.visiblePages = Array.from({ length: Math.min(maxVisiblePages, this.totalPages) }, (_, index) => startPage + index);
  }
  
  goToPage(page: number): void {
    if (page !== this.currentPage && page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchCharacters(page);
    }
  }
  
  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }
  
  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }
  
}
