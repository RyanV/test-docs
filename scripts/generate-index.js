const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');


const docs = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'));

const readmeContent = `
# README

This is the README file for the project.

## Docs

${docs.map(doc => `- [${doc}](./${doc})`).join('\n')}
`;

fs.writeFileSync(path.join(docsDir, 'README.md'), readmeContent);
