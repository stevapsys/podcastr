import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import { usePlayer } from '../../contexts/PlayerContext';


import styles from './styles.module.scss'; 

export function Header() {

    const {
        darkMode,
        isDarkModeActive
     } = usePlayer(); 


    //conferir a formatação exata que quer na documentação do Date-fns
    const currentDate = format(new Date(), 'EEEEEE, d MMM', {
        locale: ptBR, 
    });

    return(
        <header className={ isDarkModeActive ? styles.headerContainerDarkMode : styles.headerContainer}  >
             <Link href={`/`}>
                 <a><img src="/logo.svg" alt="Podcastr"/></a>
             </Link>

            <p>O melhor para você ouvir, sempre</p>

            <span>{currentDate}</span>

            <button type="button" onClick={darkMode}> Dark mode </button>
        </header>
    );
}