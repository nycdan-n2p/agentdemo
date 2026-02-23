"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

interface AudioSamplePlayerProps {
  src?: string;
  title: string;
  className?: string;
  isPlaying?: boolean;
  onPlayRequest?: () => void;
  onEnded?: () => void;
}

export function AudioSamplePlayer({
  src,
  title,
  className,
  isPlaying: controlledPlaying,
  onPlayRequest,
  onEnded: onEndedProp,
}: AudioSamplePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [internalPlaying, setInternalPlaying] = useState(false);
  const isControlled = controlledPlaying !== undefined;
  const isPlaying = isControlled ? controlledPlaying : internalPlaying;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateDuration = () => {
      const d = audio.duration;
      if (isFinite(d) && d > 0) setDuration(d);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      updateDuration();
    };
    const handleLoadedMetadata = () => updateDuration();
    const handleDurationChange = () => updateDuration();
    const handleLoadedData = () => updateDuration();
    const handleEnded = () => {
      if (!isControlled) setInternalPlaying(false);
      setCurrentTime(0);
      onEndedProp?.();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("ended", handleEnded);

    updateDuration();

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [src, onEndedProp, isControlled]);

  useEffect(() => {
    if (controlledPlaying !== undefined && !controlledPlaying) {
      audioRef.current?.pause();
    }
  }, [controlledPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      if (!isControlled) setInternalPlaying(false);
    } else {
      if (onPlayRequest) onPlayRequest();
      audio.play();
      if (!isControlled) setInternalPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds) || isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn("flex flex-col", className)}>
      <audio ref={audioRef} src={src} preload="auto" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            onClick={togglePlay}
            disabled={!src}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            className="flex shrink-0 p-2.5 border border-[#EFEFEF] items-center justify-center rounded-full cursor-pointer bg-[#EFEFEF] hover:bg-[#EFEFEF]/80 hover:border-primary/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.95 }}
          >
            <div className="h-5 w-5 flex items-center justify-center text-primary">
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Pause className="h-5 w-5" fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>

          <div className="flex-1 min-w-0">
            <div className="relative h-1.5 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-primary rounded-full transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between pl-[52px] text-xs text-muted-foreground tabular-nums">
          <span>{formatTime(currentTime)}</span>
          <span>{src ? (duration > 0 ? formatTime(duration) : "0:00") : "--:--"}</span>
        </div>
      </div>
    </div>
  );
}
