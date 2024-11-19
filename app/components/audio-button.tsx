"use client";
import { useRef, useState, useEffect } from "react";
import { Volume2, Pause } from "lucide-react";
import { supabase } from "@/app/api/utils/supabase-client";

interface AudiProps {
  audioID: string;
}

export function AudioButton({ audioID }: AudiProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
     const fetchAudioURL = async () => {
       if (!audioID) {
         alert("No audio file found");
         return;
       }

       const { data } = await supabase.storage
         .from("image_bucket")
         .getPublicUrl(`${audioID}`);

        console.log(data)

       if (!data) {
         console.error("Erro ao buscar áudio do Supabase:");
         alert("Erro ao carregar o arquivo de áudio.");
         return;
       }

       setAudioURL(data?.publicUrl || null);
     };

     fetchAudioURL();
  }, [audioID]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false);  // Retorna o ícone para o "play" quando o áudio terminar
      };
      audio.addEventListener("ended", handleEnded);

      // Cleanup para remover o listener quando o componente desmontar
      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  const playAudio = async () => {
    if (audioRef.current) {
      if (!isPlaying) {
        try {
          setIsPlaying(true);
          await audioRef.current.play();
        } catch (error) {
          throw error
        }finally{
          setIsPlaying(false);
        }
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  return (
    <div>
      <button
        className="flex items-center justify-center text-slate-800"
        onClick={playAudio}
      >
        {!isPlaying ? <Volume2 /> : <Pause />}
      </button>

      {audioURL ? (
        <audio ref={audioRef}>
          <source src={audioURL} type="audio/mpeg" />
          Seu navegador não suporta arquivos de áudio.
        </audio>
      ) : (
        <p>Carregando áudio...</p>
      )}
    </div>
  );
}
