import { useEffect } from 'react';
import { nullFn } from '../lib/object';

export default function useAsync(
    asyncFn,
    onSuccess,
    onError = nullFn,
    deps = []
) {
    useEffect(() => {
        let isActive = true;
        asyncFn()
            .catch(onError)
            .then((data) => {
                if (isActive) onSuccess(data);
            });
        return () => {
            isActive = false;
        };
        // eslint-disable-next-line
    }, [...deps]);
}
