import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositorioLocalStorage } from "./contato.repositorio.local-storage.js";

class ContatoPaginaCadastro implements IPaginaHTML, IPaginaFormulario {

  private txtNome: HTMLInputElement;
  private txtEmail: HTMLInputElement;
  private txtTelefone: HTMLInputElement;
  private txtEmpresa: HTMLInputElement;
  private txtCargo: HTMLInputElement;
  private btnSalvar: HTMLButtonElement;

  constructor(private repositorioContatos: IRepositorio<Contato>) {
    this.configurarElementos();
  }

  configurarElementos(): void {
    this.txtNome = document.getElementById("txtNome") as HTMLInputElement;
    this.txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
    this.txtTelefone = document.getElementById("txtTelefone") as HTMLInputElement;
    this.txtEmpresa = document.getElementById("txtEmpresa") as HTMLInputElement;
    this.txtCargo = document.getElementById("txtCargo") as HTMLInputElement;
    this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

    this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros())
  }

  gravarRegistros(): void {
  
    const novoContato = new Contato(this.txtNome.value, this.txtEmail.value, this.txtTelefone.value, this.txtEmpresa.value, this.txtCargo.value);

    this.repositorioContatos.inserir(novoContato);

    window.location.href = "contato.list.html";
  }
}

new ContatoPaginaCadastro(new ContatoRepositorioLocalStorage());