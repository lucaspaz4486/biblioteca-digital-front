// ==========================================================================
// IMPORTAÇÕES DO ANGULAR
// ==========================================================================
import { Routes } from '@angular/router';

// ==========================================================================
// IMPORTAÇÕES DAS PÁGINAS (COMPONENTES)
// ==========================================================================
import { HomeComponent } from './pages/home/home'; 
import { AcervoComponent } from './pages/acervo/acervo';
import { LeitorOnlineComponent } from './pages/leitor-online/leitor-online';
import { LoginComponent } from './pages/login/login';

// ==========================================================================
// DEFINIÇÃO DAS ROTAS (MAPA DE NAVEGAÇÃO)
// Define qual componente será injetado no <router-outlet> para cada URL.
// ==========================================================================
export const routes: Routes = [
  { 
    // Rota Raiz (Página Inicial: seunome.com.br/)
    path: '', 
    component: HomeComponent,
    data: { animation: 'HomePage' } 
  },
  { 
    // Rota da Biblioteca (seunome.com.br/acervo)
    path: 'acervo', 
    component: AcervoComponent,
    data: { animation: 'AcervoPage' }
  },
  { 
    // Rota Dinâmica de Leitura (seunome.com.br/leitor/1, /leitor/2...)
    // O ':id' é um parâmetro de rota que o leitor captura para saber qual PDF carregar.
    path: 'leitor/:id', 
    component: LeitorOnlineComponent,
    data: { animation: 'LeitorPage' }
  },
  { 
    // Rota de Autenticação (seunome.com.br/login)
    path: 'login', 
    component: LoginComponent,
    data: { animation: 'LoginPage' } 
  },
  { 
    // Rota Curinga (Wildcard / Tratamento de Erro 404)
    // Se o usuário acessar qualquer link que não esteja listado acima, 
    // ele será automaticamente redirecionado para a rota raiz ('').
    path: '**', 
    redirectTo: '' 
  }
];