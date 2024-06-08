import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  protected formLogin!: FormGroup;
  public errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  protected login(): void {
    const username = this.formLogin.get('username')?.value;
    const password = this.formLogin.get('password')?.value;

    if (this.authService.authenticate(username, password)) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Usuário ou senha inválidos';
      this.formLogin.reset()
    }
  }

}
