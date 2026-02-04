# LandingPage + Devops - Trabalho 29/01/2026

Uma landing page sobre um escritorio de advocacia

## Características

- **Design Responsivo**: Interface adaptada para dispositivos móveis, tablets e desktops
- **Menu Mobile**: Navegação otimizada com hamburger menu para dispositivos menores
- **Formulário de Contato**: Sistema de validação de campos com mensagens de erro personalizadas
- **Animações Suaves**: Transições e animações usando CSS e JavaScript
- **Acessibilidade**: Implementação de atributos ARIA para melhor acessibilidade
- **Sanitização de Dados**: Proteção contra injeção de código nos formulários

## Estrutura do Projeto

```
trabalho-lp/
├── index.html          # Arquivo principal HTML
├── estilo.css          # Estilos CSS personalizados
├── script.js           # Lógica JavaScript da aplicação
├── package.json        # Configurações do projeto
└── img/               # Pasta para imagens
```

## Seções Principais

### Hero Section
Banner inicial com chamada à ação (CTA) e gradiente visual atraente.

### Áreas de Atuação
Grid responsivo com cards de áreas de serviço com hover interativo.

### Sobre
Seção com informações sobre o projeto com destaques numéricos..

### Contato
Formulário completo com validação de:
- Nome (mínimo 3 caracteres)
- Email (formato válido)
- Telefone (formato brasileiro)
- Mensagem (mínimo 10 caracteres)

### Rodapé
Links de navegação e informações adicionais.

## Funcionalidades JavaScript

- **Menu Mobile**: Abre/fecha navegação em telas pequenas
- **Scroll Suave**: Navegação âncora com scrolling animado
- **Validação de Formulário**: Validação em tempo real com feedback visual
- **Animações ao Scroll**: Elementos aparecem com animação ao entrarem na viewport
- **Efeitos de Cabeçalho**: Cabeçalho muda aparência ao fazer scroll

## Variáveis de Cor

```css
--azul-marinho: #1e3a5f
--cinza-chumbo: #4a5568
--cinza-claro: #e2e8f0
--dourado: #c9a961
--bege: #f5f1e8
--branco: #ffffff
```

## Responsividade

- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet (até 968px)**: Menu mobile ativado, layout adaptado
- **Mobile (até 640px)**: Otimização completa para telas pequenas

## Como Usar

1. Abra o arquivo `index.html` em um navegador web
2. Navegue através dos links do menu
3. Preencha o formulário de contato com dados válidos
4. Aproveite as animações e interatividades

## Requisitos

- Navegador moderno com suporte a CSS Grid, Flexbox e ES6
- Sem dependências externas obrigatórias

---

Desenvolvido como projeto acadêmico de Linguagem de Programação.
