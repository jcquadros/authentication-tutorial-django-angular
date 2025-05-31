# Autenticação JWT com Django (Backend) e Angular (Frontend)

## Descrição do Projeto

Este projeto implementa um sistema de autenticação de usuários utilizando JSON Web Tokens (JWT). O backend é desenvolvido com Django e Django REST Framework, enquanto o frontend é construído com Angular. Ele demonstra o fluxo completo de registro de usuário, login, logout e proteção de rotas/recursos baseada em autenticação.

## Funcionalidades Principais

* **Backend (Django):**
    * Registro de novos usuários.
    * Login de usuários com credenciais (email/username e senha).
    * Geração de tokens JWT (access token e refresh token) após login bem-sucedido.
    * Validação de access tokens para acesso a endpoints protegidos.
    * Mecanismo para refresh de access tokens utilizando o refresh token.
    * Logout (invalidando o refresh token, por exemplo, adicionando-o a uma blacklist).
    * Endpoints protegidos que só podem ser acessados por usuários autenticados.

* **Frontend (Angular):**
    * Formulário de registro de usuário.
    * Formulário de login.
    * Armazenamento seguro dos tokens JWT (ex: em `localStorage`).
    * Inclusão automática do access token no cabeçalho `Authorization` das requisições para endpoints protegidos (usando `HttpInterceptor`).
    * Funcionalidade de logout, limpando os tokens armazenados e redirecionando o usuário.

## Configuração e Instalação

Siga os passos abaixo para configurar e executar o projeto localmente.

### Backend (Django)

1.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

2.  **Aplique as migrações do banco de dados:**
    ```bash
    python manage.py migrate
    ```

3.  **Crie um superusuário (opcional, para acesso ao Django Admin):**
    ```bash
    python manage.py createsuperuser
    ```

4.  **Inicie o servidor de desenvolvimento do Django:**
    ```bash
    python manage.py runserver
    ```
    Por padrão, o backend estará rodando em `http://127.0.0.1:8000/`.

### Frontend (Angular)

1.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

2.  **Inicie o servidor de desenvolvimento do Angular:**
    ```bash
    ng serve
    # ou
    npm start
    ```
    Por padrão, o frontend estará rodando em `http://localhost:4200/`. 

## Como Executar a Aplicação Completa

1.  Inicie o servidor backend Django.
2.  Inicie o servidor frontend Angular.
3.  Abra seu navegador e acesse `http://localhost:4200/`.

## Endpoints da API (Backend)

*(Liste aqui os principais endpoints da sua API, por exemplo)*

* `POST /api/register/`: Registro de novo usuário.
* `POST /api/login/` (ou `/api/token/` para Simple JWT): Login e obtenção de tokens.
* `POST /api/refresh/` (para Simple JWT): Refresh do access token.
* `POST /api/logout/`
* `GET /api/user/`
* `GET /api/forgot/`
* `GET /api/reset/`

