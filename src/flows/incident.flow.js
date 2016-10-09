module.exports = (slapp) => {
  slapp.message('goodnight', ['direct_message'], (msg) => {
    msg.say('sweet dreams :crescent_moon: ');
  });
};
