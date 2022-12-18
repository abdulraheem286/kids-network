import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const DictaphoneStore = ({ setstoreSearch, setstoremic }) => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  React.useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
    SpeechRecognition.startListening();
    setTimeout(() => setstoremic(false), 4000);
  }, []);

  listening && setstoreSearch(transcript);

  return <div></div>;
};
export default DictaphoneStore;
