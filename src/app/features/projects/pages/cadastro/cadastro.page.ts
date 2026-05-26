import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})
export class CadastroPage implements OnInit {
  form!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulação da lógica de criação de conta
    console.log('Dados do cadastro:', this.form.value);

    setTimeout(async () => {
      this.isLoading = false;

      // Exibe uma mensagem de sucesso amigável
      const toast = await this.toastCtrl.create({
        message: 'Conta criada com sucesso! Faça seu login.',
        duration: 2500,
        color: 'success',
        position: 'top'
      });
      await toast.present();

      // Redireciona para a página de login
      this.router.navigate(['/login']);
    }, 2000);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}