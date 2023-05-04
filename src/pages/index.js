import React from 'react';
import Button from '@/components/UI/Button/Button';

const index = () => {
  return (
    <div>
      <h1>Test icons usage</h1>
      <i className="icon-chevron-down"></i>
      <i className="icon-gallery"></i>
      <i className="icon-logo"></i>
      <i className="icon-logout"></i>
      <h2>Button Test</h2>
      <div style={{width: 300, display: 'flex', gap: '2rem'}}>
        <Button>Test</Button>
        <Button
          onClick={() => {
            console.log('test');
          }}
          outlined
        >
          Test outlined
        </Button>
      </div>
    </div>
  );
};

export default index;
