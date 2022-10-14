const debug = require('debug')('xingqiu:event:ready');

module.exports = {
  name: 'ready',
  once: true,
  execute: (client) => {
    debug('Xingqiu bot ready!');
    debug(`Tag: ${client.user.tag}`);
  } 
}