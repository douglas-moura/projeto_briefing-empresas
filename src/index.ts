import './assets/css/style.css'
import { linhaPublicoAlvo, linhaUltimasCamp } from './assets/helpers/components'

// Adicionar linha na tabela de públicos INTERNOS
(document.getElementById('add-linha-publ-int') as HTMLTableCellElement).addEventListener('click', (): void => {
    criarLinha('tab-publ-int', 'int')
});

// Adicionar linha na tabela de públicos EXTERNOS
(document.getElementById('add-linha-publ-ext') as HTMLTableCellElement).addEventListener('click', (): void => {
    criarLinha('tab-publ-ext', 'ext')
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
    } else {   
        tabBody.appendChild(linhaUltimasCamp(tabBody.children.length))
    }
}

window.addEventListener("DOMContentLoaded", (): void => {
    // criar uma linha em casa tabela ao carregar a página
    criarLinha('tab-publ-int', 'int')
    criarLinha('tab-publ-ext', 'ext')
    criarLinha('tab-ult-camp')
})