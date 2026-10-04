import { useRef, useEffect } from 'react'

export function useScrollLeft(isReady) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if(!el) return;
        
        function handleScroll(e) {
            e.preventDefault();
            const speed = 1.5;
            el.scrollLeft += e.deltaY * speed;
        }

        el.addEventListener("wheel",handleScroll,{passive: false}) 

        return () => el.removeEventListener("wheel", handleScroll) // just cleaning up 
    },[isReady])

    return ref;
}