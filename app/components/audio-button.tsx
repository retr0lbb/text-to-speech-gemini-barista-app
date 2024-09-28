"use client"
import { useRef, useState, useEffect } from "react";
import { Volume2, Pause } from "lucide-react";

interface audiProps {
    audioID: string
}

export function AudioButton({audioID}: audiProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if(audioID.length <= 0){
    return;
  }

  const playAudio = async () => {
    if (audioRef.current) {
      if (!isPlaying) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Adiciona um listener para quando o áudio terminar
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener("ended", handleEnded);

      // Cleanup para remover o listener quando o componente desmontar
      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  return (
    <div>
      <button className=" flex items-center justify-center text-slate-800" onClick={playAudio}>
        {!isPlaying ? <Volume2 /> : <Pause />}
      </button>

      <audio ref={audioRef}>
        <source
          src={`/audio/${audioID}.mp3`}
          type="audio/mpeg"
        />
        Seu navegador não suporta arquivos de áudio.
      </audio>
    </div>
  );
}
