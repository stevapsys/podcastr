import Link from 'next/link';

import styles from './styles.module.scss'; 

export function Header() {

 

    return(
        <header className={styles.headerContainer}>
             <Link href={`/`}>
                 <a><img src="/tag.png" alt="TAG" width='30%' /></a>
             </Link> 

            <div className={styles.headerTitle}>
                <h1>Comparativo de notas</h1>
                <strong>Associados TAG x Avalições Good Reads</strong>
            </div>

        </header>
    );
}