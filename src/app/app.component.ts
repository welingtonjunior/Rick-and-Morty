import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet, Event as NavigationEvent } from '@angular/router';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { selectCharacters } from './shared/selector/load-characters.selector';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchBarComponent,
    CommonModule,
    RouterModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public dataCharacters$ = this.store.pipe(select(selectCharacters));
  public loading: boolean = false;
  public visibleFilter: boolean = false;
  public formFilter!: FormGroup;
  public characters: any;
  public crrRoute: boolean = false;
  private routerSubscription!: Subscription;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.initForm();
    this.handleLoading();
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: NavigationEvent) => {
        if (event instanceof NavigationEnd) {
          this.checkRoute(event.url);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private initForm(): void {
    this.formFilter = this.formBuilder.group({
      name: [''],
      status: [''],
      species: [''],
      type: [''],
      gender: [''],
      id: ['']
    });
  }

  private handleLoading(): void {
    this.dataCharacters$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.loading = response.loading;
        this.characters = response.data;
        this.cdr.detectChanges(); 
      });
  }

  private checkRoute(url: string): void {
    this.crrRoute = (url === '/episodes' || url === '/characters');
  }

  protected openFilter(): void {
    console.log('open filter ==>');
    this.visibleFilter = true;
  }

  protected closeFilter(): void {
    this.visibleFilter = false;
  }

  protected onSubmit(): void {
    if (this.formFilter.valid) {
      const filters = this.formFilter.value;
      this.closeFilter();
    } else {
      console.log('Form is invalid');
    }
  }
}
