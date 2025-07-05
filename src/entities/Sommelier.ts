import { Profissional } from "./Professional";

export class Sommelier {
  constructor(
    public profissional: Profissional,
    public especializacaoHarmonizacao: string,
    public id?: string
  ) {}
}