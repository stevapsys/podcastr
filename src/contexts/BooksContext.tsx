import { createContext, useState } from 'react'; 

type Book = {
    title: string; 
    ratings: number; 
    author: string;
    curator: string; 
    pages: number;  
};

type BookCtxInfo = {

 bookList: Book[]; 
 currentBookIndex: number; 
 infoModal: (book: Book) => void; 
 closeModal: () => void; 

}; 



export const BookContext = createContext({} as BookCtxInfo); 
