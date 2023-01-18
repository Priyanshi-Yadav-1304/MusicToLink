import React from "react";
import "./Css/NewSignup.css";
import { ImLink } from "react-icons/im";
import greenarrow from "../img/greenarrow.png";
import fire from "../img/fire.png";
// import emoji from "../img/emoji.png";
import music from "../img/music.png";
import { useState} from "react";
import {  useNavigate, useParams } from "react-router-dom";
import Axios from "../AxiosConfig/Axios";
import { LoadingOverlay } from "@mantine/core";

export default function NewOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const {email} = useParams();
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        loadingOn();
        const user = await Axios({
            method:'POST',
            url:'/user/verifyOtp',
            data:{
                email,
                otp
            }
        })
        loadingOff();
        navigate(`/payment`);
    }catch(err){
        console.log({err});
        if(err.response.status === 401){
            alert('You have entered wrong otp');
        }else{
            alert('Unable to verify')
        }
        loadingOff();
    }
  };
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
  return (
    <div className="new-paymentPage">
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
          className="right lg:border-4 lg:rounded-3xl lg:border-white lg:ml-16 lg:mt-10"
          style={{ width: "24rem", height: "20rem" }}
        >
          <div className="lg:flex lg:mt-4">
            <p
              className="lg:text-center lg:mt-8 "
              style={{
                color: "#9dcd5a",
                fontFamily: "chewy",
                fontSize: "22px",
              }}
            >
              Your Confimation code have been sent to {email}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="lg:flex-col lg:mt-8 ">
            <input
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="number"
              style={{color:'black'}}
              placeholder="Confirmation Code"
              id="inputID3"
              className="lg:border-4 lg:text-center lg:ml-7 lg:border-white lg:rounded-xl  lg:w-80 lg:px-4 lg:text-white lg:h-14"
            />
            <button
              style={{
                backgroundColor: "#b3298d",
                fontFamily: "chewy",
                marginLeft: "6.5rem",
                marginTop: "2rem",
                width: "11rem",
                fontSize: "2.5rem",
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
            <a href="">login..</a>
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
          marginTop: "10rem",
        }}
      >
        {/**width: "500px",
          height: "345px", */}
        <iframe
          title="youtube"
          width="500px"
          height="300px"
          className="mt-6"
          src={"https://www.youtube.com/embed/Pp8OKnXcxtQ"}
          style={{ marginLeft: "20px", marginBottom: "4px" }}
        />
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
