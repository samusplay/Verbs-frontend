//Logica del Juego , el motor del juego

import type { Card, Verb, VerbForm } from "./GameBoard.types";

 // Funcion para crear el mazo de cartas

export function buildDeck(verbs: Verb[], limit = 10): Card[] {
  const count = Math.min(limit, verbs.length);          // evita pedir más de los que hay
  const selectedVerbs = shuffle(verbs).slice(0, count); // toma 'count' verbos aleatorios

  const cards: Card[] = [];
  selectedVerbs.forEach((verb) => {
    const forms: VerbForm[] = ["infinitive", "past_simple", "past_participle"];
    forms.forEach((form) => {
      cards.push({
        id: `${verb.infinitive}-${form}`,
        pairId: verb.infinitive,
        label: verb[form],
        formType: form,
        isMatched: false,
        isRevealed: false,
      });
    });
  });

  return shuffle(cards);
}

//algoritmo para mezclar las cartas fisher-yates
export function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
//Verificar sin concidencia

export function isMatch(cardA: Card, cardB: Card): boolean {
  if (cardA.id === cardB.id) return false; // no puede ser la misma carta
  return cardA.pairId === cardB.pairId;   // si pertenecen al mismo verbo → acierto
}

// calcular el puntaje
export function calculateScore(prevScore: number, matched: boolean): number {
  if (matched) {
    return prevScore + 10;  // +10 puntos por acierto
  } else {
    return Math.max(prevScore - 2, 0); // penaliza 2 por fallo, sin negativos
  }
}


