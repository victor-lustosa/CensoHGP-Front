import { Departamento } from '../../departamentos/model/departamento';

export interface PacienteEdicao {
  idPaciente: number;
  prontuario: string;
  nome: string;
  nomeMae: string;
  cpf: string;
  rg: string;
  genero: number;
  dataNascimento: Date;
  precaucao: number[];
  departamento: number;
  checklist: number;
  transferencia: number;
  matriculaUsuario: string;
}
