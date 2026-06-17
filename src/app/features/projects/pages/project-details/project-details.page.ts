import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'; 
import { ProjectsApiService } from 'src/app/core/services/projects-api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
  standalone: false
})
export class ProjectDetailsPage implements OnInit {

  projetoId: string | null = null;
  projeto: any = null; 
  isLoading: boolean = true; 
  errorError: string | null = null; 

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private projectsApiService: ProjectsApiService
  ) { }

  ngOnInit() {
    this.projetoId = this.route.snapshot.paramMap.get('id');
    
    if (this.projetoId) {
      this.buscarProjetoNoBackEnd(this.projetoId);
    }
  }

  voltar() {
    this.location.back();
  }

  buscarProjetoNoBackEnd(id: string) {

    this.isLoading = true;

    this.projectsApiService.getProjectById(Number(id))
      .subscribe({
        next: (resultado) => {
          console.log('PROJETO DETALHADO:', resultado);
          this.projeto = resultado;
          this.isLoading = false;
        },

        error: (erro) => {
          console.error(
            'Erro ao buscar projeto:',
            erro
          );
          this.errorError =
            'Não foi possível carregar os detalhes deste projeto.';
          this.isLoading = false;
        }
      });
  }

  aprovarProjeto(id: string | number) {
    this.projectsApiService.aprovarProjeto(Number(id)).subscribe({
      next: () => {
        this.router.navigate(['/administrator']);
         
      },
      error: console.error
    });
  }

  reprovarProjeto(id: string | number) {
    this.projectsApiService.reprovarProjeto(Number(id)).subscribe({
      next: () => {
        this.router.navigate(['/administrator']);
      },
      error: console.error
    });
  }

  excluirProjeto(id: string | number) {
    this.projectsApiService.excluirProjeto(Number(id)).subscribe({
      next: () => {
        this.router.navigate(['/administrator']);
      },
      error: console.error
    });
  }
  
}