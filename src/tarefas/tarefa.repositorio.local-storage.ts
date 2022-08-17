import { Guid } from "../shared/guid.model.js";
import { IRepositorioSerializavel } from "../shared/repositorio-serializavel.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Tarefa } from "./tarefa.model.js";

export class TarefaRepositorioLocalStorage implements IRepositorio<Tarefa>, IRepositorioSerializavel {

  private readonly localStorage: Storage;

  private tarefas: Tarefa[];

  constructor() {
    this.localStorage = window.localStorage;

    this.tarefas = this.selecionarTodos();
  }

  public gravar(): void {
    const tarefasJsonString = JSON.stringify(this.tarefas);

    this.localStorage.setItem("tarefas", tarefasJsonString);
  }

  public inserir(registro: Tarefa): void {
    registro.id = new Guid().gerarNovoId();

    this.tarefas.push(registro);
    this.gravar();
  }

  public editar(id: string, registro: Tarefa): void {
    const indexSelecionado = this.tarefas.findIndex(x => x.id === id);

    this.tarefas[indexSelecionado] = {
      id: id, 
      descricao: registro.descricao,
      dataCricao: registro.dataCricao,
      prioridade: registro.prioridade
    }

    this.gravar();
  }

  public excluir(id: string): void {
    this.tarefas = this.tarefas.filter(x => x.id !== id);

    this.gravar();
  }

  public selecionarTodos(): Tarefa[] {
    const dados = this.localStorage.getItem("tarefas");

    if (!dados)
      return [];

      return JSON.parse(dados);
  }

  public selecionarPorId(id: string): Tarefa | undefined{
    return this.tarefas.find(x => x.id === id);
  }
}