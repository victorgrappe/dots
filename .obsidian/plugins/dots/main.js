
// Dots — a tiny host plugin. No build step.
// 1. Loads every .js file in scripts/ (each file exports one function).
// 2. Renders ```dots code blocks as buttons that call those functions.
// 3. Scripts opting in with `bases = true` also become Bases formula functions.
const { Plugin, Notice } = require('obsidian');
 
const SCRIPTS_DIR = '.obsidian/plugins/dots/scripts';

// Bases keys its function registry by lowercased name, so registering one of
// these would silently shadow the built-in and break every formula using it.
const BASES_BUILTINS = new Set(
  `abs asFile asLink ceil contains containsAll containsAny date duration earliest
   endsWith escapeHTML file filter flat floor format hasLink hasProperty hasTag html
   icon if image inFolder isEmpty isTruthy isType join keys latest link linksTo list
   lower map matches max mean median min now number random reduce relative repeat
   replace reverse round slice sort span split startsWith stddev sum time title
   toFixed toString today trim unique values`
    .toLowerCase()
    .split(/\s+/)
);

// Bases indexes its param list per supplied argument; see basesFn below.
const MIN_PARAMS = 4;

// A Bases value is an instance of a class we cannot name — those classes are
// module-private, so the only way to reach one is through an argument. Each
// carries a static `type` marker ("String", "URL", "HTML", "Number", ...), and
// URL/HTML extend String, so walking up the chain finds String from any of them.
function valueClass(value, type) {
  for (let c = value?.constructor; c; c = Object.getPrototypeOf(c)) {
    if (c.type === type) return c;
  }
  return null;
}

// Wrap a plain JS function as a Bases global function. This object shape is
// undocumented, like registerGlobalFunc itself — see registerBasesFn below.
function basesFn(name, fn) {
  // `fn.length` does not count parameters that have defaults, so a script can
  // spell its own parameter names out via `fn.basesParams`.
  const names = fn.basesParams || Array.from({ length: fn.length }, (_, i) => `arg${i + 1}`);
  // Bases looks up params[i] for each argument it is given, so a slot shortfall
  // throws inside its own evaluator — out of reach of the try/catch below. Pad
  // with spares so a stray extra argument is a no-op instead of a broken cell.
  while (names.length < MIN_PARAMS) names.push(`arg${names.length + 1}`);
  let warned = false;

  return {
    name,
    // Every slot optional: Bases only complains about a *missing non-optional*
    // one. `Object` satisfies its instanceof check for any Bases value.
    params: names.map((n) => ({ name: n, type: [Object], optional: true })),
    docString: `dots: scripts/${name}.js`,

    apply(...args) {
      try {
        // Hand the script plain JS (string, number, Date), not Bases values.
        const result = fn(...args.map((a) => (a == null ? null : a.data !== undefined ? a.data : a)));
        // Give Bases a value object back: a bare string is never coerced.
        const Str = args.map((a) => valueClass(a, 'String')).find(Boolean);
        return Str ? new Str(String(result)) : null;
      } catch (e) {
        console.error(`Dots: ${name}() failed`, e);
        if (!warned) { new Notice(`Dots: ${name}() failed — ${e.message}`); warned = true; }
        return null;
      }
    },

    applyWithContext(ctx, ...args) {
      this.ctx = ctx;
      try { return this.apply(...args); } finally { this.ctx = null; }
    },

    serialize(...args) { return `${name}(${args.join(', ')})`; },
  };
}
 
module.exports = class Dots extends Plugin {
  async onload() {
    this.fns = {};                                   // name -> function
    await this.loadScripts();



    // Auto-reload: watch scripts/ on disk (desktop only).
    // TODO: Use a cleaner way to watch files
    // const fs = require('fs');
    // const dir = `${this.app.vault.adapter.getBasePath()}/${SCRIPTS_DIR}`;
    // const watcher = fs.watch(dir, (_event, filename) => {
    //   if (filename?.endsWith('.js')) this.loadScripts();
    // });
    // this.register(() => watcher.close());


 
    this.addCommand({ id: 'reload', name: 'Dots: reload scripts', callback: () => this.loadScripts() });
 
    // A note containing:   ```dots
    //                      greet Alice
    //                      ```
    // becomes a button. Clicking it runs greet("Alice") and shows the result.
    this.registerMarkdownCodeBlockProcessor('dots', (source, el) => {
      const [name, ...args] = source.trim().split(/\s+/);
      const button = el.createEl('button', { text: `▶ ${name}` });
      const output = el.createEl('pre');
      button.onclick = async () => {
        const fn = this.fns[name];
        if (!fn) { output.setText(`No script named "${name}"`); return; }
        const result = await fn(...args);
        output.setText(String(result));             // write below the button
        new Notice(String(result));                  // ...and as a popup
      };
    });
  }
 
  async loadScripts() {
    const { files } = await this.app.vault.adapter.list(SCRIPTS_DIR);
    for (const path of files.filter((f) => f.endsWith('.js'))) {
      const code = await this.app.vault.adapter.read(path);
      const module = { exports: {} };
      new Function('module', 'exports', 'require', code)(module, module.exports, require);
      const name = path.split('/').pop().replace('.js', '');
      this.fns[name] = module.exports;              // greet.js -> fns.greet
      if (module.exports.bases === true) this.registerBasesFn(name, module.exports);
    }
    new Notice(`Dots: loaded ${Object.keys(this.fns).join(', ')}`);
  }

  // Opt-in: `module.exports.bases = true` also exposes the script to .base
  // formulas, so   wikipediaUrl(note.wikidata__cd)   works in dots.base.
  // Re-running this is safe: Bases overwrites a global of the same name.
  registerBasesFn(name, fn) {
    if (BASES_BUILTINS.has(name.toLowerCase())) {
      new Notice(`Dots: "${name}" is a Bases built-in — not registered`);
      return;
    }
    // registerGlobalFunc is not in obsidian.d.ts and carries no compatibility
    // promise, so degrade quietly rather than take the whole plugin down.
    if (typeof this.registerGlobalFunc !== 'function') {
      new Notice('Dots: Bases formula API unavailable in this Obsidian version');
      return;
    }
    this.registerGlobalFunc(basesFn(name, fn));
  }
};
