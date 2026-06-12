import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { firstValueFrom, timeout } from 'rxjs'; 
import { API_CONFIG } from '../../../../core/config/api.config';
import { AuthStorageService } from '../../../../core/services/auth-storage.service';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.page.html',
  styleUrls: ['./project-create.page.scss'],
  standalone: false,
})
export class ProjectCreatePage implements OnInit {
  form!: FormGroup;
  origem: string | null = null;
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  abaSelecionada: string = 'gerais';
  bannerBase64: string = '';
  emailIntegrante: string = '';
  papelSelecionado: string = '';
  papelPersonalizado: string = '';
  permissaoEdicao: boolean = false;
  integrantesAdicionados: any[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastController: ToastController,
    private readonly projectsService: ProjectsService,
    private readonly http: HttpClient,
    private readonly authStorage: AuthStorageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.garantirTokenDeTeste(); 
  }

  async garantirTokenDeTeste(): Promise<void> {
    if (localStorage.getItem('token')) {
      console.log('Token já existente no LocalStorage. Carregando parâmetros da URL...');
      this.loadUrlParams(); 
      return;
    }

    try {
      console.log('Token não encontrado. Fazendo login de teste em background...');
      this.isLoading = true;
      const baseUrl = API_CONFIG.baseUrl;
      
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = { email: 'admin@ifpe.edu.br', senha: 'admin123' };

      const response: any = await firstValueFrom(
        this.http.post(`${baseUrl}/auth/login`, body, { headers })
      );

      const tokenGerado = response.token || response.accessToken || response.tokenAccess;

      if (tokenGerado) {
        this.authStorage.setSession(tokenGerado, 'ROLE_ADMIN');
        console.log('Token de teste gerado e armazenado com sucesso!');
      }

    } catch (error) {
      console.error('Não foi possível gerar o token automático de teste:', error);
    } finally {
      this.isLoading = false;
      this.loadUrlParams(); 
    }
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private voltarParaPainelOrigem(): void {
    const userRole = this.authStorage.getRole();

    if (userRole === 'ROLE_ADMIN' || this.origem === 'admin') {
      this.router.navigate(['/administrator']);
      return;
    }

    if (userRole === 'ROLE_COORD' || this.origem === 'coordinator') {
      this.router.navigate(['/coordinator']);
      return;
    }

    this.router.navigate(['/coordinator']);
  }

  loadUrlParams(): void {
    this.origem = this.route.snapshot.queryParamMap.get('origem'); 
  }

  selecionarAba(aba: string): void {
    this.abaSelecionada = aba;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.bannerBase64 = reader.result as string;
        console.log('Imagem do banner processada para Base64!');
      };
      reader.readAsDataURL(file);
    }
  }

  onPapelChange(event: any): void {
    this.papelSelecionado = event.detail.value;
    this.permissaoEdicao = (this.papelSelecionado === 'Coordenador');
  }

  async adicionarIntegrante(modal: any): Promise<void> {
    const papelFinal = this.papelSelecionado === 'Outro' ? this.papelPersonalizado : this.papelSelecionado;
    const emailClean = this.emailIntegrante.trim().toLowerCase();

    if (emailClean && papelFinal) {
      this.isLoading = true;
      let nomeResolvido = '';

      try {
        const baseUrl = API_CONFIG.baseUrl;
        const usuarios: any = await firstValueFrom(
          this.http.get(`${baseUrl}/usuarios`, { headers: this.getHeaders() }).pipe(timeout(4000))
        );

        const usuarioEncontrado = usuarios.find((u: any) => u.email?.toLowerCase() === emailClean);

        if (usuarioEncontrado) {
          nomeResolvido = usuarioEncontrado.nome;
        } else {
          const extraiNome = emailClean.split('@')[0];
          nomeResolvido = extraiNome.charAt(0).toUpperCase() + extraiNome.slice(1) + ' (Convidado)';
        }
      } catch (error) {
        console.warn('Usando nome temporário baseado no email.');
        const extraiNome = emailClean.split('@')[0];
        nomeResolvido = extraiNome.charAt(0).toUpperCase() + extraiNome.slice(1);
      } finally {
        this.isLoading = false;
      }

      this.integrantesAdicionados.push({ nome: nomeResolvido, email: emailClean, papel: papelFinal });
      this.emailIntegrante = '';
      this.papelSelecionado = '';
      this.papelPersonalizado = '';
      this.permissaoEdicao = false;
      void modal.dismiss();
    }
  }

  removerIntegrante(index: number): void {
    this.integrantesAdicionados.splice(index, 1);
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      coordinator: ['', Validators.required],
      status: ['active', Validators.required],
      type: ['extensao', Validators.required],
      startDate: [''],
      endDate: [''],
      vagasBolsistas: [0],
      vagasVoluntarios: [0],
      inscricoesInicio: [''],
      inscricoesFim: [''],
      linkEdital: [''],
      linkInscricaoExterno: ['https://forms.gle/exemplo']
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    this.isSaving = true;
    this.errorMessage = '';

    try {
      const baseUrl = API_CONFIG.baseUrl;
      if (!baseUrl) throw new Error('API_BASE_URL não está configurada no sistema.');

      const formValues = this.form.value;
      
      const body = {
        titulo: formValues.title,
        tipo: formValues.type?.toUpperCase(),
        descricao: formValues.description,
        dataInicio: formValues.startDate,
        dataTermino: formValues.endDate,
        dataInicioInscricao: formValues.inscricoesInicio || formValues.startDate,
        dataFimInscricao: formValues.inscricoesFim || formValues.endDate,
        linkEdital: formValues.linkEdital,
        linkInscricaoExterno: formValues.linkInscricaoExterno,
        vagas: Number(formValues.vagasBolsistas || 0) + Number(formValues.vagasVoluntarios || 0),
        modalidade: "BOLSISTA",
        banner: this.bannerBase64
      };

      const urlFinal = `${baseUrl}/projetos`;
      await firstValueFrom(this.http.post(urlFinal, body, { headers: this.getHeaders() }));

      const toast = await this.toastController.create({
        message: 'Projeto criado com sucesso! 🎉',
        duration: 2500,
        color: 'success',
        position: 'bottom'
      });
      await toast.present();

      this.voltarParaPainelOrigem(); 

    } catch (error: any) {
      this.errorMessage = error?.error?.message || error?.message || 'Falha ao cadastrar o novo projeto.';
      console.error('Erro na requisição POST:', error);
    } finally {
      this.isSaving = false;
    }
  }

  onCancel(): void {
    this.voltarParaPainelOrigem(); 
  }
}
