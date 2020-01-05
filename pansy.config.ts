import { Config } from '@walrus/pansy';

const config: Config = {
  output: {
    dir: 'lib',
    format: ['cjs', 'es']
  },
  externals: [
    ...Object.keys(require('./package').dependencies),
    ...Object.keys(require('./package').peerDependencies)
  ]
};

export default config;
