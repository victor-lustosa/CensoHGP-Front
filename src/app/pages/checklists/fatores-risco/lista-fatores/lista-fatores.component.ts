import { OnInit, ViewChildren, QueryList, PipeTransform, Component } from '@angular/core';
import { FatorRiscoService } from '../service/fator-risco.service';
import { Fator } from '../model/fator';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CadastroFatorComponent } from '../cadastro-fator/cadastro-fator.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbdSortableHeader, SortEvent, SortColumn, SortDirection } from '../sortable.directive';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';




const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(fatores: Fator[], column: SortColumn, direction: string): Fator[] {
  if (direction === '' || column === '') {
    return fatores;
  } else {
    return [...fatores].sort((a, b) => {
      const res = compare(a.nome[column], b.nome[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}
function matches(fator: Fator, term: string, pipe: PipeTransform) {
  return fator.nome.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(fator.ativo).includes(term)
    || pipe.transform(fator.descricao).includes(term);
}
interface SearchResult {
  fatores: Fator[];
  total: number;
}
interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}
@Component({
  selector: 'app-lista-fatores',
  templateUrl: './lista-fatores.component.html',
  providers: [DecimalPipe],
  styleUrls: ['./lista-fatores.component.scss']
})
export class ListaFatoresComponent implements OnInit {
  formularioCadastro: FormGroup = null;
  formularioAtualizar: FormGroup = null;
  lista: Fator[];
  msgError: string;
  sucesso: boolean = false;
  idAux: number;
  varConfirm: string;
  fatorAux: Fator;


  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _fatores$ = new BehaviorSubject<Fator[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  constructor(private fatoresService: FatorRiscoService,
    public modalService: NgbModal, private formBuilder: FormBuilder,
    private pipe: DecimalPipe) {
    fatoresService.getAll().subscribe(
      data => { this.lista = data; });
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._fatores$.next(result.fatores);
      this._total$.next(result.total);
    });
    this._search$.next();
  }

  ngOnInit(): void {
    this.msgError = null;

    this.formularioCadastro = this.formBuilder.group({
      idFatorRisco: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null],
      ativo: [true]
    });
    this.formularioAtualizar = this.formBuilder.group({
      idFatorRisco: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      descricao: [null],
      ativo: [true]
    });
  }

  cadastrar() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: true,
      size: 'lg'
    };
    const modalRef = this.modalService.open(CadastroFatorComponent, ngbModalOptions);
    modalRef.componentInstance.formulario = this.formularioCadastro;

  }

  atualizar() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: true,
      size: 'lg'
    };
    const modalRef = this.modalService.open(CadastroFatorComponent, ngbModalOptions);
    if (this.formularioAtualizar != null) {
      modalRef.componentInstance.formulario = this.formularioAtualizar;
    }

  }
  pegaId(id: number) {
    this.idAux = id;
    this.fatoresService.getById(this.idAux).subscribe((fatoresDis) => {
      if (fatoresDis.ativo === true) {
        this.varConfirm = 'desabilitar';
      } else {
        this.varConfirm = 'ativar';
      }
      this.fatorAux = fatoresDis;
    });


  }

  mudarStatus() {
    console.log(this.idAux);

    if (this.fatorAux.ativo === true) {
      this.fatorAux.ativo = false;
      this.fatoresService.disable(this.fatorAux).subscribe(
        error => {
          console.log('Erro na mudança de status: ' + error);
        }
      );
    } else {
      this.fatorAux.ativo = true;
      this.fatoresService.disable(this.fatorAux).subscribe(
        error => {
          console.log('Erro na mudança de status: ' + error);
        });
    }







  }

  editar(id: number) {
    this.fatoresService.getById(id).subscribe((fatores) => {
      console.log(fatores);
      this.updateForm(fatores);
      console.log(this.formularioAtualizar);
      if (this.formularioAtualizar != null) {
        this.atualizar();
      }
    });
  }
  updateForm(fatores: Fator) {
    this.formularioAtualizar.patchValue({
      idFatorRisco: fatores.idFatorRisco,
      nome: fatores.nome,
      descricao: fatores.descricao,
      ativo: fatores.ativo
    });
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.sortColumn = column;
    this.sortDirection = direction;
  }
  limpar() {
    this.searchTerm = '';
  }

  get fatores$() { return this._fatores$.asObservable(); }
  get total$() {
    console.log("this._total$.asObservable(): " + this._total$.asObservable().forEach(
      element => {
        console.log("this._total$.asObservable()2: " + element);
      }
    ));
    return this._total$.asObservable();
  }
  get loading$() { return this._loading$.asObservable(); }
  get page() {
    console.log("this._state.page: " + this._state.page);
    return this._state.page;
  }
  get pageSize() {
    console.log("this._state.pageSize: " + this._state.pageSize);
    return this._state.pageSize;
  }
  get searchTerm() {
    console.log("this._state.searchTerm: " + this._state.searchTerm);
    return this._state.searchTerm;
  }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
    console.log("lista vindo do filtros: " + this.lista);
    console.log("page size aqui seach: " + this.pageSize);
    // 1. sort
    let fatores = sort(this.lista, sortColumn, sortDirection);

    // 2. filter
    fatores = fatores.filter(fator => matches(fator, searchTerm, this.pipe));
    const total = fatores.length;
    console.log("total: " + total);
    // 3. paginate(page-1) * pageSize : page * pageSize
    fatores = fatores.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    console.log("page size aqui seach2: " + pageSize);
    return of({ fatores, total });
  }


}
