import styles from './styles.module.scss'; 
import { useContext, useState } from 'react';
import { BookContext } from '../../contexts/BooksContext';

export function BookModal() {


  const { bookList, currentBookIndex, closeModal} = useContext(BookContext)

  const book = bookList[currentBookIndex]

 
    return(

        <div className={styles.modalContainer}>

          <div className={styles.modalContent}>
            <h2>{book?.title}</h2>

            <div className={styles.rattings}>
                <div  className={styles.rattingTag}>
                    <span>Nota dos assosiados da TAG: </span>
                    <span>2700</span>
                </div>

                <div>X</div>

                <div  className={styles.rattingGoodReads}>
                    <span>Nota Good Reads:</span>
                    <span>1891</span>
                </div>
            </div>

            <div className={styles.moreInfo}>
                <h3>Outros detalhes:</h3>
                <div className={styles.datailsInfo}>
                  <div className={styles.author}>
                    <span>Autor:</span>
                    <span>Nome do Autor</span>
                  </div>
                  <div className={styles.curador}>
                    <span>Curador:</span>
                    <span>Nome do Autor</span>
                  </div>
                  <div className={styles.pages}>
                    <span>Páginas:</span>
                    <span>270</span>
                  </div>
                </div>
                
            </div>
            <div className={styles.button}>
                <button type="button" onClick={closeModal}>Fechar </button>
            </div>
         
          </div>

        </div>
        
        
    );
}