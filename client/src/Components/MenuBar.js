import React from 'react'
import { Menu  } from '@mantine/core';
import addImg from './assests/icons8-add-48.png'
import analyticsImg from './assests/analytics2.jpeg'
import profileImg from './assests/profile.jpeg'
import menuIcon from './assests/menu.png'
import './Css/MenuBar.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { enable } from '../fileIndex';
// import handleUserContactModal from '../fileReducer';
const MenuBar = () => {
    const dispatch = useDispatch();
    const username = localStorage.getItem('username');
  return (
    <Menu shadow="md" width={200}>
          <Menu.Target >
             <img  src={menuIcon} alt="" className='menuIcon'/>
          </Menu.Target>
          <Menu.Dropdown>
        <Menu.Item icon={<img src={addImg} height={20} />}>
            <Link className='menuLink' to='/link'>Create Link</Link>
        </Menu.Item>
        <Menu.Item icon={<img src={analyticsImg} height={20}/>}>
            <Link className='menuLink' to='/analytics'>Analytics</Link>
        </Menu.Item>
        <Menu.Item icon={<img src={profileImg} height={20} />}>
            <Link className='menuLink' to={`/${username}`}>Profile</Link>
        </Menu.Item>
        <Menu.Item icon={<img src={profileImg} height={20} />}>
            <div onClick={()=> dispatch({type:'toggle'})} className='menuLink'>Change contact details</div>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default MenuBar
