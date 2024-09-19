//.d Solo definiciones

import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from "./constants";

// Se usan interfaces directamente si es un objeto. State es el tipo de initialState
export interface State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
}

export type Action =
  | { type: "SET_FROM_LANGUAGE"; payload: FromLanguage }
  | { type: "SET_TO_LANGUAGE"; payload: Language }
  | { type: "INTERCHANGE_LANGUAGES" }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string }

// Toma los lenguajes e indica que solo puede ser 'en', 'es' o 'de'
// typeof selecciona todo el objeto SUPPORTED_LANGUAGES y el 'keyof' obtiene solo las keys
export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
// Solo puede ser cualquier valor de Language o 'auto'
export type FromLanguage = Language | AutoLanguage


export enum SectionType {
  From = 'from',
  To = 'to'
}
