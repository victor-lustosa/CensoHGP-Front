import { Departamento } from 'src/app/pages/departamentos/model/departamento';

export interface Transferencia {
    matriculaUsuario: string;
    idPaciente: number;
    departamentoOrigem: Departamento;
    departamentoDestino: Departamento;
    observacao: string;
    dtaTransferencia: Date;
}