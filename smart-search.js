(() => {
  const sectionMap = {all:'همه',investment:'سرمایه‌گذاری',business:'کسب‌وکار',strategy:'راهبرد و تحلیل',projects:'پروژه‌ها',partnership:'همکاری',knowledge:'دانش و دیدگاه'};
  const keywordMap = {investment:'سرمایه سرمایه‌گذاری مالی فرصت بازده ریسک',business:'کسب‌وکار توسعه بازار رشد مدل',strategy:'راهبرد برنامه‌ریزی تحلیل اقتصاد بازار تصمیم',projects:'پروژه طراحی اجرا مطالعه ارزیابی',partnership:'همکاری مشارکت شریک شبکه ایده',knowledge:'دانش دیدگاه مطالعه تحلیل اقتصاد آینده'};
  const sections = [...document.querySelectorAll('section[id]')];
  if (!sections.length) return;
  const items = [];
  sections.forEach(section => {
    const heading = section.querySelector('h2,h1,h3');
    const paragraphs = [...section.querySelectorAll('p')].map(p=>p.textContent.trim()).filter(Boolean);
    const links = [...section.querySelectorAll('a')].map(a=>a.textContent.trim()).filter(Boolean);
    const title = heading ? heading.textContent.trim() : section.id;
    const text = [title,...paragraphs,...links].join(' ');
    let category='all';
    if(section.id==='projects') category='projects';
    else if(section.id==='opportunities') category='investment';
    else if(section.id==='knowledge') category='knowledge';
    else if(section.id==='domains') category='strategy';
    else if(section.id==='about'||section.id==='philosophy') category='business';
    else if(section.id==='contact') category='partnership';
    items.push({section,id:section.id,title,text,category});
  });
  const style=document.createElement('style');
  style.textContent=`
    .smart-search-trigger{display:inline-flex;align-items:center;gap:9px;margin-top:20px;padding:11px 18px;border:1px solid rgba(54,82,122,.18);border-radius:16px;background:rgba(255,253,248,.78);color:#36527a;font:500 11px/1.8 Vazir,Tahoma,sans-serif;cursor:pointer;backdrop-filter:blur(10px);box-shadow:0 10px 28px rgba(32,40,58,.05);transition:.3s}
    .smart-search-trigger:hover{transform:translateY(-2px);border-color:rgba(176,109,79,.32);box-shadow:0 15px 34px rgba(32,40,58,.08)}
    .smart-search-trigger i,.smart-menu-item i{font-size:12px;color:#b06d4f}
    .smart-menu-item{list-style:none!important}.smart-menu-link{display:flex!important;align-items:center;gap:8px!important}
    .smart-search-modal{position:fixed;inset:0;z-index:9999;display:none;align-items:flex-start;justify-content:center;padding:8vh 20px 30px;background:rgba(32,40,58,.28);backdrop-filter:blur(8px)}
    .smart-search-modal.active{display:flex;animation:smartFade .2s ease}@keyframes smartFade{from{opacity:0}to{opacity:1}}
    .smart-search-panel{width:min(760px,100%);max-height:82vh;overflow:hidden;border:1px solid rgba(54,82,122,.14);border-radius:28px;background:rgba(255,253,248,.97);box-shadow:0 30px 90px rgba(32,40,58,.2);direction:rtl}
    .smart-search-head{padding:20px 20px 12px;border-bottom:1px solid #d9d6cf}.smart-search-input-wrap{display:flex;align-items:center;gap:10px;padding:5px 8px 5px 14px;border:1px solid rgba(54,82,122,.16);border-radius:17px;background:#fff;transition:.25s}.smart-search-input-wrap:focus-within{border-color:#b06d4f;box-shadow:0 0 0 4px rgba(176,109,79,.07)}
    .smart-search-input-wrap i{color:#b06d4f;font-size:14px}.smart-search-input{flex:1;border:0;outline:0;background:transparent;color:#20283a;font:400 13px/2 Vazir,Tahoma,sans-serif;min-width:0}.smart-search-close{width:34px;height:34px;border:0;border-radius:10px;background:#eef2f7;color:#36527a;cursor:pointer;font-size:13px}
    .smart-search-filters{display:flex;flex-wrap:wrap;gap:7px;padding-top:12px}.smart-search-filter{border:1px solid #d9d6cf;border-radius:999px;background:#fff;color:#6c7481;padding:6px 11px;font:400 10px/1.7 Vazir,Tahoma,sans-serif;cursor:pointer;transition:.2s}.smart-search-filter.active{background:#36527a;border-color:#36527a;color:#fff}
    .smart-search-results{max-height:58vh;overflow:auto;padding:10px}.smart-search-empty{padding:42px 20px;text-align:center;color:#6c7481;font:400 12px/2 Vazir,Tahoma,sans-serif}.smart-search-result{display:block;width:100%;padding:15px 16px;border:1px solid transparent;border-radius:17px;background:transparent;text-align:right;color:inherit;cursor:pointer;transition:.22s}.smart-search-result:hover{background:#f2f4f7;border-color:#d9d6cf;transform:translateY(-1px)}
    .smart-search-result-top{display:flex;align-items:center;justify-content:space-between;gap:12px}.smart-search-result h4{margin:0;color:#20283a;font:600 14px/1.8 Vazir,Tahoma,sans-serif}.smart-search-result small{color:#b06d4f;font:400 10px/1.7 Shekasteh,'B Nazanin',serif}.smart-search-result p{margin:5px 0 0;color:#6c7481;font:400 11px/2 Vazir,Tahoma,sans-serif;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.smart-search-result mark{background:rgba(176,109,79,.16);color:#9a5c43;border-radius:4px;padding:0 2px}.smart-search-hint{padding:0 20px 15px;color:#89909c;text-align:center;font:400 9px/1.8 Vazir,Tahoma,sans-serif}
    @media(max-width:700px){.smart-search-trigger{width:100%;justify-content:center}.smart-search-modal{padding:4vh 12px 16px}.smart-search-panel{border-radius:22px}.smart-search-head{padding:14px 14px 10px}.smart-search-results{max-height:61vh}.smart-search-result{padding:13px 12px}}
  `;
  document.head.appendChild(style);

  const modal=document.createElement('div');
  modal.className='smart-search-modal';
  modal.innerHTML=`<div class="smart-search-panel" role="dialog" aria-modal="true" aria-label="جستجوی هوشمند"><div class="smart-search-head"><div class="smart-search-input-wrap"><i class="fas fa-search"></i><input class="smart-search-input" type="search" placeholder="مثلاً سرمایه‌گذاری، پروژه انرژی، توسعه کسب‌وکار..." autocomplete="off"><button class="smart-search-close" type="button" aria-label="بستن">×</button></div><div class="smart-search-filters">${Object.entries(sectionMap).map(([key,label])=>`<button type="button" class="smart-search-filter${key==='all'?' active':''}" data-filter="${key}">${label}</button>`).join('')}</div></div><div class="smart-search-results"></div><div class="smart-search-hint">برای جستجوی سریع کلیدهای Ctrl/⌘ + K را فشار دهید · انتخاب هر نتیجه شما را به بخش مرتبط می‌برد</div></div>`;
  document.body.appendChild(modal);
  const input=modal.querySelector('.smart-search-input'),resultsBox=modal.querySelector('.smart-search-results'),filters=[...modal.querySelectorAll('.smart-search-filter')];
  let activeFilter='all';
  const normalize=value=>value.replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/ۀ/g,'ه').replace(/‌/g,' ').toLowerCase().trim();
  const highlight=(text,query)=>{if(!query)return text;const safe=query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return text.replace(new RegExp(`(${safe})`,'ig'),'<mark>$1</mark>')};
  const matchesCategory=(item,filter)=>filter==='all'||item.category===filter||normalize(keywordMap[filter]||'').split(' ').some(k=>k&&normalize(item.text).includes(k));
  const render=()=>{const query=normalize(input.value),words=query.split(/\s+/).filter(Boolean);let result=items.filter(item=>matchesCategory(item,activeFilter));if(words.length)result=result.filter(item=>words.every(word=>normalize(item.text).includes(word)));if(!result.length&&words.length)result=items.filter(item=>matchesCategory(item,activeFilter)&&words.some(word=>normalize(item.text).includes(word)));if(!result.length){resultsBox.innerHTML='<div class="smart-search-empty"><i class="fas fa-compass"></i><br>نتیجه‌ای پیدا نشد.<br><small>عبارت دیگری را امتحان کنید یا حوزه جستجو را تغییر دهید.</small></div>';return}resultsBox.innerHTML=result.map(item=>`<button type="button" class="smart-search-result" data-target="${item.id}"><div class="smart-search-result-top"><h4>${highlight(item.title,query)}</h4><small>${sectionMap[item.category]||'گروه'}</small></div><p>${highlight(item.text.replace(/\s+/g,' ').slice(0,230),query)}</p></button>`).join('')};
  const open=()=>{modal.classList.add('active');document.body.style.overflow='hidden';input.focus();render()};
  const close=()=>{modal.classList.remove('active');document.body.style.overflow=''};
  const addMenuItem=()=>{if(document.querySelector('.smart-menu-item'))return;const anchor=[...document.querySelectorAll('a[href="#contact"],a[href="#opportunities"],a[href="#home"]')].find(a=>a.closest('li,nav'));if(!anchor)return;const list=anchor.closest('ul');if(!list)return;const li=document.createElement('li');li.className='smart-menu-item';li.innerHTML='<a href="#" class="smart-menu-link"><i class="fas fa-search"></i><span>جستجوی هوشمند</span></a>';list.appendChild(li);li.querySelector('a').addEventListener('click',e=>{e.preventDefault();open()})};
  const addIntroTrigger=()=>{const intro=document.querySelector('#home .intro-inner');if(!intro||intro.querySelector('.smart-search-trigger'))return;const trigger=document.createElement('button');trigger.type='button';trigger.className='smart-search-trigger';trigger.innerHTML='<i class="fas fa-magnifying-glass"></i><span>جستجوی هوشمند در گروه</span><span>⌘ K</span>';trigger.addEventListener('click',open);intro.appendChild(trigger)};
  modal.querySelector('.smart-search-close').addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});input.addEventListener('input',render);filters.forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;filters.forEach(b=>b.classList.toggle('active',b===button));render();input.focus()}));resultsBox.addEventListener('click',e=>{const result=e.target.closest('.smart-search-result');if(!result)return;close();document.getElementById(result.dataset.target)?.scrollIntoView({behavior:'smooth',block:'start'})});document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open()}if(e.key==='Escape'&&modal.classList.contains('active'))close()});
  addMenuItem();addIntroTrigger();render();
})();