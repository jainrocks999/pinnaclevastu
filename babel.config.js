module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // plugins: [
  //   'react-native-reanimated/plugin',
  // ],
  plugins: [
    // other plugins
    [
        'react-native-reanimated/plugin', 
        {
            relativeSourceLocation: true,
        },
    ],
],
};
