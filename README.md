🍺 Chopp de Panela - Um Brinde ao Amor e à Casa Nova!
Bem-vindo ao projeto do site de Chá de Panela com temática de "Happy Hour Romântico"! Esta é uma aplicação full-stack completa que combina um site público elegante para os convidados com um painel administrativo robusto para os noivos.

O projeto foi construído com React, TypeScript, Node.js e Tailwind CSS, focando em uma experiência de usuário moderna e um gerenciamento simplificado.

✨ Funcionalidades
🌐 Site Público
Identidade Visual "Happy Hour Romântico": Design moderno com uma paleta de cores quentes e tipografia estilizada.

Hero Section Dinâmica: Exibe as informações do evento sobre uma imagem de fundo personalizável.

Lista de Presentes Interativa: Os convidados podem visualizar os itens e a barra de progresso de cada um.

Sistema de PIX Manual (Sem Custos): Exibe a Chave PIX dos noivos para contribuições diretas, sem taxas de intermediários.

Formulário de Mensagens: Permite que os convidados deixem recados carinhosos.

Totalmente Responsivo: O layout se adapta perfeitamente a desktops, tablets e celulares.

🔐 Painel Administrativo
Dashboard Completo: Visão geral com estatísticas chave: itens presenteados, valor arrecadado e mensagens não lidas.

Gerenciador da Lista de Desejos: Adicione, edite e remova itens da lista de forma intuitiva.

Registro Manual de Contribuições: Ferramenta para o administrador registrar os pagamentos recebidos via PIX, atualizando o site em tempo real.

Gerenciador de Mensagens: Visualize, marque como lidas e delete as mensagens dos convidados.

Configurações Gerais: Personalize facilmente nomes, data, local do evento, Chave PIX e a imagem de fundo do site.

🔒 Gerenciamento de Usuários (Via Linha de Comando)
Scripts seguros para criar novos administradores, alterar senhas e remover usuários, garantindo controle total sobre o acesso ao painel.

🚀 Como Executar Localmente
Pré-requisitos
Node.js (versão 18 ou superior)

npm (geralmente instalado com o Node.js)

MongoDB (pode ser uma instância local ou um cluster gratuito na nuvem como o MongoDB Atlas)

Passo 1: Configuração Inicial
Clone ou Baixe o Projeto:

git clone [https://github.com/jonathanatss/chop-de-panela.git](https://github.com/jonathanatss/chop-de-panela.git)
cd chop-de-panela

Instale as Dependências do Frontend:

npm install

Instale as Dependências do Backend:

cd backend
npm install

Passo 2: Configurar Variáveis de Ambiente
Navegue até a pasta backend.

Crie um arquivo chamado .env.

Copie e cole o conteúdo abaixo no arquivo, substituindo os valores de exemplo pelos seus:

# Conexão com o Banco de Dados (substitua pela sua string de conexão)
MONGO_URI=mongodb://localhost:27017/cha-de-panela

# Segredo para gerar os tokens de login (pode manter este)
JWT_SECRET=seuSegredoSuperSecretoParaToken

# --- Suas Configurações do PIX ---
PIX_KEY=SUA_CHAVE_PIX_AQUI
PIX_NAME=SEU NOME COMPLETO DO TITULAR DA CONTA
PIX_CITY=SUA CIDADE
BRIDE_NAMES=Noiva & Noivo

Passo 3: Popular o Banco de Dados (Primeira Vez)
Para ter dados iniciais (como o usuário admin), execute o script de "seed" no terminal, dentro da pasta backend:

npm run seed

Credenciais Iniciais:

Email: admin@chadepanela.com

Senha: admin123
Recomendação: Altere essa senha assim que o sistema estiver rodando! (Veja o TUTORIAL-ADMIN.md).

Passo 4: Executar a Aplicação
Você precisará de dois terminais abertos.

Terminal 1 (na pasta backend): Inicie o servidor.

npm start

Terminal 2 (na pasta raiz do projeto): Inicie o site.

npm run dev