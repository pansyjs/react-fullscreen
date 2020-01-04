---
title: 示例
---

## 简单示例

```jsx
import React from 'react';
import FullScreen from '@pansy/react-fullscreen';

export default () => {
  const [isFull, setIsFull] = React.useState(false);

  const handleClick = () => {
    setIsFull(!isFull);
  };

  const handleFullScreenChange = (enabled) => {
    setIsFull(enabled);
  };

  return (
    <FullScreen enabled={isFull} onChange={handleFullScreenChange}>
      <div style={{ background: '#fff', height: '100%', width: '100%' }}>
        <button onClick={handleClick}>Hello World!</button>
      </div>
    </FullScreen>
  );
};
```
