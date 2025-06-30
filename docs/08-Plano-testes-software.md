# Plano de testes de software

#### **Caso de Teste 01 – Registrar nova caçamba**

| **Caso de teste**       | CT-001 – Registrar nova caçamba                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito associado** | RF-001 - Permite o registro de uma nova caçamba no sistema com dados como localização, capacidade, data de instalação e status.                                                                  |
| **Objetivo do teste**   | Verificar se o usuário autenticado consegue registrar uma nova caçamba.                                                                                                                          |
| **Passos**              | 1. Acessar o sistema com login válido <br> 2. Navegar até a tela "Cadastrar Caçamba" <br> 3. Preencher os campos obrigatórios (localização, capacidade, data, status) <br> 4. Clicar em “Salvar” |
| **Critério de êxito**   | A nova caçamba é cadastrada e exibida na lista de caçambas.                                                                                                                                      |

---

#### **Caso de Teste 02 – Editar dados da caçamba**

| **Caso de teste**       | CT-002 – Editar dados da caçamba                                                                                                                                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-002 - Permite alteração de dados de uma caçamba registrada.                                                                                                                                                                   |
| **Objetivo do teste**   | Verificar se um usuário autenticado pode editar uma caçamba existente.                                                                                                                                                           |
| **Passos**              | 1. Acessar a aplicação como usuário autenticado <br> 2. Navegar até a lista de caçambas <br> 3. Clicar em “Editar” na caçamba desejada <br> 4. Alterar os campos (ex: status e capacidade) <br> 5. Clicar em “Salvar alterações” |
| **Critério de êxito**   | As alterações são salvas e refletidas corretamente na interface.                                                                                                                                                                 |

---

#### **Caso de Teste 03 – Excluir caçamba inativa**

| **Caso de teste**       | CT-003 – Excluir caçamba não utilizada                                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-005 - Permite exclusão de caçambas não utilizadas.                                                                                                                     |
| **Objetivo do teste**   | Verificar se um administrador pode excluir uma caçamba que não está em uso.                                                                                               |
| **Passos**              | 1. Login como administrador <br> 2. Acessar a lista de caçambas <br> 3. Identificar caçamba com status “inativa” <br> 4. Clicar em “Excluir” <br> 5. Confirmar a exclusão |
| **Critério de êxito**   | A caçamba desaparece da lista e o registro é removido do sistema.                                                                                                         |

---

#### **Caso de Teste 04 – Visualizar lista de caçambas**

| **Caso de teste**       | CT-004 – Listar caçambas cadastradas                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito associado** | RF-003 - Exibe lista de caçambas cadastradas com suas informações.                                                                                                       |
| **Objetivo do teste**   | Verificar se o usuário autenticado pode visualizar a lista de todas as caçambas cadastradas.                                                                             |
| **Passos**              | 1. Acessar o sistema como usuário autenticado <br> 2. Ir até a seção “Lista de caçambas” <br> 3. Observar a apresentação dos dados: ID, localização, capacidade e status |
| **Critério de êxito**   | A lista é exibida corretamente com todos os campos preenchidos.                                                                                                          |

---

#### **Caso de Teste 05 – Buscar caçambas com filtros**

| **Caso de teste**       | CT-005 – Pesquisar caçambas por filtros                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito associado** | RF-004 - Permite busca com filtros como localização, capacidade e status.                                                                                          |
| **Objetivo do teste**   | Verificar se os filtros funcionam corretamente na busca por caçambas.                                                                                              |
| **Passos**              | 1. Login no sistema <br> 2. Acessar a funcionalidade de busca <br> 3. Selecionar filtros (ex: localização = “Centro”, status = “Ativa”) <br> 4. Clicar em “Buscar” |
| **Critério de êxito**   | A busca retorna apenas caçambas que atendem aos critérios escolhidos.                                                                                              |

---

#### **Caso de Teste 06 – Visualizar caçambas em mapa**

| **Caso de teste**       | CT-006 – Visualização no mapa interativo                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-008 - Exibe localização das caçambas em um mapa interativo.                                                            |
| **Objetivo do teste**   | Verificar se o mapa mostra corretamente a localização das caçambas cadastradas.                                           |
| **Passos**              | 1. Login no sistema <br> 2. Navegar até a seção “Mapa” <br> 3. Verificar se os marcadores estão corretamente posicionados |
| **Critério de êxito**   | Cada caçamba aparece no mapa na localização cadastrada.                                                                   |

---

#### **Caso de Teste 07 – Histórico de alterações**

| **Caso de teste**       | CT-007 – Acessar histórico de alterações                                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-006 - Mantém registro de alterações feitas nas caçambas.                                                                               |
| **Objetivo do teste**   | Verificar se o sistema registra e exibe corretamente o histórico de modificações.                                                         |
| **Passos**              | 1. Login como administrador <br> 2. Acessar uma caçamba que teve alterações <br> 3. Verificar o histórico (usuário, campo alterado, data) |
| **Critério de êxito**   | O histórico está completo, com todas as informações exigidas.                                                                             |

---

### 👥 Grupo de usuários envolvidos

* **Usuários autenticados**: testar os fluxos de registro, edição, visualização e busca de caçambas.
* **Administradores**: validar funcionalidades exclusivas como exclusão, notificações, histórico e relatórios.
