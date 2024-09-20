"use client"; //ClientActions devem ser funcoes síncronas

import { useFormStatus } from 'react-dom';

export default function FormSubmit() {

    const status = useFormStatus(); //retorna um objeto com as propriedades de status do form

    //o useFormStatus retorna a propriedade ''pending'' que é um booleano que indica se o form está sendo submetido
    console.log(status.pending);
    if(status.pending) {
        return <p>Creating post...</p>;
    }

    return (
        <>
            <button type="reset">Reset</button>
            <button>Create Post</button>
        </>
    );
}