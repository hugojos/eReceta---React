export const convertDataURIToBinary = (dataURI) => {
    let base64_maker = ';base64,'
    let base64Index = dataURI.indexOf(base64_maker) + base64_maker.length;
    let base64 = dataURI.substring(base64Index);
    let raw = window.atob(base64);
    let rawLength = raw.length;
    let array = new Array(new ArrayBuffer(rawLength));
    for(let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}

export const convertBinaryToDataURI = (binary) => {
    return btoa(String.fromCharCode.apply(null, binary))
}