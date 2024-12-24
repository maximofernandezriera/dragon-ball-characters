const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/dragonball/' : '',
  basePath: isProd ? '/dragonball' : '',
  output: 'export',
};