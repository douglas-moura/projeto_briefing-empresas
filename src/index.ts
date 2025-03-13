import './assets/css/style.css'
import $ from 'jquery'
import 'jquery-mask-plugin'
import emailjs from 'emailjs-com'
import validator from 'validator'
import { BriefingEmpresa, BriefingMercado, Concorrente, Publico, Campanha, Produto, BriefingResponsavel } from './assets/helpers/interfaces'
import { linhaPublicoAlvo, linhaUltimasCamp, linhaConcorrente, linhaProdutoPormovido } from './assets/helpers/components'
import { getCampanha, getConcorrente, getProdutos, getPublicosAlvo } from './assets/helpers/briefing'


// Adicionar linha na tabela de PRODUTOS
(document.getElementById('add-linha-produtos') as HTMLTableCellElement).addEventListener('click', (): void => {
    criarLinha('tab-produtos')
});

// Adicionar linha na tabela de públicos INTERNOS
(document.getElementById('add-linha-publ-int') as HTMLTableCellElement).addEventListener('click', (): void => {
    criarLinha('tab-publ-int', 'int')
});

// Adicionar linha na tabela de públicos EXTERNOS
(document.getElementById('add-linha-publ-ext') as HTMLTableCellElement).addEventListener('click', (): void => {
    criarLinha('tab-publ-ext', 'ext')
});

// Adicionar linha na tabela de ÚLTIMAS CAMPANHAS
(document.getElementById('add-linha-conc') as HTMLTableCellElement).addEventListener('click', (): void => {
    criarLinha('tab-conc')
});

// Adicionar linha na tabela de ÚLTIMAS CAMPANHAS
(document.getElementById('add-linha-ult-camp') as HTMLTableCellElement).addEventListener('click', (): void => {
    criarLinha('tab-ult-camp')
});

// Função para criar linhas e adicionar nas tabelas
const criarLinha = (tabBodyId: string, tipo?: string, exemplo?: string): void => {
    const tabBody = document.getElementById(tabBodyId) as HTMLTableElement    
    if (typeof tipo == 'string') {
        tabBody.appendChild(linhaPublicoAlvo(tipo, tabBody.children.length, exemplo))
    } else if (tabBodyId == 'tab-conc') {   
        tabBody.appendChild(linhaConcorrente(tabBody.children.length))
    } else if (tabBodyId == 'tab-produtos') {   
        tabBody.appendChild(linhaProdutoPormovido(tabBody.children.length))
    } else {   
        tabBody.appendChild(linhaUltimasCamp(tabBody.children.length))
    }
    mascaraInput()
}

// mascaras de inputs
const mascaraInput = () => {
    $(document).ready(function() {
        $('.phone').mask('(00) 00000-0000')
        $('.percent').mask('##0,0%', {reverse: true})
        $('.money-1').mask('#.##0.000,00', {reverse: true})
        $('.money-2').mask('#0.##0,00', {reverse: false})
        $('.money-3').mask('#.##0,00', {reverse: true})
    })
}

