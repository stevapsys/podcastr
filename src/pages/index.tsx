
import { useEffect } from "react"

export default function Home(props) {

  //Chamada de API em SPA - Não indicada quando as informações precisam aparecer já quando a página é inicializadas

  // useEffect( () => {
  //     fetch('http://localhost:3333/episodes')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }, [])
  
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

//Chamada de API em SSR
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()

//   return {
//     props: {
//       episodes: data, 
//     }
//   }
// }


//Chamada em SSG - Para quando não precisa atualizar a API o tempo todo. O Revalidate calcula de quanto em quanto tempo a API vai atualizar 
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data, 
    },
    revalidate: 60 * 60 * 8, 
  }
}