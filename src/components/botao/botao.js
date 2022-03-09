import styles from './botao.module.css'

export default function Botao({ children, action }) {
    return <button onClick={action} className={styles.btn}>{children}</button>
}