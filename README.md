# 🎬 Projeto Disney Fullstack 🎬

Um projeto fullstack completo inspirado pela experiência de streaming, com funcionalidades de autenticação, sistema de favoritos, proteção de rotas e mais.

---

## 📋 Visão Geral

Este projeto é uma aplicação de streaming onde usuários podem se registrar, fazer login, curtir filmes, e gerenciar preferências. O sistema utiliza uma API backend para autenticação e gerenciamento de dados, além de uma interface frontend construída com React e Tailwind CSS para fornecer uma experiência de usuário amigável e responsiva.

---

## 🚀 Funcionalidades

- **🗄️ Gerenciamento de usuários**: Autenticação completa com login, registro, verificação de e-mail, e recuperação de senha.
- **❤️ Sistema de Favoritos**: Usuários podem curtir filmes e ver sua lista de favoritos.
- **🔒 Rotas Protegidas**: Páginas protegidas para usuários autenticados.
- **🌐 Interface Responsiva**: Interface adaptada para todos os dispositivos.
- **📧 Notificações por E-mail**: Verificação de e-mail e recuperação de senha.
- **🔍 Pesquisa de Conteúdo**: Sistema de busca por filmes.
- **🛠️ Administração e Configurações de Conta**: Editar perfil, alterar senha, e visualizar filmes favoritos.

---

## 📑 Índice

