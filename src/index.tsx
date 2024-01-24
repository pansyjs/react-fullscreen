import React, { forwardRef, useEffect, useRef } from 'react';
import classNames from '@pansy/classnames';
import { useFullscreen } from '@pansy/react-hooks';

interface FullscreenProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  enabled?: boolean;
  children?: React.ReactNode;
  // 目标元素
  target?: HTMLElement;
  onClose?: (error?: Error) => void;
}

const Fullscreen = forwardRef<HTMLDivElement, FullscreenProps>((props, ref) => {
  const { prefixCls, className, enabled = false, target, onClose, children, ...rest } = props;
  const container = useRef(null);
  const [, { setFull, exitFull }] = useFullscreen((target || container), {
    onExitFull: onClose
  });

  useEffect(() => {
    if (enabled) {
      setFull();
    } else {
      exitFull();
    }
  }, [props.enabled]);

  useEffect(() => {
    if (container.current) {
      ref = container.current;
    }
  }, [container.current]);

  return (
    <div
      ref={container}
      {...rest}
      className={classNames(className, prefixCls, {
        [`${prefixCls}-enabled'`]: enabled
      })}
    >
      {children}
    </div>
  );
});

Fullscreen.defaultProps = {
  prefixCls: 'pansy-fullscreen'
};

export default Fullscreen;
