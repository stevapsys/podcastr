import styles from './styles.module.scss'; 
import { useContext } from 'react';

export function BookModal() {

    return(

        <div className={styles.moreInfo}>
        <div className={styles.rattings}>
          <div>
            <span>Nota dos assosiados da TAG:</span>
            <span>Nota Good Reads:</span>
          </div>
         <div>
            <span>{book.ratings}</span>
            <span>x</span>
            <span>1000</span>  
         </div>
        </div>
        <div>
          <h2>Outros detalhes: </h2>
          <table  cellSpacing={0}>
          <thead>
              <tr>
                <th>Autor:</th>
                <th>Curador:</th>
                <th>Páginas:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{book.author}</th>
                <th>{book.curator}</th>
                <th>{book.pages}</th>
              </tr>
            </tbody>

          </table>

        </div>
        
 

    </div>
        
    );
}