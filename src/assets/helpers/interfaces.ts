export interface Concorrente {
    nome: string,
    acoesCaract: string | null,
    particMercado: string | null,
}

export interface Publico {
    tipo: string,
    cargo: string,
    qtd: number,
    renda: string
    obs: string | null,
}

export interface Campanha {
    ano: number | null,
    descr: string | null,
    periodo: string | null,
    meta: string | null,
    cresc: string | null,
}

export interface Produto {
    nome: string | null,
    objetivo: string | null,
}

export interface BriefingEmpresa {
    nome: string,
    vendasDozeMeses: string,
    margemBruta: string,
    crescPrevisto: string,
    particMercado: string,
    crescAnterior: string,
    publicosAlvoInt?: Publico[] | null,
    publicosAlvoExt?: Publico[] | null,
    produtosPromovidos?: Produto[] | null,
}

export interface BriefingMercado {
    descr: string,
    concorrentes: Concorrente[] | null,
    obs?: string | null,
}


export interface BriefingResponsavel {
    nome: string,
    cargo: string,
    email: string,
    tel: string,
}