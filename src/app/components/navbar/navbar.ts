import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  private authService = inject(AuthService);

  usuario$ = this.authService.usuarioLogado$;
  menuAberto = false;

  aplicarTema(tema: string): void {
    document.body.classList.remove('tema-escuro', 'tema-sepia');
    if (tema !== 'claro') document.body.classList.add(`tema-${tema}`);
    localStorage.setItem('tema', tema);
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  getProvedor(user: User): string {
    const providerId = user.providerData[0]?.providerId || '';
    return providerId.includes('google') ? 'Google' : 'E-mail';
  }
}
