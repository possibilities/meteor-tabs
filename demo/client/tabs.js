
// Declare tabs for your pet app!
new Tabs('pets', [

  // Set a default, yay!
  'cats', {
    default: true
  },

  // Just a plain old tab
  'dogs',

  // A dropdown
  'fishes', [
    'betas',
    'goldfish'
  ]

]);
