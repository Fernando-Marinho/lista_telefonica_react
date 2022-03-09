import styles from './contato.module.css';
import { BiPencil, BiX } from 'react-icons/bi';
import Modal from '../modal/modal';
import Form from '../form/form';
import { useState } from 'react';

export default function Contato({ contato, deleteContato, updateContato }) {
    const [showModal, setShowModal] = useState(false);

    if (!contato) {
        return null
    } else {
        return (
            <>
                <div key={contato.id} className={styles.container}>
                    <div className={styles.list__image} ><img className={styles.image} src={`data:image/png;base64, ${contato.imagem}`} alt="imagem" /></div>
                    <div className={styles.list__item + ' ' + styles.nome}>{contato.nome}</div>
                    <div className={styles.list__item} style={{ textAlign: 'right' }}>
                        <button onClick={() => setShowModal(!showModal)} style={{background:'none', padding: '0', margin: '0', border: 'none'}}><BiPencil className={styles.icons} title='Editar' /></button>
                        <button onClick={(event) => deleteContato(contato.id, event)} style={{background:'none', padding: '0', margin: '0', border: 'none'}}><BiX className={styles.icons} title='Excluir' /></button> 
                    </div>
                    <div className={styles.list__item}>{contato.telefone}</div>
                    <div className={styles.list__item}>{contato.email}</div>

                    {showModal && <Modal action={() => setShowModal(!showModal)}><Form contato={contato} updateContato={updateContato} fecharModal={() => setShowModal(!showModal)} /></Modal>}
                </div>
            </>
        )
    }

}
