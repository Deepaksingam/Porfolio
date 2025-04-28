import React, { useState,useEffect } from "react";
import EmailIcon from "../../Assets/svgs/email-svgrepo-com.svg";

function Navbar() {
  const [hideEmail, setHideEmail] = useState(true);
  const [copyText,setCopyText]   = useState('Copy');

  useEffect(()=>{
    if(copyText !== "Copy")
    {
        setTimeout(() => {
            setCopyText('Copy')
        }, 3000);
    }
  },[copyText])
  return (
<div className="headerBox">
<div className="leftHandSection">
  <div className="textField">Deepak Singam</div>
  <div
    className="alignEmail"
    onMouseEnter={() => setHideEmail(false)}
    onMouseLeave={() => setHideEmail(true)}
  >
    {!hideEmail && (
        <div className="tooltip-container">
             <img
        className="emailIcon"
        src={EmailIcon}
        onClick={() => {
          navigator.clipboard
            .writeText("singamdeepak5@gmail.com")
            .then(() => setCopyText('Copied!'))
            .catch((err) => console.error("Failed to copy:", err));
        }}
        alt="emailIcon"
        text="CopyEmailId"
      />
        <span className="tooltip-text">{copyText}</span>
      </div>

    )
    }

    <div className="textField">singmadeepak5@gmail.com</div>
  </div>
  <div className="textField">Available May 2025</div>
</div>
<div className="rightHandSection">
  <div className="textField">About</div>
  <div className="textField">Archive</div>
  <div className="textField">Blogs</div>
  <div className="textField">Contact</div>
</div>
</div>
  );
}

export default Navbar;