<div align="center">

# KENNY TECH

**Portfólio pessoal · Desenvolvimento web · Soluções digitais**

Um espaço para apresentar meus projetos, minhas tecnologias e a forma como desenvolvo experiências digitais.

[GitHub](https://github.com/kennedyyp) · [Projeto Bloco 17](https://github.com/kennedyyp/projeto_loja_online_bloco17)

</div>

![Prévia da página inicial do Kenny Tech](assets/preview.png)

## Sobre o projeto

O **Kenny Tech** é meu portfólio de desenvolvimento. A proposta é reunir, em uma interface direta e com identidade própria, os serviços que ofereço, as tecnologias com que trabalho e alguns projetos que desenvolvi.

O design combina **preto, branco e vermelho**, tipografia de destaque, minha caricatura na página inicial e interações que acompanham a navegação.

## Funcionalidades

- **Página inicial personalizada**, com caricatura integrada ao próprio HTML.
- **Layout responsivo** para desktop, tablet e celular.
- **Animações vinculadas ao scroll**, com indicadores de progresso e transições entre seções.
- **Editor de código interativo**, que apresenta etapas de interface, back-end e experiência visual.
- **Seção de tecnologias** organizada por área de atuação.
- **Portfólio de projetos**, com referência ao repositório do Bloco 17 e conceitos demonstrativos.
- **Menu mobile** e links para GitHub, WhatsApp e e-mail.
- **Suporte à preferência por movimento reduzido** (`prefers-reduced-motion`).

## Tecnologias

### Utilizadas para construir este portfólio

- **HTML5** — estrutura e conteúdo.
- **CSS3** — estilização, responsividade, efeitos e animações.
- **JavaScript (vanilla)** — interatividade, navegação e lógica de scroll.
- **Intersection Observer e Web Animations API** — revelação de elementos e transições.

Este site **não precisa de framework, build, Node.js nem banco de dados** para funcionar. A fonte é carregada pelo Google Fonts; a caricatura está incorporada ao arquivo HTML.

### Apresentadas na seção de stack

React, TypeScript, JavaScript, Expo / React Native, HTML/CSS, Laravel, Node.js, PHP, Python, MySQL, SQLite, Git/GitHub, Linux e integrações com APIs.

> A seção de stack descreve ferramentas do meu repertório. O portfólio em si é feito com HTML, CSS e JavaScript puro.

## Projetos em destaque

| Projeto | Descrição | Tipo |
| --- | --- | --- |
| [Bloco 17](https://github.com/kennedyyp/projeto_loja_online_bloco17) | Projeto autoral de loja virtual, com catálogo, contas e fluxo de compra. | E-commerce |
| Barbearia | Conceito de página para apresentação de serviços de barbearia. | Protótipo demonstrativo |
| Açaí Digital | Conceito de vitrine digital para produtos e pedidos. | Protótipo demonstrativo |

Os conceitos demonstrativos não são apresentados como trabalhos contratados por clientes.

## Executar localmente

1. Clone ou baixe o repositório.
2. Abra o arquivo `index.html` em um navegador.

Se preferir usar um servidor local, na pasta do projeto execute:

```bash
python3 -m http.server 8000
```

Depois acesse **http://localhost:8000**.

## Configurar contato

No fim do arquivo `index.html`, localize:

```javascript
const WHATSAPP_NUMBER = '';
const CONTACT_EMAIL = '';
```

Preencha os campos com seu número no formato **55 + DDD + número** e seu endereço de e-mail. Os botões de contato usam esses valores; sem configurá-los, exibem um aviso em vez de iniciar o contato.

## Estrutura

```text
kenny-tech/
├── index.html          # Estrutura, estilos, scripts e caricatura
├── README.md           # Documentação do projeto
└── assets/
    └── preview.png     # Captura da página para o README
```

## Publicação

Por ser um site estático, pode ser hospedado no **GitHub Pages**. Nas configurações do repositório, vá em **Settings → Pages** e configure a publicação a partir da branch e da pasta onde está o `index.html`.

## Autor

Desenvolvido por **Kenny**.

**GitHub:** [@kennedyyp](https://github.com/kennedyyp)

---

<div align="center">

<sub>Feito com código, atenção aos detalhes e vontade de melhorar a cada versão.</sub>

</div>
