import React from 'react';
// @ts-ignore
import Fullscreen from '@pansy/react-fullscreen';

export default () => {
  const [isFull, setIsFull] = React.useState(false);

  const handleClick = () => {
    setIsFull(!isFull);
  };

  return (
    <div>
      <Fullscreen enabled={isFull} target={document.body} />
      <button onClick={handleClick}>全屏</button>
    </div>
  );
};
