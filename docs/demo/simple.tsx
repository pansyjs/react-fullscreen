import React, { useState, useRef } from 'react';
// @ts-ignore
import Fullscreen from '@pansy/react-fullscreen';
import './styles.less';

export default () => {
  const rootRef = useRef();
  const [enabled, setEnabled] = useState(false);

  const handleClick = () => {
    setEnabled(!enabled);
  };

  const handleCloseFullscreen = () => {
    setEnabled(false);
  };

  console.log(rootRef);

  return (
    <Fullscreen ref={rootRef} enabled={enabled} onClose={handleCloseFullscreen}>
      <button onClick={handleClick}>全屏</button>
    </Fullscreen>
  );
};
