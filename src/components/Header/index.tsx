import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss'; 

export function Header() {

    //conferir a formatação exata que quer na documentação do Date-fns
    const currentDate = format(new Date(), 'EEEEEE, d MMM', {
        locale: ptBR, 
    });

    return(
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcastr"/>

            <p>O melhor para você ouvir, sempre</p>

            <span>{currentDate}</span>
        </header>
    );
}