import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastCtrl: ToastController 
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
    
    console.log('Tentativa de login com:', this.form.value);
    
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/home']);
    }, 2000);
  }

  // Método de Autenticação Simulado do Google inserido com sucesso
  async loginComGoogle(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    // Exibe o balão informativo na tela
    const toast = await this.toastCtrl.create({
      message: 'Conectando com o Google...',
      duration: 1500,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();

    // Simula o tempo de resposta do servidor do Google
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/home']);
    }, 2000);
  }

  // Função para ir para a página de Esqueceu Senha
  goToEsqueceuSenha(): void {
    this.router.navigate(['/esqueceu-senha']).catch(() => {
      this.router.navigate(['../esqueceu-senha'], { relativeTo: this.route });
    });
  }

  // Função para ir para a página de Cadastro
  goToCadastro(): void {
    this.router.navigate(['/cadastro']).catch(() => {
      this.router.navigate(['../cadastro'], { relativeTo: this.route });
    });
  }
}
