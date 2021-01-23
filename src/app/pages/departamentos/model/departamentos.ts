import { TipoDepartamentos } from './tipoDepartamentos';

export interface Departamentos {
    idDepartamento: number;
    nome: string;
    numero_leitos: number;
    ativo: boolean;
    tipodepartamento: TipoDepartamentos;
    descricao:string;
}
