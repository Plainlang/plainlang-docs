/* eslint-disable */
module.exports = function prismIncludeLanguages(Prism) {
  // Use token names Prism themes already color (keyword/string/class-name/etc.)
  const plainlang = {
    // ***definitions***, ***functional specs***, etc.
    keyword: {
      pattern: /\*\*\*[^*\n]+\*\*\*/m,
      greedy: true,
    },

	  // **bold** (avoid matching ***section***)
    important: {
      // don't eat ***section*** (so ** must not be followed by *)
      pattern: /\*\*(?!\*)(?:\\.|[^\\\r\n])*?\*\*/,
      greedy: true,
      inside: {
        // split out the ** markers so CSS can hide them
        "bold-marker": /^\*\*|\*\*$/,
      },
    },

    // :Concept:
    "class-name": {
      pattern: /:[A-Za-z0-9+._-]+:/,
      greedy: true,
    },

    // Leading "- " bullet marker
    operator: {
      pattern: /^\s*-\s+/m,
    },

    // Quoted text “...” or "..."
    string: {
      pattern: /(^|[^\\])(["“])(?:\\.|(?!\2)[^\\\r\n])*\2/m,
      lookbehind: true,
      greedy: true,
    },

    // Footnote refs like [^1]
    symbol: {
      pattern: /\[\^\d+\]/,
    },

    number: /\b\d+\b/,
    punctuation: /[()[\]{},.;:]/,
  };

  // Register names you might use in fences
  Prism.languages.plainlang = plainlang;
};