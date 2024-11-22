import { useCallback, useRef } from "react";

export const useDebouce = (delay = 300, notDalayInFirsTime = true) => {
    const debouncing = useRef<ReturnType<typeof setTimeout>>();
    const isFirstTime = useRef<boolean>(notDalayInFirsTime);

    const debounce = useCallback((func: () => void) => {
        if(isFirstTime.current) {
            isFirstTime.current = false;
            func();
        } else {
            if(debouncing.current) {
                clearTimeout(debouncing.current);
            }
    
            debouncing.current = setTimeout(() => func(), 1000);
        }
    }, [delay]);
    
    return {debounce};
}