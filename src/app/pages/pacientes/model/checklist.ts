import { Usuario } from 'src/app/pages/usuarios/model/usuario';
import { Paciente } from './paciente';
import { Incidente } from './../../checklists/incidentes/model/incidente';
import { Procedimento } from './../../checklists/procedimentos/model/procedimento';
import { Fator } from '../../checklists/fatores-risco/model/fator';
import { Precaucao } from './../../precaucoes/model/precaucao';
export interface Checklist {
  idChecklist: number;
  idPaciente: number;
  matriculaUsuario: string;
  observacao: string;
  incidente: number[];
  procedimento: number[];
  fatorRisco: number[];
}
