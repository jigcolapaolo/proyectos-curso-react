import type { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// Tipado de useDispatch y useSelector
// Creamos un nuevo useSelector que acepta RootState y el Dispatch
// Se pueden hacer hooks para cada tipo de estado de la store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch