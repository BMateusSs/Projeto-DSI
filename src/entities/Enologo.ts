import { Profissional } from "./Professional";

export class Enologo {
    constructor(
        public profissionalId: string,
        public formacaoAcademica: string,
        public id?: string,
    ) {}
  }