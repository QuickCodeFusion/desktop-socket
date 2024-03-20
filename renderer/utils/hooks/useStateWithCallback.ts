import { useEffect, useRef, useState } from "react";

export const useStateWithCallback = (initialState, callback) => {
    const [state, setState] = useState(initialState);
  
    const didMount = useRef(false);
  
    useEffect(() => {
      if (didMount.current) {
        callback(state);
      } else {
        didMount.current = true;
      }
    }, [state]);
  
    return [state, setState]
  }
