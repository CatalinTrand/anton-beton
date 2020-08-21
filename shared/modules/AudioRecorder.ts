import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Platform } from 'react-native';
import { Recorder, RecorderError } from '@react-native-community/audio-toolkit';
import Utils from './Utils';

type func = (...args: string[]) => void;

function useRecorder(): [boolean, func, any] {
  const [isRecording, setRecording] = useState(false);
  const recorder = useRef<Recorder>(new Recorder(''));
  const [startTime, setStartTime] = useState(new Date());
  const extension = Platform.OS === 'android' ? `mp3` : `mp4`;
  const calculateDuration = (start: Date, end: Date) => {
    let minutes = end.getMinutes() - start.getMinutes();
    let seconds = end.getSeconds() - start.getSeconds();
    if (seconds < 0) {
      seconds = 60 + seconds;
      minutes -= 1;
    }
    if (minutes < 0) {
      minutes = 0;
    }
    return `${minutes}:${`0${seconds}`.slice(-2)}`;
  };
  useEffect(() => {
    const audioTempFile = `audio_message.${extension}`;
    Utils.audioPermission().then((result) => {
      if (result) {
        (recorder as MutableRefObject<Recorder>).current = new Recorder(audioTempFile, {
          encoder: '',
          format: '',
          bitrate: 256000,
          channels: 2,
          sampleRate: 44100,
          quality: 'max',
        });
      }
    });
  }, [extension]);
  const stopRecording = (callBack: (arg0: string, arg1: string, arg2: string) => void) => {
    recorder.current.stop();
    const audioTempFile = `audio_message.${extension}`;
    const audioFile = `${Utils.getBasePath()}/${audioTempFile}`;
    setRecording(false);
    const duration = calculateDuration(startTime, new Date());
    if (callBack) {
      callBack(audioFile, extension, duration);
    }
  };
  const startRecording = () => {
    setStartTime(new Date());
    recorder.current.prepare((error: RecorderError | null) => {
      if (error) {
        // Alerts.simpleAlert('prepare error', JSON.stringify(error));
      } else {
        recorder.current.record((err: RecorderError | null) => {
          if (err) {
            // Alerts.simpleAlert('record error', JSON.stringify(error));
          }
        });
      }
    });
    setRecording(true);
  };
  return [isRecording, startRecording, stopRecording];
}

export default useRecorder;
