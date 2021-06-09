import { throttle } from 'lodash';
import { useEffect } from 'react';
import debug from '../lib/debug';
import { coalesce } from '../lib/object';

export default function useFlow(
    limit,
    handleFlow,
    eventListRef,
    atomicLockRef
) {
    useEffect(() => {
        let previousEventListHeight = 0;
        const checkIfLimitExceeded = throttle(() => {
            const isLimitExceeded =
                limit >=
                document.body.scrollHeight -
                    (window.scrollY + window.innerHeight);
            const currentEventListHeight = coalesce(
                eventListRef.current,
                'offsetHeight'
            );
            const isPageLoaded = !!(currentEventListHeight - 38);
            if (
                isLimitExceeded &&
                isPageLoaded &&
                currentEventListHeight - previousEventListHeight &&
                !atomicLockRef.current
            ) {
                handleFlow();
                previousEventListHeight = currentEventListHeight;
            }
        }, 500);
        window.addEventListener('scroll', checkIfLimitExceeded);
        checkIfLimitExceeded();
        debug('Flow is constructed.');
        return () => window.removeEventListener('scroll', checkIfLimitExceeded);
        // eslint-disable-next-line
    }, []);
}
