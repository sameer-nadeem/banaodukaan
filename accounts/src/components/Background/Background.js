import React from 'react';
import './Background.css'
const Background = ({ children }) => {
  return (<>
    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <div class="content">
      {children}
    </div>
  </>);
};

export default Background;
