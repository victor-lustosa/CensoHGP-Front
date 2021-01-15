import {TipoDepartamento} from './../model/tipoDepartamento'
export interface Departamento {
    idDepartamento: number;
    nome: string;
    numero_leitos: number;
    status: boolean;
    tipoDepartamento: TipoDepartamento;
}
