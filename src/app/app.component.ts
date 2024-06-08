import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { selectCharacters } from './shared/selector/load-characters.selector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchBarComponent, CommonModule, RouterModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public dataCharacters$ = this.store.pipe(select(selectCharacters));
  public loading: boolean = false;
  
  constructor(private store: Store){
    this.handleLoading()
  }

  private handleLoading(): void {
    this.dataCharacters$.subscribe(data =>
      this.loading = data.loading
    )
  }

}
