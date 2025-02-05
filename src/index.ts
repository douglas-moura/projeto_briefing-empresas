import './assets/css/style.css'
import $ from 'jquery';
import 'jquery-mask-plugin';
import { linhaPublicoAlvo, linhaUltimasCamp, linhaConcorrente } from './assets/helpers/components'

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

const mascaraInput = () => {
    $(document).ready(function() {
        $('.phone').mask('(00) 00000-0000')
        $('.percent').mask('##0,0%', {reverse: true})
        $('.money-1').mask('R$ #.##0.000,00', {reverse: true})
        $('.money-2').mask('R$ #0.##0,00', {reverse: false})
    })
}

window.addEventListener("DOMContentLoaded", (): void => {
    // criar uma linha em casa tabela ao carregar a página
    criarLinha('tab-publ-int', 'int')
    criarLinha('tab-publ-ext', 'ext')
    criarLinha('tab-conc')
    criarLinha('tab-ult-camp')
})