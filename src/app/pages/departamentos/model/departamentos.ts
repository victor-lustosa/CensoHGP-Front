import {TipoDepartamentos} from './../model/tipoDepartamentos'
export interface Departamentos {
    idDepartamento: number;
    nome: string;
    numero_leitos: number;
    ativo: boolean;
    tipodepartamento: TipoDepartamentos;
}
