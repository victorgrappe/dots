// Wikidata Q-code -> Wikidata Graph Builder, drawing the item's class tree.
// Everything but `item` is fixed: P31 (instance of) walked with subclasses in
// both directions, laid out leftwards.
const GRAPH_PARAMS = {
  property: 'P31',
  mode: 'both',
  sc_color: '#0000003c',
  graph_direction: 'left',
  instance_or_subclass: '1',
};

module.exports = function wikidataGraphUrl(qcode) {
  const params = new URLSearchParams({ item: qcode, ...GRAPH_PARAMS });
  return `https://angryloki.github.io/wikidata-graph-builder/?${params}`;
};

module.exports.basesParams = ['qcode'];
module.exports.bases = true;                    // opt in to .base formulas
