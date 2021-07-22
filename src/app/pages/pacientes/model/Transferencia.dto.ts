import { Usuario } from 'src/app/pages/usuarios/model/usuario';
import { Paciente } from './Paciente';

export interface TransferenciaDTO {
  idTransferencia: Number
  usuario : Usuario;
  paciente : Paciente;
  dataCadastroFormatada : String;
  departamentoOrigem: String;
  departamentoDestino: String;
  observacao: string;
}
