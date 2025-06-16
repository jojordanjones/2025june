import fs from 'fs';

const src = fs.readFileSync('everything.md', 'utf8');
const lines = src.split(/\r?\n/);

interface Entry {
  domain: string;
  sub: string;
  text: string;
  type: string;
}

const entries: Entry[] = [];
let domain = '';
let sub = '';

for (const line of lines) {
  if (line.startsWith('## ')) {
    domain = line.replace('##', '').trim();
    sub = '';
  } else if (line.startsWith('### ')) {
    sub = line.replace('###', '').trim();
  } else if (line.startsWith('◇')) {
    entries.push({ domain, sub, text: line.slice(1).trim(), type: 'goal' });
  } else if (line.startsWith('▸')) {
    entries.push({ domain, sub, text: line.slice(1).trim(), type: 'metric' });
  } else if (line.startsWith('▪︎')) {
    entries.push({ domain, sub, text: line.slice(1).trim(), type: 'habit' });
  } else if (line.startsWith('✦')) {
    entries.push({ domain, sub, text: line.slice(1).trim(), type: 'quote' });
  }
}

fs.writeFileSync('data/context.json', JSON.stringify(entries, null, 2));
