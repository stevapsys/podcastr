import styles from './styles.module.scss'; 
import { useContext, useState } from 'react';
import { BookContext } from '../../contexts/BooksContext';

export function BookModal() {


  const { bookList, currentBookIndex, closeModal} = useContext(BookContext)

  const book = bookList[currentBookIndex]

 
    return(

        <div className={styles.modalContainer}>

          <div className={styles.modalContent}>

          <div className={styles.bookCover}>
            <img src={book?.thumbnail} alt={book.title} />            
            <h2>{book.title}</h2>

          </div>


            <div className={styles.rattings}>
                <div  className={styles.ratting}>
                    <strong >Nota - TAG: </strong>
                    <span>{book.ratings}</span>
                </div>
                <div  className={styles.ratting}>
                    <strong> Nota -  Good Reads:</strong>
                    <span>1891</span>
                </div>
            </div>

            <div className={styles.moreInfo}>
                <h3>Outros detalhes:</h3>
                <div className={styles.datailsInfo}>
                  <div>
                    <span className={styles.info}>Autor:</span>
                    <span>{book.author}</span>
                  </div>
                  <div>
                    <span className={styles.info}>Curador:</span>
                    <span>Nome do Autor</span>
                  </div>
                  <div>
                    <span className={styles.info}>Páginas:</span>
                    <span>{book.pages}</span>
                  </div>
                  <div>
                    <span className={styles.info}>Data de publicação na TAG:</span>
                    <span>{book.edition}</span>
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