import { Departamento } from '../../departamentos/model/departamento';

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
}
