import { FirestoreRepository } from "./FirestoreRepository";
import { Enologo } from "../entities/Enologo";
import { ProfissionaisRepository } from "./ProfessionalsRepository";
import { Entity, RepositoryException } from "./RepositoryException";
import { EnologoDTO } from "../dto/ProfissionalDTO";

export class EnologoRepository extends FirestoreRepository<Enologo> {
  profissionaisRepository: ProfissionaisRepository
  constructor() {
    super("Enologos");
    this.profissionaisRepository = new ProfissionaisRepository()
  }
  override async find(id: string): Promise<EnologoDTO> {
    const enologo = await super.find(id);
    const profissional = await this.profissionaisRepository.find(enologo.profissionalId)
    return {...profissional, ...enologo}
  }
}