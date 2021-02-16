import { Injectable } from '@angular/core';
import { TipoDepartamentoService } from './tipo-departamento.service';
import { TipoDepartamento } from '../model/tipoDepartamento';

@Injectable({
  providedIn: 'root'
})
export class TipoDepartamentoSelecaoService {
listaTipoDepartamentos:TipoDepartamento[]=[];
listaTipoDepartamentosAux:string[];
  constructor(private service:TipoDepartamentoService){
    this.service.getAll().subscribe(
      data => {
        this.listaTipoDepartamentos = data;
        console.log('service: ',this.listaTipoDepartamentos)
      }
    )
  }
  getTipoDepartamentos() {
    for(let i = 0; this.listaTipoDepartamentos.length;i++ ){
      // this.listaTipoDepartamentosAux.push("valor: "+this.listaTipoDepartamentos.findIndex[i].patchValue('idTipoDepartamento')+
      //  ", nome: "+this.listaTipoDepartamentos.findIndex[i].patchValue('nome'))
       console.log('id: ',this.listaTipoDepartamentos.map) }
    return this.listaTipoDepartamentosAux ;
    }
}
