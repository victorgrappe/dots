
// Dots — a tiny host plugin. No build step.
// 1. Loads every .js file in scripts/ (each file exports one function).
// 2. Renders ```dots code blocks as buttons that call those functions.
const { Plugin, Notice } = require('obsidian');
 
const SCRIPTS_DIR = '.obsidian/plugins/dots/scripts';
 
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
    }
    new Notice(`Dots: loaded ${Object.keys(this.fns).join(', ')}`);
  }
};
 