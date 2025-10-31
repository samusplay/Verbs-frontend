//Exportar instancia
import { backendService } from "./backend.service";
//Importacion desde nuestros Types
import type { Verb } from "../components/game/GameBoard/GameBoard.types";


export async function getVerbs():Promise<Verb[]> {
    return backendService.get<Verb[]>("verbs/");
}