import { ChangeEvent, useCallback, useState } from "react";

export const useInput = ():  [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
    const [input, setInput] = useState<string>('');

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setInput(newValue);
    }, []);

    return [input, onChange];
}