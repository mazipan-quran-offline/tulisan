import Typography from 'typography';
import Wordpress2016 from 'typography-theme-wordpress-2016';

Wordpress2016.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: 'none',
    },
    // Wire core colors to CSS custom properties so both themes work
    body: {
      color: 'var(--text, #0f172a)',
      background: 'var(--bg, #ffffff)',
    },
    a: {
      color: 'var(--link, #4f46e5)',
    },
    'h1,h2,h3,h4,h5,h6': {
      color: 'var(--heading, #0f172a)',
    },
  };
};

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
