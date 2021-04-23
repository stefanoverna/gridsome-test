// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  plugins: [
    {
      use: 'gridsome-source-graphql',
      options: {
        url: 'https://graphql.datocms.com/',
        fieldName: 'datocms',
        typeName: 'datocms',
        headers: {
          Authorization: `Bearer faeb9172e232a75339242faafb9e56de8c8f13b735f7090964`,
        },
      },
    },
  ],
}