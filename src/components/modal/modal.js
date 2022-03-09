import styles from './modal.module.css'
import { BiX } from 'react-icons/bi';

export default function Modal({ action, children }) {
    return (
        <div className={styles.modal}>
            <div className={styles.modal__content}>
                <button onClick={action} className={styles.close}><BiX className={styles.close__icon} title='Fechar' /></button>
                { children }
            </div >
        </div >
    )

}