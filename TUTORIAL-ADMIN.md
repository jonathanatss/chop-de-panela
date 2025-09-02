🔐 Guia de Gerenciamento de Administradores
Este guia explica como criar, alterar a senha e remover usuários administradores do seu site usando scripts de linha de comando. Esta é a maneira mais segura de gerenciar o acesso.

IMPORTANTE: Todos os comandos devem ser executados no terminal, dentro da pasta backend do seu projeto.

1. Como Alterar a Senha de um Admin
Use este comando para redefinir a senha de um usuário existente, como o admin@chadepanela.com inicial.

Comando:

npm run user:password -- <email_do_usuario> <nova_senha>

Exemplo Prático:

npm run user:password -- admin@chadepanela.com MinhaNovaSenhaSuperForte123

Nota: O -- é importante! Ele garante que seus dados (email e senha) sejam passados para o script e não para o npm.

2. Como Criar um Novo Admin
Use este comando para adicionar um novo administrador ao sistema.

Comando:

npm run user:create -- "Nome Completo" <email_do_novo_usuario> <senha_para_ele>

Exemplo Prático:

npm run user:create -- "Maria Silva" maria@chadepanela.com senhaDaMaria456

Nota: Se o nome tiver espaços, coloque-o entre aspas.

3. Como Remover um Admin
Use este comando para deletar permanentemente um usuário administrador.

Comando:

npm run user:delete -- <email_do_usuario_a_remover>

Exemplo Prático:

npm run user:delete -- admin@chadepanela.com

Ações Recomendadas Agora
Altere a senha do admin padrão: Use o primeiro comando para mudar a senha do admin@chadepanela.com.

Crie seu próprio usuário: Use o segundo comando para criar um usuário com seu nome e email.

Delete o usuário padrão (Opcional): Depois de criar o seu, você pode deletar o admin@chadepanela.com para maior segurança.