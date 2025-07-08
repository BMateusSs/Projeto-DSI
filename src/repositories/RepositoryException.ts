import { Enologo } from "../entities/Enologo";
import { Profissional } from "../entities/Professional";
import { Sommelier } from "../entities/Sommelier";

type Cause = "ENTITY_NOT_FOUND"
export type Entity = "Enologo" | "Sommelier" | "Profissional"
export class RepositoryException extends ReferenceError {
    entity: Entity;
    constructor(cause: Cause, entity: Entity) {
        switch (cause) {
            case "ENTITY_NOT_FOUND":
                super(`Não foi encontrado um ${entity} com id informado.`);
                break;
            default:
                super()
                break;
        }
        this.cause = cause;
        this.entity = entity
    }
} 