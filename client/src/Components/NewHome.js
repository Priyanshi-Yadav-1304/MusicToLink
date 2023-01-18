import React from "react";
import "./Css/NewHome.css";
import { BsPlusLg, BsMessenger, BsFacebook, BsInstagram } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { BsSpotify } from "react-icons/bs";
import music from "../img/music.png";
import rings from "../img/rings.png";
import itune from "../img/itune.png";
import gaana from "../img/gaana.png";
import { ImSoundcloud2 } from "react-icons/im";
import { SiYoutubemusic } from "react-icons/si";
import { Link } from "react-router-dom";
import arrow from "../img/arrow.png";
import { useState, useEffect } from "react";
// import signup from "./NewSignup";
import Axios from "../AxiosConfig/Axios";
const NewHome = () => {
    const [youtubeLink, setYoutubeLink] = useState('');
    useEffect(()=>{
        getLink();
      },[])
      const getLink = async()=>{
        try{
            const {data} = await Axios({
                method:'GET',
                url:'/link/getLink'
            })
            setYoutubeLink(data.link[0].link);
        }catch(err){
            console.log({err});
        }
      }
  return (
    <div className="new-homePage">
      <div className="lg:flex lg:justify-between">
        <img src={music} alt="mtol" className="music mt-8 ml-14" />
        <button>
          <Link to="Signup">
            <BsPlusLg size="5rem" className="plus mt-14 mr-16" />
          </Link>
        </button>
      </div>

      <div
        className="flex mt-8 justify-center "
        style={{
          fontFamily: "Chewy",
          fontSize: "4rem",
          textShadow: "2px 2px #b84c65",
        }}
      >
        <p
          style={{
            color: "white",
            marginLeft: "40px",
          }}
        >
          CREATE
        </p>
        <p
          style={{
            color: "#eeba2b",
            marginLeft: "40px",
          }}
        >
          PROMOTE
        </p>
        <p
          style={{
            color: "white",
            marginLeft: "40px",
          }}
        >
          INSPIRE
        </p>
      </div>
      <div className="flex  grid-cols-2" style={{ marginLeft: "40rem" }}>
        <Link to="signup">
          <div>
            <button
              className="flex border-2 border-white"
              style={{
                fontFamily: "Alata",
                fontSize: "32px",
                color: "white",
                backgroundColor: "#b3298d",
                borderRadius: "50px",
                paddingRight: "20px",
                marginTop: "4rem",
              }}
            >
              <div className="flex ml-6">
                <p style={{ backgroundColor: "#b3298d" }}>Create NOW</p>
                <img src={arrow} style={{ backgroundColor: "#b3298d" }} />{" "}
              </div>
            </button>
          </div>{" "}
        </Link>

        <img
          src={rings}
          alt="ring"
          style={{ marginLeft: "8rem", width: "14rem" }}
        />
      </div>

      {/**youtube video link */}

      <div
        className=" flex justify-center rounded-xl drop-shadow-2xl "
        style={{
          border: "4px solid #ab1d79",
          width: "550px",
          height: "350px",
          marginLeft: "32rem",
        }}
      >
        
       {
        youtubeLink.length > 0 && (
            <iframe
            title="youtube"
            width="500px"
            height="300px"
            className="mt-6"
            src={`https://www.youtube.com/embed/${youtubeLink.slice(youtubeLink.indexOf('=')+1)}`}
          />
        )
       }
      </div>
      <div
        className="justify-center "
        style={{
          display: "flex",
          marginTop: "6rem",
          borderTop: "0.5px solid #ab1d79",
          borderBottom: "0.5px solid #ab1d79",
        }}
      >
        <div
          style={{ marginTop: "16px", marginBottom: "16px" }}
          className="flex gap-x-44"
        >
          <BsSpotify
            color="#1ed760"
            style={{ width: "5rem", height: "5rem" }}
          />
          <SiYoutubemusic
            color="red"
            style={{ width: "5rem", height: "5rem" }}
          />
          <img src={itune} style={{ width: "5rem", height: "5rem" }} />
          <ImSoundcloud2
            color="#ff7513"
            style={{ width: "5rem", height: "5rem" }}
          />
          <div style={{ marginTop: "10px" }}>
            <img src={gaana} style={{ width: "10rem", height: "4rem" }} />
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: "10rem", fontSize: "1.8rem", fontStyle: "alata" }}
        className="text-white grid grid-rows-4 text-center font-semibold gap-y-5"
      >
        <a href="">Home</a>
        <a href="">About Musictolink</a>
        <a href="">Contact</a>
        <a href="">FAQs</a>
      </div>
      <div style={{ marginTop: "5rem" }}>
        <div
          style={{ fontStyle: "alata", color: "gray", fontSize: "2rem" }}
          className="font-medium text-center"
        >
          Reach Out to Chat
        </div>
      </div>
      <div
        className="flex justify-center gap-x-6"
        style={{ marginTop: "20px" }}
      >
        <BsMessenger
          color="#efeee9"
          style={{ width: "3rem", height: "3rem" }}
        />
        <BsInstagram
          color="#efeee9"
          style={{ width: "3rem", height: "3rem" }}
        />
        <BsFacebook color="#efeee9" style={{ width: "3rem", height: "3rem" }} />
        <TfiEmail color="#efeee9" style={{ width: "3rem", height: "3rem" }} />
      </div>
      <div
        className="flex font-medium justify-center"
        style={{ color: "#c0c0c0", marginTop: "10rem" }}
      >
        <div className=" flex pb-4">
          <p>© 2023</p>
          <p style={{ paddingLeft: "5px" }}>musictolink</p>
          <a
            href=""
            style={{ paddingLeft: "12px" }}
            className="underline underline-offset-2 "
          >
            Privacy Policy
          </a>
        </div>
      </div>

      {/*<div>
          <button
            className="border-2 border-white"
            style={{
              fontFamily: "Alata",
              fontSize: "28px",
              color: "white",
              backgroundColor: "#b3298d",
              borderRadius: "30px",
              paddingRight: "90px",
              paddingLeft: "10px",
            }}
          >
            Create NOW
          </button>
          <img src={rings} style={{ marginLeft: "16rem" }} />
        </div>}
      </div>

      {/*<div className="flex grid-cols-2  justify-center gap-x-96">
        <div className="border-2 border-red-900">
          <img src={music} alt="mtol" className="music mt-8" />
        </div>
        <div className="border-2 border-red-900 py-5">
          <BsPlusLg size="5rem" className="plus " />
        </div>
  </div>*/}
    </div>
  );
};
export default NewHome;
