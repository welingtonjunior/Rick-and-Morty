import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { loadCharactersRequest } from '../../shared/action/load-characters.action';
import { FilterCharacters } from '../../shared/models/filter.interface';
import { selectCharacters } from '../../shared/selector/load-characters.selector';
import { ErrorApi } from '../../shared/models/error-api.interface';
import { CharacterDetails } from '../../shared/models/character-details.interface';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  public character$ = this.store.pipe(select(selectCharacters));
  public character!: any;
  public error: any;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchCharacterDetail(parseInt(id, 10));
    }
    console.log('character detail', this.character$)
  }

  private fetchCharacterDetail(id: number): void {
    this.store.dispatch(
      loadCharactersRequest({ params: { id } as FilterCharacters })
    );
    this.character$.subscribe((data) => {
      this.character = data.characters;
      this.error = data.error;
      console.log('character == >', data.characters)
    });
  }
}
