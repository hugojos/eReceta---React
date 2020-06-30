export default interface IPaciente {
    nombre?: string;
    apellido?: string;
    dni?: string;
    obraSocial?: string;
    numeroAfiliado?: string;
    [key: string]: any;
}