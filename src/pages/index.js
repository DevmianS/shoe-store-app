import React from 'react';
import Button from '@/components/UI/Button/Button';

const Index = () => {
  return (
    <div>
      <h1>Test icons usage</h1>
      <i className="icon-chevron-down"></i>
      <i className="icon-gallery"></i>
      <i className="icon-logo"></i>
      <i className="icon-logout"></i>
      <h2>Button Test</h2>
      <div style={{width: 500, display: 'flex', gap: '2rem'}}>
        <Button>Test</Button>
        <Button
          outlined
          onClick={() => {
            console.log('test');
          }}
        >
          Test outlined
        </Button>

        <Button
          onClick={() => {
            console.log('test');
          }}
          disabled
        >
          Test disabled
        </Button>
      </div>
    </div>
  );
};

export default Index;
