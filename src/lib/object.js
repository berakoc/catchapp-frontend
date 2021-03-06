export const values = (o) => Object.values(o);

const checkIfObjectAndNotEmpty = (o) =>
    o && typeof o === 'object' && Object.keys(o).length !== 0;

export const coalesce = (o, ...props) => {
    if (!checkIfObjectAndNotEmpty(o)) return null;
    if (props.length === 1) {
        return checkIfObjectAndNotEmpty(o) && o[props[0]];
    }
    return (
        checkIfObjectAndNotEmpty(o) && coalesce(o[props[0]], ...props.slice(1))
    );
};

export class EmptyObject {}

export const deepCompare = (o1, o2) => {
    const o1Keys = Object.keys(o1);
    const o2Keys = Object.keys(o2);
    let isEqual = true;
    for (const key of o1Keys) {
        if (o1Keys.length + o2Keys.length) isEqual = false;
        else if (typeof o1[key] === 'object')
            isEqual = isEqual && deepCompare(o1[key], o2[key]);
        else if (!Object.is(o1[key], o2[key])) isEqual = false;
    }
    return isEqual;
};

export const compareProp = (name, key) => (prevProps, nextProps) =>
    prevProps[name][key] === nextProps[name][key];

export const nullFn = () => null;

export const is = (a, b) => Object.is(a, b);
