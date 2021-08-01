import { Departamento } from '../../departamentos/model/departamento';
import { Usuario } from '../../usuarios/model/usuario';
export interface PacienteDTO {
  idPaciente: number;
  prontuario: string;
  nome: string;
  nomeMae: string;
  cpf: string;
  rg: string;
  sexo: number;
  dataNascimento: Date;
  precaucao: number;
  departamento: Departamento;
  checklist: number;
    genero: number;
  transferencia: number;
  usuario:Usuario;
}
