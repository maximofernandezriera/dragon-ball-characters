const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/dragon-ball/' : '',
  basePath: isProd ? '/dragon-ball' : '',
};