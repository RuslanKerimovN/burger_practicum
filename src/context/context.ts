import { createContext } from "react";
import { IBurgerIngredients } from "../types/types";

export const Context = createContext<IBurgerIngredients[]>([]);
