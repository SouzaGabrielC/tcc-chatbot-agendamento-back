export interface Classificacao {
  frase: string;
  intencao: string;
  entidades: Array<{
      entidade: string,
      valor: string,
      valorId: any
  }>;
}