export interface CrudInterface<T>{
  getAll():void,
  getById(id: number): void,
  create(object : T):void,
  update(object: T):void,
  delete(id: number): void,
  getByNome(object: T):void
}
