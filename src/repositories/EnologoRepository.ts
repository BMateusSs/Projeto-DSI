import { FirestoreRepository } from "./FirestoreRepository";
import { Enologo } from "../entities/Enologo";

export class EnologoRepository extends FirestoreRepository<Enologo> {
  constructor() {
    super("Enologos");
  }
}