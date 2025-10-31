//Definimos las interfaces

//interface para el verb que viene del backend

export interface Verb {
    infinitive: string;
    past_simple: string;
    past_participle: string;
    
}

//interface de la carta del juego

//las distintas formas que va tener el verbo en la carta
export type VerbForm = "infinitive" | "past_simple" | "past_participle";

export interface Card{
    id:string; //indetificador unico de la carta (frontend)
    pairId:string; //indentifica a que verbo pertenece 
    label:string; //texto visible
    formType:VerbForm; //forma del verbo que muestra la carta
    isMatched:boolean; //si la carta ya fue emparejada
    isRevealed:boolean; // si esta temporalmente volteada

}

//estado del juego
export type GameMode = "match" | "study";
export type GameDifficulty = "easy" | "medium" | "hard";
export type GamePhase = "idle" | "running" | "locked" | "finished";

// Estado interno del juego

export interface GameState {
  deck: Card[];                 // mazo completo de cartas
  selectedCards: Card[];        // cartas actualmente seleccionadas
  score: number;                // puntaje actual
  moves: number;                // cantidad de intentos
  phase: GamePhase;             // estado actual del juego
}

//Props del componente 
export interface GameBoardProps {
  verbs: Verb[];
  mode?: GameMode;
  difficulty?: GameDifficulty;
  onFinish?: (finalScore: number) => void;
}
