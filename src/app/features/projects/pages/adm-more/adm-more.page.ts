import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adm-more',
  templateUrl: './adm-more.page.html',
  styleUrls: ['./adm-more.page.scss'],
  standalone: false,
})
export class AdmMorePage implements OnInit {

  abaSelecionada = 'categorias';

  categorias = [

    {
      nome: 'Ensino',
      status: 'Ativo',
      quantidade: 1,
      icone: 'school-outline'
    },

    {
      nome: 'Pesquisa',
      status: 'Ativo',
      quantidade: 1,
      icone: 'search-outline'
    },

    {
      nome: 'Extensão',
      status: 'Ativo',
      quantidade: 1,
      icone: 'locate-outline'
    }

  ];

  modalidades = [

    {
      nome: 'Presencial',
      status: 'Ativo',
      quantidade: 1,
      icone: 'business-outline'
    },

    {
      nome: 'Remoto',
      status: 'Ativo',
      quantidade: 1,
      icone: 'laptop-outline'
    },

    {
      nome: 'Híbrido',
      status: 'Ativo',
      quantidade: 1,
      icone: 'swap-horizontal-outline'
    }

  ];

  tags = [

    {
      nome: 'Tecnologia',
      status: 'Ativo',
      quantidade: 1,
      icone: 'pricetag-outline'
    },

    {
      nome: 'Educação',
      status: 'Ativo',
      quantidade: 2,
      icone: 'bookmark-outline'
    },

    {
      nome: 'Sustentabilidade',
      status: 'Ativo',
      quantidade: 1,
      icone: 'leaf-outline'
    }

  ];

  constructor() { }

  ngOnInit() {
  }

  selecionarAba(aba: string) {
    this.abaSelecionada = aba;
  }
}
