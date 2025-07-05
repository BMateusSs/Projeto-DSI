import { Profissional } from "./Professional";

export class Enologo {
    constructor(
        public profissional: Profissional,
        public formacaoAcademica: string,
        public id?: string,
    ) {}
  }