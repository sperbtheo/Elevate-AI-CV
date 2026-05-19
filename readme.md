```md
# Elevate AI-CV

Crie e aprimore seu currículo profissional com análise de IA. A interface oferece três fluxos principais: **Criar Currículo**, **Analisar Currículo** e **Visualizar** [2].

---

## Visão geral

- **Frontend (Web)**: criação manual do currículo, análise via upload de PDF e visualização/exportação em templates [2][5].
- **Backend (Node.js + Express)**: API para extração estruturada e sugestões geradas por IA [6].

---

## Stack

- Node.js + Express [3][6]
- `cors`, `dotenv`, `express`, `groq-sdk` (e `openai` presente como dependência) [3]
- ES Modules (`"type": "module"`) [3]

---

## Funcionalidades

- Preenchimento manual de currículo com persistência no navegador (via `localStorage`) [5]
- Upload de PDF, extração de texto no frontend e envio para análise no backend [5]
- Sugestões de melhoria com “antes/depois” e aplicação via `patch` no frontend [5][6]
- Visualização em templates e exportação/compartilhamento em PDF (quando suportado) [5]

---

## Como rodar (local)

### 1) Pré-requisitos
- Node.js (recomendado Node 18+ por dependências com `engines: >= 18`) [4]

### 2) Instalação
```bash
npm install
```

### 3) Variáveis de ambiente (arquivo `.env`)
Crie um arquivo `.env` na raiz do projeto com:

```env
GROQ_API_KEY=SUA_CHAVE_AQUI
```

O backend lê essa variável para configurar o client do Groq [6].

> Segurança: não faça commit do `.env`. Há uma chave exposta no contexto do projeto; o recomendado é **revogar/rotacionar** essa chave e removê-la do histórico do Git [1].

### 4) Executar o servidor
```bash
npm start
```

O script `start` executa `node server.js` [3].  
O servidor inicia na porta **3000** [6].

---

## Endpoints da API

### `POST /analyze-cv`
Extrai informações do currículo a partir de texto.

**Body**
```json
{ "text": "conteúdo do currículo em texto" }
```

**Resposta (formato)**
```json
{
  "info": {
    "nome": "",
    "email": "",
    "telefone": "",
    "localizacao": "",
    "resumo": ""
  },
  "experiencias": [
    { "cargo": "", "empresa": "", "periodo": "", "descricao": "" }
  ],
  "formacoes": [
    { "curso": "", "instituicao": "", "periodo": "" }
  ],
  "habilidades": [
    { "habilidade": "", "nivel": "Básico" }
  ]
}
```

O endpoint utiliza o modelo `llama-3.3-70b-versatile` [6].

---

### `POST /suggest-cv`
Retorna sugestões (máximo 8) para melhorar o currículo.

**Body**
```json
{ "curriculo": { "...": "objeto do currículo" } }
```

**Resposta (formato)**
```json
{
  "suggestions": [
    {
      "id": "string",
      "title": "string",
      "reason": "string",
      "preview": { "before": "", "after": "" },
      "patch": [
        { "op": "set", "path": "info.resumo", "value": "" }
      ]
    }
  ]
}
```

O endpoint valida se `curriculo` está presente e retorna erro quando ausente [6].  
O modelo configurado no endpoint é `gpt-4.1-mini` [6].

---

## Frontend → Backend (URLs usadas)

O frontend faz requisições para:
- `http://localhost:3000/analyze-cv` [5]
- `http://localhost:3000/suggest-cv` [5]

---

## Scripts

- `npm start` — inicia o servidor (`node server.js`) [3]

---

## Licença

O projeto indica licença **ISC** [3].
```
