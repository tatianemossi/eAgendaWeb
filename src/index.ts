import { IPaginaHTML } from "./shared/pagina.interface.js";

class Index implements IPaginaHTML {
  btnCadastro: HTMLButtonElement;
  
  constructor() {
    this.configurarElementos();
  }

  //método responsável pelo data binding dos elementos da página
  public configurarElementos(): void {}
}

new Index();