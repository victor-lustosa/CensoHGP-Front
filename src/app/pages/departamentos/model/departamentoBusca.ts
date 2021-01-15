import {TipoDepartamento} from './../model/tipoDepartamento'

export interface DepartamentoBusca {
    idDepartamento: number;
    nome: string;
    numero_leitos: number;
    status: boolean;
    id_tipo_departamento: TipoDepartamento;
}
