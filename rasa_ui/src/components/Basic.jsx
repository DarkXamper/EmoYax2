import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import music from "../assets/SecretGarden.mp3";
import lg3 from "../assets/em.svg";
import bg1 from "../assets/rockWater.jpg";
import "./Basic.css";
import ChatInterface from "./ChatInterface";

// const botMessages = [
//   {
//     message: "Hi, I'm Emily. Nice to meet you!",
//     isBot: true,
//   },
//   {
//     message: "How can I help you today?",
//     isBot: true,
//   },
//   {
//     message: "I'm looking to buy a car.",
//     isBot: true,
//   },
//   {
//     message: "What kind of car do you want?",
//     isBot: true,
//   },
// ];
// const userMessages = [
//   {
//     message: "Hello!",
//     isBot: false,
//   },
//   {
//     message: "I would like to buy a car.",
//     isBot: false,
//   },
//   {
//     message: "What kind of car do you want?",
//     isBot: false,
//   },
// ];

const Basic = () => {
  const [inputText, setInputText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [loopMusic, setLoopMusic] = useState(false);
  const audioRef = useRef(null);
  const musicIconRef = useRef(null);
  const [userMessages, setUserMessages] = useState([]);
  const [botMessages, setBotMessages] = useState([
    {
      message: "Hi, I'm EmoYax. Nice to meet you!",
      isBot: true,
    },
    {
      message: "How can I help you today?",
      isBot: true,
    },
  ]);

  const playAudio = () => {
    const audio = audioRef.current;
    // const audio = document.getElementById("audio");
    // const musicIcon = document.getElementById("music-icon");
    // const musicIconSvg = musicIconRef.current;
    // const musicIconId =
    //   window.innerWidth >= 768 ? "music-icon-desktop" : "music-icon-mobile";
    // const musicIcon = document.getElementById(musicIconId);
    const musicIcons = document.querySelectorAll(".music-icon");

    console.log("isPlaying:", isPlaying);
    // console.log("musicIcon:", musicIconSvg);

    if (audio.paused || audio.ended) {
      audio.play();
      setIsPlaying(true);
      //toggle for a spinning animating music icon svg
      // musicIcon.classList.add("spin-music-icon");
      // musicIconSvg.classList.add("spin-music-icon");
      // Toggle the class for all music icons
      musicIcons.forEach((icon) => icon.classList.add("spin-music-icon"));
    } else {
      audio.pause();
      setIsPlaying(false);
      // musicIcon.classList.remove("spin-music-icon");
      // musicIconSvg.classList.remove("spin-music-icon");
      // Toggle the class for all music icons
      musicIcons.forEach((icon) => icon.classList.remove("spin-music-icon"));
    }

    // Force a reflow to ensure the class is properly added/removed
    // musicIconSvg.style.animation = "none";
    // void musicIconSvg.offsetWidth; // Trigger a reflow
    // musicIconSvg.style.animation = null;
    // musicIconSvg.classList.toggle("spin-music-icon", !isPlaying);

    //Toggle the spin-music-icon class based on the isPlaying state
    // if (isPlaying) {
    //   musicIcon.classList.add("spin-music-icon");
    // } else {
    //   musicIcon.classList.remove("spin-music-icon");
    // }
  };
  const handleAudioEnded = () => {
    // const musicIcon = document.getElementById("music-icon");
    const musicIcon = musicIconRef.current;
    musicIcon.classList.remove("spin-music-icon");
    setIsPlaying(false);

    if (!loopMusic) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      musicIcon.classList.add("spin-music-icon");
    }
  };

  const handleUserInput = async () => {
    const response = await fetch(
      "http://localhost:5005/webhooks/rest/webhook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: "user",
          message: inputText,
        }),
      }
    );
    const responseData = await response.json();
    const newBotMessages = responseData.map((message) => ({
      message: message.text,
      isBot: true,
    }));
    setBotMessages((prevMessages) => [...prevMessages, ...newBotMessages]);
  };

  //function to handle user input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  //function to handle form submission
  const handleInputSubmit = (e) => {
    e.preventDefault();
    //send user input to rasa chatbot
    handleUserInput();

    //update user messages
    const newUserMessage = {
      message: inputText,
      isBot: false,
    };
    setUserMessages((prevMessages) => [...prevMessages, newUserMessage]);
    //clear the input state
    setInputText("");
  };

  useEffect(() => {
    const audio = audioRef.current;

    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, [loopMusic]);

  // useEffect(() => {
  //   const musicIcon = musicIconRef.current;
  //   const handleResize = () => {
  //     const musicIconId =
  //       window.innerWidth >= 768 ? "music-icon-desktop" : "music-icon-mobile";
  //     musicIcon.id = musicIconId;
  //   };

  //   // Add event listener for window resize
  //   window.addEventListener("resize", handleResize);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const backgroundStyle = {
    backgroundImage: `url(${bg1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    // backdropFilter: "blur(10px)",
    // filter: "blur(8px)",
  };
  console.log("i am lodinggggg");
  return (
    <>
      {" "}
      {/* <Link to="/sidebar">BTN</Link> */}
      <div className="relative w-full h-screen">
        <div
          className=" h-full bg-zinc-600 blur-[0px]"
          style={backgroundStyle}
        ></div>
        <div className="flex flex-col items-center h-full absolute inset-0 z-10">
          <div className="flex w-full">
            <div className="flex w-full justify-start ">
              <div className="backdrop-blur-[2px] w-full md:w-auto flex justify-between items-center">
                <img src={lg3} className="" alt="EmoYax Logo" />
                <div className="bg-zinc-600 rounded-full p-3 mr-2 block md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // height="24"
                    // width="24"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className=" md:h-6 md:w-6 h-4 w-4 text-white transition duration-200 cursor-pointer music-icon"
                    id="music-icon-mobile"
                    onClick={playAudio}
                    ref={musicIconRef}
                  >
                    <path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-6xl w-full h-full rounded-lg shadow-lg relative backdrop-blur-[0px] md:backdrop-blur-none border border-white">
            <div className="flex w-full">
              <div className="flex w-full justify-end p-2">
                <div className="bg-zinc-600 rounded-full p-3 hidden md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // height="24"
                    // width="24"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className=" md:h-6 md:w-6 h-4 w-4 text-white transition duration-200 cursor-pointer music-icon"
                    id="music-icon-desktop"
                    onClick={playAudio}
                    ref={musicIconRef}
                  >
                    <path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" />
                  </svg>
                </div>

                <audio
                  src={music}
                  onEnded={handleAudioEnded}
                  id="audio"
                  ref={audioRef}
                ></audio>
              </div>
            </div>
            {/* chat interface right here */}
            <div className="flex w-full chat-container rounded-sm border">
              <ChatInterface
                botMessages={botMessages}
                userMessages={userMessages}
              />
            </div>
            <div className="mx-auto absolute bottom-12 left-0 right-0 w-4/5">
              <form onSubmit={handleInputSubmit}>
                <div className="flex justify-center border rounded-lg border-gray-200 backdrop-blur-lg">
                  <input
                    className={`outline-none pl-6 pr-0 py-4 w-full bg-transparent text-white placeholder-white text-lg`}
                    placeholder="what's on your mind today?"
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="h-auto pl-2 pr-3">
                    <svg
                      className="w-6 h-6 text-white hover:text-green-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Basic;
