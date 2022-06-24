import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import mic from "../../Assets/mic.png";

const Dictaphone = () => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
      <img
        style={{
          marginTop: "10px",
          marginLeft: "15px",
          width: "30px",
          cursor: "pointer",
          backgroundColor: listening ? "red" : "transparent",
          padding: "5px",
          borderRadius: "50px",
        }}
        src={mic}
        onClick={SpeechRecognition.startListening}
      />
    </div>
  );
};
export default Dictaphone;
