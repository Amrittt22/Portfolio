const fs = require('fs');
const path = require('path');

const root = __dirname;
const output = path.join(root, 'dist');
const files = ['index.html', 'styles.css', 'theme.css', 'project-gallery.css', 'script.js'];
const directories = ['assets'];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}

for (const directory of directories) {
  fs.cpSync(path.join(root, directory), path.join(output, directory), { recursive: true });
}

console.log(`Static production build created in ${path.relative(root, output)}.`);
