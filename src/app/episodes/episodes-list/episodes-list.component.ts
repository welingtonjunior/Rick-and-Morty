import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { loadEpisodesRequest } from '../../shared/action/load-episodes.action';
import { selectEpisodes } from '../../shared/selector/load-episodes.selector';
import { ErrorApi } from '../../shared/models/error-api.interface';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss',
})
export class EpisodesListComponent  {
  public episodes: any[] = [];
  public episodes$ = this.store.pipe(select(selectEpisodes));
  public loading: boolean = false;
  public currentPage = 1;
  public totalPages = 1;
  public visiblePages: number[] = [];
  public error!: ErrorApi;

  constructor(private store: Store) {
    this.fetchEpisodes()
    this.handleEpisodes()
  }
  

  private fetchEpisodes(page: number = 1): void {
    this.store.dispatch(loadEpisodesRequest({ page: page }));
  }

  private handleEpisodes(): void {
    this.episodes$.subscribe(data =>{
      this.episodes = data.episodes
      this.totalPages = data.info?.pages || 1;
      this.currentPage = data.info?.page || 1;
      this.loading = data.loading
      this.error = data.error
      console.log('data episode', data.episodes)
    }
    )
  }
  public goToPage(page: number): void {
    if (page !== this.currentPage && page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchEpisodes(page);
    }
  }

  public nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  public previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }
}
