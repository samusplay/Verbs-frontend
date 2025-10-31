//Componente de la carta individual del juego

import type { Card as CardType } from "../GameBoard.types";

interface CardProps {
  card: CardType;
  onSelect: (id: string) => void;
  disabled: boolean;
}

/**
 * 🃏 Componente visual de una carta
 *
 * - Muestra el texto del verbo si está revelada o acertada
 * - Cambia color según el estado
 * - Notifica clics al tablero principal
 */
export default function Card({ card, onSelect, disabled }: CardProps) {
  return (
    <button
      onClick={() => onSelect(card.id)}
      disabled={disabled}
      className={`
        w-28 h-32 rounded-xl shadow-md flex items-center justify-center text-lg font-semibold
        transition-all duration-300
        ${card.isMatched ? "bg-green-200 text-green-700" : ""}
        ${card.isRevealed && !card.isMatched ? "bg-white text-indigo-700 border-2 border-indigo-300" : ""}
        ${!card.isRevealed && !card.isMatched ? "bg-indigo-500 text-white hover:scale-105" : ""}
      `}
    >
      {card.isRevealed || card.isMatched ? card.label : "?"}
    </button>
  );
}
