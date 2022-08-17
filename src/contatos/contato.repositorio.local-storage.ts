import { Guid } from "../shared/guid.model.js";
import { IRepositorioSerializavel } from "../shared/repositorio-serializavel.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";

export class ContatoRepositorioLocalStorage implements IRepositorio<Contato>, IRepositorioSerializavel {

  private readonly localStorage: Storage;

  private contatos: Contato[];

  constructor() {
    this.localStorage = window.localStorage;

    this.contatos = this.selecionarTodos();
  }

  public gravar(): void {
    const contatosJsonString = JSON.stringify(this.contatos);

    this.localStorage.setItem("contatos", contatosJsonString);
  }

  public inserir(registro: Contato): void {
    registro.id = new Guid().gerarNovoId();

    this.contatos.push(registro);
    this.gravar();
  }

  public editar(id: string, registro: Contato): void {
    const indexSelecionado = this.contatos.findIndex(x => x.id === id);

    this.contatos[indexSelecionado] = {
      id: id, 
      nome: registro.nome,
      email: registro.email,
      telefone: registro.telefone,
      empresa: registro.empresa,
      cargo: registro.cargo
    }

    this.gravar();
  }

  public excluir(id: string): void {
    this.contatos = this.contatos.filter(x => x.id !== id);

    this.gravar();
  }

  public selecionarTodos(): Contato[] {
    const dados = this.localStorage.getItem("contatos");

    if (!dados)
      return [];

      return JSON.parse(dados);
  }

  public selecionarPorId(id: string): Contato | undefined{
    return this.contatos.find(x => x.id === id);
  }
}