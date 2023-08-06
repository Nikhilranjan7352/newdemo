import React, { useState, useEffect } from "react";
import "./MessageApp.css";

const MessageApp = () => {
  const [textValue, setTextValue] = useState("");
  const [newTextValue, setNewTextValue] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    if (textValue != "") {
      const newTextValueHere = textValue;
      setNewTextValue(newTextValueHere);
      setTextValue("");
    } else {
      return;
    }
  };

  return (
    <>
      {/* <div className="bubble-reciever" style={{display:'flex', flexWrap:'wrap', justifyContent:'flex-start', width:'80%'}}>

    <span style={{width:'80%'}}>
    <Typography variant="h6" style={{color:'#5b00a1'}}>
      {sessionStorage.getItem('artistName')}
    </Typography>
    Hey! Welcome to my Direct Line. You can send me a DM here (upto 500 chrs) and I will respond only to you. Just avoid bad language coz I would hate that. Let’s chat!
    <br/>
      <small style={{color:'grey', float:'right'}}>11:23 AM</small>
    </span>
      </div> */}

      <div
        className="bubble-sender"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          width: "80%"
        }}
      >
        <span style={{ width: "20%" }}>
          <img
            src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
            style={{
              height: "50px",
              width: "50px",
              border: "2px solid black",
              borderRadius: "50%"
            }}
          />
        </span>

        <span style={{ width: "80%" }}>
          {newTextValue}
          <br />
          <span
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end"
            }}
          >
            <small style={{ color: "grey", float: "right" }}>11:23 AM</small>
          </span>
        </span>
      </div>

      <div
        className="bubble-reciever"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          width: "80%",
          marginBottom: "80px"
        }}
      >
        <span style={{ width: "20%" }}>
          <img
            src={sessionStorage.getItem("artistPic")}
            style={{
              height: "50px",
              width: "50px",
              border: "2px solid black",
              borderRadius: "50%"
            }}
          />
        </span>

        <span style={{ width: "80%" }}>
          <h2 style={{ color: "#5b00a1" }}>Adams</h2>
          Hey Rahul, thanks for all the love and wishes, let’s talk about you
          first, tell me something about yourself.
          <br />
          <small style={{ color: "grey", float: "right" }}>11:23 AM</small>
        </span>
      </div>

      {/* <div  
      style={{display:'flex', flexWrap:'wrap', justifyContent:'flex-start', width:'80%', marginBottom:'180px'}}>
      
      </div>

      <div  
      style={{display:'flex', flexWrap:'wrap', justifyContent:'flex-start', width:'80%', marginBottom:'180px'}}>
      
      </div> */}

      <span>
        {/* <form className="chat-input">
          <input type="text" />
          <img src={messagePin} />
          <button type="submit" style={{color:'white', display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
            <img src={messageBtn1} />
            99 
            <img src={coin} height="18px" />
          </button>
        </form> */}

        <form
          style={{
            position: "fixed",
            bottom: "0",
            marginBottom: "80px",
            width: "100%"
          }}
        >
          <div className="col-lg-10 mb-3">
            <div className="input-group mycustom">
              <input
                value={textValue}
                type="text"
                required
                placeholder="Send Message"
                maxLength="30"
                onChange={(e) => setTextValue(e.target.value)}
              />
              {/* <img id="messagePin" src={messagePin} /> */}
              <div className="input-group-prepend">
                <button
                  type="submit"
                  style={{
                    color: "white",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly"
                  }}
                  onClick={sendMessage}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </form>
      </span>
    </>
  );
};

export default MessageApp;
