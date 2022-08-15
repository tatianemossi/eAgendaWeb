import { EntidadeBase } from "../shared/entidadeBase.model.js";
export class Tarefa extends EntidadeBase {
    constructor(descricao, prioridade) {
        super();
        this.descricao = descricao;
        this.dataCricao = new Date();
        this.prioridade = prioridade;
    }
}
