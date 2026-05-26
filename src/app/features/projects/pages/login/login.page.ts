import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importado para navegação

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router // Injetado aqui
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Lógica simulada de autenticação
    console.log('Tentativa de login com:', this.form.value);
    
    setTimeout(() => {
      this.isLoading = false;
      // Aqui você redirecionaria para a home após o sucesso:
      // this.router.navigate(['/home']);
    }, 2000);
  }

  // Métodos de navegação para as próximas telas
  goToForgotPassword(): void {
    this.router.navigate(['/esqueceu-senha']);
  }

  goToRegister(): void {
    this.router.navigate(['/cadastro']);
  }
}
