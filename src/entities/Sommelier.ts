import { Professional } from "./Professional";

export class Sommelier {
  constructor(
    public professionalId: string,
    public especializacaoHarmonizacao: boolean,
    public id?: string
  ) {}
}