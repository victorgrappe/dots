// Wikidata Q-code -> Wikipedia article URL.
// Special:GoToLinkedPage resolves the sitelink server-side and redirects; a
// Q-code cannot be turned into an article title by string manipulation alone.
module.exports = function wikipediaUrl(qcode, lang = 'en') {
  return `https://www.wikidata.org/wiki/Special:GoToLinkedPage/${lang}wiki/${qcode}`;
};

module.exports.basesParams = ['qcode', 'lang']; // fn.length is 1: lang has a default
module.exports.bases = true;                    // opt in to .base formulas
