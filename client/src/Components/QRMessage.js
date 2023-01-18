import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Axios from '../AxiosConfig/Axios';
import { Button, Card, Title } from '@mantine/core';
import  QRCode  from 'qrcode.react';
// import * as htmlToImage from "html-to-image";
import './Css/QRMessage.css'
function QRMessage() {
    const [QRData, setQRData] = useState('');
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const {username,songTitle} = useParams();
    const [profileLink, setProfileLink] = useState(`http://localhost:3000/${username}`);
    const [songLink, setSongLink] = useState(`http://localhost:3000/${username}/${songTitle}`);
    useEffect(() => {
       getQRData();
    }, []);
    const getQRData =  async() =>{
        try{
            const {data} = await Axios({
                method:'GET',
                url:`/user/getQRCode/${username}`
            })
            setQRData(data)
            setShow(true);
        }catch(err){
            console.log({err})
        }
    }
    const downloadQR = () => {
      const qrCodeURL = document.getElementById('qr-code')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = songTitle ?`${songTitle}.png` : `${username}.png`;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
    }
  return (
    <>
      { show ?
        <div className='QR-message-box'>
             <Card className='QR-message-card' shadow="sm" p="lg" radius="md" withBorder>
             <div className='qr-design-box'>
             <div className='qr-card-next-box'><Button className='Qr-code-next-button' onClick={()=> songTitle ? navigate(`/${username}/${songTitle}`) :navigate(`/${username}`)}>Next</Button></div>
             <Title className='qrcode-title'  order={5}>QR Code Have Been Created</Title>
                <QRCode id='qr-code' className='QRcode' value={songTitle ? songLink : profileLink}/>
                <Button className='Qr-code-downloadbtn qr-code-btn' onClick={()=> downloadQR()}>Download</Button>
             </div>
        </Card>
        </div>
   :<></> 
     } 
    </>
  )
}

export default QRMessage
