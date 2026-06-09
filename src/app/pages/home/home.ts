import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    const temaSalvo = localStorage.getItem('tema') || 'claro';
    this.aplicarTema(temaSalvo);
  }

  aplicarTema(tema: string): void {
    document.body.classList.remove('tema-escuro', 'tema-sepia');
    if (tema !== 'claro') document.body.classList.add(`tema-${tema}`);
    localStorage.setItem('tema', tema);
  }
}
