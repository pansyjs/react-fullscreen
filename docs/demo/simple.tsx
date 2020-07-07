import React, { useState } from 'react';
// @ts-ignore
import Fullscreen from '@pansy/react-fullscreen';
import './styles.less';

export default () => {
  const [enabled, setEnabled] = useState(false);

  const handleClick = () => {
    setEnabled(!enabled);
  };

  const handleCloseFullscreen = () => {
    setEnabled(false);
  };

  return (
    <Fullscreen enabled={enabled} onClose={handleCloseFullscreen}>
      <button onClick={handleClick}>全屏</button>
    </Fullscreen>
  );
};
