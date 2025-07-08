import { Profissional } from "./Professional";

export class Sommelier {
  constructor(
    public profissionalId: string,
    public especializacaoHarmonizacao: string,
    public id?: string
  ) {}
}