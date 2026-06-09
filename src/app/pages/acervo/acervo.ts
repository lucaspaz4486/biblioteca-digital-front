import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer';
import { DataService } from '../../services/data.service';
import { Auth } from '@angular/fire/auth';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  capaUrl: string;
}

@Component({
  selector: 'app-acervo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FooterComponent],
  templateUrl: './acervo.html',
  styleUrl: './acervo.css',
})
export class AcervoComponent implements OnInit {
  private auth = inject(Auth);
  private dataService = inject(DataService);

  termoPesquisa: string = '';
  categoriaSelecionada: string = '';
  ordemSelecionada: string = 'asc';

  meusProgressos: any = {};

  livros: Livro[] = [
    {
      id: 1,
      titulo: 'A Escrava Isaura',
      autor: 'Bernardo Guimarães',
      categoria: 'Literatura Brasileira',
      capaUrl: '/assets/capas/capa-1.jpg',
    },
    {
      id: 2,
      titulo: 'A Flecha Negra',
      autor: 'Robert Louis Stevenson',
      categoria: 'Ação/Aventura',
      capaUrl: '/assets/capas/capa-2.jpg',
    },
    {
      id: 3,
      titulo: 'A Guerra dos Mundos',
      autor: 'H. G. Wells',
      categoria: 'Ficção',
      capaUrl: '/assets/capas/capa-3.jpg',
    },
    {
      id: 4,
      titulo: 'A Ilha do Tesouro',
      autor: 'Robert Louis Stevenson',
      categoria: 'Ação/Aventura',
      capaUrl: '/assets/capas/capa-4.jpg',
    },
    {
      id: 5,
      titulo: 'A Máquina do Tempo',
      autor: 'H. G. Wells',
      categoria: 'Ficção',
      capaUrl: '/assets/capas/capa-5.jpg',
    },
    {
      id: 6,
      titulo: 'A Moreninha',
      autor: 'Joaquim Manuel de Macedo',
      categoria: 'Literatura Brasileira',
      capaUrl: '/assets/capas/capa-6.jpg',
    },
    {
      id: 7,
      titulo: 'A Odisseia',
      autor: 'Homero',
      categoria: 'Ação/Aventura',
      capaUrl: '/assets/capas/capa-7.jpg',
    },
    {
      id: 8,
      titulo: 'A Princesa e o Goblin',
      autor: 'George MacDonald',
      categoria: 'Fantasia',
      capaUrl: '/assets/capas/capa-8.jpg',
    },
    {
      id: 9,
      titulo: 'A Volta ao Mundo em 80 Dias',
      autor: 'Júlio Verne',
      categoria: 'Ficção',
      capaUrl: '/assets/capas/capa-9.jpg',
    },
    {
      id: 10,
      titulo: 'Alice no País das Maravilhas e Alice Através do Espelho',
      autor: 'Lewis Carroll',
      categoria: 'Fantasia',
      capaUrl: '/assets/capas/capa-10.jpg',
    },
    {
      id: 11,
      titulo: 'As Aventuras de Robin Hood',
      autor: 'Howard Pyle',
      categoria: 'Ação/Aventura',
      capaUrl: '/assets/capas/capa-11.jpg',
    },
    {
      id: 12,
      titulo: 'As Minas do Rei Salomão',
      autor: 'Henry Rider Haggard',
      categoria: 'Ação/Aventura',
      capaUrl: '/assets/capas/capa-12.jpg',
    },
    {
      id: 13,
      titulo: 'As Viagens de Gulliver',
      autor: 'Jonathan Swift',
      categoria: 'Fantasia',
      capaUrl: '/assets/capas/capa-13.jpg',
    },
    {
      id: 14,
      titulo: 'Before Adam',
      autor: 'Jack London',
      categoria: 'Ficção',
      capaUrl: '/assets/capas/capa-14.jpg',
    },
    {
      id: 15,
      titulo: 'Caninos Brancos',
      autor: 'Jack London',
      categoria: 'Ação/Aventura',
      capaUrl: '/assets/capas/capa-15.jpg',
    },
    {
      id: 16,
      titulo: 'Contos de Fadas',
      autor: 'Hans Christian Andersen',
      categoria: 'Fantasia',
      capaUrl: '/assets/capas/capa-16.jpg',
    },
    {
      id: 17,
      titulo: 'Contos de Grimm',
      autor: 'Irmãos Grimm',
      categoria: 'Fantasia',
      capaUrl: '/assets/capas/capa-17.jpg',
    },
    {
      id: 18,
      titulo: 'Da Terra à Lua',
      autor: 'Júlio Verne',
      categoria: 'Ficção',
      capaUrl: '/assets/capas/capa-18.jpg',
    },
    {
      id: 19,
      titulo: 'Dom Casmurro',
      autor: 'Machado de Assis',
      categoria: 'Literatura Brasileira',
      capaUrl: '/assets/capas/capa-19.jpg',
    },
    {
      id: 20,
      titulo: 'Frankenstein',
      autor: 'Mary Shelley',
      categoria: 'Ficção',
      capaUrl: '/assets/capas/capa-20.jpg',
    },
    {
      id: 21,
      titulo: 'Iracema',
      autor: 'José de Alencar',
      categoria: 'Literatura Brasileira',
      capaUrl: '/assets/capas/capa-21.jpg',
    },
    {
      id: 22,
      titulo: 'Memórias Póstumas de Brás Cubas',
      autor: 'Machado de Assis',
      categoria: 'Literatura Brasileira',
      capaUrl: '/assets/capas/capa-22.jpg',
    },
    {
      id: 23,
      titulo: 'O Alienista',
      autor: 'Machado de Assis',
      categoria: 'Literatura Brasileira',
      capaUrl: '/assets/capas/capa-23.jpg',
    },
    {
      id: 24,
      titulo: 'O Chamado da Floresta',
      autor: 'Jack London',
      categoria: 'Ação/Aventura',
      capaUrl: '/assets/capas/capa-24.jpg',
    },
    {
      id: 25,
      titulo: 'O Conde de Monte Cristo',
      autor: 'Alexandre Dumas',
      categoria: 'Ação/Aventura',
      capaUrl: '/assets/capas/capa-25.jpg',
    },
    {
      id: 26,
      titulo: 'O Cortiço',
      autor: 'Aluísio Azevedo',
      categoria: 'Literatura Brasileira',
      capaUrl: '/assets/capas/capa-26.jpg',
    },
    {
      id: 27,
      titulo: 'O Guarani',
      autor: 'José de Alencar',
      categoria: 'Literatura Brasileira',
      capaUrl: '/assets/capas/capa-27.jpg',
    },
    {
      id: 28,
      titulo: 'O Homem Invisível',
      autor: 'H. G. Wells',
      categoria: 'Ficção',
      capaUrl: '/assets/capas/capa-28.jpg',
    },
    {
      id: 29,
      titulo: 'O Livro da Selva Mogli',
      autor: 'Rudyard Kipling',
      categoria: 'Fantasia',
      capaUrl: '/assets/capas/capa-29.jpg',
    },
    {
      id: 30,
      titulo: 'O Mágico de Oz',
      autor: 'Lyman Frank Baum',
      categoria: 'Fantasia',
      capaUrl: '/assets/capas/capa-30.jpg',
    },
    {
      id: 31,
      titulo: 'O Médico e o Monstro',
      autor: 'Robert Louis Stevenson',
      categoria: 'Ficção',
      capaUrl: '/assets/capas/capa-31.jpg',
    },
    {
      id: 32,
      titulo: 'O Rei do Rio de Ouro',
      autor: 'John Ruskin',
      categoria: 'Fantasia',
      capaUrl: '/assets/capas/capa-32.jpg',
    },
    {
      id: 33,
      titulo: 'O Último dos Moicanos',
      autor: 'James Fenimore Cooper',
      categoria: 'Ação/Aventura',
      capaUrl: '/assets/capas/capa-33.jpg',
    },
    {
      id: 34,
      titulo: 'Os Sertões',
      autor: 'Euclides da Cunha',
      categoria: 'Literatura Brasileira',
      capaUrl: '/assets/capas/capa-34.jpg',
    },
    {
      id: 35,
      titulo: 'Os Três Mosqueteiros',
      autor: 'Alexandre Dumas',
      categoria: 'Ação/Aventura',
      capaUrl: '/assets/capas/capa-35.jpg',
    },
    {
      id: 36,
      titulo: 'Peter Pan e Wendy',
      autor: 'J. M. Barrie',
      categoria: 'Fantasia',
      capaUrl: '/assets/capas/capa-36.jpg',
    },
    {
      id: 37,
      titulo: 'Triste Fim de Policarpo Quaresma',
      autor: 'Lima Barreto',
      categoria: 'Literatura Brasileira',
      capaUrl: '/assets/capas/capa-37.jpg',
    },
    {
      id: 38,
      titulo: 'Viagem ao Centro da Terra',
      autor: 'Júlio Verne',
      categoria: 'Ficção',
      capaUrl: '/assets/capas/capa-38.jpg',
    },
    {
      id: 39,
      titulo: 'Vinte Mil Léguas Submarinas',
      autor: 'Júlio Verne',
      categoria: 'Ficção',
      capaUrl: '/assets/capas/capa-39.jpg',
    },
    {
      id: 40,
      titulo: 'Phantastes',
      autor: 'George MacDonald',
      categoria: 'Fantasia',
      capaUrl: '/assets/capas/capa-40.jpg',
    },
  ];

