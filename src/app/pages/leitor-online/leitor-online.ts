import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  OnDestroy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Auth } from '@angular/fire/auth';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-leitor-online',
  standalone: true,
  imports: [CommonModule, PdfViewerModule, RouterModule, FormsModule],
  templateUrl: './leitor-online.html',
  styleUrl: './leitor-online.css',
})
export class LeitorOnlineComponent implements OnInit, OnDestroy {
  @ViewChild('leitorWrapper') leitorWrapper!: ElementRef;

  private dataService = inject(DataService);
  private auth = inject(Auth);

  livroId: string | null = null;
  livroTitulo: string = '';
  pdfSrc: string = '';

  paginaAtual: number = 1;
  totalPaginas: number = 0;
  isFullscreen: boolean = false;
  horaAtual: string = '';
  private timerRelogio: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    // CORREÇÃO: Configuração do Worker para garantir compatibilidade com Firebase/Produção
    (window as any).pdfWorkerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    this.aplicarTema(localStorage.getItem('tema') || 'claro');
    this.iniciarRelogio();

    this.livroId = this.route.snapshot.paramMap.get('id');
    const navState = history.state;
    this.paginaAtual = navState?.pagina || 1;
    this.livroTitulo = navState?.titulo || 'Livro';

    if (this.livroId) {
      this.pdfSrc = `/assets/livros/livro-${this.livroId}.pdf`;
      const user = this.auth.currentUser;
      if (user) {
        const progresso = await this.dataService.buscarProgresso(user.uid, this.livroId);
        if (progresso) this.paginaAtual = progresso['page'];
      }
    }
  }

  ngOnDestroy(): void {
    if (this.timerRelogio) clearInterval(this.timerRelogio);
  }

  async salvarProgresso(): Promise<void> {
    const user = this.auth.currentUser;
    if (user && this.livroId) {
      await this.dataService.atualizarPagina(user.uid, this.livroId, this.paginaAtual);
    }
  }

  async salvarMarcaPagina(): Promise<void> {
    await this.salvarProgresso();
    alert(`Progresso salvo: página ${this.paginaAtual}`);
  }

  async paginaAnterior(): Promise<void> {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      await this.salvarProgresso();
    }
  }

  async proximaPagina(): Promise<void> {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      await this.salvarProgresso();
    }
  }

  async validarPagina(): Promise<void> {
    this.paginaAtual = Math.max(1, Math.min(this.paginaAtual, this.totalPaginas));
    await this.salvarProgresso();
  }

  iniciarRelogio(): void {
    this.timerRelogio = setInterval(() => {
      this.horaAtual = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }, 1000);
  }

  aplicarTema(tema: string): void {
    document.body.classList.remove('tema-escuro', 'tema-sepia');
    if (tema !== 'claro') document.body.classList.add(`tema-${tema}`);
  }

  aposCarregarPdf(pdfInfo: any): void {
    this.totalPaginas = pdfInfo.numPages;
  }

  toggleFullscreen(): void {
    if (!document.fullscreenElement) this.leitorWrapper.nativeElement.requestFullscreen();
    else document.exitFullscreen();
  }

  @HostListener('document:fullscreenchange')
  onFullscreenChange(): void {
    this.isFullscreen = !!document.fullscreenElement;
  }

  voltar(): void {
    this.router.navigate(['/acervo']);
  }
}
