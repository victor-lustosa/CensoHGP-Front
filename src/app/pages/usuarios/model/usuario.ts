import { TipoUsuario } from './tipoUsuario';

export interface Usuario {
  idUsuario: number;
  nome:string;
  email: string;
  matricula:string;
  senha: string;
  ativo:boolean;
  tipousuario: TipoUsuario;
}
