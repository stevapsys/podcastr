import { createContext, ReactNode, useContext, useState } from 'react'; 

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
    isLooping: boolean; 
    isShuffling: boolean;
    hasNext: boolean;
    hasPrevious: boolean; 
    isDarkModeActive: boolean;  
    play: (episode: Episode) => void; 
    playList: (list: Episode[], index:number) => void; 
    tooglePlay: ()=> void; 
    toogleLoop: ()=> void; 
    toogleShuffle: ()=> void; 
    playNext: ()=> void; 
    playPrevious: ()=> void; 
    setPlayingState: (state: boolean) => void; 
    clearPlayerState: () => void; 
    darkMode: () => void; 

}; 

export const PlayerContext = createContext({} as PlayerContextDate);

type PlayerContextProviderProps = {
    children: ReactNode; 
}

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
  const [ episodeList, setEpisodeList ] =  useState([]); 
  const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false); 
  const [isLooping, setIsLooping]  = useState(false); 
  const [isShuffling, setIsShuffling] = useState(false); 
  const [isDarkModeActive, setDarkModeActive] = useState(false); 

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0); 
    setIsPlaying(true); 
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list); 
    setCurrentEpisodeIndex(index); 
    setIsPlaying(true); 
  }

  function tooglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toogleLoop() {
      setIsLooping(!isLooping)
  }

  function toogleShuffle() {
    setIsShuffling(!isShuffling)
}

  function setPlayingState(state: boolean) {
    setIsPlaying(state); 
  }

  function darkMode() {
    setDarkModeActive(!isDarkModeActive)
  }

  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  function clearPlayerState() {
      setEpisodeList([]); 
      setCurrentEpisodeIndex(0); 
  }

  function playNext() {

    if (isShuffling) {
        const nextRandomEpisodeIndex =  Math.floor(Math.random() * episodeList.length)
        setCurrentEpisodeIndex(nextRandomEpisodeIndex); 
    }else if (hasNext) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1); 
    }
  }

  function playPrevious() {

    if (hasPrevious) {
        setCurrentEpisodeIndex(currentEpisodeIndex - 1); 
    }
  }
  return (
    <PlayerContext.Provider value={{ 
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        hasNext, 
        hasPrevious, 
        isLooping,
        isShuffling,
        isDarkModeActive, 
        play, 
        tooglePlay, 
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        toogleLoop,
        toogleShuffle,
        clearPlayerState,
        darkMode,

    }}>
            {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
    return useContext(PlayerContext); 
}