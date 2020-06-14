# 快速开始

## 安装

```
# yarn install
yarn add @pansy/react-fullscreen

# npm install
npm install --save @pansy/react-fullscreen
```

## 使用

```
import React from 'react';
import Fullscreen from '@pansy/react-fullscreen';

export default () => {
  const [isFull, setIsFull] = React.useState(false);

  const handleClick = () => {
    setIsFull(!isFull);
  };

  const handleCloseFullscreen = () => {
    setIsFull(false);
  };

  return (
    <Fullscreen enabled={isFull} onClose={handleCloseFullscreen}>
      <div style={{ background: '#fff', height: '100%', width: '100%' }}>
        <button onClick={handleClick}>全屏</button>
      </div>
    </Fullscreen>
  );
};

```
