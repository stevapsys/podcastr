import '../styles/global.scss'

import styles from '../styles/app.module.scss'
import { BookModal } from '../components/BookModal';
import { BookContext } from '../contexts/BooksContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {

  const [bookList, setBookList] = useState([]); 
  const [currentBookIndex, setCurrentEpisodeIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false)

  function infoModal(book) {
    setBookList([book]);
    setCurrentEpisodeIndex(0); 
    setModalOpen(true)
  }


  function closeModal() {
    setModalOpen(false);
  }

  return (
    <BookContext.Provider value={{bookList,  currentBookIndex, infoModal, closeModal}}>
      <div className={styles.wrapper}>
        <main>
         { isModalOpen && <BookModal />} 
          <Component {...pageProps} />
        </main>
      </div>
    </BookContext.Provider>
  )
}

export default MyApp
