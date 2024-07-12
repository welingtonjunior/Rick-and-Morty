import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { loadDetailsRequest } from '../../shared/action/load-characters.action';
import { Subscription } from 'rxjs';
import { CharacterDetails } from '../../shared/models/character.interface';
import { selectDetails } from '../../shared/selector/load-details.selector';
import { loadDetailsState } from '../../shared/reducer/load-details.reducer';
import { ErrorApi } from '../../shared/models/episodes.interface';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  public character$ = this.store.pipe(select(selectDetails));
  public character!: CharacterDetails;
  public error!: ErrorApi;
  public loading: boolean = false;
  private charactersDetailsSubscription!: Subscription;

  constructor(private store: Store, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idAsNumber = Number(id);
      this.store.dispatch(
        loadDetailsRequest({id: idAsNumber  })
      );

      this.charactersDetailsSubscription = this.character$.subscribe((response: loadDetailsState) => {
        this.character = response.data
        this.loading = response.loading
        this.error = response.error
      });
    }
  }
  ngOnDestroy(): void {
    if (this.charactersDetailsSubscription) {
      this.charactersDetailsSubscription.unsubscribe();
    }
  }

  
}
