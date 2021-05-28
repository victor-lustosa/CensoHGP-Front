export interface Checklist {
  idChecklist: number;
  idPaciente: number;
  matriculaUsuario: string;
  observacao: string;
  incidente: number[];
  procedimento: number[];
  fatorRisco: number[];
}
