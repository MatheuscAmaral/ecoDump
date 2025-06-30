# EcoDump

`CURSO: Sistemas de Informação`

`DISCIPLINA: Trabalho Interdisciplinar Aplicações para Sustentabilidade`

`1º semestre/2025`

Eco dump é um sistema para o gerenciamento eficiente de caçambas e o controle dos resíduos descartados. Esse sistema terá como principal objetivo otimizar a gestão da coleta, transporte e destinação de resíduos, assegurando maior controle sobre a utilização das caçambas e promovendo a conformidade com as normas ambientais.

## Integrantes

* Arthur Braga Ribeiro
* Catarina Duarte Santos
* Gabriel Henrique de Jesus Paiva
* Guilherme Souto Borges da Costa
* Matheus Campos do Amaral
* Raul Eleutério Aleixo

## Professora

Maria Inês Lage de Paula

## Instruções de utilização


1. Instale o pnpm
   ```bash
   npm install -g pnpm@latest-10
   ```

2. Instale as dependencias:
   ```bash
   pnpm install
   ``` 

3. Gere o schema do Prisma:
   ```bash
   pnpm run prisma:generate
   ```

4. Inicie o servirdor da API e do frontend:
   ```bash
   cd src/api
   pnpm run dev

   cd src/web
   pnpm run dev
   ```

Não esqueça de colocar as credenciais no arquivo .env

## Live project

Disponível em: https://ecodump-p80hfydri-bravos-sports.vercel.app

Usuário para teste: admin

Senha para teste: admin

# Documentação

<ol>
<li><a href="docs/01-Contexto.md"> Documentação de contexto</a></li>
<li><a href="docs/02-Especificacao.md"> Especificação do projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Modelagem-processos-negocio.md"> Modelagem dos processos de negócios</a></li>
<li><a href="docs/05-Projeto-interface.md"> Projeto de interface</a></li>
<li><a href="docs/06-Template-padrao.md"> Template padrão da aplicação</a></li>
<li><a href="docs/07-Arquitetura-solucao.md"> Arquitetura da solução</a></li>
<li><a href="docs/08-Plano-testes-software.md"> Plano de testes de software</a></li>
<li><a href="docs/09-Registro-testes-software.md"> Registro de testes de software</a></li>
<li><a href="docs/10-Plano-testes-usabilidade.md"> Plano de testes de usabilidade</a></li>
<li><a href="docs/11-Registro-testes-usabilidade.md"> Registro de testes de usabilidade</a></li>
<li><a href="docs/12-Conclusao.md"> Conclusão</a></li>
<li><a href="docs/13-Referencias.md"> Referências</a></li>
</ol>

# Código

* <a href="src/README.md">Código</a>

# Apresentação

* <a href="presentation/README.md">Apresentação do projeto</a>