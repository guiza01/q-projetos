import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.page.html',
  styleUrls: ['./esqueceu-senha.page.scss'],
  standalone: false,
})
export class EsqueceuSenhaPage implements OnInit {
  emailForm!: FormGroup;
  resetForm!: FormGroup;
  passo = 1; 
  isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(4)]],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async enviarCodigo(): Promise<void> {
    if (this.emailForm.invalid) return;

    this.isLoading = true;
    console.log('Solicitando código para o e-mail:', this.emailForm.value.email);
    
    setTimeout(async () => {
      this.isLoading = false;
      this.passo = 2;

      const toast = await this.toastCtrl.create({
        message: 'Código enviado com sucesso!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
    }, 2000);
  }

  async atualizarSenha(): Promise<void> {
    if (this.resetForm.invalid) return;

    this.isLoading = true;
    console.log('Enviando nova senha e código:', this.resetForm.value);

    setTimeout(async () => {
      this.isLoading = false;

      const toast = await this.toastCtrl.create({
        message: 'Senha redefinida com sucesso! Faça login.',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      await toast.present();

      this.goToLogin(); 
    }, 2000);
  }

  goToLogin(): void {
    this.router.navigate(['/login']).catch(() => {
      this.router.navigate(['../login'], { relativeTo: this.route });
    });
  }
}