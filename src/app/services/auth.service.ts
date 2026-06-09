import { Injectable, inject } from '@angular/core';
import { Auth, signOut, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  usuarioLogado$: Observable<User | null> = user(this.auth);

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
