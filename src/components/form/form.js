import { useState } from "react";
import api from '../../services/api'
import imageToBase64 from 'image-to-base64/browser';
import InputMask from "react-input-mask";
import styles from './form.module.css'

export default function Form({ contato, updateContato, contatos, setContatos, fecharModal }) {
    const [telefone, setTelefone] = useState(contato ? contato.telefone : '');
    const [nome, setNome] = useState(contato ? contato.nome : '');
    const [email, setEmail] = useState(contato ? contato.email : '');
    const [imagem, setImagem] = useState(contato ? contato.imagem : '');

    const [nomeErro, setNomeErro] = useState('');
    const [imagemErro, setImagemErro] = useState('');

    const saveContato = async (event) => {
        event.preventDefault();
        const novoContato = { telefone, nome, email, imagem };
        
       //Validar Imagem e Converter para base64
        if (typeof novoContato.imagem === 'object' && novoContato.imagem.type.includes('image/')) {
            const imagemBase64 = await imageToBase64(URL.createObjectURL(novoContato.imagem))
            novoContato.imagem = imagemBase64;
        }else if(typeof novoContato.imagem !== 'string'){
            setImagemErro('Arquivo Inválido');
            return;
        }

         //Validar Nome 
        if(!(novoContato.nome.match(/^[a-zA-Z\s]*$/))){
            setNomeErro('Nome Inválido');
            return;
        }


        if (contato) {
            novoContato.id = contato.id;
            updateContato(contato.id, event, novoContato)
        } else {
            const response = await api.post('/contatos', novoContato);
            setContatos([response.data, ...contatos]);
        }

        fecharModal();
    }

    return (
        <form onSubmit={saveContato}>
            <div>
                <label htmlFor='telefone'>Telefone:</label>
                <InputMask
                    value={telefone}
                    mask="(99) 99999-9999"
                    type='tel'
                    id='telefone'
                    name='telefone'
                    placeholder="(99) 99999-9999"
                    onChange={(e) => setTelefone(e.target.value)}
                    required />
            </div>
            <div>
                <label htmlFor='nome'>Nome:</label>
                <input
                    value={nome}
                    type='text'
                    id='nome'
                    name='nome'
                    placeholder="Digite o nome do contato"
                    onChange={(e) => {setNome(e.target.value); setNomeErro('')}}
                    required />
                {nomeErro && <sub style={{color: '#FF3333'}}>{nomeErro}</sub>}
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                <input
                    value={email}
                    type='email' id='email'
                    name='email'
                    placeholder="exemplo@exemplo.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required />
            </div>
            <div>
                <label htmlFor='imagem'>Imagem:</label>
                {(imagem && typeof imagem !== 'object') && <img style={{ width: '100%' }} src={`data:image/png;base64, ${imagem}`} alt="imagem" />}
                <input
                    type='file'
                    id='imagem'
                    name='imagem'
                    accept="image/*"
                    onChange={(e) => {setImagem(e.target.files[0]); setImagemErro('')}}
                    required={!imagem} />
                {imagemErro && <sub style={{color: '#FF3333'}}>{imagemErro}</sub>}
            </div>
            <div >
                <button type='submit' className={styles.btn}>Salvar</button>
            </div>
        </form>
    )
}