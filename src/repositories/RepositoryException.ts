import { Enologo } from "../entities/Enologo";
import { Professional } from "../entities/Professional";
import { Sommelier } from "../entities/Sommelier";

type Cause = "ENTITY_NOT_FOUND"
export type Entity = "Enologo" | "Sommelier" | "Professional"
export class RepositoryException extends ReferenceError {
    entity: Entity;
    constructor(cause: Cause, entity: Entity) {
        switch (cause) {
            case "ENTITY_NOT_FOUND":
                super(`Não foi encontrado o ${entity} com essas informações.`);
                break;
            default:
                super()
                break;
        }
        this.cause = cause;
        this.entity = entity
    }
} 