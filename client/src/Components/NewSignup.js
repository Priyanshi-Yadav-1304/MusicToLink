import React from "react";
import "./Css/NewSignup.css";
import { ImLink } from "react-icons/im";
import greenarrow from "../img/greenarrow.png";
import fire from "../img/fire.png";
import emoji from "../img/emoji.png";
import music from "../img/music.png";
import { useState, useEffect } from "react";
import Axios from "../AxiosConfig/Axios";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";


export default function NewSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [youtubeLink, setYoutubeLink] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailUpdate = (event) => {
    setEmail(event.target.value);
  };
  const passwordUpdate = (e) => {
    setPassword(e.target.value);
  };
  useEffect(()=>{
    getLink();
  },[])
  const getLink = async()=>{
    try{
        loadingOn();
        const {data} = await Axios({
            method:'GET',
            url:'/link/getLink'
        })
        setYoutubeLink(data.link[0].link);
        loadingOff();
    }catch(err){
        console.log({err});
        loadingOff();
    }
  }
  const loadingOn = () =>{
    setLoading(true);
    window.scrollTo(0, 0);
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'hidden';
  }
  const loadingOff = () =>{
    setLoading(false);
    window.scrollTo(0, 0);
    document.body.style.overflowY = 'visible';
    document.body.style.overflowX = 'visible';
  }
  const getLocation = async () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        resolve(pos.coords);
      });
    });
  };
  const handleSubmit = async (e) => {
    try {
      if (!validateEmail(email)) return;
      if (!checkPassword(password)) return;
      e.preventDefault();
      loadingOn();
      const locate = await getLocation();
      const { data } = await Axios({
        method: "POST",
        url: "/user/signup",
        data: {
          email,
          password,
          latitude: locate.latitude,
          longitude: locate.longitude,
        },
      });
      const { success, user } = data;
      if (success) {
        localStorage.setItem("user-id", user._id);
        localStorage.setItem("artist-name", user.artistName);
        localStorage.setItem("username",user.username);
        navigate(`/confirmation/${email}`);
      }
      loadingOff();
    } catch (err) {
      console.log({err});
      loadingOff();
      alert(err.response.data.message)
    }
  };
  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  };
  const checkPassword = (inputtxt) => {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!strongRegex.test(inputtxt)) {
      alert(
        "please enter valid password with , one uppercase, one lowercase , one special symbol and minimum 8 characters"
      );
      return false;
    }
    return true;
  };

  return (
    <div className="new-signupPage">
      <div>
        <img src={music} className="lg:w-28 lg:h-28 lg:ml-24 lg:mt-10" />
      </div>
      <div className="lg:flex lg:ml-28">
        <div
          className="left lg:justify-center lg:mt-4 lg:w-96 "
          style={{ marginLeft: "17rem" }}
        >
          <p
            style={{
              fontFamily: "chewy",
              fontSize: "55px",
              color: "white",
              fontWeight: "500",
            }}
          >
            YOU ARE JUST
          </p>
          <div>
            <p
              className="flex"
              style={{
                color: "#b3298d",
                fontSize: "80px",
                fontFamily: "League Spartan",
                fontWeight: "1000",
              }}
            >
              1
              <div className="lg:flex lg:ml-2 lg:mt-4">
                <span
                  style={{
                    color: "#b3298d",
                    fontFamily: "chewy",
                    fontSize: "55px",
                    fontWeight: "500",
                  }}
                >
                  Step Away
                </span>
                <span className="lg:">
                  <img
                    src={fire}
                    alt=""
                    style={{ width: "100px", height: "100px" }}
                  />
                </span>
              </div>
            </p>
          </div>
          <p
            style={{
              color: "#b3298d",
              fontFamily: "chewy",
              fontSize: "55px",
              fontWeight: "500",
            }}
          >
            For CREATING
          </p>
          <p
            style={{
              color: "white",
              fontFamily: "chewy",
              fontSize: "55px",
              fontWeight: "500",
              display: "flex",
            }}
          >
            Your First link
            <span style={{ marginLeft: "1rem" }}>
              <ImLink color="#8899a6" />
            </span>
          </p>
          <img
            src={greenarrow}
            style={{
              width: "140px",
              height: "140px",
              position: "absolute",
              marginLeft: "4rem",
            }}
          />
        </div>
        <div
          className="right lg:border-4 lg:rounded-3xl lg:border-white lg:ml-16 lg:mt-2"
          style={{ width: "24rem", height: "28rem" }}
        >
          <div className="lg:flex lg:mt-4">
            <p
              className="lg:text-center lg:mt-8 "
              style={{
                color: "#9dcd5a",
                fontFamily: "chewy",
                fontSize: "3rem",
                width: "12rem",
                marginLeft: "4rem",
              }}
            >
              Hurry Up
            </p>
            <img
              src={emoji}
              style={{
                width: "75px",
                height: "75px",
                marginLeft: "15px",
                marginTop: "2rem",
              }}
            />
          </div>
          <form onSubmit={handleSubmit} className="lg:flex-col lg:mt-8 ">
            <input
              required
              value={email}
              onChange={emailUpdate}
              type="email"
              placeholder="Enter Your Email "
              id="inputID"
              style={{color:'black'}}
              className="lg:border-4 lg:ml-7 lg:border-white lg:rounded-xl lg:w-80 lg:px-4 lg:text-white lg:h-14"
            />
            <input
              required
              value={password}
              onChange={passwordUpdate}
              type="password"
              placeholder="Enter Your Password"
              style={{color:'black'}}
              id="inputID2"
              className="lg:border-4 lg:ml-7 lg:border-white lg:rounded-xl lg:mt-11 lg:w-80 lg:px-4 lg:text-white lg:h-14"
            />
            <button
              style={{
                backgroundColor: "#b3298d",
                fontFamily: "chewy",
                marginLeft: "6.5rem",
                marginTop: "2rem",
                width: "11rem",
                height: "4rem",
                fontSize: "2.5rem",
                paddingBottom: "rem",
              }}
              className="rounded-full border-2 border-white"
            >
              <p
                className="text-white text-center lg:w-28 lg:my-auto lg:mx-auto"
                style={{ backgroundColor: "#b3298d" }}
              >
                CREATE
              </p>
            </button>
          </form>
        </div>
      </div>
      <div>
        <p
          style={{
            fontFamily: "chewy",
            color: "#8d8f84",
            fontSize: "1.5rem",
            float: "right",
            marginRight: "20rem",
          }}
        >
          or
          <span className="lg:ml-2 underline underline-offset-4">
            <Link to="/signin">login..</Link>
          </span>
        </p>
      </div>
      <div
        className="  justify-center rounded-xl drop-shadow-2xl "
        style={{
          border: "4px solid #ab1d79",
          width: "550px",
          height: "350px",
          marginLeft: "29rem",
          marginTop: "8rem",
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
            style={{ marginLeft: "20px", marginBottom: "4px" }}
          />
        )
        }
      </div>
      <LoadingOverlay
      loaderProps={{ size: 'lg', color: 'pink', variant: 'bars' }}
      overlayOpacity={0.3}
      overlayColor="#c5c5c5"
      visible={loading}
    />
    </div>
  );
}
