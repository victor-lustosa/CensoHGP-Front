import { Usuario } from 'src/app/pages/usuarios/model/usuario';
import { Paciente } from './Paciente';
import { Incidente } from '../../checklists/incidentes/model/incidente';
import { Procedimento } from '../../checklists/procedimentos/model/procedimento';
import { Fator } from '../../checklists/fatores-risco/model/fator';
import { Precaucao } from '../../precaucoes/model/precaucao';
export interface ChecklistDTO {
  idChecklist: number;
  fatorRisco: Fator[];
  procedimento: Procedimento[];
  incidente: Incidente[];
  usuario : Usuario;
  observacao: string;
  paciente : Paciente;
  dataCadastroFormatada : string;
}
