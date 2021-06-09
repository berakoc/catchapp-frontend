import { useEffect, useState } from 'react';

export default function useIsOutside(parentRef, childRef) {
    const [isOutside, setOutside] = useState(false);
    useEffect(() => {
        const parent = parentRef.current;
        const child = childRef.current;
        function updateState(event) {
            const value = child && !child.contains(event.target);
            setOutside(value);
        }
        parent && parent.addEventListener('click', updateState);
        return () => {
            parent && parent.removeEventListener('click', updateState);
        };
    }, [parentRef, childRef]);
    return isOutside;
}
