//Estados del Jugador
// cerebro activo
//Manejamos estado y comportamiento

import { useEffect, useMemo, useState } from "react";
import { buildDeck, calculateScore } from "./GameBoard.model";
import type { Card, GamePhase, Verb } from "./GameBoard.types";

/**
 *  Hook principal que controla la lógica del juego de cartas
 * 
 * - Construye el mazo a partir de los verbos
 * - Maneja el estado del juego (cartas, puntaje, fase)
 * - Controla la selección de cartas y determina aciertos/fallos
 * - Detecta cuándo se termina la partida
 */
export function useMatchGame(
  verbs: Verb[],
  limit = 10,
  maxMoves = 10,
  callbacks?: {
    onSelect?: () => void;
    onMatch?: () => void;
    onMismatch?: () => void;
    onPhaseChange?: (phase: GamePhase) => void;
  }
) {
  // -----------------------------
  // Estado principal del juego
  // -----------------------------
  const [deck, setDeck] = useState<Card[]>([]);             // Mazo completo de cartas
  const [selectedCards, setSelectedCards] = useState<Card[]>([]); // Cartas seleccionadas actualmente (máx. 2)
  const [score, setScore] = useState(0);                    // Puntuación actual
  const [moves, setMoves] = useState(0);                    // Número de intentos
  const [phase, setPhase] = useState<GamePhase>("idle");    // Estado del juego ("idle" | "running" | "locked" | "finished")

  // -----------------------------------------------------
  //  Inicializa el mazo cuando llegan los verbos
  // -----------------------------------------------------
  useEffect(() => {
    if (!verbs || verbs.length === 0) return; // evita inicializar si aún no hay datos
    setDeck(buildDeck(verbs,limit));                // genera las cartas a partir de los verbos
    setScore(0);
    setMoves(0);
    setSelectedCards([]);
    setPhase("running");                      // comienza el juego
  }, [verbs,limit]);

  // -----------------------------------------------------
  //  Saber si todas las cartas ya fueron emparejadas
  // -----------------------------------------------------
  const allMatched = useMemo(
    () => deck.length > 0 && deck.every((c) => c.isMatched),
    [deck]
  );

  // Si todas las cartas están emparejadas, termina la partida
  useEffect(() => {
    if (phase === "running" && allMatched) {
      setPhase("finished");
    }
  }, [allMatched, phase]);

  useEffect(() => {
    if (callbacks?.onPhaseChange) {
      callbacks.onPhaseChange(phase);
    }
  }, [phase, callbacks]);

  // -----------------------------------------------------
  //  Lógica de selección de cartas
  // -----------------------------------------------------
  function selectCard(cardId: string) {
  if (phase !== "running") return;

  const card = deck.find((c) => c.id === cardId);
  if (!card || card.isMatched || card.isRevealed) return;

  // Revelar la carta seleccionada
  const updatedDeck = deck.map((c) =>
    c.id === cardId ? { ...c, isRevealed: true } : c
  );
  setDeck(updatedDeck);

  if (callbacks?.onSelect) callbacks.onSelect();

  const newSelection = [...selectedCards, card];
  setSelectedCards(newSelection);

  // 👇 Esperar hasta que haya 3 cartas seleccionadas
  if (newSelection.length < 3) return;

  // Bloquear el tablero momentáneamente
  setPhase("locked");
  setMoves((m) => m + 1);

  const [first, second, third] = newSelection;

  // ✅ Verificar si las 3 pertenecen al mismo verbo
  const matched =
    first.pairId === second.pairId && second.pairId === third.pairId;

  setScore((prev) => calculateScore(prev, matched));

  setTimeout(() => {
    if (matched) {
      if (callbacks?.onMatch) callbacks.onMatch();
      const fixed = updatedDeck.map((c) =>
        c.pairId === first.pairId
          ? { ...c, isMatched: true }
          : c
      );
      setDeck(fixed);
    } else {
      if (callbacks?.onMismatch) callbacks.onMismatch();
      const hidden = updatedDeck.map((c) =>
        c.id === first.id || c.id === second.id || c.id === third.id
          ? { ...c, isRevealed: false }
          : c
      );
      setDeck(hidden);
    }

    // Reset selección y desbloquear
    setSelectedCards([]);
    setPhase("running");
  }, 800);
}
      // 🧠 Control de derrota por límite de intentos
      //Toca Renderizar el componente
   useEffect(() => {
  if (moves >= maxMoves && phase === "running") {
    setPhase("lost");
  }
  }, [moves, maxMoves, phase]);

  // -----------------------------------------------------
  //  Reiniciar partida
  // -----------------------------------------------------
  function resetGame() {
    setDeck(buildDeck(verbs, limit));  // reconstruimos el mazo respetando el límite por dificultad
    setScore(0);
    setMoves(0);
    setSelectedCards([]);
    setPhase("running");
  }

  // -----------------------------------------------------
  //  Retornamos datos y funciones al componente
  // -----------------------------------------------------
  return {
    deck,             // mazo de cartas
    selectedCards,    // cartas seleccionadas
    score,            // puntaje actual
    moves,            // cantidad de intentos
    phase,            // estado actual del juego
    selectCard,       // función para seleccionar carta
    resetGame,        // reiniciar juego
  };
}
