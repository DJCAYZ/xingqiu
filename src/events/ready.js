const debug = require('debug')('xingqiu:event:ready');

module.exports = {
  name: 'ready',
  once: true,
  execute: (client) => {
    console.log('Xingqiu bot ready!');
    debug(`Tag: ${client.user.tag}`);
  } 
}