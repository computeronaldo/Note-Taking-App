import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    // this is to initialize the value of item in localStorage 
    // and if it already exists fetch it.
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if(jsonValue === null) {
            if(typeof initialValue === "function") {
                return (initialValue as () => T);
            } else {
                return initialValue;
            }
        } else {
            return JSON.parse(jsonValue);
        }
    })

    // update our local storage whenever value changes or
    // key changes "NOTES" -> "TAGS".
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue] as [T, typeof setValue];
}