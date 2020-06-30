import IPaciente from "./IPaciente";
import IMedico from "./IMedico";

export default interface IReceta {
    pacienteDto: IPaciente;
    medicamentoDtos: any[];
    firmaDigital: any[];
    receta: any[];
    loading: boolean;
    errorResponse: string;
    usuarioMedicoDto?: IMedico;
    email?: string;
    archivo?: string;
    idMedico?: string;
}