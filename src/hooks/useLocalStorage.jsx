import React, { useState, useEffect } from 'react';

// A hook to save and restore data in localStorage
export default function useLocalStorage(key, defaultVal) {
    const [state, setState] = useState(() => {
        let value;
        try {
            value = JSON.parse(localStorage.getItem(key) || String(defaultVal));
        } catch (err) {
            value = defaultVal;
        }
        return value;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state, setState];
}