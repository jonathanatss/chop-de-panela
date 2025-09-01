# 📥 Tutorial: Como Baixar e Executar Localmente

## 🎯 **Objetivo**
Este tutorial te ensina como baixar o projeto do Bolt e executar no seu computador para ter controle total sobre o site do seu chá de panela.

## 📋 **Pré-requisitos**

### **1. Instalar Node.js**
- Acesse: https://nodejs.org
- Baixe a versão **LTS** (recomendada)
- Instale seguindo o assistente
- **Teste no terminal:**
  ```bash
  node --version
  npm --version
  ```

### **2. Editor de Código (Opcional)**
- **VS Code** (recomendado): https://code.visualstudio.com
- Ou qualquer editor de sua preferência

## 📥 **Passo a Passo: Download e Execução**

### **Passo 1: Baixar o Projeto**
1. No Bolt, clique no botão **"Download"** (canto superior direito)
2. Salve o arquivo ZIP em uma pasta fácil de encontrar
3. **Extraia** o arquivo ZIP
4. **Renomeie** a pasta para algo como `meu-cha-de-panela`

### **Passo 2: Abrir o Terminal**

#### **No Windows:**
- Abra a pasta do projeto
- Segure **Shift + Clique direito** na pasta
- Escolha **"Abrir janela do PowerShell aqui"**

#### **No Mac:**
- Abra o **Terminal**
- Digite: `cd ` (com espaço no final)
- **Arraste** a pasta do projeto para o terminal
- Pressione **Enter**

#### **No Linux:**
- Clique direito na pasta
- Escolha **"Abrir no Terminal"**

### **Passo 3: Instalar Dependências**
```bash
npm install
```
⏳ *Aguarde alguns minutos para baixar todas as dependências*

### **Passo 4: Executar o Projeto**
```bash
npm run dev
```

### **Passo 5: Acessar o Site**
- Abra seu navegador
- Vá para: `http://localhost:5173`
- 🎉 **Pronto! Seu site está rodando localmente**

## 🔐 **Acessar Área Administrativa**

1. No site, clique em **"Admin"** no header
2. **Login:**
   - **Email:** `admin@chadepanela.com`
   - **Senha:** `admin123`
3. Acesse todas as funcionalidades administrativas

## ✏️ **Personalizar Seu Site**

### **1. Alterar Nome do Casal**
- **Painel Admin → Configurações → Informações do Evento**
- Campo: **"Nomes dos Noivos"**
- Exemplo: `Maria & João`

### **2. Trocar Foto de Background**
- **Painel Admin → Configurações → Aparência**
- Campo: **"Imagem de Fundo Principal"**
- Cole a URL da sua foto romântica
- **Veja o preview** em tempo real

### **3. Configurar PIX**
- **Painel Admin → Configurações → Configurações PIX**
- Configure sua chave PIX e nome

### **4. Adicionar Seus Itens**
- **Painel Admin → Gerenciar Lista**
- Clique **"Adicionar Item"**
- Preencha: nome, descrição, preço, categoria

## 🌐 **Onde Conseguir URLs de Imagens**

### **Para Foto do Casal:**
- **Google Fotos:** Faça upload → Compartilhar → Copiar link
- **Imgur:** https://imgur.com (gratuito)
- **Cloudinary:** https://cloudinary.com (gratuito)

### **Para Itens da Lista:**
- **Pexels:** https://pexels.com (fotos gratuitas)
- **Unsplash:** https://unsplash.com (fotos gratuitas)
- **Lojas online:** Copie URL das imagens dos produtos

## 🔄 **Comandos Úteis**

```bash
# Parar o servidor
Ctrl + C (no terminal)

# Executar novamente
npm run dev

# Fazer build para produção
npm run build

# Limpar cache (se der problema)
npm cache clean --force
rm -rf node_modules
npm install
```

## 🚀 **Publicar na Internet**

### **Opção 1: Netlify (Gratuito)**
1. Faça build: `npm run build`
2. Acesse: https://netlify.com
3. Arraste a pasta `dist` para o Netlify
4. 🎉 Site online!

### **Opção 2: Vercel (Gratuito)**
1. Acesse: https://vercel.com
2. Conecte seu GitHub
3. Faça upload do projeto
4. 🎉 Site online!

## ❓ **Problemas Comuns**

### **"npm não é reconhecido"**
- **Solução:** Instale o Node.js corretamente
- Reinicie o terminal após a instalação

### **"Porta 5173 em uso"**
- **Solução:** O Vite escolherá outra porta automaticamente
- Verifique a mensagem no terminal

### **"Erro ao carregar imagem"**
- **Solução:** Verifique se a URL da imagem está correta
- Teste a URL no navegador primeiro

### **Site não atualiza**
- **Solução:** Pressione `Ctrl + F5` para atualizar forçadamente
- Ou limpe o cache do navegador

## 💡 **Dicas Importantes**

1. **Sempre execute `npm run dev`** para ver mudanças em tempo real
2. **Salve suas alterações** no painel admin regularmente
3. **Teste em diferentes dispositivos** (celular, tablet, desktop)
4. **Faça backup** da pasta do projeto regularmente
5. **Personalize** todas as configurações antes de compartilhar com convidados

## 🎊 **Pronto para Usar!**

Agora você tem total controle sobre seu site de chá de panela:
- ✅ Execução local no seu computador
- ✅ Personalização completa via painel admin
- ✅ Dados salvos localmente
- ✅ Pronto para publicar na internet

**Divirta-se personalizando seu chá de panela! 💕**