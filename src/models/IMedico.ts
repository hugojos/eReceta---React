export default interface IMedico {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    matricula: string;
    password: string | undefined;
    telefono: string;
    archivoDni: string;
    expiry?: number;
    idMedico?: string;
    idProvincia: string;
    ipRegistro?: string;
    tipoMatricula?: string;
    token?: string;
    usaApp?: boolean;
    archivoFirmaDigital?: string;
    usaFirmaAutomatica?: boolean;

    [key: string]: any;
}