import { CertificacaoVinho } from "../constants/CertificacoesVinho";

export class Professional {
  constructor(
    public nome: string,
    public email: string,
    public telefone: string,
    public certificacoes: CertificacaoVinho[] = [],
    public id?: string
  ) {}
}

