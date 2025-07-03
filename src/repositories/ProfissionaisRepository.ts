import { FirestoreRepository } from "./FirestoreRepository";
import { Profissional } from "../entities/Professional";

export class ProfissionaisRepository extends FirestoreRepository<Profissional> {
  constructor() {
    super("Profissionais");
  }
}