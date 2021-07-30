module.exports = {
  content: ['*.html'],
  css: ['css/tailwind-prod.css'],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  output: 'css/tailwind-prod-purge.css',
};
