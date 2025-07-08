import { Enologo } from "../entities/Enologo";
import { Profissional } from "../entities/Professional";
import { Sommelier } from "../entities/Sommelier";

export interface EnologoDTO extends Enologo, Profissional { } 
export interface SommelierDTO extends Sommelier, Profissional { }