1. [🔧 Configuração do Backend](#configuração-do-backend)
2. [🎨 Configuração do Frontend](#configuração-do-frontend)
3. [📜 Endpoints do Backend](#endpoints-do-backend)
4. [🛠️ Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [⚙️ Executando o Projeto](#executando-o-projeto)
6. [📬 Contato](#contato)

---

## 🔧 Configuração do Backend

### Instalação de Dependências

Para instalar as dependências do backend, execute o comando:

```bash
npm run install-all
```

### Configuração do Banco de Dados

Configure as variáveis de ambiente no arquivo `.env` para conexão com o banco de dados e serviços de terceiros:

```
# BACKEND
PORT=
JWT_SECRET=
FRONTEND_URL=
NODE_ENV=

# MAILGUN API
MAILGUN_API_KEY=
MAILGUN_FROM=
EMAIL_USER=
MAILGUN_DOMAIN=
MAIL_VERIFICATION_PATH=
MAIL_RESET_PATH=
MAIL_CONFIRM_RESET_PATH=
MAIL_WARNING_PATH=
MAIL_WELCOME_BACK_PATH=
MAIL_DEL_PATH=

# PG SQL
DB_CLIENT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=

#TMDB
API_KEY=
MOVIE_BASE_URL=
BASE_IMG_URL=

#BUCKET CLOUDINARY
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

```

Após configurar as variáveis, use o modelo para criar as tabelas no banco de dados:

```
CREATE DATABASE IF NOT EXISTS disney;

SET timezone = 'America/Sao_Paulo';

DROP TABLE IF EXISTS favoritos;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    genero VARCHAR(9) NOT NULL,
    profile_picture VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    email_verified BOOLEAN DEFAULT FALSE NOT NULL,
    warning BOOLEAN DEFAULT FALSE NOT NULL,
    active BOOLEAN DEFAULT TRUE NOT NULL,
    verification_token VARCHAR(255) UNIQUE,
    verification_token_expires_at TIMESTAMP,
    new_pass_token VARCHAR(255) UNIQUE,
    new_pass_token_expires_at TIMESTAMP
);

CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    movie_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    genre_ids INT[] NOT NULL,
    overview TEXT NOT NULL,
    popularity NUMERIC(20, 3) NOT NULL,
    backdrop_path VARCHAR(255) NOT NULL,
    vote_average NUMERIC(20, 3) NOT NULL,
    vote_count NUMERIC(20, 3) NOT NULL
);
```

### Endpoints do Backend

O backend fornece os seguintes endpoints:

- **Autenticação**

  - `POST /api/auth/register`: Registra um novo usuário.
  - `POST /api/auth/login`: Faz login do usuário.
  - `POST /api/auth/logout`: Faz logout do usuário.
  - `PUT /api/auth/verify-account`: Verifica o e-mail do usuário.
  - `POST /api/auth/forgot-password`: Solicita a recuperação de senha.
  - `PUT /api/auth/new-password/:token`: Cadastra a nova senha.
  - `PUT /api/user/update-user`: Atualiza as informações do usuário.
  - `GET /api/check/cookie`: Verifica os Cookies para autenticações e validações constantes.

- **Usuário**

  - `GET /api/check/user`: Obtém informações do perfil do usuário.

- **Filmes**
  - `GET /api/movies/getFavorites`: Obtém filmes favoritos do usuário logado.
  - `GET /api/movies/trending`: Obtém os filmes em alta.
  - `GET /api/movies/trailer/:id`: Obtém os trailers dos filmes pelo ID.
  - `GET /api/movies/getById/:id`: Obtém detalhes dos filmes pelo ID.
  - `POST /api/movies/favoriteMovie`: Adiciona um filme na lista de favoritos do usuário.
  - `DELETE /api/movies/deleteMovie`: Deleta um filme na lista de favoritos do usuário.

---

## 🎨 Configuração do Frontend

### Instalação de Dependências

Para instalar as dependências do frontend, execute o comando:

```bash
npm install
```

### Variáveis de Ambiente

Configure as variáveis de ambiente no arquivo `.env` do frontend:

```
VITE_MOVIE_BASE_URL=
VITE_MOVIE_BASE_IMG300=
VITE_MOVIE_BASE_IMG400=
VITE_API_URL=http://localhost:PORTA_API/api
VITE_SLIDER_BASE_IMG_URL=
```

---

## 🛠️ Tecnologias Utilizadas

### Backend

#### Frameworks

- **Node.js** - Ambiente de execução para JavaScript no lado do servidor.
- **Express** - Framework para criação de APIs e gerenciamento de rotas.

#### Bibliotecas Principais

- **JWT (jsonwebtoken)** - Gerenciamento de autenticação e sessões de usuários.
- **bcrypt** - Hashing e criptografia de senhas e dados sensíveis para maior segurança.
- **express-rate-limit** - Controle de taxa de requisições para proteger contra ataques de força bruta.
- **geoip** e **request-ip** - Ferramentas para obtenção e registro de informações de IP e localização nas requisições.
- **Knex.js** - Query builder para facilitar interações com o banco de dados PostgreSQL.
- **Multer** - Middleware para upload e gerenciamento de arquivos.
- **Winston** - Sistema de logs para registrar erros e dados relevantes, facilitando monitoramento e manutenção.
- **Mailgun** - Serviço de envio de e-mails para verificação e recuperação de conta.

### Frontend

#### Frameworks

- **React** - Biblioteca JavaScript para construção de interfaces de usuário dinâmicas e interativas.
- **React Router DOM** - Biblioteca para roteamento no React, permitindo navegação entre páginas de forma declarativa.
- **Zustand** - Gerenciamento de estado de forma simples e eficiente em React.

#### Bibliotecas Principais

- **Axios** - Biblioteca para realizar requisições HTTP, frequentemente utilizada para comunicação com APIs.
- **Tailwind CSS** - Framework de CSS utilitário para criar interfaces responsivas e personalizáveis.
- **React Icons** - Conjunto de ícones personalizáveis para utilizar em componentes React.
- **React Hot Toast** - Biblioteca para notificações toast de maneira simples e customizável em React.
- **Framer Motion** - Biblioteca para animações avançadas e interações em aplicações React.

## ⚙️ Executando o Projeto

Para iniciar o projeto em modo de desenvolvimento:

1. **Backend**: No diretório do backend, execute:

   ```bash
   npm install
   npm run dev
   ```

2. **Frontend**: No diretório do frontend, execute:
   ```bash
   npm install
   npm run dev
   ```

Para produção, você pode usar:

```bash
npm run install-all
npm run build
npm run start
```

---

## 📬 Contato

Desenvolvido por [Daniel Mendes Duarte](https://www.linkedin.com/in/danmendesd/ "Daniel Mendes Duarte").
