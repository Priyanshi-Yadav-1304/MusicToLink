import React, { useEffect, useState } from 'react'
import './Css/Onboarding.css'
import image from './assests/no-image-available-icon-ui-260nw-1458092489-removebg-preview.png'
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Axios from '../AxiosConfig/Axios';
import { BackgroundImage, Button, FileInput, Group, LoadingOverlay, Modal, TextInput } from '@mantine/core';
// import { IconUpload } from '@tabler/icons';
// import { BackgroundImage } from '@mantine/core'
function Onboarding() {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(image);
  const [name, setName] = useState('');
  const [instaId, setInstaId] = useState('');
  const [service, setService] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [profession, setProfession] = useState('');
  const [about, setAbout] = useState('');
  const [latestSong, setLatestSong] = useState('');
  const [url, setUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  function handleChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile(reader.result)
      };

  }
  useEffect(() => {
    callAPI();
  }, []);

  const callAPI = async()=>{
      try{
          loadingOn();
          const {data} = await Axios({
            method:'GET',
            url:`/user/payment`
          })
          const {success} = data;
          const {user} = data;
          if(success === false){
            navigate('/payment')
          }else{
            if(!user.isPaid){
              navigate('/payment');
            }else{
              setShow(true);
            }
          }
          getServices();
      }catch(err){
        console.log(err)
        loadingOff();
        navigate('/')
      }
  }
  const getServices = async() => {
    try{
      loadingOn();
      const {data} = await Axios({
        method:'GET',
        url:'/service/getService'
      })
      const {services} = data;
      setService(services);
      let urlArray = [];
      services.forEach((link)=>{
          urlArray = [...urlArray, {image_url:link.secure_url,song_url:'',service_id:link._id}];
      })
      setUrl([...urlArray]);
      loadingOff();
    }catch(err){
      console.log({err})
      loadingOff();
    }
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(name.trim().length === 0){
      alert('Please enter name')
      return;
    }
    updateProfile();
  }
  const updateProfile = async() => {
    try{
      loadingOn();
      const id = localStorage.getItem('user-id')
      const {data} = await Axios({
        method:'POST',
        url:'/user/updateProfileWithArtistName',
        data:{
          name,
          image:file,
          about,
          profession,
          instaId,
          id,
          latestSong,
          service:url
        }
      })
      loadingOff()
      navigate(`/${data.username}/QrCode`)
    }catch(err){
      console.log({err})
      loadingOff();
      alert(`something went wrong..., `)
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
  const handleProfession = (e) =>{
    if(e.target.value.length <=40)
    setProfession(e.target.value);
  }
  const handleAbout = (e) =>{
    if(e.target.value.length <= 250)
      setAbout(e.target.value);
  }
  const handleUrl = (e,index) =>{
    const image_url = url[index].image_url;
    const song_url = e.target.value;
    let urlArray = url;
    urlArray[index]= {image_url,song_url};
    setUrl([...urlArray])
  }
  return (
    <>
      { show ?
      <div className='onboardingpage'>
      <div className='obbox'>
         <h1>ONBOARDING PAGE</h1>
         <div className='onboard'>
           <div className='onboard1'>
              <img src={file}   alt="" />
              <input  type="file" id="img" onChange={(e)=> handleChange(e)} style={{display:"none"}}/>
              <label className='uploadPhoto'  for="img">Upload Photo (optional)</label>
           </div>
           <div className='onboard2'>
            <input className='onboardinginputshift' type="text" placeholder='Your Artist Name' value={name} onChange={(e) => setName(e.target.value)}/>
            <input className='onboardinginputshift' type="text" placeholder='Your Instagram Profile (optional)' value={instaId} onChange={(e)=> setInstaId(e.target.value)}/>
            <button onClick={()=> setOpenModal(true)} type='submit'>Proceed</button>
           </div>
         </div>
      </div>
      <Modal className='edit-profile'
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Edit Profile"
      >
       <TextInput
       label="Profession"
       className='edit-input'
       placeholder='Enter profession'
       value={profession}
       onChange={(e) => handleProfession(e)}
        />
        <TextInput
        className='edit-input'
       label="About"
       placeholder='Enter something about you'
       value={about}
       onChange={(e) => handleAbout(e)}
        />
         <TextInput
         className='edit-input'
       label="Latest song on youtube"
       placeholder='Enter your latest song url from youtube'
       value={latestSong}
       onChange={(e) => setLatestSong(e.target.value)}
        />
        {
          url.map((s,index)=>{
            return <Group>
            <BackgroundImage src={s.image_url} className='profile-service-modal'></BackgroundImage>
            <TextInput
         className='edit-input link-input-modal'
       value={s.song_url}
       onChange={(e) => handleUrl(e,index)}
        />
        </Group>
          })
        }
        <Group className='edit-input'>
          <Button color='teal.7' style={{backgroundColor:'green'}} onClick={handleSubmit }>Save</Button>
          <Button color='red.7' style={{backgroundColor:'red'}} onClick={()=> setOpenModal(false)}>Cancel</Button>
        </Group>
      </Modal>
      <LoadingOverlay visible={loading} overlayBlur={2} />
  </div>
  
  :<></>
      }
    </>
  )
}

export default Onboarding
