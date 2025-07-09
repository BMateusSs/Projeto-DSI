import { FirestoreRepository } from "./FirestoreRepository";
import { Professional } from "../entities/Professional";

export class ProfessionalsRepository extends FirestoreRepository<Professional> {
  constructor() {
    super("Professionals");
  }
}