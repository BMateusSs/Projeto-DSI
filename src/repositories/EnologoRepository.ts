import { FirestoreRepository } from "./FirestoreRepository";
import { Enologo } from "../entities/Enologo";
import { ProfessionalsRepository } from "./ProfessionalsRepository";
import { Entity, RepositoryException } from "./RepositoryException";
import { Professional } from "../entities/Professional";
export interface EnologoDTO extends Enologo, Professional { } 
export interface CreateEnologoDTO extends Professional {
  formacaoAcademica: string;
}

export class EnologoRepository extends FirestoreRepository<Enologo> {
  constructor() {
    super("Enologos");
  }
}