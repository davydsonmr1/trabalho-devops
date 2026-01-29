(function() {
    'use strict';

    function sanitizarTexto(texto) {
        const elemento = document.createElement('div');
        elemento.textContent = texto;
        return elemento.innerHTML;
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarTelefone(telefone) {
        const regex = /^[\d\s\-\(\)]+$/;
        return regex.test(telefone) && telefone.replace(/\D/g, '').length >= 10;
    }

    function validarNome(nome) {
        return nome.trim().length >= 3;
    }

    function validarMensagem(mensagem) {
        return mensagem.trim().length >= 10;
    }

    function exibirErro(campo, mensagem) {
        const campoGrupo = campo.closest('.campo-grupo');
        const erroElemento = campoGrupo.querySelector('.campo-erro');

        campoGrupo.classList.add('erro');
        erroElemento.textContent = mensagem;
        campo.setAttribute('aria-invalid', 'true');
    }

    function limparErro(campo) {
        const campoGrupo = campo.closest('.campo-grupo');
        const erroElemento = campoGrupo.querySelector('.campo-erro');

        campoGrupo.classList.remove('erro');
        erroElemento.textContent = '';
        campo.setAttribute('aria-invalid', 'false');
    }

    function configurarMenuMobile() {
        const botaoMenu = document.getElementById('botao-menu-mobile');
        const navegacao = document.getElementById('navegacao');
        const linksMenu = document.querySelectorAll('.menu-link');

        if (botaoMenu && navegacao) {
            botaoMenu.addEventListener('click', function() {
                botaoMenu.classList.toggle('ativo');
                navegacao.classList.toggle('ativo');

                const estaAberto = navegacao.classList.contains('ativo');
                botaoMenu.setAttribute('aria-expanded', estaAberto);
                botaoMenu.setAttribute('aria-label', estaAberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
            });

            linksMenu.forEach(function(link) {
                link.addEventListener('click', function() {
                    botaoMenu.classList.remove('ativo');
                    navegacao.classList.remove('ativo');
                    botaoMenu.setAttribute('aria-expanded', 'false');
                    botaoMenu.setAttribute('aria-label', 'Abrir menu de navegação');
                });
            });

            document.addEventListener('click', function(evento) {
                if (!navegacao.contains(evento.target) && !botaoMenu.contains(evento.target)) {
                    if (navegacao.classList.contains('ativo')) {
                        botaoMenu.classList.remove('ativo');
                        navegacao.classList.remove('ativo');
                        botaoMenu.setAttribute('aria-expanded', 'false');
                        botaoMenu.setAttribute('aria-label', 'Abrir menu de navegação');
                    }
                }
            });
        }
    }

    function configurarRolagem() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(function(link) {
            link.addEventListener('click', function(evento) {
                const href = this.getAttribute('href');

                if (href === '#') {
                    return;
                }

                const alvo = document.querySelector(href);

                if (alvo) {
                    evento.preventDefault();
                    const posicao = alvo.getBoundingClientRect().top + window.pageYOffset;
                    const offset = 80;

                    window.scrollTo({
                        top: posicao - offset,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function configurarFormulario() {
        const formulario = document.getElementById('formulario-contato');
        const campoNome = document.getElementById('nome');
        const campoEmail = document.getElementById('email');
        const campoTelefone = document.getElementById('telefone');
        const campoMensagem = document.getElementById('mensagem');
        const mensagemSucesso = document.getElementById('mensagem-sucesso');

        if (!formulario) {
            return;
        }

        [campoNome, campoEmail, campoTelefone, campoMensagem].forEach(function(campo) {
            if (campo) {
                campo.addEventListener('blur', function() {
                    validarCampo(campo);
                });

                campo.addEventListener('input', function() {
                    if (campo.closest('.campo-grupo').classList.contains('erro')) {
                        limparErro(campo);
                    }
                });
            }
        });

        if (campoTelefone) {
            campoTelefone.addEventListener('input', function(evento) {
                let valor = evento.target.value.replace(/\D/g, '');

                if (valor.length > 11) {
                    valor = valor.slice(0, 11);
                }

                if (valor.length <= 10) {
                    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
                } else {
                    valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
                }

                evento.target.value = valor;
            });
        }

        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault();

            let formularioValido = true;

            if (!validarCampo(campoNome)) {
                formularioValido = false;
            }

            if (!validarCampo(campoEmail)) {
                formularioValido = false;
            }

            if (!validarCampo(campoTelefone)) {
                formularioValido = false;
            }

            if (!validarCampo(campoMensagem)) {
                formularioValido = false;
            }

            if (formularioValido) {
                const dadosFormulario = {
                    nome: sanitizarTexto(campoNome.value),
                    email: sanitizarTexto(campoEmail.value),
                    telefone: sanitizarTexto(campoTelefone.value),
                    mensagem: sanitizarTexto(campoMensagem.value)
                };

                console.log('Dados do formulário (sanitizados):', dadosFormulario);

                formulario.reset();

                mensagemSucesso.classList.add('ativo');

                setTimeout(function() {
                    mensagemSucesso.classList.remove('ativo');
                }, 5000);
            }
        });
    }

    function validarCampo(campo) {
        if (!campo) {
            return true;
        }

        limparErro(campo);

        const valor = campo.value.trim();
        const tipo = campo.id;

        if (valor === '') {
            exibirErro(campo, 'Este campo é obrigatório');
            return false;
        }

        switch(tipo) {
            case 'nome':
                if (!validarNome(valor)) {
                    exibirErro(campo, 'Nome deve ter pelo menos 3 caracteres');
                    return false;
                }
                break;

            case 'email':
                if (!validarEmail(valor)) {
                    exibirErro(campo, 'Por favor, insira um e-mail válido');
                    return false;
                }
                break;

            case 'telefone':
                if (!validarTelefone(valor)) {
                    exibirErro(campo, 'Por favor, insira um telefone válido');
                    return false;
                }
                break;

            case 'mensagem':
                if (!validarMensagem(valor)) {
                    exibirErro(campo, 'Mensagem deve ter pelo menos 10 caracteres');
                    return false;
                }
                break;
        }

        return true;
    }

    function configurarAnimacoesRolagem() {
        const elementos = document.querySelectorAll('.card-area, .sobre-conteudo, .info-item');

        const observador = new IntersectionObserver(function(entradas) {
            entradas.forEach(function(entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.style.opacity = '1';
                    entrada.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elementos.forEach(function(elemento) {
            elemento.style.opacity = '0';
            elemento.style.transform = 'translateY(30px)';
            elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observador.observe(elemento);
        });
    }

    function configurarCabecalhoRolagem() {
        const cabecalho = document.getElementById('cabecalho');
        let ultimaPosicao = 0;

        window.addEventListener('scroll', function() {
            const posicaoAtual = window.pageYOffset;

            if (posicaoAtual > 100) {
                cabecalho.style.padding = '0.5rem 0';
                cabecalho.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                cabecalho.style.padding = '1rem 0';
                cabecalho.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }

            ultimaPosicao = posicaoAtual;
        });
    }

    function inicializar() {
        configurarMenuMobile();
        configurarRolagem();
        configurarFormulario();
        configurarAnimacoesRolagem();
        configurarCabecalhoRolagem();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }

})();
