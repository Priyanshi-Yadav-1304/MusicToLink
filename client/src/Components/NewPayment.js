import React, { useEffect, useState } from "react";
import "./Css/NewPayment.css";
import fire from "../img/fire.png";
import musics from "../img/musics.png";
import Axios from "../AxiosConfig/Axios";
import { useNavigate } from "react-router";
import  Toggle  from "./Toggle";
export default function NewPayment() {
  const [showPage, setShowPage] = useState(false);
  const [offer, setOffer] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [toggled, setToggled] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    isLoggedIn();
    getPayment();
  }, []);
  const isLoggedIn = async () => {
    try {
      await Axios({
        method: "GET",
        url: "/user/isLoggedIn",
      });
      getOffers();
      setShowPage(true);
    } catch (err) {
      navigate("/");
      console.log({ err });
    }
  };
  const getOffers = async (req, res) => {
    try {
      const { data } = await Axios({
        method: "GET",
        url: "/offer/getOffer",
      });
      setOffer(data.offers[0]);
    } catch (err) {
      console.log({ err });
    }
  };
  const getPayment = async() =>{
    try{
      const res = await Axios({
        method:'GET',
        url:'/user/payment'
      });
    }catch(err){
      console.log({err});
    }
  }
  const handleToggle = () => {
    if(toggled){
      setToggled(false);
      return;
    }
    setToggle(!toggle);
    setToggled(true);
  }
  return (
    <>
      {showPage && (
        <div className="new-paymentPage">
          <div>
            <img
              src={musics}
              style={{
                width: "8rem",
                height: "8rem",
                margin: "auto",
                marginTop: "2rem",
              }}
            />
          </div>
          <p
            className=" lg:w-60 lg:mx-auto lg:mt-4"
            style={{
              fontFamily: "League Spartan",
              fontSize: "70px",
              color: "white",
              letterSpacing: "5px",
              textDecoration: "underline",
              textDecorationThickness: "2px",
              textUnderlineOffset: "7px",
            }}
          >
            PRICING
            <div style={{
              width:'100%',
              height:'5vmin',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
            }}
            onClick={handleToggle}
            >
              <Toggle/>
            </div>
              <div style={{
                fontSize:'2vmin',
                textDecoration:'none',
                marginLeft:'25vmin',
                width:'100%'
              }}
              >{toggle?'For Yearly/-':'For Monthly/-'}</div>
          </p>
          {/**You can write here code for toggle button */}
          <div
            className="lg:border-4 lg:border-white lg:rounded-2xl lg:mx-auto lg:mt-4 lg:mb-5 lg:pl-10 lg:pr-10"
            style={{ width: "42rem", height: "90rem" }}
          >
            <p
              className="text-white   lg:mt-8"
              style={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                fontSize: "50px",
                marginLeft: "8rem",
              }}
            >
              FOR HUSTLER
            </p>
            <p
              style={{
                fontFamily: "chewy",
                color: "white",
                fontSize: "60px",
                marginTop: "2px",
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
              }}
            >
              <span>{toggle?(offer?.yearly?.newPrice):(offer?.monthly?.newPrice)}/-</span>
              <span
              style={{
                textDecoration:'line-through',
                color:'gray',
                textDecorationColor:'red',
                fontSize:'5vmin'
              }}
              >{toggle?(offer?.yearly?.oldPrice):(offer?.monthly?.oldPrice)}
               {toggle?`/-`:(offer?.monthly?.oldPrice?'/-':"")}
              </span>
            </p>
            <button
              style={{
                marginLeft: "13rem",
                backgroundColor: "white",
                color: "#ab1d79",
                border: "3px solid #ab1d79",
                fontFamily: "chewy",
                paddingInline: "4px",
                paddingTop: "2px",
                paddingBottom: "2px",
                borderRadius: "8rem",
                marginTop: "1rem",
                width: "10rem",
                height: "4rem",
                fontSize: "28px",
              }}
            >
              Hustle Now!
            </button>
            <hr
              style={{
                borderTop: "1px solid #bbb",
                marginTop: "2rem",
              }}
            />
            <div className="flex justify-around mt-7 text-white">
              <img
                src={fire}
                style={{
                  width: "6rem",
                  height: "6rem",
                }}
              />
              <p
                style={{
                  marginTop: "20px",
                  fontFamily: "alata",
                  fontSize: "2rem",
                }}
              >
                UNLIMITED SONG LINKS
              </p>
            </div>
            <div className="flex justify-around mt-7 text-white">
              <img
                src={fire}
                style={{
                  width: "6rem",
                  height: "6rem",
                }}
              />
              <p
                style={{
                  marginTop: "20px",
                  marginRight: "2rem",
                  fontFamily: "alata",
                  fontSize: "2rem",
                }}
              >
                UNLIMITED QR CODES
              </p>
            </div>
            <div className="flex justify-around mt-7 text-white">
              <img
                src={fire}
                style={{
                  width: "6rem",
                  height: "6rem",
                  marginLeft: "2rem",
                }}
              />
              <p
                style={{
                  marginTop: "20px",
                  marginLeft: "2rem",
                  fontFamily: "alata",
                  fontSize: "2rem",
                }}
              >
                AUDIENCE LOYALITY FORM
              </p>
            </div>
            <div className="flex justify-center mt-7 text-white">
              <img
                src={fire}
                style={{
                  width: "6rem",
                  height: "6rem",
                  marginLeft: "1.5rem",
                }}
              />
              <p
                style={{
                  marginTop: "20px",
                  marginLeft: "2rem",
                  fontFamily: "alata",
                  fontSize: "2rem",
                }}
              >
                LIVE AUDIENCE LOCATION
              </p>
            </div>
            <div className="flex justify-center mt-7 text-white">
              <img
                src={fire}
                style={{
                  width: "6rem",
                  height: "6rem",
                  marginLeft: "2rem",
                }}
              />
              <p
                style={{
                  marginTop: "20px",
                  marginLeft: "2rem",
                  fontFamily: "alata",
                  fontSize: "2rem",
                }}
              >
                DETAILED DEMOGRAPHICS
              </p>
            </div>
            <div className="flex justify-center mt-7 text-white">
              <img
                src={fire}
                style={{
                  width: "6rem",
                  height: "6rem",
                }}
              />
              <p
                style={{
                  marginTop: "20px",
                  marginLeft: "2rem",
                  fontFamily: "alata",
                  fontSize: "2rem",
                }}
              >
                ENGAGING ARTIST PAGE
              </p>
            </div>
            <div className="flex justify-center mt-7 text-white">
              <img
                src={fire}
                style={{
                  width: "6rem",
                  height: "6rem",
                  marginRight: "3rem",
                }}
              />
              <p
                style={{
                  marginTop: "20px",
                  fontFamily: "alata",
                  fontSize: "2rem",
                  marginLeft: "1rem",
                }}
              >
                SOCIAL PROFILE LINKS
              </p>
            </div>
            <div className="flex justify-center mt-7 text-white">
              <img
                src={fire}
                style={{
                  width: "6rem",
                  height: "6rem",
                  marginRight: "2rem",
                }}
              />
              <p
                style={{
                  marginTop: "20px",
                  marginLeft: "2rem",
                  fontFamily: "alata",
                  fontSize: "2rem",
                }}
              >
                REAL TIME ANALYTICS
              </p>
            </div>
            <div className="flex justify-center mt-7 text-white">
              <img
                src={fire}
                style={{
                  width: "6rem",
                  height: "6rem",
                  marginLeft: "3rem",
                }}
              />
              <p
                style={{
                  marginTop: "20px",
                  marginLeft: "4rem",
                  fontFamily: "alata",
                  fontSize: "2rem",
                }}
              >
                LIVE AUDIENCE VISIBILITY
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
