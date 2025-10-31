//Estados del Jugador
// cerebro activo
//Manejamos estado y comportamiento

import { useEffect, useMemo, useState } from "react";
import { buildDeck, calculateScore, isMatch } from "./GameBoard.model";
import type { Card, GamePhase, Verb } from "./GameBoard.types";

/**
 *  Hook principal que controla la lógica del juego de cartas
 * 
 * - Construye el mazo a partir de los verbos
 * - Maneja el estado del juego (cartas, puntaje, fase)
 * - Controla la selección de cartas y determina aciertos/fallos
 * - Detecta cuándo se termina la partida
 */
export function useMatchGame(verbs: Verb[]) {
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
    setDeck(buildDeck(verbs));                // genera las cartas a partir de los verbos
    setScore(0);
    setMoves(0);
    setSelectedCards([]);
    setPhase("running");                      // comienza el juego
  }, [verbs]);

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

  // -----------------------------------------------------
  //  Lógica de selección de cartas
  // -----------------------------------------------------
  function selectCard(cardId: string) {
    // Si el juego está bloqueado o terminado, no hacer nada
    if (phase !== "running") return;

    // Encontramos la carta seleccionada
    const card = deck.find((c) => c.id === cardId);
    if (!card || card.isMatched || card.isRevealed) return; // ignorar si ya está revelada o acertada

    //  Caso 1: primera carta seleccionada
    if (selectedCards.length === 0) {
      // revelamos la carta visualmente
      const updated = deck.map((c) =>
        c.id === cardId ? { ...c, isRevealed: true } : c
      );
      setDeck(updated);
      setSelectedCards([updated.find((c) => c.id === cardId)!]);
      return;
    }

    //  Caso 2: segunda carta seleccionada
    if (selectedCards.length === 1) {
      const first = selectedCards[0];
      const second = deck.find((c) => c.id === cardId);
      if (!second) return;

      // revelamos la segunda carta y bloqueamos la interacción
      const revealedDeck = deck.map((c) =>
        c.id === cardId ? { ...c, isRevealed: true } : c
      );
      setDeck(revealedDeck);
      setSelectedCards([first, { ...second, isRevealed: true }]);
      setPhase("locked"); // bloqueamos mientras se evalúa el par
      setMoves((m) => m + 1); // aumentamos contador de intentos

      // comprobamos si hay coincidencia
      const matched = isMatch(first, second);
      setScore((prev) => calculateScore(prev, matched));

      // Esperamos 650ms para que el jugador vea la carta
      setTimeout(() => {
        if (matched) {
          //  si acierta, marcamos ambas como acertadas
          const fixed = revealedDeck.map((c) =>
            c.id === first.id || c.id === second.id
              ? { ...c, isMatched: true }
              : c
          );
          setDeck(fixed);
        } else {
          // ❌ si falla, las ocultamos de nuevo
          const hidden = revealedDeck.map((c) =>
            c.id === first.id || c.id === second.id
              ? { ...c, isRevealed: false }
              : c
          );
          setDeck(hidden);
        }

        // limpiamos selección y desbloqueamos
        setSelectedCards([]);
        setPhase("running");
      }, 650);
    }
  }

  // -----------------------------------------------------
  //  Reiniciar partida
  // -----------------------------------------------------
  function resetGame() {
    setDeck(buildDeck(verbs));  // reconstruimos el mazo
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
