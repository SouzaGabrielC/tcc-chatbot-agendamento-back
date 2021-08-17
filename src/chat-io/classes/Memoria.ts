export interface Memoria{
  nome: string;
  valor;
}

export class MemoriaInformativa implements Memoria{

  public nome: string;
  public valor: string;

  constructor(nome: string, valor: string){
      this.nome = nome;
      this.valor = valor;
  }


}

export class MemoriaIdentidade<T> implements Memoria{

  public nome: string;
  public valor: T;

  constructor(nome: string, valor: T){
    this.nome = nome;
    this.valor = valor;
  }

}