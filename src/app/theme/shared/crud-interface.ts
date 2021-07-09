export interface CrudInterface<T> {
  getAll(): void;
  getById(id: number): void;
  create(object: T): void;
  update(object: T): void;
  disable(object: T): void;
}
