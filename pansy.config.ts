import { Config } from '@walrus/pansy';

const config: Config = {
  output: {
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'FullScreen'
  },
  externals: [...Object.keys(require('./package').dependencies)]
};

export default config;
