import { Usuario } from 'src/app/pages/usuarios/model/usuario';
import { Paciente } from './Paciente';
import { Departamento } from 'src/app/pages/departamentos/model/departamento';

export interface Transferencia {
    usuario: Usuario;
    paciente: Paciente;
    departamentoOrigem: Departamento;
    departamentoDestino: Departamento;
    observacao: string;
}