import { useReducer } from "react";
import { Action, FromLanguage, Language, State } from "../types";
import { AUTO_LANGUAGE } from "../constants";

// 1- Create State
const initialState: State = {
    fromLanguage: "auto",
    toLanguage: "en",
    fromText: "",
    result: "",
    loading: false,
};

// 2- Create reducer
function reducer(state: State, action: Action) {
  const { type } = action;

  // Cuando se recibe esta accion, se intercambian los lenguajes
  if (type === "INTERCHANGE_LANGUAGES") {
    // Lógica de estado dentro del reducer, evitamos hacerlo en los componentes
    // En el traductor, nunca puede ir 'auto' en toLanguage, se evita el intercambio asi
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    const loading = state.fromText !== ''

    return {
      // Aca no se permite usar action.payload si se pusiera por el tipado de TypeScript
      // Ni se permite errores en el type
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    if (state.fromLanguage === action.payload) return state
    const loading = state.fromText !== ''
    // El payload es la información que se usa para cambiar el estado,
    // en este caso paso directamente el idioma, fromLanguage pasa a tener el valor del payload
    if (action.payload === state.toLanguage && state.fromLanguage !== AUTO_LANGUAGE)
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
      }

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    if (state.fromLanguage === action.payload) return state
    const loading = state.fromText !== ''

    if (action.payload === state.fromLanguage)
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: action.payload,
      }

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    };
  }

  // Se aprovecha no solo para cambiar el estado,
  // si no tambien para cambiar otras propiedades para efectos
  if (type === "SET_FROM_TEXT") {
    const loading = action.payload !== ''
    return {
      ...state,
      loading,
      fromText: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}

export function useStore() {
  // 3- Usar el hook useReducer
  // El state permite acceder a todas las propiedades de State
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  console.log({ fromLanguage });
  // Es una buena practica retornar asi el contrato, no tiene que ir el dispatch a los componentes
  const interchangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: Language) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
