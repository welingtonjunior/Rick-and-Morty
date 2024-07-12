import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailComponent } from './character-detail.component';
import { Store, StoreModule } from '@ngrx/store';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterDetailComponent],
      imports: [StoreModule.forRoot({})],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '1' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const mockResponse = {
    characters: { id: 1, name: 'Character Name' },
    error: null,
    loading: false,
  };

  it('should fetch character detail', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({ type: '[Characters] Load Characters Request' })
    );

    spyOn(store, 'pipe').and.returnValue(of(mockResponse));
    component.character$.subscribe(() => {
      expect(component.character).toEqual(mockResponse.characters);
      expect(component.error).toBeNull();
      expect(component.loading).toBe(false);
    });
  });
});
