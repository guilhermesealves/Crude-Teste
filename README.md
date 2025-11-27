# CRUD React com Supabase

Olá, meu nome é **Guilherme Seleri** e finalizei um projeto de CRUD usando **React** e **Supabase**.  

Esta aplicação permite gerenciar **categorias** e **produtos**, com CRUD completo, alertas de confirmação e validação de campos obrigatórios.

---
Você pode acessar direto pelo site https://crude-teste.vercel.app/
---
## Menu Inicial

Ao abrir a aplicação, você verá uma **caixa com fundo semi-transparente** com a mensagem de boas-vindas e dois botões:

- **Categorias** → Leva à tela de gerenciamento de categorias
- **Produtos** → Leva à tela de gerenciamento de produtos

![Menu Inicial](https://github.com/user-attachments/assets/23526d11-f488-4284-be52-1cd929296d23)

---

## Gerenciando Categorias

### Adicionar Categoria

- Digite o nome da categoria no input e clique em **Adicionar Categoria**.
- A categoria é adicionada à lista e salva no banco Supabase.

![Adicionar Categoria](https://github.com/user-attachments/assets/679ae16a-d5bd-4fd6-b9ef-a0c683ac06b7)

---

### Lista de Categorias

- Exibe todas as categorias cadastradas.
- Mostra ID, Nome, Data de Criação e Ações.

![Lista de Categorias](https://github.com/user-attachments/assets/cd282b23-2dd4-41d0-a2c1-c5a5ae2dbaaa)

---

### Editar Categoria

- Clique em **Editar** na categoria desejada.
- Um modal aparece permitindo alterar o nome.
- Clique em **Salvar** para atualizar ou **Cancelar** para voltar.

![Editar Categoria](https://github.com/user-attachments/assets/bcbaf0ac-2ba1-4728-8034-5ca012d300a4)

---

### Deletar Categoria

- Clique em **Deletar** na categoria desejada.
- Um modal de confirmação pergunta se você tem certeza.
- Clique em **Confirmar** para excluir ou **Cancelar** para voltar.

![Deletar Categoria](https://github.com/user-attachments/assets/b66c0b5e-2ba8-4a5b-9356-9fa247580ac4)

---

## Gerenciando Produtos

### Adicionar Produto

- Preencha **Nome**, **Preço** e selecione a **Categoria** no dropdown.
- Clique em **Adicionar Produto**.
- Se algum campo não estiver preenchido, aparece um **modal de aviso**.

![Adicionar Produto](https://github.com/user-attachments/assets/0d02fb39-2710-4b2a-95bb-9a248110b534)
![Campos Obrigatórios](https://github.com/user-attachments/assets/8bd9a929-9d93-429c-a622-b055aa691b1a)

---

### Lista de Produtos

- Exibe todos os produtos cadastrados.
- Mostra ID, Nome, Preço, Categoria, Data de Criação e Ações.

<img width="1383" height="879" alt="print 11" src="https://github.com/user-attachments/assets/b6a22d75-08af-4a31-89b6-369a1519380e" />

---

### Editar Produto

- Clique em **Editar** no produto desejado.
- Um modal aparece permitindo alterar Nome, Preço e Categoria.
- Clique em **Salvar** para atualizar ou **Cancelar** para voltar.


<img width="1242" height="863" alt="print 15" src="https://github.com/user-attachments/assets/eebec163-4d38-4964-9fdc-e4168cb806d9" />

---

### Deletar Produto


- Clique em **Deletar** no produto desejado.
- Um modal de confirmação pergunta se você tem certeza.
- Clique em **Confirmar** para excluir ou **Cancelar** para voltar.

![Deletar Produto](https://github.com/user-attachments/assets/7f24bbc1-20e1-4b03-bcc6-435624566ef5)

---

## Banco de Dados (Supabase)

<img width="1094" height="481" alt="Database" src="https://github.com/user-attachments/assets/6a39f639-a7e3-4a21-9f39-786843fb45cc" />


### Tabela Categories
- `id` (Primary Key)
- `name` (Text, Not Null)
- `created_at` (Timestamp)

### Tabela Products
- `id` (Primary Key)
- `name` (Text, Not Null)
- `price` (Numeric, Not Null)
- `category_id` (Foreign Key → categories.id)
- `created_at` (Timestamp)

---

## Design e Estilo

- Layout moderno com **fundo desfocado**.
- Botões estilizados com cores e efeitos de hover.
- Inputs claros e legíveis.
- Tabelas responsivas destacando ações (Editar e Deletar).
- Modais consistentes para alertas e confirmações.


## 📝 Pré-requisitos

Antes de começar, você precisa ter:

- [Node.js](https://nodejs.org/) (recomendado LTS)
- npm (vem junto com Node.js)
- Conta no [Supabase](https://supabase.com/) e projeto criado
- URL do Supabase e API Key do projeto

## Como Rodar

Siga os passos abaixo para rodar o seu CRUD de Categorias e Produtos com React e Supabase:

1. **Clone o projeto**

```bash
-git clone https://github.com/guilhermesealves/Crude-Teste
```
Acesse a pasta do projeto
```bash
-cd Crude-React

```
Instale as dependências
```bash

-npm install
```
```bash
-import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "(https://oqqnqjbhloqcwqrhezmx.supabase.co)",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcW5xamJobG9xY3dxcmhlem14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzk4OTQsImV4cCI6MjA3OTcxNTg5NH0.rbEwcpORmwo8d-cUxQGr8dOLjQothY3xZcE0GplmNuQ"
 ```
Acesse
```bash
http://localhost:3000
```

);









