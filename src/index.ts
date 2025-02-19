import './assets/css/style.css'
import $ from 'jquery'
import 'jquery-mask-plugin'
import emailjs from 'emailjs-com'
import { BriefingEmpresa, BriefingMercado, Concorrente, Publico, Campanha, BriefingResponsavel } from './assets/helpers/interfaces'
import { linhaPublicoAlvo, linhaUltimasCamp, linhaConcorrente } from './assets/helpers/components'
import { getCampanha, getConcorrente, getPublicosAlvo } from './assets/helpers/briefing'

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
const criarLinha = (tabBodyId: string, tipo?: string): void => {
    const tabBody = document.getElementById(tabBodyId) as HTMLTableElement    
    if (typeof tipo == 'string') {
        tabBody.appendChild(linhaPublicoAlvo(tipo, tabBody.children.length))
    } else if (tabBodyId == 'tab-conc') {   
        tabBody.appendChild(linhaConcorrente(tabBody.children.length))
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

(document.getElementById('btn-enviar-form') as HTMLButtonElement).addEventListener('click', () => {
    const publicosInternos: Publico[] = getPublicosAlvo((document.getElementsByClassName('publico-int') as HTMLCollectionOf<HTMLTableRowElement>), "Int")
    const publicosExternos: Publico[] = getPublicosAlvo((document.getElementsByClassName('publico-ext') as HTMLCollectionOf<HTMLTableRowElement>), "Ext")
    const listaConcorrentes: Concorrente[] = getConcorrente((document.getElementsByClassName('linha-concorrente') as HTMLCollectionOf<HTMLTableRowElement>))
    const campanhas: Campanha[] = getCampanha((document.getElementsByClassName('linha-campanha') as HTMLCollectionOf<HTMLTableRowElement>))
    
    const empresa: BriefingEmpresa = {
        nome: (document.getElementById('empresa') as HTMLInputElement).value,
        vendasDozeMeses: (document.getElementById('vendas') as HTMLInputElement).value,
        mercado: (document.getElementById('mercado') as HTMLInputElement).value,
        margemBruta: (document.getElementById('margem') as HTMLInputElement).value,
        meta: (document.getElementById('meta') as HTMLInputElement).value,
        particMercado: (document.getElementById('participacao') as HTMLInputElement).value,
        cresc: (document.getElementById('crescimento') as HTMLInputElement).value,
        publicosAlvoInt: publicosInternos,
        publicosAlvoExt: publicosExternos
    }

    const mercado: BriefingMercado = {
        descr: (document.getElementById('descr-mercado') as HTMLTextAreaElement).value,
        concorrentes: listaConcorrentes,
        obs: (document.getElementById('conc-obs') as HTMLTextAreaElement).value,
    }

    const responsavel: BriefingResponsavel = {
        nome: (document.getElementById('nome') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        tel: (document.getElementById('tel') as HTMLInputElement).value,
    }

    console.log(empresa, mercado, campanhas)
})

emailjs.init('YOUR_USER_ID')

// Função para enviar o formulário
const enviarEmail = async (form: HTMLFormElement) => {
    // Cria um objeto com os dados para enviar
    const data = {
        //user_name: userName,
        //user_email: userEmail,
        //message: message,
    }

    try {
        const response = await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form);
        console.log('E-mail enviado com sucesso!', response);
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
    }
}

window.addEventListener("DOMContentLoaded", (): void => {
    // criar uma linha em casa tabela ao carregar a página
    criarLinha('tab-publ-int', 'int')
    criarLinha('tab-publ-ext', 'ext')
    criarLinha('tab-conc')
    criarLinha('tab-ult-camp')
})