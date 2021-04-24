
import { GetStaticProps } from 'next';
import { api } from "../services/api";
import styles from './home.module.scss'; 
import Link from 'next/link';
import { useContext, useState } from 'react'; 
import { BookContext } from '../contexts/BooksContext';



type Book = {
      id: string;
      pages: number;
      title: string; 
      thumbnail: string;
      author: string;
      edition: number; 
      isbn: number; 
      ratings: number; 
      publishedAt: string; 
      curator: string; 
  }


type HomeProps = {
  allBooks: Book[];
}

export default function Home({ allBooks }: HomeProps) {


  
  
  const { infoModal } = useContext(BookContext); 

  

  return (
    <div className={styles.homepage}>
        
      <section className={styles.cardBooks}>

    
        {allBooks.map(book => {
          return(
           <div>
             <div className={styles.cardContainer}>
              <div className={styles.card}>
                <div className={styles.cardImage}>
                    <Link href={`/books/${book.id}`}>
                          <a> <img src={book.thumbnail} alt={book.title} /></a>
                    </Link> 
                </div>
                <div  className={styles.cardContent}>
                  <h3>{book.title}</h3>
                  <span>{book.edition}</span>
                  <button type="button" onClick={() => infoModal(book)}> Compare as notas! </button>
                </div>
              </div>
            </div>

           </div>  
          
          )
         })}
      
      </section>

    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const {data} = await  api.get('/results', {
    params: {
      _sort: 'createdAt',
      _order: 'desc'
    }
  })

  const books = data.map(book => {
    return {
      id: book.objectId,
      pages: book.pages,
      title: book.name,
      thumbnail: book.cover.url, 
      author: book.author,
      edition: book.edition, 
      ratings: book.totalRatings,
      isbn: book.isbn,
      curator: book.curator, 
    };
  })

  const allBooks = books;

  return {
    props: {
      allBooks,
    },
    revalidate: 60 * 60 * 8, 
  }
}