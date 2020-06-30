export const sonLetras = (valor: string): boolean => {
    return /^([\s]*[A-Za-zÁÉÍÓÚáéíóúñÑÄËÏÖÜäëïöü]+[\s]*)*$/.test(valor)
}

export const sonNumeros = (valor: string): boolean => {
    return /^[0-9]*$/.test(valor)
}

export const esEmail = (valor: string): boolean => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor)
}

export const filtroSoloNumeros = (valor: string): string => {
    return valor.replace(/\D/g, '')
}