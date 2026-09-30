---
class: "[[Food]]"
{{#if class__tmp}}class__tmp: "{{{class__tmp}}}"
{{/if}}{{#if name__fr}}name__fr: "{{{name__fr}}}"
{{/if}}{{#if (replacereg uri "^_$" "")}}uri: "{{{uri}}}"
{{/if}}{{#if note}}note: "{{{note}}}"
{{/if}}{{#if shelf}}shelf: "{{{shelf}}}"
{{/if}}{{#if recipes}}recipes:
{{#each (strsplit (replacereg recipes ",(?! )" "|") "|")}}  - "[[{{{this}}}]]"
{{/each}}{{/if}}---
