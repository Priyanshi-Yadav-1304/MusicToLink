import React, { useEffect, useState } from "react";
import "./Css/PlayMusic.css";
import "./Css/Profile.css";
import instagram from "./assests/icons8-instagram-48.png";
import youtube from "./assests/icons8-youtube-48.png";
// import phone from "./assests/icons8-phone-50.png";
// import whatsapp from "./assests/icons8-whatsapp-32.png";
import correct from "./assests/icons8-correct-48 (2).png";
// import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  BackgroundImage,
  Button,
  FileInput,
  Group,
  LoadingOverlay,
  Modal,
  TextInput,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import Axios from "../AxiosConfig/Axios";
import MenuBar from "./MenuBar";
import { QRCode } from "react-qr-svg";
import UserContact from "./UserContact";

function Profile() {
  const [User, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState("");
  const [about, setAbout] = useState("");
  const [profession, setProfession] = useState("");
  const [instaId, setInstaId] = useState("");
  const [service, setService] = useState([]);
  const [url, setUrl] = useState([]);
  const [loader, setLoader] = useState(false);
  const [latestSong, setLatestSong] = useState("");
  const [embededUrl, setEmbededUrl] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [QRCodeData, setQRCodeData] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [countNonEmptyUrls, setCountNonEmptyUrls] = useState(0);
  const { username } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    isLoggedIn();
    getServices();
  }, []);
  const isLoggedIn = async () => {
    try {
      const { data } = await Axios({
        method: "GET",
        url: "/user/isLoggedIn",
      });
      setIsLogIn(data.isLoggedIn);
    } catch (err) {
      console.log({ err });
    }
  };

  const getServices = async () => {
    try {
      setLoader(true);
      const { data } = await Axios({
        method: "GET",
        url: "/service/getService",
      });
      const { services } = data;
      setService(services);
      getUserProfile(services);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log({ err });
    }
  };
  const getUserProfile = async (services) => {
    try {
      const { data } = await Axios({
        method: "POST",
        url: `/user/profile/${username}`,
      });
      const { user, editable } = data;
      if (!user.isOnBoarded && !editable) {
        navigate("/onboarding");
      }
      setUser(user);
      handleEmptyUrls(user);
      setQRCodeData(user);
      let links = user.profileLinks.filter((link) =>
        link.song_url.includes("youtube")
      );
      setYoutubeLink(links.length === 0 ? "" : links[0].song_url);
      setEmbededUrl(user.latestSong.trim() ? true : false);
      setShowEdit(editable);
      let urlArray = [];
      services.forEach((link) => {
        let flag = true;
        user.profileLinks.forEach((newLink) => {
          if (link.secure_url == newLink.image_url) {
            urlArray = [...urlArray, newLink];
            flag = false;
          }
        });
        if (flag) {
          urlArray = [
            ...urlArray,
            { image_url: link.secure_url, song_url: "", service_id: link._id },
          ];
        }
      });
      setUrl([...urlArray]);
    } catch (err) {
      console.log({ err });
    }
  };
  const handleEmptyUrls = async(user) => {
    await user.profileLinks.forEach((service, index) => {
       if(true){
        setCountNonEmptyUrls(countNonEmptyUrls+1)
      }
    })
  }
  function handleChange(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  }
  const updateProfile = async () => {
    try {
      await Axios({
        method: "POST",
        url: "/user/updateProfile",
        data: {
          image: file,
          about,
          profession,
          instaId,
          username,
          latestSong,
          service: url,
        },
      });
      getUserProfile();
      setOpenModal(false);
    } catch (err) {
      console.log({ err });
    }
  };
  const openEditForm = () => {
    setInstaId(User.instaId);
    setAbout(User.about);
    setProfession(User.profession);
    setLatestSong(User.latestSong);
    setOpenModal(true);
  };
  const handleProfession = (e) => {
    if (e.target.value.length <= 40) setProfession(e.target.value);
  };
  const handleAbout = (e) => {
    if (e.target.value.length <= 250) setAbout(e.target.value);
  };
  const handleUrl = (e, index) => {
    const image_url = url[index].image_url;
    const song_url = e.target.value;
    let urlArray = url;
    urlArray[index] = { image_url, song_url };
    setUrl([...urlArray]);
  };
  const logout = async () => {
    try {
      await Axios({
        method: "GET",
        url: "/user/logout",
      });
      navigate("/");
    } catch (err) {
      console.log({ err });
    }
  };
  return (
    <>
      {User ? (
        <div className="profilepage">
          <div className="nav">
            {isLogIn ? <MenuBar /> : <div></div>}
            <h2>ONE BACKLINK</h2>
            {isLogIn ? (
              <h3 onClick={logout} className="logout">
                Log Out
              </h3>
            ) : (
              <div></div>
            )}
          </div>
          <Modal
            className="edit-profile"
            opened={openModal}
            onClose={() => setOpenModal(false)}
            title="Edit Profile"
          >
            <FileInput
              onChange={handleChange}
              label="Change profile"
              placeholder="upload profile"
              icon={<IconUpload size={14} />}
            />
            <TextInput
              label="Profession"
              className="edit-input"
              placeholder="Enter profession"
              value={profession}
              onChange={(e) => handleProfession(e)}
            />
            <TextInput
              className="edit-input"
              label="About"
              placeholder="Enter something about you"
              value={about}
              onChange={(e) => handleAbout(e)}
            />
            <TextInput
              className="edit-input"
              label="Instagram Id"
              placeholder="Enter your instagram id"
              value={instaId}
              onChange={(e) => setInstaId(e.target.value)}
            />
            <TextInput
              className="edit-input"
              label="Latest song on youtube"
              placeholder="Enter your latest song url from youtube"
              value={latestSong}
              onChange={(e) => setLatestSong(e.target.value)}
            />
            {url.map((s, index) => {
               return <Group key={index}>
                  <BackgroundImage
                    src={s.image_url}
                    className="profile-service-modal"
                  ></BackgroundImage>
                  <TextInput
                    className="edit-input link-input-modal"
                    value={s.song_url}
                    onChange={(e) => handleUrl(e, index)}
                  />
                </Group>
            })}
           
            <Group className="edit-input">
              <Button color="teal.7" onClick={updateProfile}>
                Save
              </Button>
              <Button color="red.7" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </Group>
          </Modal>

          <div className="profilefirst">
            <div className="pro1">
              <div className="prophoto">
                <img
                  style={{ height: "25vmin" }}
                  src={`${User?.image?.secure_url}`}
                  alt=""
                />
              </div>
              <div className="proname">
                <div>
                  <p className="name">{User.name}</p>
                  <img style={{ marginLeft: "2vmin" }} src={correct} alt="" />
                  {isLogIn && (
                    <button
                      style={{
                        border: "none",
                        padding: "1vmin",
                        color: "white",
                        cursor: "pointer",
                        backgroundColor: "#20a8d0",
                        marginTop: "1vmin",
                        marginLeft: "2vmin",
                      }}
                      onClick={() => openEditForm()}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
                <p className="job">
                  {User.profession || "Enter your profession"}
                </p>
                <p className="discription">
                  {User.about || "Enter something about you"}
                </p>
              </div>
            </div>
            <div className="pro2">
              <div className="applink">
                <div className="applinkdiv">
                  <div></div>
                  <img style={{ height: "4vmin" }} src={instagram} alt="" />
                  <p>
                    <a
                      href={`${User.instaId}`}
                      className="profile-links"
                      target="_blank"
                    >
                      Instagram
                    </a>
                  </p>
                  <div></div>
                </div>
                {embededUrl && (
                  <div className="applinkdiv">
                    <div></div>
                    <img style={{ height: "4vmin" }} src={youtube} alt="" />
                    <p>
                      <a
                        href={`${youtubeLink}`}
                        className="profile-links"
                        target="_blank"
                      >
                        Youtube
                      </a>
                    </p>
                    <div></div>
                  </div>
                )}
              </div>
              <div className={`${embededUrl ? "vedio-border" : ""} vedio`}>
                {embededUrl && (
                  <iframe
                    className="youtube-frame"
                    width="356"
                    height="200"
                    src={`https://www.youtube.com/embed/${User.latestSong.slice(
                      User.latestSong.indexOf("=") + 1
                    )}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
          <div className=" AppArea">
            {" "}
            <div className="QRCode-profile">
              <QRCode value={window.location.href} />
            </div>
            <div className="profile-services-area aa1 ">
              {User.profileLinks.map((service, index) => {
                if (service.song_url.trim()) {
                  return index < 4 ? (
                    <div key={index} className="playmusic-service-card ">
                      <BackgroundImage
                        className="playmusic-service"
                        src={`${service.image_url}`}
                        radius="sm"
                      ></BackgroundImage>
                      <a href={service.song_url} target="_blank">
                        <button className="play-btn">Play</button>
                      </a>
                    </div>
                  ) : showMore ? (
                    <div key={index} className="playmusic-service-card ">
                      <BackgroundImage
                        className="playmusic-service"
                        src={`${service.image_url}`}
                        radius="sm"
                      ></BackgroundImage>
                      <a href={service.song_url} target="_blank">
                        <button className="play-btn">Play</button>
                      </a>
                    </div>
                  ) : (
                    <div key={index}></div>
                  );
                } else {
                  return <div key={index}></div>;
                }
              })}
            {!showMore && countNonEmptyUrls < 3 && (<Button style={{backgroundColor:'blue'}} onClick={()=> setShowMore(true)}>Show More</Button>)}
            </div>
          </div>
          <UserContact />
        </div>
      ) : (
        <></>
      )}
      <LoadingOverlay visible={loader} overlayBlur={2} />
    </>
  );
}

export default Profile;
