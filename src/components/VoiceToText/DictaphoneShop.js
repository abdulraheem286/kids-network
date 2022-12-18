import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import mic from "../../Assets/mic.png";

const DictaphoneShop = ({ setproductsSearch, setshopmic }) => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  React.useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
    SpeechRecognition.startListening();
    setTimeout(() => setshopmic(false), 4000);
  }, []);

  listening && setproductsSearch(transcript);

  return <div></div>;
};
export default DictaphoneShop;
