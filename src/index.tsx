import React, { ReactNode, CSSProperties } from 'react';
import screenfull from 'screenfull';

interface FullScreenProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  video?: HTMLVideoElement;
  // 是否全屏
  enabled: boolean;
  children?: ReactNode;
  // 目标元素
  target?: HTMLElement;
  // 全屏关闭回调
  onClose?: (error?: Error) => void;
}

class FullScreen extends React.PureComponent<FullScreenProps> {
  private root: HTMLDivElement | undefined;

  static defaultProps = {
    prefixCls: 'pansy-fullscreen',
    enabled: false
  };

  static getDerivedStateFromProps(nextProps: FullScreenProps) {
    if ('enabled' in nextProps) {
      return { enabled: nextProps.enabled };
    }
    return null;
  }

  constructor(props: FullScreenProps) {
    super(props);
    this.root = undefined;
    this.state = {};
  }

  componentDidMount() {
    this.handleScreenfull(this.props);
  }

  componentDidUpdate() {
    this.handleScreenfull(this.props);
  }

  componentWillUnmount() {
    this.closeScreenfull(this.props);
  }

  openScreenfull = (props: FullScreenProps) => {
    const { onClose, video } = props;

    if (screenfull.isEnabled) {
      try {
        screenfull.request(this.props.target || this.root);
      } catch (error) {
        onClose && onClose(error);
      }
      screenfull.on('change', this.handleChange);
    } else if (video && video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
      video.addEventListener('webkitendfullscreen', this.handleWebkitEndFullscreen);
    } else {
      onClose && onClose();
    }
  };

  closeScreenfull = (props: FullScreenProps) => {
    const { video } = props;

    if (screenfull.isEnabled) {
      try {
        screenfull.off('change', this.handleChange);
        screenfull.exit();
      } catch {}
    } else if (video && video.webkitExitFullscreen) {
      video.removeEventListener('webkitendfullscreen', this.handleWebkitEndFullscreen);
      video.webkitExitFullscreen();
    }
  };

  handleScreenfull = (props: FullScreenProps) => {
    if (props.enabled) {
      this.openScreenfull(props);
    } else {
      this.closeScreenfull(props);
    }
  };

  handleChange = () => {
    const { onClose } = this.props;

    if (screenfull.isEnabled && !screenfull.isFullscreen) {
      onClose && onClose();
    }
  };

  handleWebkitEndFullscreen = () => {
    const { video } = this.props;

    if (video) {
      video.removeEventListener('webkitendfullscreen', this.handleWebkitEndFullscreen);
    }
  };

  saveRoot = (node: HTMLDivElement) => {
    this.root = node;
  };

  render() {
    const { prefixCls, className, enabled, children, style } = this.props;
    const cls = [className, prefixCls];

    if (enabled) {
      cls.push('fullscreen-enabled');
    }

    return (
      <div ref={this.saveRoot} className={cls.filter((item) => item).join(' ')} style={style}>
        {children}
      </div>
    );
  }
}

export default FullScreen;
