import { TipoDepartamento } from './tipoDepartamento';

export interface Departamento {
    idDepartamento: number;
    nome: string;
    numero_leitos: number;
    ativo: boolean;
    tipodepartamento: TipoDepartamento;
    descricao:string;
}
