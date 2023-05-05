import React from 'react';
import Button from '@/components/UI/Button';
import {TextField} from '@mui/material';

const Index = () => {
  return (
    <>
      <div>
        <h1>Test icons usage</h1>
        <i className="icon-chevron-down"></i>
        <i className="icon-gallery"></i>
        <i className="icon-logo"></i>
        <i className="icon-logout"></i>
      </div>
      <TextField fullWidth size="small" label="Email" type="email" required />
      <TextField
        fullWidth
        size="medium"
        label="Password"
        type="password"
        required
      />
      <Button size="large">Test</Button>
    </>
  );
};

export default Index;