// ao clicar no botão de envio, captura os valores os valores dos campos e trata eles
(document.getElementById('btn-enviar-form') as HTMLButtonElement).addEventListener('click', () => {
    // estas funcões pegam os dados das tabelas e traformam em Arrays
    const produtosProm: Produto[] = getProdutos((document.getElementsByClassName('linha-produto') as HTMLCollectionOf<HTMLTableRowElement>))
    const publicosInternos: Publico[] = getPublicosAlvo((document.getElementsByClassName('publico-int') as HTMLCollectionOf<HTMLTableRowElement>), "Int")
    const publicosExternos: Publico[] = getPublicosAlvo((document.getElementsByClassName('publico-ext') as HTMLCollectionOf<HTMLTableRowElement>), "Ext")
    const listaConcorrentes: Concorrente[] = getConcorrente((document.getElementsByClassName('linha-concorrente') as HTMLCollectionOf<HTMLTableRowElement>))
    const campanhas: Campanha[] = getCampanha((document.getElementsByClassName('linha-campanha') as HTMLCollectionOf<HTMLTableRowElement>))
    
    // variaveis que serão enviadas por email
    const empresa: BriefingEmpresa = {
        nome: (document.getElementById('empresa') as HTMLInputElement).value,
        vendasDozeMeses: (document.getElementById('vendas') as HTMLInputElement).value,
        margemBruta: (document.getElementById('margem') as HTMLInputElement).value,
        crescPrevisto: (document.getElementById('meta') as HTMLInputElement).value,
        particMercado: (document.getElementById('participacao') as HTMLInputElement).value,
        crescAnterior: (document.getElementById('crescimento') as HTMLInputElement).value,
        produtosPromovidos: produtosProm,
        publicosAlvoInt: publicosInternos,
        publicosAlvoExt: publicosExternos
    }

    const mercado: BriefingMercado = {
        descr: (document.getElementById('descr-mercado') as HTMLTextAreaElement).value,
        concorrentes: listaConcorrentes,
        //obs: (document.getElementById('conc-obs') as HTMLTextAreaElement).value,
    }

    const responsavel: BriefingResponsavel = {
        nome: (document.getElementById('nome') as HTMLInputElement).value,
        cargo: (document.getElementById('cargo') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        tel: (document.getElementById('tel') as HTMLInputElement).value,
    }

    let valido = true

    // Validar Nome
    if (responsavel.nome === '') {
        (document.getElementById('nomeErro') as HTMLSpanElement)!.textContent = 'Nome é obrigatório.'
        valido = false
    }

    // Validar E-mail
    if (responsavel.email === '') {
        (document.getElementById('emailErro') as HTMLSpanElement)!.textContent = 'E-mail é obrigatório.'
        valido = false
    } else if (!validator.isEmail(responsavel.email)) {
        (document.getElementById('emailErro') as HTMLSpanElement)!.textContent = 'E-mail inválido.'
        valido = false
    }

    if (valido) enviarEmail(empresa, mercado, campanhas, responsavel)
})

// EmailJS
emailjs.init('1oStTlvolPOmGxroU')

// Função para enviar o formulário
const enviarEmail = async (empresa: BriefingEmpresa, mercado: BriefingMercado, campanhas: Campanha[], responsavel: BriefingResponsavel) => {
    // Enviar o e-mail usando seu Service ID e Template ID
    try {
        const response = await emailjs.send("service_d1s9app", "template_ulstklq", {
            respNome: responsavel.nome,
            respCargo: responsavel.cargo,
            respEmail: responsavel.email,
            respTel: responsavel.tel,

            empresaNome: empresa.nome,
            vendaDozeMeses: empresa.vendasDozeMeses,
            margemBruta: empresa.margemBruta,
            crescimentoPrevisto: empresa.crescPrevisto,
            particMercado: empresa.particMercado,
            crescimentoAnterior: empresa.crescAnterior,

            produtos: empresa.produtosPromovidos,

            publInterno: empresa.publicosAlvoInt,
            publExterno: empresa.publicosAlvoExt,

            descrMercado: mercado.descr,
            concorr: mercado.concorrentes,
            obsComentMercado: mercado.obs,

            ultimasCamps: campanhas
        })

        console.log('E-mail enviado com sucesso!', response)

        mensagemSucesso()
    } catch (error) {
        console.error('Erro ao enviar e-mail', error)
    }
}

const mensagemSucesso = () => {
    (document.getElementById('modal-sucess') as HTMLDivElement)!.classList.remove('translate-y-full')
}

// ao carregar a pagina
window.addEventListener("DOMContentLoaded", (): void => {
    // criar uma linha em casa tabela ao carregar a página
    criarLinha('tab-produtos')

    criarLinha('tab-publ-int', 'int', 'Vendedor')
    criarLinha('tab-publ-int', 'int', 'Supervisor')
    criarLinha('tab-publ-int', 'int', 'Gerente')

    criarLinha('tab-publ-ext', 'ext', 'Vendedor Externo')
    criarLinha('tab-publ-ext', 'ext', 'Representante')
    criarLinha('tab-publ-ext', 'ext', 'Distribuidor')

    criarLinha('tab-conc')
    criarLinha('tab-conc')
    criarLinha('tab-conc')

    criarLinha('tab-ult-camp')
    criarLinha('tab-ult-camp')
    criarLinha('tab-ult-camp')
})