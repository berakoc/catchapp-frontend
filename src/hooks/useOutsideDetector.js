import { useEffect } from "react";

export default function useOutsideDetector(ref, update) {
    useEffect(() => {
        function updateState(event) {
            const element = ref.current
            const value = element && !element.contains(event.target)
            update(!value)
        }
        document.addEventListener('mousedown', updateState)
        return () => {
            document.removeEventListener('mousedown', updateState)
        }
    })
}