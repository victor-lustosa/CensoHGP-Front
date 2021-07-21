import { Departamento } from '../../departamentos/model/departamento';
import { Usuario } from '../../usuarios/model/usuario';

export interface Paciente {
  idPaciente: number;
  prontuario: string;
  nome: string;
  nomeMae: string;
  cpf: string;
  rg: string;
  genero: string;
  dataNascimento: Date;
  precaucao: number[];
  departamento: Departamento;
  checklist: number;
  transferencia: number;
  matriculaUsuario: string;
  sexo: number;
  usuario:Usuario;
}
