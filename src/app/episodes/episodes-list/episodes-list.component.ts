import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss',
})
export class EpisodesListComponent implements OnInit {
  public episodes: any[] = [];

  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.apiService
      .getEpisodes()
      .subscribe((data: any) => (this.episodes = data.results));
  }
}
