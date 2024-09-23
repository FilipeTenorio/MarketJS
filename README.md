# Marketplace Node.js API

# Visão Geral
### Esta API Node.js permite a gestão de clientes, compras, produtos e usuários para um marketplace online. A seguir, estão detalhadas as funcionalidades e endpoints disponíveis:


# Clientes
### GET /api/clientes: Obtém uma lista de todos os clientes cadastrados.
### GET /api/:id/recomendados: Obtém a lista de produtos recomendados para um cliente com base no ID fornecido.
### PUT /api/cliente/:id: Atualiza as informações de um cliente com base no ID fornecido.
### DELETE /api/cliente/:id: Deleta um cliente com base no ID fornecido.


# Funcionários
### GET /api/funcionarios: Obtém uma lista de todos os funcionários cadastrados.
### DELETE /api/funcionario/:id: Deleta um funcionário com base no ID fornecido.
### PUT /api/funcionario/:id: Atualiza as informações de um funcionário com base no ID fornecido.


# Compras
### POST /api/compras: Realiza uma nova compra.


# Produtos
### GET /api/produtos: Obtém uma lista de todos os produtos disponíveis.
### PUT /api/produtos/:id: Atualiza as informações de um produto com base no ID fornecido.
### POST /api/produtos: Cria um novo produto.
### DELETE /api/produtos/:id1/:id2: Deleta um produto com base no ID fornecido. O ID1 é o ID do funcionário que realiza a operação e o ID2 é o ID do produto a ser deletado.


# Usuários
### POST /api/login: Permite que um usuário faça login na plataforma.
### POST /api/register: Permite que um usuário crie uma nova conta na plataforma. Os parâmetros incluem login, senha, nome, email e o tipo de usuário para saber se é um cliente ou não.
