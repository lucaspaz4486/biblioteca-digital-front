import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
  private auth = inject(Auth);
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm!: FormGroup;
  cadastroForm!: FormGroup;
  isLoginMode: boolean = true;

  ngOnInit(): void {
    this.aplicarTema(localStorage.getItem('tema') || 'claro');

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  aplicarTema(tema: string): void {
    document.body.classList.remove('tema-escuro', 'tema-sepia');
    if (tema !== 'claro') document.body.classList.add(`tema-${tema}`);
    localStorage.setItem('tema', tema);
  }

  toggleMode(modo: 'login' | 'cadastro'): void {
    this.isLoginMode = modo === 'login';
    this.loginForm.reset();
    this.cadastroForm.reset();
  }

  async onSubmitLogin(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        const { email, senha } = this.loginForm.value;
        await this.dataService.loginComEmail(email, senha);
        this.router.navigate(['/acervo']);
      } catch (err: any) {
        alert('Erro ao entrar: ' + err.message);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  async onSubmitCadastro(): Promise<void> {
    if (this.cadastroForm.valid) {
      try {
        const { email, senha } = this.cadastroForm.value;
        await this.dataService.cadastrarComEmail(email, senha);
        alert('Conta criada com sucesso!');
        this.toggleMode('login');
      } catch (err: any) {
        alert('Erro ao cadastrar: ' + err.message);
      }
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }

  async loginComGoogle(): Promise<void> {
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.router.navigate(['/acervo']);
    } catch (err: any) {
      console.error('Erro no login Google:', err);
      alert('Falha na autenticação com Google.');
    }
  }
}
