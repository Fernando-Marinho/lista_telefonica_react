import Botao from '../components/botao/botao';
import Contato from '../components/contato/contato';
import Form from '../components/form/form';
import Modal from '../components/modal/modal';
import api from '../services/api';
import { useState, useEffect } from 'react';
import styles from './home.module.css'

export default function Home() {
    const [formContato, setFormContato] = useState(false);

    const [contatos, setContatos] = useState();

    useEffect(() => {
        api.get("/contatos")
            .then((response) => setContatos(response.data))
    }, [])

    async function deleteContato (id, event){
        event.preventDefault();
        console.log(id);
        await api.delete(`/contatos/${id}`);
        const contatosAtualizados = contatos.filter((contato) => contato.id !== id);
        setContatos([...contatosAtualizados]);
    }

    async function updateContato(id, event, novoContato){
        event.preventDefault();
        novoContato.id = id;
        await api.put(`/contatos/${id}`, novoContato);

        const contatosAtualizados = contatos;
        const index = contatosAtualizados.findIndex((contato) => contato.id === id);
        contatosAtualizados[index] = novoContato;
        
        setContatos([...contatosAtualizados]);
    }
    
    return (
        <>
            <h2>Contatos</h2>
            <div style={{ display: 'flex', justifyContent: 'end', position: 'relative' }}>
                <Botao action={() => {setFormContato(!formContato) }}>Novo Contato</Botao>
                {formContato && <Modal action={() => {setFormContato(!formContato) }}><Form contatos={contatos} setContatos={setContatos} fecharModal={() => {setFormContato(!formContato) }} /></Modal>}
            </div>
            <div className={styles.template}>
                {typeof contatos === 'object' && contatos.length > 0 ? contatos.map((contato) => 
                <div key={contato.id}>
                    <Contato contato={contato} updateContato={updateContato} deleteContato={deleteContato}/>
                </div> ) 
                : <div>Não há contatos cadastrados</div>}
            </div>
        </>
    )
}