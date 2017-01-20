import { join } from 'path';

const context = join(__dirname, 'src');

export default {
  context,
  entry: './index',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'ForgeTools'
  },
  devtool: 'source-map',
  module: {
    loaders:[
      {test: /\.js$/, loaders: ['babel'], include: context }
    ]
  }
};
