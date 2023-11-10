import { optionalPropsTypes } from './../types/optionalProps.types';


type NumberOrString = optionalPropsTypes <number & string>;
export interface RepositoryInterface<TEntity> {
  create(data: TEntity): Promise<void>;
  update(id: number, data: TEntity): Promise<void>;
  patch(id: number, data: Partial<TEntity>): Promise<void>;
  getById(id: number): Promise<TEntity>;
  getAll(): Promise<TEntity[]>;
  getOne(filter: Partial<TEntity>): Promise<TEntity>;
  getMany(filter: Partial<TEntity>): Promise<TEntity[]>;
  delete(id: number): Promise<void>;
  getByProp(prop: string, value: NumberOrString[]): Promise<TEntity | null>;
}