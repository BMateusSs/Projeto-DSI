import { FirestoreRepository } from "./FirestoreRepository";
import { Sommelier } from "../entities/Sommelier";

export class SommelierRepository extends FirestoreRepository<Sommelier> {
  constructor() {
    super("Sommeliers");
  }
}