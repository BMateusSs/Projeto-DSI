import { FirestoreRepository } from "./FirestoreRepository";
import { Enologo } from "../entities/Enologo";
import { ProfissionaisRepository } from "./ProfessionalsRepository";
import { Entity, RepositoryException } from "./RepositoryException";
import { Profissional } from "../entities/Professional";
export interface EnologoDTO extends Enologo, Profissional { } 
export interface CreateEnologoDTO extends Profissional {
  formacaoAcademica: string;
}

export class EnologoRepository extends FirestoreRepository<Enologo> {
  constructor() {
    super("Enologos");
  }
}