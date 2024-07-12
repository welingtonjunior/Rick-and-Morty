import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FilterCharactersParams } from '../../models/filter-characters.interface';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Store } from '@ngrx/store';
import { loadCharactersRequest } from '../../action/load-characters.action';
import { loadEpisodesRequest } from '../../action/load-episodes.action';
import { FilterEpisodesParams } from '../../models/filter-episodes.interface';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public search = new FormControl('');
  public placeholderText!: string;
  public auth!: boolean;
  public searchTerm: string = '';
  public loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {
    this.initializeSearchListener();
    this.auth = this.authService.isAuthenticatedUser();
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePlaceholderText(event.url);
        const savedSearcTerm = localStorage.getItem('searchTerm');
        if(savedSearcTerm && (event.url === '/episodes' || event.url === '/characters')){
          this.search.setValue(savedSearcTerm)
        }
      }
    });
  }

  private updatePlaceholderText(url: string): void {
    if (url === '/characters') {
      this.placeholderText = 'Digite o nome do personagem';
    } else if (url === '/episodes') {
      this.placeholderText = 'Digite o nome do episódio';
    } else if (!this.auth && url === '/login') {
      this.placeholderText = 'Faça o login para acessar as informações';
    } else this.placeholderText = 'Acesse alguma das listas';
  }


   private initializeSearchListener(): void {
    this.search.valueChanges
      .pipe(debounceTime(300))
      .subscribe((name: string | null) => {
        localStorage.setItem('searchTerm', name || '')
        const currentUrl = this.router.url;
        if (currentUrl === '/characters') {
          this.store.dispatch(
            loadCharactersRequest({
              params: { name } as FilterCharactersParams,
            })
          );
        } else if (currentUrl === '/episodes') {
          this.store.dispatch(
            loadEpisodesRequest({ params: { name } as FilterEpisodesParams })
          );
        }
      });
  }
}
