import React, { useState,useEffect } from "react";
import "./index.css";
import EmailIcon from "../../Assets/svgs/email-svgrepo-com.svg";
import Picture2 from "../../Assets/Images/Pic2.jpeg";
import Picture4 from "../../Assets/Images/Pic4.jpeg";
import PictureGif from "../../Assets/Images/Pic5.gif";
import CardGame from "../CardGame";
import ImageExtraction from "../ImageExtraction";
function HomeScreen() {
  

  
  return (
    <>
    <div className="pageContainer">
      
      <div className="headerText">
        <div>
            <div className="headerAlign">ABOUT</div>
            <div className="headerAlign">ME</div>
        </div>  </div>
        <div className="headerDesignation">
            <div>
                <img className="profilePictureTopLeft" src={Picture2} alt={"profilePicture"} />
            </div>
            <div>
            Deepak Singam,
            </div>
            <div>
                <img className="profilePictureTopRight" src={Picture4} alt={"profilePicture"} />
            </div>
            <div>
                <img className="profilePictureBottomLeft" src={PictureGif}  alt={"profilePicture"}/>
            </div>
            <div>
            Senior Software Engineer.
            </div>
         
        </div>
      <div className="">
        Technologies Known
      </div>
    </div>
    <CardGame/>
    <ImageExtraction/>
    </>
  );
}

export default HomeScreen;
