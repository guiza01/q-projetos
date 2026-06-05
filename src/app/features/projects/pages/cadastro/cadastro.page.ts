import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { API_CONFIG } from '../../../../core/config/api.config';

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
    private readonly route: ActivatedRoute,
    private readonly toastCtrl: ToastController,
    private readonly http: HttpClient 
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

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const baseUrl = API_CONFIG.baseUrl;

      if (!baseUrl) {
        throw new Error('API_BASE_URL não configurada no ambiente da aplicação.');
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      // 🔥 MODELO DE DADOS ENVIADO: Junta a digitação do usuário com os padrões da API
      const body = {
        nome: this.form.value.nome,
        email: this.form.value.email,
        senha: this.form.value.password,
        role: 'ROLE_USER',       // 👈 Fixo: Todo cadastro inicial entra como USER
        vinculo: 'ESTUDANTE'    // 👈 Fixo: Todo cadastro inicial entra como ESTUDANTE
      };

      console.log('Enviando dados formatados para o backend:', body);

      const response = await firstValueFrom(
        this.http.post(`${baseUrl}/auth/register`, body, { headers })
      );

      console.log('Cadastro criado com sucesso no banco!', response);

      const toast = await this.toastCtrl.create({
        message: 'Conta criada com sucesso! Faça seu login.',
        duration: 2500,
        color: 'success',
        position: 'top'
      });
      await toast.present();

      this.goToLogin();

    } catch (error: any) {
      this.errorMessage = error?.error?.message || error?.message || 'Falha ao realizar cadastro na API.';
      console.error('Erro detalhado no cadastro:', error);
    } finally {
      this.isLoading = false;
    }
  }

  goToLogin(): void {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
}