# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
> - [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

## Modelagem da situação atual (Modelagem AS IS)

Atualmente, o processo de controle das caçambas e dos resíduos é realizado de forma manual e descentralizada pela empresa. As informações são registradas em planilhas eletrônicas ou formulários físicos, o que dificulta a padronização dos dados, a rastreabilidade das ações e a eficiência na gestão. O monitoramento da localização das caçambas, seu status (disponível, em uso, em manutenção) e os dados sobre os resíduos descartados dependem da comunicação direta entre funcionários, o que está sujeito a falhas humanas e atrasos.

Além disso, não há um histórico centralizado das alterações realizadas nas caçambas, tampouco relatórios automatizados que auxiliem na tomada de decisões estratégicas. A falta de integração entre os processos e a inexistência de uma interface unificada dificultam o controle operacional, comprometem a produtividade e aumentam os riscos de não conformidade com normas ambientais.

## Descrição geral da proposta (Modelagem TO BE)

Com a implementação do sistema EcoDump, os processos serão digitalizados e centralizados em uma plataforma web intuitiva, segura e acessível apenas por usuários autenticados. Todas as operações relacionadas ao ciclo de vida das caçambas — como cadastro, edição, acompanhamento de status, anexação de documentos, exclusão e geração de relatórios — poderão ser realizadas diretamente no sistema, com validação de dados e registro automático de alterações. Além disso, o controle de permissões por perfil de usuário (administrador ou funcionário) garantirá a segurança e o controle de acesso às funcionalidades sensíveis.

Essa transformação proporcionará maior agilidade, transparência e confiabilidade à gestão de caçambas e resíduos, permitindo que a empresa atue com mais eficiência, reduza erros e adote práticas mais sustentáveis e tecnológicas.
## Modelagem dos processos

[PROCESSO 1 - Nome do processo](./processes/processo-1-nome-do-processo.md "Detalhamento do processo 1.")

[PROCESSO 2 - Nome do processo](./processes/processo-2-nome-do-processo.md "Detalhamento do processo 2.")


## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Percentual de reclamações | Avaliar quantitativamente as reclamações | Percentual de reclamações em relação ao total de atendimentos | Tabela Reclamações | número total de reclamações / número total de atendimentos |
| Taxa de requisições atendidas | Melhorar a prestação de serviços medindo a porcentagem de requisições atendidas| Mede a % de requisições atendidas na semana | Tabela Solicitações | (número de requisições atendidas / número total de requisições) * 100 |
| Taxa de entrega de material | Manter controle sobre os materiais que estão sendo entregues | Mede % de material entregue dentro do mês | Tabela Pedidos | (número de pedidos entregues / número total de pedidos) * 100 |
| Média de tempo de atendimento | Reduzir o tempo médio de atendimento ao usuário | Tempo médio gasto do início ao fim de cada atendimento | Tabela Solicitacoes | soma do tempo de atendimento / número total de atendimentos |
| Taxa de usuários ativos | Avaliar o engajamento dos usuários no sistema | Percentual de usuários que acessaram o sistema no mês | Tabela Usuarios | (número de usuários ativos / número total de usuários) * 100 |



