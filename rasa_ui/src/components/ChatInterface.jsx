import React from "react";
import botProfilePicture from "../assets/em.svg";
import bot1 from "../assets/Symbolize your stability (3).png";
import bot from "../assets/bot_4712027.png";
import user from "../assets/person_11103795.png";
import user1 from "../assets/user_1144709.png";
const ChatInterface = (props) => {
  const { botMessages, userMessages } = props;

  return (
    <>
      <div className="overflow-x-auto w-full h-full">
        <div className="chat-window flex flex-col h-full w-full">
          {/* Render bot Messages */}
          {botMessages.map((message, index) => {
            return (
              <div
                className="bot-message flex justify-start px-4 text-xl gap-1"
                key={index}
              >
                <img
                  // src={botProfilePicture}
                  src={bot}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover cursor-pointer"
                />
                <div className="bot-msg-bubble bg-white  text-black p-4 mb-2 rounded-xl text-base">
                  {message.message}
                </div>
              </div>
            );
          })}
          {/* Render User Messages */}
          {userMessages.map((message, index) => {
            return (
              <div
                className="user-message flex justify-end px-4 text-lg gap-1"
                key={index}
              >
                <div className="user-msg-bubble bg-green-700 text-white p-4 mb-2 rounded-xl text-base">
                  {message.message}
                </div>
                <img
                  // src={botProfilePicture}
                  src={user1}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
