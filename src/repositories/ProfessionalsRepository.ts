import { FirestoreRepository } from "./FirestoreRepository";
import { Profissional } from "../entities/Professional";

export class EnologoRepository extends FirestoreRepository<Profissional> {
  constructor() {
    super("Profissionais");
  }
}