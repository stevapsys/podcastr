import { createContext } from 'react'; 

type Episode = {
 title: string; 
 members: string; 
 thumbnail: string; 
 duration: number; 
 url: string; 
}; 

type PlayerContextDate = {
    episodeList: Episode[];
    currentEpisodeIndex: number; 
    isPlaying: boolean; 
    play: (episode: Episode) => void; 
    tooglePlay: ()=> void; 
    setPlayingState: (state: boolean) => void; 
}; 

export const PlayerContext = createContext({} as PlayerContextDate);