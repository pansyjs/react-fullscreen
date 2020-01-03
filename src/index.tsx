import React, { ReactNode } from 'react';
import screenfull from 'screenfull';

interface FullScreenProps {
  video?: HTMLVideoElement;
  enabled: boolean;
  children?: ReactNode;
  onError?: (error?: Error) => void;
  onChange?: (enabled: boolean) => void;
}

class FullScreen extends React.Component<FullScreenProps> {
  private root: HTMLDivElement | undefined;

  static defaultProps = {
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
  }

  componentDidMount() {
    const { onChange, onError, video } = this.props;

    if (screenfull.isEnabled) {
      try {
        screenfull.request(this.root);
      } catch (error) {
        onError && onError(error);
      }
      screenfull.on('change', this.handleChange);
    } else if (video && video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
      video.addEventListener('webkitendfullscreen', this.handleWebkitEndFullscreen);
    } else {
      onChange && onChange(false);
    }
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    const { video } = this.props;

    if (screenfull.isEnabled) {
      try {
        screenfull.off('change', this.handleChange);
        screenfull.exit();
      } catch {}
    } else if (video && video.webkitExitFullscreen) {
      video.removeEventListener('webkitendfullscreen', this.handleWebkitEndFullscreen);
      video.webkitExitFullscreen();
    }
  }

  handleChange = () => {
    const { onChange } = this.props;

    if (screenfull.isEnabled) {
      onChange && onChange(screenfull.isFullscreen);
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
    const { enabled, children } = this.props;
    const className = ['fullscreen'];

    if (enabled) {
      className.push('fullscreen-enabled');
    }

    return (
      <div
        ref={this.saveRoot}
        className={className.join(' ')}
        style={enabled ? { height: '100%', width: '100%' } : undefined}
      >
        {children}
      </div>
    );
  }
}

export default FullScreen;
