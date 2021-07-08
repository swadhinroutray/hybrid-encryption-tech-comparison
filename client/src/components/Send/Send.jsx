import React, { useState } from "react";
import "./Send.css";
const Send = () => {
  const [toggle, settoggle] = useState(0);
  const handleClick = () => {
    if (!toggle) settoggle(1);
    else settoggle(0);
  };
  return (
    <div>
      <h1 className="heading">Send file to server</h1>
      <button className="receiveFileBtn">Go to received files page</button>
      <p className="para">Upload the file below</p>
      <form className="formClass" action="/action_page.php">
        <input className="fileBtn" type="file" id="myFile" name="filename" />
        <input className="submitBtn" type="submit" value="Send File" />
      </form>
    </div>
  );
};

export default Send;
