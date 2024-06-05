import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule, RouterLink],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent implements OnInit{

  public characters: any[] = []
  public pages: any[] = [];
  public error: any;

  constructor(private apiService: ApiService){
  }
  ngOnInit(): void {
    this.apiService.getCharactersList().subscribe(characters => {
      this.characters = characters;
    });
  }
}