import { format, parseISO } from 'date-fns'; 
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import ptBR from 'date-fns/locale/pt-BR'; 
import Image from 'next/image';
import styles from './episode.module.scss'; 
import Link from 'next/link';





type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    description: string; 
    members: string;
    duration: number; 
    durationAsString: number; 
    url: string; 
    publishedAt: string; 
}

type EpisodeProps = {
    episode: Episode
}

export default function Episode ({episode}: EpisodeProps) {

    const router = useRouter();

    // Caso o fallback for true

    // if (router.isFallback) {
    //     return (
    //         <p>Carregando...</p>
    //     )
    // }

    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar"/>
                    </button>
                </Link>
                <Image width={700} 
                height={300}
                src={episode.thumbnail}
                objectFit="cover" />

                <button type="button">
                    <img src="/play.svg" alt="Tocar Episódio"/>
                    
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div className={styles.description} 
            dangerouslySetInnerHTML= {{ __html: episode.description}} />
        </div>
        
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    const {data} = await  api.get('/episodes', {
        params: {
          _limit: 2, 
          _sort: 'published_at',
          _order: 'desc'
        }
    })

    const paths = data.map(episode => {
        return {
            params: {
                slug: episode.id
            }
        }
    })


    return {
        paths: [], 
        fallback: 'blocking'
    }
    
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params; 
    const { data } = await api.get(`/episodes/${slug}`)

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail, 
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', {locale: ptBR}),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url
    }

    return{
        props: {
            episode
        },
        revalidate: 60 * 60 * 24, //atualiza o conteúdo a cada 24h
    }
}
