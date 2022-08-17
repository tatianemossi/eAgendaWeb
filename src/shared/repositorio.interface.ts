import { EntidadeBase } from "./entidadeBase.model.js";

export interface IRepositorio<T extends EntidadeBase > {

  inserir(registro: T): void;
  editar(id: string, registro: T): void;
  excluir(id: string): void;
  selecionarTodos(): T[];
  selecionarPorId(id: string): T | undefined;
}