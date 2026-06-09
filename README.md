# 📚 Acervo Digital

O **Acervo Digital** é uma biblioteca web focada em acessibilidade e experiência de leitura. O projeto permite que usuários explorem grandes clássicos da literatura com suporte a temas dinâmicos (Claro, Sépia e Escuro) e salvamento de progresso de leitura na nuvem.

---

## 🚀 Funcionalidades Principais

* **Autenticação Segura:** Login via E-mail/Senha ou Google utilizando Firebase Authentication.
* **Modos de Leitura (Acessibilidade):** Alternância dinâmica de temas (Claro, Escuro e Sépia) com filtros automáticos aplicados aos PDFs para maior conforto visual.
* **Progresso em Nuvem:** Marca-páginas inteligente e persistente que salva a página atual diretamente no Firestore, lembrando exatamente onde você parou.
* **Busca Inteligente:** Filtragem dinâmica e instantânea de livros por autor, categoria e título.
* **Interface Responsiva e Minimalista:** Design organizado, limpo e otimizado para proporcionar a melhor experiência tanto no desktop quanto no mobile.
* **Deploy Automatizado (CI/CD):** Integração contínua configurada via GitHub Actions para publicação automática no Firebase Hosting a cada novo commit na branch principal.

---

## 🛠 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as tecnologias mais modernas do ecossistema front-end e serverless:

* **Frontend:** Angular (v20.3.x) utilizando Standalone Components.
* **Estilização:** CSS puro com variáveis globais (Design System).
* **Leitor de PDF:** `ng2-pdf-viewer`.
* **Gerenciamento de Estado:** RxJS.
* **Backend/Database:** Firebase (Authentication & Firestore).
* **Hospedagem & CI/CD:** Firebase Hosting e GitHub Actions.

---

## 📦 Como rodar o projeto localmente

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) e o Angular CLI instalados na sua máquina.

### 2. Clone o repositório
```bash
git clone [https://github.com/lucaspaz4486/biblioteca-digital-front.git](https://github.com/lucaspaz4486/biblioteca-digital-front.git)
cd biblioteca-digital-front
3. Instale as dependências
Bash
npm install
4. Configure o ambiente Firebase
Crie o arquivo src/environments/environment.ts (e environment.development.ts se necessário) e insira suas credenciais do Firebase:

TypeScript
export const environment = {
  production: false,
  firebase: {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
  }
};
5. Inicie o servidor de desenvolvimento
Bash
ng serve
Acesse http://localhost:4200 no seu navegador. A aplicação será recarregada automaticamente sempre que você modificar os arquivos de origem.

⚙️ Comandos Úteis do Angular CLI
Gerar Componentes: ng generate component nome-do-componente

Build de Produção: ng build (Os arquivos compilados serão gerados na pasta dist/).

Testes Unitários: ng test (Executa os testes usando Karma).

Ajuda do CLI: ng generate --help

Para documentação completa, visite Angular CLI Overview.

👤 Autor
Lucas Da Silva Paz Desenvolvedor Web


Para enviar essa atualização para o repositório, basta salvar o arquivo e rodar os três comandos de sempre no terminal: `git add .`, `git commit -m "Atualiza README com funcionalidades e documentacao"` e `git push`.