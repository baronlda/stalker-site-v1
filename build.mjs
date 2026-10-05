import fs from 'node:fs';
fs.mkdirSync('dist/server',{recursive:true});
fs.cpSync('public','dist/client',{recursive:true});
fs.copyFileSync('server/index.mjs','dist/server/index.js');
fs.mkdirSync('dist/.openai',{recursive:true});
fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
fs.cpSync('drizzle','dist/.openai/drizzle',{recursive:true});
console.log('Worker, client assets and migrations built.');
