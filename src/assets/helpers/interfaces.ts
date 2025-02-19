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

export interface BriefingEmpresa {
    nome: string,
    vendasDozeMeses: string,
    mercado: string,
    margemBruta: string,
    meta: string,
    particMercado: string,
    cresc: string,
    publicosAlvoInt: Publico[] | null,
    publicosAlvoExt: Publico[] | null,
}

export interface BriefingMercado {
    descr: string,
    concorrentes: Concorrente[] | null,
    obs: string | null,
}


export interface BriefingResponsavel {
    nome: string,
    email: string,
    tel: string,
}