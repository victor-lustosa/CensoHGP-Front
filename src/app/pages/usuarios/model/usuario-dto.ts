export interface UsuarioDTO {
  idUsuario: number;
  nome:string;
  email: string;
  matricula:string;
  senha: string;
  ativo:boolean;
  perfil:[];
}
