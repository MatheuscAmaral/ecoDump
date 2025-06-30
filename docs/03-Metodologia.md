
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A equipe adotou uma metodologia de trabalho colaborativa baseada em reuniões semanais nas aulas para planejamento e revisão das tarefas. Inicialmente, o problema foi discutido em grupo e dividido em partes menores, atribuídas a diferentes membros da equipe de acordo com suas habilidades.

Para o desenvolvimento, utilizamos o GitHub como ambiente principal para controle de versão e centralização do código-fonte. A estrutura do repositório foi organizada com uma branch principal (main) e branches auxiliares para o desenvolvimento de funcionalidades específicas. Os commits seguiram uma padronização de mensagens para facilitar o entendimento do histórico de alterações.

Como ambientes de desenvolvimento, utilizamos o Visual Studio Code. A comunicação da equipe foi feita principalmente via WhatsApp e Discord, e a organização das tarefas foi realizada em um consenso dos membros do grupo, onde registramos o progresso e as pendências.

Esse conjunto de ferramentas e processos possibilitou uma boa organização da equipe e um acompanhamento contínuo da evolução do projeto.


## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

A configuração do repositório foi feita inicialmente por um dos membros do grupo diretamente no GitHub, com a criação da estrutura de branches definida previamente (main, unstable, testing, dev). Cada membro realizou o clone do repositório em sua máquina local e passou a contribuir com o projeto por meio de branches específicas.

Para garantir organização, cada nova funcionalidade ou correção foi desenvolvida em uma branch separada, seguindo a convenção feature/nome-da-funcionalidade ou fix/nome-do-bug. Após o desenvolvimento, eram abertas pull requests direcionadas à branch dev, que passava por testes antes de ser mesclada às branches superiores (testing, unstable, main).

Os commits seguiram uma padronização com prefixos como feat:, fix:, doc: e refactor:, o que facilitou a leitura do histórico de mudanças. Todos os merges foram feitos preferencialmente via pull requests, com pelo menos uma revisão de outro membro do grupo antes da integração.

O gerenciamento de tags foi utilizado para marcar versões específicas do projeto, como v1.0 para a primeira entrega funcional. Isso permitiu um rastreio rápido das versões entregues e estáveis do sistema.

As issues foram amplamente utilizadas para gerenciar tarefas e bugs. Cada issue era atribuída a um membro responsável, com etiquetas como feature, bug, documentation, ou enhancement, conforme a natureza da tarefa. Isso ajudou a manter uma boa organização do fluxo de trabalho e a visibilidade do progresso do grupo.

> **Links úteis**:
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e GitHub](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
> - [Comparando fluxos de trabalho](https://www.atlassian.com/br/git/tutorials/comparing-workflows)
> - [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
> - [The gitflow workflow - in less than 5 mins](https://www.youtube.com/watch?v=1SXpE08hvGs)

## Planejamento do projeto

###  Divisão de papéis

> Apresente a divisão de papéis entre os membros do grupo em cada Sprint. O desejável é que, em cada Sprint, o aluno assuma papéis diferentes na equipe. Siga o modelo do exemplo abaixo:

#### Sprint 1
- _Scrum master_: Guilherme
- Protótipos: Catarina, Matheus
- Testes: Gabriel
- Documentação: Arthur
- Documentação: Raul
- 
#### Sprint 2
- _Scrum master_: Guilherme
- Desenvolvedor _front-end_: Catarina
- Desenvolvedor _back-end_: Matheus
 - Testes: Gabriel
- Documentação: Arthur Braga
- Documentação: Raul 

###  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

#### Sprint 1

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Gabriel        | Introdução | 01/02/2025     | 07/02/2024 | ✔️    | 09/03/2025      |
| Arthur        | Objetivos    | 03/02/2025     | 10/02/2024 | ✔️    |   12/03/2025               |
| Catarina        | Histórias de usuário  | 01/01/2025     | 07/01/2025 | ✔️     |    13/03/2025              |
| Matheus        | Personas 1  |    01/01/2025        | 12/02/2025 | ✔️    |   05/03/2025     |
| Raul        | Documenta~çao |    01/01/2025        | 12/02/2025 |✔️    |  05/03/2025      |
| Guilherme        | Personas 1  |    01/01/2025        | 12/02/2025 | ✔️    |    05/03/2025    |

#### Sprint 2

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Gabriel        | Página inicial   | 01/02/2025     | 07/03/2025 | ✔️  |  19/03/2025      |
| Arthur       | CSS unificado    | 03/02/2025     | 10/03/2025 | ✔️   |      19/03/2025           |
| Raul        | Página de login  | 01/02/2025    | 07/03/2025 | ✔️     |      19/03/2025           |
| Guilherme        | Script de login  |  01/01/2025    | 12/03/2024 | ✔️    |   17/03/2025    |
| Catarina     | Personas 1  |    01/01/2025       | 12/02/2025 | ✔️    |20/03/2025       |
| Matheus | Personas 1  |    01/01/2025        | 12/02/2025 | ✔️    |   19/03/2025    |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado


> **Links úteis**:
> - [11 passos essenciais para implantar Scrum no seu projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
> - [Os papéis do Scrum e a verdade sobre cargos nessa técnica](https://www.atlassian.com/br/agile/scrum/roles)

### Processo

Coloque informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo deverá fazer uso do recurso de gerenciamento de projeto oferecido pelo GitHub, que permite acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
 
> **Links úteis**:
> - [Planejamento e gestão ágil de projetos](https://pucminas.instructure.com/courses/87878/pages/unidade-2-tema-2-utilizacao-de-ferramentas-para-controle-de-versoes-de-software)
> - [Sobre quadros de projeto](https://docs.github.com/pt/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Como criar backlogs no GitHub](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial slack](https://slack.com/intl/en-br/)


## Relação de ambientes de trabalho

O grupo adotou a metodologia ágil Scrum para organizar o trabalho, utilizando o recurso GitHub Projects no formato Kanban. As tarefas foram divididas em sprints semanais e registradas como issues, com etiquetas (bug, feature, enhancement, etc.) e responsáveis definidos.

O quadro foi estruturado com as colunas To Do, In Progress, In Review e Done, permitindo acompanhar o andamento do projeto. A comunicação do grupo ocorreu por WhatsApp e Discord, com alinhamentos frequentes.

Cada tarefa foi desenvolvida em uma branch específica e integrada via pull request, com revisão entre os membros antes do merge. Essa abordagem garantiu organização, rastreabilidade e colaboração eficaz durante o desenvolvimento.


### Ferramentas

Liste todas as ferramentas que foram empregadas no projeto, justificando a escolha delas, sempre que possível.

Exemplo: os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito é apresentada na tabela que se segue.

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | http://....                            |
| Documentos do projeto               | GitHub                             | http://....                            |
| Projeto de interface                | Figma                              | http://....                            |
| Gerenciamento do projeto            | GitHub Projects                    | http://....                            |
| Hospedagem                          | Vercel                             | http://....                            |
 
