# Rick and Morty Dashboard

## Descrição

Este projeto é um dashboard que permite aos usuários buscar e visualizar informações sobre personagens e episódios da série Rick and Morty. O projeto utiliza autenticação mockada, gerenciamento de estado com NgRx, programação reativa com RxJS, a API do Rick and Morty para dados, e estilização com Bootstrap.

## Tecnologias Utilizadas

- **Angular**: Framework para construção de aplicações web.
- **NgRx**: Biblioteca para gerenciamento de estado baseado em Redux.
- **RxJS**: Biblioteca para programação reativa com Observables.
- **API do Rick and Morty**: Fonte de dados para personagens e episódios.
- **Bootstrap**: Framework SCSS para estilização responsiva.

## Funcionalidades

- **Autenticação Mockada**: Sistema de login simulado para demonstração de autenticação.
- **Busca de Personagens e Episódios**: Barra de busca para encontrar personagens e episódios por nome.
- **Paginação**: Navegação entre páginas de resultados.
- **Gerenciamento de Estado**: Utilização do NgRx para gerenciar o estado da aplicação.
- **Programação Reativa**: Uso de RxJS para lidar com eventos assíncronos.

## Instalação e Execução

Siga os passos abaixo para instalar e executar o projeto localmente:

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/rick-and-morty-dashboard.git
   cd rick-and-morty-dashboard

2. **Instale as dependências:**
    ```npm install
    
3. **Execute a aplicação:**
    ```ng serve

4. **Acesse a aplicação:**
    Abra o navegador e vá para http://localhost:4200

## Credenciais de Acesso

    Utilize as seguintes credenciais para acessar a aplicação:

    Usuário: WelingtonJunior
    Senha: W1234

## Estrutura do Projeto

A estrutura do projeto está organizada de acordo com style guide: https://angular.dev/style-guide/   - segue:
```sh
    src/
    app/
        auth/
        auth.service.ts        # Serviço para autenticação mockada
        auth.guard.ts          # Guarda de rota para proteger rotas autenticadas
        core/
        services/
            api.service.ts       # Serviço para comunicação com a API do Rick and Morty
        shared/
        components/
            search-bar/
            search-bar.component.ts  # Componente da barra de busca
        actions/
            load-characters.action.ts  # Ações relacionadas ao carregamento de personagens
        effects/
            characters.effects.ts      # Efeitos para gerenciar as ações de personagens
        reducers/
            load-characters.reducer.ts # Redutor para gerenciar o estado dos personagens
        selectors/
            load-characters.selector.ts# Selectors para selecionar o estado dos personagens
    assets/
    environments/
```

## Fluxo de trabaho

# Autenticação:

- O usuário faz login utilizando as credenciais fornecidas.
A autenticação é gerenciada pelo auth.service.ts.
Carregamento de Dados:

- A aplicação utiliza o api.service.ts para buscar dados da API do Rick and Morty.
A busca por personagens e episódios é feita através da barra de busca (search-bar.component.ts).
Gerenciamento de Estado:

- As ações (definidas em load-characters.action.ts) disparam eventos que são gerenciados pelos efeitos (characters.effects.ts) e redutores (load-characters.reducer.ts).
O estado da aplicação é selecionado usando selectors (load-characters.selector.ts).
Navegação:

- A aplicação utiliza roteamento do Angular para navegar entre páginas de personagens e episódios.
A paginação permite ao usuário navegar entre diferentes páginas de resultados.

# Estilização

- A aplicação utiliza o Bootstrap para estilização responsiva e para componentes de UI