  async ngOnInit(): Promise<void> {
    const temaSalvo = localStorage.getItem('tema') || 'claro';
    this.aplicarTema(temaSalvo);

    const user = this.auth.currentUser;
    if (user) {
      this.meusProgressos = await this.dataService.buscarTodosProgressos(user.uid);
    }
  }

  aplicarTema(tema: string): void {
    document.body.classList.remove('tema-escuro', 'tema-sepia');
    if (tema !== 'claro') document.body.classList.add(`tema-${tema}`);
    localStorage.setItem('tema', tema);
  }

  get categoriasUnicas(): string[] {
    return [...new Set(this.livros.map((l) => l.categoria))].sort();
  }

  get livrosFiltrados(): Livro[] {
    return this.livros
      .filter((l) => {
        const termo = this.termoPesquisa.toLowerCase();
        const bateTermo =
          l.titulo.toLowerCase().includes(termo) || l.autor.toLowerCase().includes(termo);
        const bateCat = !this.categoriaSelecionada || l.categoria === this.categoriaSelecionada;
        return bateTermo && bateCat;
      })
      .sort((a, b) =>
        this.ordemSelecionada === 'asc'
          ? a.titulo.localeCompare(b.titulo)
          : b.titulo.localeCompare(a.titulo),
      );
  }
}
