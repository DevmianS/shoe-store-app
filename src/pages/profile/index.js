import React from 'react';
import style from './index.module.css';
import SideBar from '@/components/Layout/SideBar';
import {Grid} from '@mui/material';

const Profile = () => {
  const profileItemsList = [
    {name: 'My orders', icon: 'bag', click: null},
    {name: 'Wish list', icon: 'plus-element', click: null, count: 2},
    {name: 'Newsletters', icon: 'newsletters', click: null},
    {name: 'My wallet', icon: 'wallet', click: null},
    {name: 'My bonus account', icon: 'bonus-account', click: null},
    {name: 'Premium subscription', icon: 'medal-star', click: null},
    {name: 'My feedback', icon: 'star', click: null},
    {name: 'Settings', icon: 'setting', click: null, count: 1},
    {name: 'Log out', icon: 'logout', click: null},
  ];
  return (
    <Grid container>
      <Grid item xs={2}>
        <SideBar listItems={profileItemsList} />
      </Grid>
    </Grid>
  );
};

export default Profile;
