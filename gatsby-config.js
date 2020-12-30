module.exports = {
  pathPrefix: `/tulisan`,
  siteMetadata: {
    title: `Baca-Quran.id`,
    author: {
      name: `Irfan Maulana`,
      summary: `Pengembang Antarmuka Web`,
    },
    description: `Tulisan mengenai aplikasi Baca-Qur'an.id`,
    siteUrl: `https://www.baca-quran.id`,
    social: {
      twitter: `Maz_Ipan`,
      facebook: `mazipanneh`,
      website: `https://mazipan.space/`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-25065548-8`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tulisan - Baca Qur'an`,
        short_name: `BacaQuran`,
        start_url: `/tulisan/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    {
	resolve: `gatsby-plugin-sitemap`,
	options: {
	  sitemapSize: 100
	}
    }
  ],
}
