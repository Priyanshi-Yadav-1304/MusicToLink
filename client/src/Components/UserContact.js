import React ,{useState,useEffect} from 'react'
import { Card, Button, Title, TextInput, NumberInput, Modal, Select } from '@mantine/core';
import './Css/userContact.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Axios from '../AxiosConfig/Axios';

const UserContact = () => {
    const [whatsApp, setWhatsApp] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [showEmail, setShowEmail] = useState(true);
    const [contactHeading, setContactHeading] = useState(null);
    const [dubContactHeading, setDubContactHeading] = useState(null);
    const [selectEmail, setSelectEmail] = useState(true);
    const dispatch = useDispatch();
    const {username} = useParams();
    const openBox = useSelector((state) => state.handleUserContactModal);

    useEffect(() => {
       getContact();
    }, []);
    const getContact = async() =>{
        try{
            const {data} = await Axios({
                method:'GET',
                url:`/contact/getContact/${username}`
            })
            setShowEmail(data.contact.showEmail);
            setContactHeading(data.contact.heading);
            setDubContactHeading(data.contact.heading);
            localStorage.setItem('contact',data.contact);
        }catch(err){
            console.log({err})
        }
    }
    const saveUserContact = async() =>{
        try{
            const {data} = await Axios({
                method:'POST',
                url:'/connect/saveContactDetails',
                data:{
                    username:username,
                    email:email,
                    whatsAppNumber:whatsApp,
                    contactName:name,
                }
            })
            alert('Your details have been shared with the artist');
        }catch(err){
            console.log({err});
            alert('unable to connect. Please try again later...')
        }
    }
    const handleContact = async() =>{
        try{
            await Axios({
                method:'POST',
                url:`/contact/saveContact/${username}`,
                data:{
                    showEmail:selectEmail,
                    heading:dubContactHeading,
                }
            })
            getContact();
            dispatch({type:'toggle'});
        }catch(err){
            console.log({err});
        }
    }
  return (
    <div className='userContactBox'>
        <Card shadow="sm" p="lg" radius="md" withBorder className='userContact'>
         <Title className='userContactTitle' order={3}>{contactHeading}</Title>
         <TextInput placeholder='Enter name' value={name} onChange={(event) => setName(event.target.value)} />
        {
            !showEmail && (
                <NumberInput value={whatsApp} placeholder='Enter whatsapp number' onChange={(value) => setWhatsApp(value)} />
            )
        }
        {
            showEmail && (
                <TextInput placeholder='Enter email' value={email} onChange={(event) => setEmail(event.target.value)} />
            )
        }
        <Button className='user-contact-submit' onClick={saveUserContact}>Submit</Button>
    </Card>
    <Modal opened={openBox} onClose={()=> {dispatch({type:'toggle'}); setDubContactHeading(contactHeading)}}>
        <label>Heading</label>
        <TextInput value={dubContactHeading} onChange={(e) => setDubContactHeading(e.target.value)} placeholder={`Let's connect`}/>
        <Select
            label="Ask for"
            placeholder="Pick one"
            data={[
                { value: 'email', label: 'Email' },
                { value: 'whatsappNumber', label: 'WhatsApp Number' },
            ]}
            onChange={(value) => setSelectEmail(value === 'email')}
            />
            <div className='hidden-box-contact'></div>
            <Button className='save-btn-menu' onClick={handleContact}>Save</Button>
    </Modal>
    </div>
  )
}

export default UserContact
