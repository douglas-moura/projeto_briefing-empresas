export const linhaPublicoAlvo = (tipo: string, n: number): HTMLTableRowElement => {
    const linha: HTMLTableRowElement = document.createElement('tr')
    linha.setAttribute("id", `linha-${tipo}-${n}`)
    linha.innerHTML +=
        `
            <td class="linha-tab input-tab-${tipo}">
                <input type="text" name="publ-${tipo}-cargo-${n}" id="publ-${tipo}-cargo-${n}" placeholder="Ex.: Cargo">
            </td>
            <td class="linha-tab input-tab-${tipo}">
                <input type="text" name="publ-${tipo}-qtd-${n}" id="publ-${tipo}-qtd-${n}" placeholder="Ex.: 2">
            </td>
            <td class="linha-tab input-tab-${tipo}">
                <input type="text" name="publ-${tipo}-renda-${n}" id="publ-${tipo}-renda-${n}" placeholder="Ex.: R$ 5.000">
            </td>
            <td class="linha-tab input-tab-${tipo}">
                <input type="text" name="publ-${tipo}-obs-${n}" id="publ-${tipo}-obs-${n}" placeholder="">
            </td>
        `
    return linha
}

export const linhaUltimasCamp = (n: number): HTMLTableRowElement => {
    const linha: HTMLTableRowElement = document.createElement('tr')
    linha.setAttribute("id", `linha-ult-camp-${n}`)
    linha.innerHTML +=
        `
            <td class="linha-tab">
                <input type="text" name="ult-camp-ano-${n}" id="ult-camp-ano-${n}" placeholder="Ex.: 2024">
            </td>
            <td class="linha-tab">
                <input type="text" name="ult-camp-aumento-${n}" id="ult-camp-aumento-${n}" placeholder="Ex.: Aumento nos descontos e sorteio de viagens para copa para titulares e balconistas">
            </td>
            <td class="linha-tab">
                <input type="text" name="ult-camp-periodo-${n}" id="ult-camp-periodo-${n}" placeholder="Ex.: Anual">
            </td>
            <td class="linha-tab">
                <input type="text" name="ult-camp-meta-${n}" id="ult-camp-meta-${n}" placeholder="Ex.: 15%">
            </td>
            <td class="linha-tab">
                <input type="text" name="ult-camp-cresc-${n}" id="ult-camp-cresc-${n}" placeholder="Ex.: 9%">
            </td>
        `
    return linha
}