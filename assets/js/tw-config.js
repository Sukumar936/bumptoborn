// Tailwind CDN configuration
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        blush: '#F7DDE0',
        softblue: '#DDEAF7',
        gold: '#C8A559',
        ink: '#0E0E10'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,.08)'
      }
    }
  }
};
