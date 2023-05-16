const buttonsArray = [
  {link: '', text: 'Home'},
  {link: 'search', text: 'For woman'},
  {link: 'search', text: 'For men'},
  {link: 'search', text: 'Accessories'},
  {link: 'search', text: 'Sale'},
];

const buttonsArrayResponsive = [
  {link: 'home', text: 'Home', icon: 'chevron-left'},
  {link: 'search', text: 'Products', icon: 'bonus-account'},
  {link: 'bag', text: 'Bag', icon: 'bag'},
  {link: 'profile', text: 'My profile', icon: 'profile'},
  {link: '', text: 'Log out', icon: 'logout'},
];

const LinkStyles = {
  textDecoration: 'none',
  color: '#000',
};

module.exports = {
  buttonsArrayResponsive,
  buttonsArray,
  LinkStyles,
};
