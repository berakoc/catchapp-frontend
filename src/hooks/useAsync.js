import { useEffect } from 'react';

export default function useAsync(asyncFn, onSuccess, deps=[]) {
    useEffect(() => {
        let isActive = true;
        asyncFn().then((data) => {
            if (isActive) onSuccess(data);
        });
        return () => {
            isActive = false;
        };
        // eslint-disable-next-line
    }, [...deps]);
}
