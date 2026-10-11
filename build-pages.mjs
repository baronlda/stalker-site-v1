import fs from 'node:fs';
import path from 'node:path';

const output = 'dist/pages';
fs.mkdirSync(output, { recursive: true });
fs.cpSync('public', output, { recursive: true });
const livePath = path.join(output, 'community-live.js');
let live = fs.readFileSync(livePath, 'utf8');
const start = live.indexOf('async function api(');
const end = live.indexOf('\nfunction adopt(', start);
if (start < 0 || end < 0) throw new Error('Community API boundary not found');
const demoApi = `
const demoUser = {id:1,name:'Сталкер',avatar:'preset:0',balance:2500,owned:[],equipmentSlots:{}};
async function api(action,data) {
  if(action==='bootstrap') return {user:demoUser,posts:[],messages:[],replies:[]};
  if(action==='buy') {
    const item=goods.find(x=>x.id===data.id);
    if(!item || demoUser.owned.includes(item.id) || demoUser.balance<item.price) throw Error(t('Покупка недоступна','Purchase unavailable'));
    demoUser.balance-=item.price; demoUser.owned.push(item.id);
    return {};
  }
  if(action==='equip') {
    if(!demoUser.owned.includes(data.id)) throw Error('Item is not owned');
    const slot=slotFor(data.id);
    if(data.equip) demoUser.equipmentSlots[slot]=data.id;
    else delete demoUser.equipmentSlots[slot];
    return {};
  }
  throw Error(t('Демонстраційний режим: зміни не надсилаються на сервер.','Demo mode: changes are not sent to a server.'));
}
`;
live = live.slice(0,start)+demoApi+live.slice(end);
fs.writeFileSync(livePath,live);
const demo = `
const demoBaseView=view, demoBaseRender=render;
view=function(r) {
  if(['login','register','settings'].includes(r)) return '<section class="panel"><h1>'+t('Демонстраційний профіль','Demo profile')+'</h1><p>'+t('Це портфоліо-демо. Реєстрація та збереження даних на сервері вимкнені.','This is a portfolio demo. Registration and server storage are disabled.')+'</p><a class="gold" href="#profile">'+t('Переглянути інвентар','View inventory')+'</a></section>';
  return demoBaseView(r);
};
render=function() {
  demoBaseRender();
  document.querySelector('main')?.insertAdjacentHTML('afterbegin','<p class="panel demo-notice">'+t('Демо для портфоліо · Новини та розмови — приклади. Публікації не зберігаються.','Portfolio demo · News and discussions are samples. Publications are not saved.')+'</p>');
  document.querySelector('[data-logout]')?.remove();
};
render();
`;
fs.writeFileSync(path.join(output,'demo.js'),demo);
let html=fs.readFileSync(path.join(output,'index.html'),'utf8');
html=html.replace('</body>','<script src="demo.js"></script></body>');
fs.writeFileSync(path.join(output,'index.html'),html);
fs.writeFileSync(path.join(output,'.nojekyll'),'');
console.log('GitHub Pages demo built in '+output);

