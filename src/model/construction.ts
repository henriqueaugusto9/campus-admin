

export type Construction = {
    docs: { ART: string, alana: string, habiteSe: string, matricula: string, relContribuinte: string },
    endereco: string,
    inicioContrato: string,
    lote: string,
    owner: string,
    proprietario: string,
    quadra: string,
    images: Array<any>,
    _id: string
}

export const EMPTY_CONSTRUCTION = {
    docs: { ART: '', alana: '', habiteSe: '', matricula: '', relContribuinte: '' },
    endereco: '',
    inicioContrato: '',
    lote: '',
    owner: '',
    proprietario: '',
    quadra: '',
    images: [],
    _id: ''
} as Construction