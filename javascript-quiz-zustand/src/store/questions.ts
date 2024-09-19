import { create } from "zustand";
import { type Question } from "../types.d";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

// Esto describe como es el estado
interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerId: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    // Esta sera la posicion del array de question
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      await fetch("http://localhost:5173/data.json")
        .then((res) => {
          if (!res.ok) throw new Error("Error en el fetch");
          return res.json();
        })
        .then((data) => {
          const questions = data.sort(() => Math.random() - 0.5).slice(0, limit);
          set({ questions });
        })
        .catch((err) => console.log(err));
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      // Uso el get del store para obtener los questions
      const { questions } = get()
      // Se clona para no mutar el original
      const newQuestions = structuredClone(questions)
      // Se encuentra el indice de la pregunta
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      // Se obtiene la informacion de la pregunta
      const questionInfo = newQuestions[questionIndex]
      // Se averigua si el usuario ha seleccionado la respuesta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnswer) confetti()

      // Actualizar el estado mutando la copia
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }

      set({ questions: newQuestions })
    },

    nextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },

    previousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1

      if( previousQuestion >= 0 ) {
        set({ currentQuestion: previousQuestion })
      }
    },

    reset: () => {
      set({ currentQuestion: 0, questions: [] })
    }
  };
}, {
  name: "questions",
  getStorage: () => localStorage // o sessionStorage, puedo no definir nada y usa por defecto el local
}));
