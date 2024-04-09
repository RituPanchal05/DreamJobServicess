module.exports = {
  content: [
    './views/**/*.{html,js,ejs}'
  ],
  theme: {
    extend: {
      colors : {
        partialwhite : '#f6f6f6',
        lightgreen : '#c7ffd8',
        water : '#98ded9',
        midnight : '#161d6f'
      },
      borderColors: theme => ({
        partialwhite : '#f6f6f6',
        lightgreen : '#c7ffd8',
        water : '#98ded9',
        midnight : '#161d6f',
      }),
      outline: {
        lightgray: '2px solid lightgray'
      },
      margin: {
        '-168px' : '-168px',
        '-200px' : '-200px',
        '-264px' : '-264px',
        '-297px' : '-297px',
        '-328px' : '-328px',
        '-360px' : '-360px',
        '90px' : '90px',
        '410px' : '410px'
      },
      width: {
        '820': '51.25rem',
      }
    },
  },
  plugins: [],
}