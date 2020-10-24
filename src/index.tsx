import React, { ReactNode, forwardRef, HTMLAttributes, useEffect, useRef } from 'react';
import useFullscreen from '@pansy/hooks/es/use-fullscreen';
import { BasicTarget } from '@pansy/hooks/es/utils/dom';

export interface FullscreenProps extends HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  enabled?: boolean;
  children?: ReactNode;
  // 目标元素
  target?: HTMLElement;
  onClose?: (error?: Error) => void;
}

const Fullscreen = forwardRef<HTMLDivElement, FullscreenProps>((props, ref) => {
  const { prefixCls, className, enabled = false, target, onClose, children, ...rest } = props;
  const container = useRef(null);
  const [, { setFull, exitFull }] = useFullscreen((target || container) as BasicTarget, {
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

  const cls = [className, prefixCls];

  if (enabled) {
    cls.push(`${prefixCls}-enabled`);
  }

  return (
    <div
      ref={container}
      {...rest}
      className={cls
        .filter((item) => item)
        .join(' ')
        .trim()}
    >
      {children}
    </div>
  );
});

Fullscreen.defaultProps = {
  prefixCls: 'pansy-fullscreen'
};

export default Fullscreen;
