import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class DataService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  async loginComEmail(email: string, senha: string) {
    return await signInWithEmailAndPassword(this.auth, email, senha);
  }

  async cadastrarComEmail(email: string, senha: string) {
    return await createUserWithEmailAndPassword(this.auth, email, senha);
  }

  async atualizarPagina(userId: string, bookId: string, page: number): Promise<void> {
    const docRef = doc(this.firestore, `progresso_leitura/${userId}_${bookId}`);
    await setDoc(
      docRef,
      {
        userId,
        bookId,
        page,
        updatedAt: new Date(),
      },
      { merge: true },
    );
  }

  async buscarProgresso(userId: string, bookId: string): Promise<any | null> {
    const docSnap = await getDoc(doc(this.firestore, `progresso_leitura/${userId}_${bookId}`));
    return docSnap.exists() ? docSnap.data() : null;
  }

  async buscarTodosProgressos(userId: string): Promise<Record<string, number>> {
    const q = query(collection(this.firestore, 'progresso_leitura'), where('userId', '==', userId));
    const snapshot = await getDocs(q);

    const progressos: Record<string, number> = {};
    snapshot.forEach((doc) => {
      const data = doc.data();
      progressos[data['bookId']] = data['page'];
    });
    return progressos;
  }
}
