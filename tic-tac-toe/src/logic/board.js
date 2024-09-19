import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {

    for (const combo of WINNER_COMBOS) {

        const [a, b, c] = combo
        if (
            //Comprueba si es null y si en la posicion a, esta lo mismo que en b y c
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a] //Devuelve x u o
        }
    }
    //Si no hay ganador
    return null;
}

export const checkEndGame = (newBoard) => {
    //Comprueba que no haya nulls en el tablero, si no hay, termino el juego
    return newBoard.every((square) => square !== null)
}