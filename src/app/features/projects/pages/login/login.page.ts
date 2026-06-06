import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { API_CONFIG } from '../../../../core/config/api.config';

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
    private readonly toastCtrl: ToastController,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.route.queryParams.subscribe(async (params) => {
      const token = params['token']; 
      const role = params['role'] || params['tipo'];

      if (token) {
        this.isLoading = true;
        console.log('Token recebido do Google via URL:', token);
        
        localStorage.setItem('token', token);

        const responseSimulada = { token, role: role || 'ROLE_USER' };
        this.tratarRespostaLogin(responseSimulada);
        this.isLoading = false;
      }
    });
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async loginComGoogle(): Promise<void> {
    this.isLoading = true;
    
    const baseUrl = API_CONFIG.baseUrl; // Ex: http://localhost:3000/api
    if (!baseUrl) {
      this.errorMessage = 'API_BASE_URL não configurada.';
      this.isLoading = false;
      return;
    }

    const urlRaiz = baseUrl.replace('/api', ''); 

    const urlGoogleOAuth = `${urlRaiz}/oauth2/authorization/google`;

    console.log('Redirecionando usuário para o Google:', urlGoogleOAuth);

    window.location.href = urlGoogleOAuth;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const baseUrl = API_CONFIG.baseUrl;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = { email: this.form.value.email, senha: this.form.value.password };

      const response: any = await firstValueFrom(
        this.http.post(`${baseUrl}/auth/login`, body, { headers })
      );

      this.tratarRespostaLogin(response);
    } catch (error: any) {
      this.errorMessage = error?.error?.message || error?.message || 'Falha ao validar login.';
    } finally {
      this.isLoading = false;
    }
  }

  private tratarRespostaLogin(response: any): void {
    if (response && response.token) {
      localStorage.setItem('token', response.token);
    }

    const userRole = response.role || response.tipo || 'visitor';

    switch (userRole.toLowerCase()) {
      case 'admin':
      case 'administrator':
      case 'role_admin':
        this.router.navigate(['../administrator'], { relativeTo: this.route });
        break;

      case 'coordenador':
      case 'coordinator':
      case 'role_coordinator':
        this.router.navigate(['../coordinator'], { relativeTo: this.route });
        break;

      case 'estudante':
      case 'user':
      case 'list':
      case 'role_user':
        this.router.navigate(['../list'], { relativeTo: this.route });
        break;

      default:
        this.router.navigate(['../visitor'], { relativeTo: this.route });
        break;
    }
  }

  goToEsqueceuSenha(): void { this.router.navigate(['../esqueceu-senha'], { relativeTo: this.route }); }
  goToCadastro(): void { this.router.navigate(['../cadastro'], { relativeTo: this.route }); }
}