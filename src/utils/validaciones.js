export const sonLetras = (valor) => {
    return /^[\sA-Za-zÁÉÍÓÚáéíóúñÑÄËÏÖÜäëïöü]+[A-Za-zÁÉÍÓÚáéíóúñÑÄËÏÖÜäëïöü]+[\s]*$/.test(valor)
}

export const sonNumeros = (valor) => {
    return /^[0-9]*$/.test(valor)
}

export const esEmail = (valor) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor)
}