import { useEffect, useReducer } from "react";
interface Returns {
  state: PanelDataStateType
  actions: PanelDataActionsType
  }
export default function usePanelReducer():Returns {
  type STATE = PanelDataStateType | undefined;
  type ACTION =
    | { type: "ADD_PANEL"; payload: any }
    | { type: "CHANGE_PANEL"; payload: any }
    | { type: "DELETE_PANEL"; payload: any }
    | { type: "CHANGE_FORM"; payload: any }
    | { type: "ADD_ITEM_PANEL"; payload: any }
    | { type: "DELETE_ITEM_PANEL"; payload: any }
    | { type: "INITIALIZE"; payload?: undefined };

    const reducer = (state: STATE, action: ACTION):STATE => {
    switch (action.type) {
      /** 
       * TODO: sample
       * case: "ADD_PANEL":
       *   return state && addPanelState(state, action.payload);
       * ...
      */
      case "INITIALIZE":
        return {} as PanelDataStateType
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, undefined);

  useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  },[])

  return {
    state:state ?? {}as PanelDataStateType,
    actions:{
      /**
       * TODO: add Actions*/ 
    },
  };
}

type PanelDataStateType = {/*TODO:*/}
type PanelDataActionsType = {/*TODO:*/}