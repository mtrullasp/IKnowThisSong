import * as localForage from "localforage";
//import composersTs from "./composers";

export function insertConposers(composers: Array<number>) {
  debugger ;return localForage.setItem<Array<number>>("composers", composers);
}

export function getComposers(): Promise<Array<number>> {
  return localForage.getItem<Array<number>>("composers");
}


