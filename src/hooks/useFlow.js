import { throttle } from "lodash";
import { useEffect } from "react";
import debug from '../lib/debug';

export default function useFlow(limit, handleFlow, eventListRef) {
    useEffect(() => {
        let previousEventListHeight = 0
        const checkIfLimitExceeded = throttle(() => {
            const isLimitExceeded = limit >= document.body.scrollHeight - (window.scrollY + window.innerHeight)
            const currentEventListHeight = eventListRef.current.offsetHeight
            const isPageLoaded = !!(currentEventListHeight - 38)
            if (isLimitExceeded && isPageLoaded && (currentEventListHeight - previousEventListHeight)) {
                handleFlow()
                previousEventListHeight = currentEventListHeight
            }
        }, 300)
        window.addEventListener('scroll', checkIfLimitExceeded)
        checkIfLimitExceeded()
        debug('Flow is constructed.')
        return () => window.removeEventListener('scroll', checkIfLimitExceeded)
        // eslint-disable-next-line
    }, [])
} 