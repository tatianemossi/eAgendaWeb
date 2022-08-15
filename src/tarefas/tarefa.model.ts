import { EntidadeBase } from "../shared/entidadeBase.model.js";
import { Prioridade } from "./prioridade.enum.js";

export class Tarefa extends EntidadeBase {
  public descricao: string;
  public dataCricao: Date;
  public prioridade: Prioridade;

  constructor(descricao: string, prioridade: Prioridade)
  {
    super();
    this.descricao = descricao;
    this.dataCricao = new Date();         
    this.prioridade = prioridade;    
  }
}