import { Guid } from "../shared/guid.model.js";
export class ContatoRepositorioLocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
        this.contatos = this.selecionarTodos();
    }
    gravar() {
        const contatosJsonString = JSON.stringify(this.contatos);
        this.localStorage.setItem("contatos", contatosJsonString);
    }
    inserir(registro) {
        registro.id = new Guid().gerarNovoId();
        this.contatos.push(registro);
        this.gravar();
    }
    editar(id, registro) {
        const indexSelecionado = this.contatos.findIndex(x => x.id === id);
        this.contatos[indexSelecionado] = {
            id: id,
            nome: registro.nome,
            email: registro.email,
            telefone: registro.telefone,
            empresa: registro.empresa,
            cargo: registro.cargo
        };
        this.gravar();
    }
    excluir(id) {
        this.contatos = this.contatos.filter(x => x.id !== id);
        this.gravar();
    }
    selecionarTodos() {
        const dados = this.localStorage.getItem("contatos");
        if (!dados)
            return [];
        return JSON.parse(dados);
    }
    selecionarPorId(id) {
        return this.contatos.find(x => x.id === id);
    }
}
