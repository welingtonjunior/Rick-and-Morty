import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadEpisodesRequest } from '../../shared/action/load-episodes.action';
import { selectEpisodes } from '../../shared/selector/load-episodes.selector';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Episodes, EpisodesType } from '../../shared/models/episodes.interface';
import { loadEpisodesState } from '../../shared/reducer/load-episodes.reducer';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, InfiniteScrollModule],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss',
})
export class EpisodesListComponent implements OnInit{
  public episodes$: EpisodesType;
  public loading: boolean = false;
  public currentPage = 1;
  public totalPages = 1;
  public visiblePages: number[] = [];
  public error!: Error;

  constructor(private store: Store) {
    this.fetchEpisodes()
    
  }
  ngOnInit(): void {
    this.store.select(selectEpisodes).subscribe({
      next: (state: loadEpisodesState) => this.episodes$ = state.data?.results || null,
      error: (state: loadEpisodesState) => this.error = state.error
    });
  }

  private fetchEpisodes(page: number = 1): void {
    this.store.dispatch(loadEpisodesRequest({ page: page }));
  }

  public onScroll(): void {
    if (this.currentPage < this.totalPages && !this.loading) {
      this.currentPage++;
      this.fetchEpisodes(this.currentPage);
    }
  }

}