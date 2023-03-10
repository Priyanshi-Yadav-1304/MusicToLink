import React,{useEffect, useRef, useState} from 'react'
import './Css/PlayMusic.css'
import insta from './assests/icons8-instagram-26.png'
// import instagram from './assests/icons8-instagram-48.png'
import youtubemusic from './assests/play-icon-button-video-vector-isolated-illustration-symbol-white-business-modern-graphic-sign-shape-object-element-circle-web-148064268-removebg-preview.png'
// import phone from './assests/icons8-phone-50.png'
// import whatsapp from './assests/icons8-whatsapp-32.png'
// import profile from './assests/icons8-male-user-48.png'
import {Link, useNavigate, useParams} from 'react-router-dom'
// import { useSelector , useDispatch } from 'react-redux'
// import axios from 'axios'
import { BackgroundImage } from '@mantine/core'
import Axios from '../AxiosConfig/Axios'
import MenuBar from './MenuBar'
import UserContact from './UserContact'
import { QRCode } from 'react-qr-svg'

function PlayMusic() {
    const [song, setSong] = useState(null);
    const [showPage,setShowPage] = useState(false)
    const [youtubeLink, setYoutubeLink] = useState('');
    const [isLogIn, setIsLogIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        isLoggedIn();
       getSongDetails();
    }, []);
    const {username,songTitle} = useParams();
    const isLoggedIn = async() => {
        try{
           const {data} = await Axios({
              method:'GET',
              url:'/user/isLoggedIn'
            })
            setIsLogIn(data.isLoggedIn);
        }catch(err){
          console.log({err});
        }
    }
    const getSongDetails =  async () =>{
        try{
            const {data} = await Axios({
                method:'POST',
                url:'/song/getSongDetails',
                data:{
                    username,songTitle
                }
            })
            const {song} = data;
            song.socialUrl.map((link)=>{
                if(link?.name?.toLowerCase() === 'youtube'){
                    setYoutubeLink(link.song_url);
                }
            })
            if(Object.keys(song).length === 0){
                navigate('/')
            }
            setSong(song)
            setShowPage(true);
        }catch(err){
            console.log({err})
           
        }
    }
    const playYoutubeIframe = () =>{
        const element = document.getElementById('youtube-iframe');
        element.src += "&autoplay=1";
    }
  return (
   <> 
   {
    showPage && (
        <>
        {
            song && (
                <>
                 <div className='SongPage'>
        <div className='nav'>
            {
                isLogIn ? (
                    <MenuBar />
                )
                : (
                    <div>
                    </div>
                )
            }
            <h2>ONE BACKLINK</h2>
            <div>
                
            </div>
        </div>

        <div className='photovideo'>
            <div className='pv1'>
                <div className='pvspace'></div>

                <div className='pvmain'>
                    <div className='imgbox'>
                    <BackgroundImage className='photo-centre'  src={song?.image?.secure_url} >
                    <img style={{width:"40vmin",height:'40vmin'}} src={song?.image?.secure_url} alt="" />
                    </BackgroundImage>
                        
                    </div>
                    <h1>{song?.songTitle}</h1>
                    <p>{username}</p>
                </div>


            </div>
            <div className='pv2'>
                <div className='pvmain2'>
                    <div className='pm21'>
                        <p>{username}</p>
                        <a href={`${song?.instaId}`} target="_blank"><img style={{height:"3.8vmin"}} src={insta} alt="" /></a>
                    </div>
                    { youtubeLink.length >0 && (
                        <div className='pm22 pm22-border'>
                        <iframe id='youtube-iframe' width="440" height="220" src={`https://www.youtube.com/embed/${youtubeLink.slice(youtubeLink.indexOf('=')+1)}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                       </div>
                    )}
                    {youtubeLink.length === 0 && (
                     <div className='blank-box'>
                    </div>
                   )}
                    <div className='pm23'>
                        <div>
                            <img style={{height:"15vmin"}} src={youtubemusic} alt="" />
                            <h1>Music</h1>
                        </div>
                        <button onClick={playYoutubeIframe}>Play</button>
                    </div>
                    {youtubeLink.length === 0 && (
                     <>
                     <div className='blank-box'>
                    </div>
                    <div className='blank-box'>
                    </div>
                     </>
                   )}
                </div>
                <div className='pvspace'></div>
            </div>
        </div>

       {
        song ?
        <div className='AppArea'>
             <div className='QRCode-profile'>
                <QRCode value={window.location.href} />
             </div>
         <div className='aa1 right-service'>
           {
            song.socialUrl.map((service,index)=>{
                   if(index < song.socialUrl.length/2)
                    return <div key={index} className='playmusic-service-card'>
                     <BackgroundImage  className='playmusic-service'
                src={`${service.image_url}`}
                radius="sm"
            >
                 </BackgroundImage>
                    <a href={service.song_url} target='_blank'><button className='play-btn'>Play</button></a>
               </div>
               else{
                return<></>
               }
            })
        }
         </div>
        <div className='service-line'></div>
        <div className="aa1">
        {
            song.socialUrl.map((service,index)=>{
                   if(index >= song.socialUrl.length/2)
                    return <div key={index} className='playmusic-service-card'>
                     <BackgroundImage  className='playmusic-service'
                src={`${service.image_url}`}
                radius="sm"
            >
                 </BackgroundImage>
                 <a href={service.song_url} target='_blank'><button className='play-btn'>Play</button></a>
               </div>
               else{
                return<></>
               }
            })
        }
        </div>
    </div>
    :<></>
       }
       <UserContact></UserContact>
    </div>
                </>
            )
        }
        </>
    )
   }
   </>
  )
}

export default PlayMusic
