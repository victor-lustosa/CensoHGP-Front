import { Usuario } from 'src/app/pages/usuarios/model/usuario';
import { Paciente } from './paciente';
import { Incidente } from '../../checklists/incidentes/model/incidente';
import { Procedimento } from '../../checklists/procedimentos/model/procedimento';
import { Fator } from '../../checklists/fatores-risco/model/fator';
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
