
import { GetStaticProps } from 'next';
import { api } from "../services/api";
import styles from './home.module.scss'; 
import Link from 'next/link';


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


  return (
    <div className={styles.homepage}>
        
      <section className={styles.allEpisodes}>
         <h2>Todos os episódios</h2>
         <table cellSpacing={0}>
           <thead>
             <tr>
              <th>Capa</th>
              <th>Título</th>
              <th>Data da edição</th>
              <th>Curador</th>
              <th>Páginas</th>
              <th>Avaliações TAG</th>
              <th>Avaliações GoodRead</th>

             </tr>
           </thead>

           <tbody>
             {allBooks.map(book => {

               return (
                 <tr key={book.id}>
                   <td style={{ width: 195 }}>
                        <img src={book.thumbnail} alt=""/>
                   </td>
                   <td>
                      <Link href={`/books/${book.id}`}>
                        <a>{book.title}</a>
                      </Link> 
                    </td>
                   <td>{book.edition}</td>
                   <td>{book.author}</td>
                   <td>{book.pages}</td>
                   <td>{book.ratings}</td>
                   <td>Avaliação Good Readings</td>

                 </tr>
               )
             })}
           </tbody>

         </table>
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