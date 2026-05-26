import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  passo: number = 1; // Controla qual parte da tela aparece
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Formulário do Passo 1
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Formulário do Passo 2
    this.resetForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(4)]],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async enviarCodigo() {
    if (this.emailForm.invalid) return;

    this.isLoading = true;
    
    // Simulação de envio de código
    setTimeout(async () => {
      this.isLoading = false;
      this.passo = 2; // Avança para o próximo passo
      
      const toast = await this.toastCtrl.create({
        message: 'Código enviado com sucesso!',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    }, 2000);
  }

  async atualizarSenha() {
    if (this.resetForm.invalid) return;

    this.isLoading = true;

    // Simulação de atualização de senha
    setTimeout(async () => {
      this.isLoading = false;
      
      const toast = await this.toastCtrl.create({
        message: 'Senha redefinida com sucesso! Faça login.',
        duration: 2000,
        color: 'success'
      });
      toast.present();

      this.router.navigate(['/login']); // Volta para o login
    }, 2000);
  }
}