# 🎉 Site de Chá de Panela com Painel Administrativo

Um site completo e elegante para chá de panela com área administrativa integrada, desenvolvido com React, TypeScript e Tailwind CSS.

## ✨ Funcionalidades

### 🌐 **Site Público**
- **Hero Section** elegante com informações do evento
- **Lista de Desejos** interativa com sistema de presentes
- **Seção "Nossa História"** personalizável
- **Formulário de Contato** com mensagens
- **Sistema PIX** integrado para contribuições
- **Design responsivo** e moderno

### 🔐 **Painel Administrativo**
- **Dashboard** com estatísticas em tempo real
- **Gerenciador da Lista de Desejos** (adicionar/editar/remover itens)
- **Gerenciador de Mensagens** dos convidados
- **Configurações Completas** (nomes, datas, PIX, foto de fundo)
- **Sistema de Login** seguro

## 🚀 Como Executar Localmente

### **Pré-requisitos**
- Node.js (versão 18 ou superior)
- npm ou yarn
- Git (opcional)

### **Passo 1: Baixar o Projeto**

#### **Opção A: Download Direto**
1. Clique no botão **"Download"** no canto superior direito do Bolt
2. Extraia o arquivo ZIP em uma pasta de sua escolha
3. Abra o terminal/prompt de comando na pasta extraída

#### **Opção B: Via Git (se disponível)**
```bash
git clone [[URL_DO_REPOSITORIO]](https://github.com/jonathanatss/chop-de-panela.git)
cd cha-de-panela
```

### **Passo 2: Instalar Dependências**
```bash
npm install
```

### **Passo 3: Executar o Projeto**
```bash
npm run dev
```

### **Passo 4: Acessar o Site**
- Abra seu navegador em: `http://localhost:5173`
- O site será carregado automaticamente

## 🔑 **Acesso Administrativo**

### **Dados de Login:**
- **Email:** `admin@chadepanela.com`
- **Senha:** `admin123`

### **Como Acessar:**
1. No site público, clique em **"Admin"** no header
2. Faça login com os dados acima
3. Acesse todas as funcionalidades administrativas

## ⚙️ **Personalização**

### **1. Alterar Informações do Casal**
- Acesse: **Painel Admin → Configurações → Informações do Evento**
- Altere: Nomes, data, horário, local

### **2. Trocar Foto de Fundo**
- Acesse: **Painel Admin → Configurações → Aparência**
- Cole a URL da sua foto romântica
- Veja o preview em tempo real

### **3. Configurar PIX**
- Acesse: **Painel Admin → Configurações → Configurações PIX**
- Configure: Chave PIX e nome do beneficiário

### **4. Gerenciar Lista de Desejos**
- Acesse: **Painel Admin → Gerenciar Lista**
- Adicione seus próprios itens com fotos e preços

## 📱 **Comandos Disponíveis**

```bash
# Executar em modo desenvolvimento
npm run dev

# Fazer build para produção
npm run build

# Visualizar build de produção
npm run preview

# Executar linter
npm run lint
```

## 🛠️ **Tecnologias Utilizadas**

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Vite** - Build tool e dev server
- **Lucide React** - Ícones modernos

## 📂 **Estrutura do Projeto**

```
src/
├── components/
│   ├── Admin/           # Componentes do painel administrativo
│   │   ├── Dashboard.tsx
│   │   ├── LoginForm.tsx
│   │   ├── WishlistManager.tsx
│   │   ├── MessagesManager.tsx
│   │   └── SettingsManager.tsx
│   ├── Layout/          # Componentes de layout
│   │   └── Header.tsx
│   └── Public/          # Componentes do site público
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Wishlist.tsx
│       └── Contact.tsx
├── data/
│   └── mockData.ts      # Dados iniciais
├── hooks/
│   └── useAuth.tsx      # Hook de autenticação
├── types/
│   └── index.ts         # Definições de tipos
└── App.tsx              # Componente principal
```

## 💾 **Armazenamento de Dados**

O projeto usa **localStorage** para persistir dados:
- Lista de desejos
- Mensagens dos convidados
- Configurações do evento
- Estado de login

## 🎨 **Personalização Avançada**

### **Cores do Site**
Para alterar as cores principais, edite o arquivo `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Suas cores personalizadas
      primary: '#your-color',
      secondary: '#your-color'
    }
  }
}
```

### **Adicionar Novas Categorias**
No arquivo `src/components/Admin/WishlistManager.tsx`, adicione novas opções no select de categorias.

## 🚀 **Deploy para Produção**

### **Opção 1: Netlify**
1. Faça build: `npm run build`
2. Faça upload da pasta `dist` no Netlify

### **Opção 2: Vercel**
1. Conecte seu repositório no Vercel
2. Configure o comando de build: `npm run build`
3. Configure a pasta de output: `dist`

## 🆘 **Suporte**

Se encontrar algum problema:

1. **Verifique se o Node.js está instalado:** `node --version`
2. **Limpe o cache:** `npm cache clean --force`
3. **Reinstale dependências:** `rm -rf node_modules && npm install`
4. **Verifique a porta:** Se a porta 5173 estiver ocupada, o Vite usará outra automaticamente

## 📝 **Licença**

Este projeto é de uso livre para fins pessoais. Perfeito para casais que querem um chá de panela digital elegante e funcional! 💕

---

**Desenvolvido com ❤️ para celebrar o amor!**
