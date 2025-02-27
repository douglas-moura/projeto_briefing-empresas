import { Publico, Concorrente, Campanha } from "./interfaces"

export const getPublicosAlvo = (linhas: HTMLCollectionOf<HTMLTableRowElement>, publicoTipo: string): Publico[] => {
    const data: Publico[] = []
    
    console.log((linhas[0].children[2].children[0].children[0] as HTMLInputElement).value)

    for (let i = 0; i < linhas.length; i++) {
        let publico: Publico = { tipo: publicoTipo, cargo: "", qtd: 0, renda: "", obs: "", }

        publico.cargo = (linhas[i].children[0].children[0] as HTMLInputElement).value
        publico.qtd = parseInt((linhas[i].children[1].children[0] as HTMLInputElement).value)
        publico.renda = (linhas[i].children[2].children[0].children[0] as HTMLInputElement).value
        publico.obs = (linhas[i].children[3].children[0] as HTMLInputElement).value
        
        data.push(publico)
    }

    return data
}

export const getConcorrente = (linhas: HTMLCollectionOf<HTMLTableRowElement>): Concorrente[] => {
    const data: Concorrente[] = []

    for (let i = 0; i < linhas.length; i++) {
        let concorrente: Concorrente = {
            nome: (linhas[i].children[0].children[0] as HTMLInputElement).value,
            acoesCaract: (linhas[i].children[1].children[0] as HTMLInputElement).value,
            particMercado: (linhas[i].children[2].children[0] as HTMLInputElement).value,
        }

        data.push(concorrente)
    }

    return data
}
export const getCampanha = (linhas: HTMLCollectionOf<HTMLTableRowElement>): Campanha[] => {
    const data: Campanha[] = []

    for (let i = 0; i < linhas.length; i++) {
        let campanha: Campanha = {
            ano: parseInt((linhas[i].children[0].children[0] as HTMLInputElement).value),
            descr: (linhas[i].children[1].children[0] as HTMLInputElement).value,
            periodo: (linhas[i].children[2].children[0] as HTMLInputElement).value,
            meta: (linhas[i].children[3].children[0] as HTMLInputElement).value,
            cresc: (linhas[i].children[4].children[0] as HTMLInputElement).value,
        }

        data.push(campanha)
    }

    return data
}