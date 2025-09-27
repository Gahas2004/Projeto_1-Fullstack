# 🚀 NASA Mars Rover Photos Explorer

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-5.14.0-007FFF)](https://mui.com/)
[![NASA API](https://img.shields.io/badge/NASA-API-0B3D91)](https://api.nasa.gov/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF)](https://vitejs.dev/)

Uma aplicação web moderna que permite explorar fotos incríveis capturadas pelos rovers da NASA em Marte. Desenvolvida como projeto acadêmico para a disciplina de Programação Web Fullstack.

![Demo](https://img.shields.io/badge/Demo-Live%20Preview-green)


## ✨ Funcionalidades

### 🎨 Interface Moderna
- **Design Responsivo** - Totalmente adaptável para desktop e mobile
- **Material Design** - Interface seguindo as diretrizes do Google Material Design
- **Tema Customizável** - Cores e tipografia personalizadas

### 🔍 Sistema de Busca Avançado
- **Filtro por Rover** - Curiosity, Opportunity, Spirit e Perseverance
- **Busca por Sol Marciano** - Dias desde o pouso em Marte
- **Busca por Data Terrestre** - Data específica no formato NASA
- **Filtro por Câmera** - Câmeras científicas específicas de cada rover

### 📱 Experiência do Usuário
- **SPA (Single Page Application)** - Navegação fluida sem recarregamentos
- **Loading States** - Feedback visual durante carregamentos
- **Tratamento de Erros** - Mensagens claras para o usuário
- **Scroll Infinito** - Carregamento incremental de fotos

### 🎓 Educacional
- **Tela de Boas-Vindas** - Informações sobre a API e missões NASA
- **Dados dos Rovers** - Status, datas de lançamento e pouso
- **Especificações das Câmeras** - Funções e disponibilidade por rover

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React.js 18** - Biblioteca principal para construção da UI
- **Vite** - Build tool e dev server de alta performance
- **Material UI (MUI) 5** - Biblioteca de componentes React
- **Axios** - Cliente HTTP para consumo de APIs

### Gerenciamento de Estado
- **useReducer Hook** - Para estado complexo da aplicação
- **Context API** - Compartilhamento de estado global
- **Custom Hooks** - Lógica reutilizável

### Desenvolvimento
- **JavaScript ES6+** - Modern JavaScript features
- **CSS3** - Estilos customizados e responsivos
- **Git** - Controle de versão

### API Externa
- **NASA Mars Rover Photos API** - Dados em tempo real das missões em Marte

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn
- API key da NASA (gratuita)

### 📥 Instalação

1. **Clone o repositório**
```bash
git clone  https://github.com/Gahas2004/Projeto_1-Fullstack.git
cd mars-rover-gallery
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure a API key da NASA**

 - Edite o arquivo .env com sua API key (Obtenha uma API key gratuita em: https://api.nasa.gov/)

4. **Execute em modo desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**
```
http://localhost:3000
```
## 📁 Estrutura do Projeto

```
src/
├── components/              # Componentes React
│   ├── WelcomeScreen.jsx    # Tela de boas-vindas
│   ├── SearchFilters.jsx    # Componente de filtros
│   ├── PhotoGallery.jsx     # Galeria de fotos
│   ├── LoadingSpinner.jsx   # Componente de loading
│   └── ErrorMessage.jsx     # Tratamento de erros
├── contexts/               # Contexts do React
│   └── MarsRoverContext.jsx # Gerenciamento de estado
├── App.jsx                 # Componente principal
├── main.jsx                # Ponto de entrada
└── index.css               # Estilos globais
```

## 🎯 Critérios Atendidos

### ✅ Requisitos Obrigatórios

| Critério | Status | Implementação |
|----------|--------|---------------|
| **API JSON aberta** | ✅ | NASA Mars Rover Photos API |
| **Hook React (useReducer)** | ✅ | Gerenciamento de estado complexo |
| **Biblioteca externa (Material UI)** | ✅ | Componentes e design system |
| **SPA (Single Page Application)** | ✅ | React Router DOM |
| **Estrutura de pastas** | ✅ | Apenas components/ e contexts/ |
| **Busca com parâmetros** | ✅ | Filtros para API NASA |
| **Validação de campos** | ✅ | Sol OU Data obrigatório |
| **Mensagens de erro** | ✅ | Antes e depois do envio |
| **Componentes + Context API** | ✅ | Comunicação entre componentes |
| **Deployment** | ✅ | Build otimizado com Vite |

### ✅ Diferenciais Implementados

- **Design responsivo** 
- **Tratamento de estados** de loading e erro
- **Validação em tempo real** dos filtros
- **Interface educacional** com informações da NASA

## 🔧 Configuração de API

### Obtenção da API Key

1. Acesse [api.nasa.gov](https://api.nasa.gov/)
2. Preencha o formulário rápido
3. Receba sua API key gratuita por email
4. Adicione ao arquivo `.env`:

```env
VITE_NASA_API_KEY=sua_chave_aqui
```

### Limites da API
- **Rate limiting**: 1,000 requests por hora
- **Dados**: Fotos em tempo real dos rovers
- **Formato**: JSON com URLs de imagens HD

## 👥 Desenvolvimento

### Equipe
- Desenvolvido por: Gabriel Henrique de Almeida Souza e Gustavo Prezoto Boca
- Disciplina: ES47B-ES71 - Programação Web Fullstack
- Professor: William Massami Watanabe
- Universidade: UTFPR - Campus Cornélio Procópio

### Padrões de Código
- **Componentes funcionais** com hooks
- **Nomenclatura consistente** em inglês
- **Separação de concerns** clara
- **Comentários** explicativos
