# Onda Elétrica — Guia de Configuração

Este app funciona no navegador do Android e do iPhone (Chrome/Safari), sem loja
de aplicativos e sem custo. Você faz tudo pelo celular, em ~15 minutos.

Ele tem 3 partes:
1. **index.html** — o app em si (não precisa mexer, só colar uma configuração).
2. **manifest.json** — permite "instalar" o app na tela de início.
3. **Firebase** — o banco de dados gratuito que guarda os pontos e sincroniza
   tudo em tempo real entre os celulares da equipe.

---

## Parte 1 — Criar o projeto no Firebase (grátis)

1. No navegador do celular, acesse **console.firebase.google.com** e entre
   com uma conta Google (pode ser a sua).
2. Toque em **Criar projeto** (ou "Add project").
3. Dê um nome, por exemplo `onda-eletrica`. Pode desativar o Google Analytics
   (não é necessário) e continuar.
4. Espere o projeto ser criado e toque em **Continuar**.

### 1.1 Ativar login anônimo (é o que dá nome a cada pessoa sem precisar de senha)
1. No menu lateral, vá em **Build → Authentication**.
2. Toque em **Get started**.
3. Na lista de provedores, toque em **Anonymous** e **ative**. Salvar.

### 1.2 Criar o banco de dados (Firestore)
1. No menu lateral, vá em **Build → Firestore Database**.
2. Toque em **Create database**.
3. Escolha a localização mais próxima (ex.: `southamerica-east1`) e toque em
   **Next**.
4. Escolha **Start in production mode** e crie.
5. Depois de criado, vá na aba **Rules** (Regras) lá em cima, apague o que
   estiver escrito e cole isto:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

   Isso significa: só quem entrou no app (mesmo anonimamente) pode ler e
   gravar dados — dá pra qualquer pessoa da equipe usar, mas não gente de fora.
6. Toque em **Publish** (Publicar).

### 1.3 Pegar a configuração do projeto
1. No menu lateral, toque na engrenagem ⚙️ ao lado de "Project Overview" →
   **Project settings**.
2. Desça até **Your apps** e toque no ícone **</>** (Web).
3. Dê um apelido ao app (ex.: `onda-web`) e toque em **Register app**.
4. Vai aparecer um bloco de código com `const firebaseConfig = {...}`.
   Copie só o conteúdo de dentro das chaves `{ }`.

---

## Parte 2 — Colar a configuração no app

1. Abra o arquivo **index.html** em qualquer editor de texto do celular
   (dá pra usar apps grátis como "Code Editor" ou até o editor de arquivos do
   GitHub, no próximo passo).
2. Procure este trecho, perto do topo:

   ```js
   const firebaseConfig = {
     apiKey: "COLE_AQUI",
     authDomain: "COLE_AQUI.firebaseapp.com",
     ...
   };
   ```

3. Substitua pelos valores que você copiou no passo 1.3.
4. Salve o arquivo.

---

## Parte 3 — Publicar o app de graça (GitHub Pages, sem terminal)

1. Crie uma conta grátis em **github.com** (se ainda não tiver).
2. Toque em **+ → New repository**. Nome sugerido: `onda-eletrica`.
   Marque como **Public** e crie.
3. Dentro do repositório, toque em **Add file → Upload files**.
4. Envie os 3 arquivos: `index.html`, `manifest.json` e o
   `firebaseConfig` já preenchido dentro do `index.html`.
5. Confirme o upload ("Commit changes").
6. Vá em **Settings → Pages** (no menu lateral do repositório).
7. Em "Branch", escolha `main` e a pasta `/ (root)`. Toque em **Save**.
8. Espere ~1 minuto e recarregue a página. Vai aparecer um link tipo:
   `https://seu-usuario.github.io/onda-eletrica/`

Esse é o link do app. Mande esse link pra equipe.

---

## Parte 4 — "Instalar" o app no celular

- **Android (Chrome):** abra o link → menu (⋮) → **Adicionar à tela inicial**.
- **iPhone (Safari):** abra o link → ícone de compartilhar (□↑) →
  **Adicionar à Tela de Início**.

Depois disso, o app abre com ícone próprio, em tela cheia, como um app normal.

---

## Como funciona no dia a dia

- Cada pessoa abre o link, digita o nome uma vez (fica salvo no aparelho) e
  toca em **Entrar**.
- **Ponto:** toca em **INICIAR** pra começar o cronômetro e **PARAR** pra
  encerrar. O tempo é somado automaticamente ao total da pessoa.
- **Mural:** mostra em tempo real quem começou ou parou, pra todo mundo que
  estiver com o app aberto.
- **Ranking:** mostra as horas de cada um, com filtro por semana, mês ou
  período personalizado.

## Limitação importante

O mural funciona em tempo real **enquanto o app está aberto** no celular da
pessoa (é o que você pediu: avisar "os outros usuários logados"). Ele não manda
notificação push se o app estiver fechado — isso exigiria uma configuração bem
mais complexa (Firebase Cloud Messaging + Service Worker) que dá pra fazer
depois, se um dia fizer falta.

## Custos

O plano gratuito do Firebase (Spark) cobre folgadamente o uso de uma equipe
pequena (50 mil leituras e 20 mil gravações por dia, de graça). Só passaria
disso com uso muito intenso — nesse caso o Firebase avisa antes de cobrar
qualquer coisa.
