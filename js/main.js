(function(){
'use strict';
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Loader ---------- */
const loader=$('#loader');
let ready=false;
const hideLoader=()=>{if(ready)return;ready=true;loader.classList.add('done');startHero();};
addEventListener('load',()=>setTimeout(hideLoader,reduce?0:1700));
setTimeout(hideLoader,3500); // safety: never block content

/* ---------- Hero headline: split into words ---------- */
const ht=$('#heroTitle');
(function split(el){
  const walk=n=>{
    if(n.nodeType===3){
      const f=document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(t=>{
        if(!t.trim()){f.append(t);return;}
        const w=document.createElement('span');w.className='w';
        const i=document.createElement('span');i.textContent=t;w.append(i);f.append(w);
      });
      n.replaceWith(f);
    }else if(n.nodeType===1){[...n.childNodes].forEach(walk);}
  };
  [...el.childNodes].forEach(walk);
  $$('.w>span',el).forEach((s,i)=>s.style.transitionDelay=(i*90)+'ms');
})(ht);
function startHero(){
  ht.classList.add('in');
  $$('.hero .reveal').forEach((e,i)=>setTimeout(()=>e.classList.add('in'),300+i*150));
  $$('.stat b').forEach(countUp);
}

/* ---------- Count-up (final value is already in the markup) ---------- */
function countUp(el){
  if(reduce)return;
  const to=parseFloat(el.dataset.count),dec=+el.dataset.dec||0,pre=el.dataset.prefix||'',suf=el.dataset.suffix||'';
  const t0=performance.now(),dur=1800;
  (function tick(t){
    const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,4);
    el.textContent=pre+(to*e).toFixed(dec)+suf;
    if(p<1)requestAnimationFrame(tick);
  })(t0);
}

/* ---------- Reveal on scroll ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
}),{threshold:.12});
$$('.reveal,.speed,.proj').forEach(el=>{ if(!el.closest('.hero')) io.observe(el); });

/* ---------- Nav state + scroll-driven mark ---------- */
const nav=$('#nav'),dial=$('#dial'),heroBg=$('#heroBg'),heroMark=$('.hero-mark');
function onScroll(){
  const y=scrollY,max=document.documentElement.scrollHeight-innerHeight,p=max>0?y/max:0;
  nav.classList.toggle('stuck',y>40);
  dial.style.setProperty('--rot',(p*720)+'deg');
  dial.style.setProperty('--p',(p*100)+'%');
  if(!reduce&&y<innerHeight*1.2){
    heroBg.style.setProperty('--py',(y*.25)+'px');
    heroMark.style.setProperty('--hr',(y*.12)+'deg');
  }
}
addEventListener('scroll',()=>requestAnimationFrame(onScroll),{passive:true});onScroll();

/* Current section in nav */
const secs=$$('main section[id]').filter(s=>$(`.links a[href="#${s.id}"]`));
const so=new IntersectionObserver(es=>es.forEach(e=>{
  const a=$(`.links a[href="#${e.target.id}"]`);
  if(a){ if(e.isIntersecting)a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current'); }
}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>so.observe(s));

/* ---------- Mobile menu: Escape closes, focus returns ---------- */
const burger=$('#burger'),links=$('#links'),mq=matchMedia('(max-width:820px)');
function setMenu(open){
  links.classList.toggle('open',open);
  burger.setAttribute('aria-expanded',open);
  burger.setAttribute('aria-label',open?'Close menu':'Open menu');
  document.body.style.overflow=open?'hidden':'';
  if(open)$('a',links).focus(); else if(document.activeElement&&links.contains(document.activeElement))burger.focus();
}
burger.addEventListener('click',()=>setMenu(!links.classList.contains('open')));
$$('#links a').forEach(a=>a.addEventListener('click',()=>{if(links.classList.contains('open'))setMenu(false);}));
addEventListener('keydown',e=>{if(e.key==='Escape'&&links.classList.contains('open'))setMenu(false);});
mq.addEventListener('change',()=>{if(!mq.matches)setMenu(false);});

/* Logo motion: plays on hover/focus (CSS). Also play once on the header mark after the loader, then each time a card mark scrolls into view. */
if(!reduce){
  const navMark=$('.nav .mark');
  const play=el=>{el.classList.remove('logo-play');void el.getBoundingClientRect();el.classList.add('logo-play');setTimeout(()=>el.classList.remove('logo-play'),1300);};
  setTimeout(()=>play(navMark),2600);
  const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){play(e.target);cio.unobserve(e.target);}}),{threshold:.8});
  $$('.card .mark').forEach(m=>cio.observe(m));
}

/* ---------- Marquee pause (WCAG 2.2.2) ---------- */
const mqEl=$('#marquee'),mqBtn=$('#mqBtn');
if(reduce){mqEl.classList.add('paused');mqBtn.hidden=true;}
mqBtn.addEventListener('click',()=>{
  const p=mqEl.classList.toggle('paused');
  mqBtn.setAttribute('aria-pressed',p);
  mqBtn.setAttribute('aria-label',p?'Play customer scroll':'Pause customer scroll');
  mqBtn.textContent=p?'▶':'❚❚';
});

/* ---------- Tabs: arrow keys, Home/End, roving tabindex ---------- */
const tabs=$$('[role=tab]');
function selectTab(t,focus){
  tabs.forEach(x=>{const on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;$('#'+x.getAttribute('aria-controls')).hidden=!on;});
  if(focus)t.focus();
}
tabs.forEach((t,i)=>{
  t.addEventListener('click',()=>selectTab(t));
  t.addEventListener('keydown',e=>{
    const k={ArrowRight:1,ArrowLeft:-1}[e.key];
    if(k){e.preventDefault();selectTab(tabs[(i+k+tabs.length)%tabs.length],true);}
    else if(e.key==='Home'){e.preventDefault();selectTab(tabs[0],true);}
    else if(e.key==='End'){e.preventDefault();selectTab(tabs[tabs.length-1],true);}
  });
});

/* ---------- Projects rail ---------- */
const rail=$('#rail'),behave=reduce?'auto':'smooth';
$('#pPrev').onclick=()=>rail.scrollBy({left:-340,behavior:behave});
$('#pNext').onclick=()=>rail.scrollBy({left:340,behavior:behave});

/* ---------- Testimonials (manual only: no auto-advance) ---------- */
const qs=$$('#voices-box blockquote');let qi=0;
function showQ(i){qi=(i+qs.length)%qs.length;qs.forEach((q,k)=>q.classList.toggle('on',k===qi));$('#vCount').textContent=(qi+1)+' / '+qs.length;}
$('#vPrev').onclick=()=>showQ(qi-1);$('#vNext').onclick=()=>showQ(qi+1);

/* ---------- 24-hour RTC explorer ---------- */
(function(){
  const svg=$('#rtcChart'),range=$('#rtcRange'),W=960,H=320,step=.25;
  const solar=h=>Math.max(0,Math.exp(-Math.pow(h-12.4,2)/(2*Math.pow(2.9,2)))*1.15-.02);
  const windBase=h=>.32+.2*Math.cos((h-2.5)/24*2*Math.PI);
  function mix(h){const s=Math.min(1,solar(h));const w=Math.min(windBase(h),1-s);return {s,w,t:Math.max(0,1-s-w)};}
  const xs=h=>h/24*W, ys=v=>H-v*H;
  const pts=[];for(let h=0;h<=24+1e-9;h+=step)pts.push(h);
  const line=f=>pts.map((h,i)=>(i?'L':'M')+xs(h).toFixed(1)+' '+ys(f(h)).toFixed(1)).join('');
  const area=(top,bot)=>line(top)+pts.slice().reverse().map(h=>'L'+xs(h).toFixed(1)+' '+ys(bot(h)).toFixed(1)).join('')+'Z';
  const S=h=>mix(h).s, SW=h=>mix(h).s+mix(h).w;
  const layers=`<path d="${area(()=>1,SW)}" fill="var(--color-data-storage)"/><path d="${area(SW,S)}" fill="var(--color-data-wind)"/><path d="${area(S,()=>0)}" fill="var(--color-data-solar)"/>`;
  svg.innerHTML=`
   <defs><clipPath id="past"><rect id="clipR" x="0" y="0" width="480" height="${H}"/></clipPath></defs>
   <g opacity=".28">${layers}</g>
   <g clip-path="url(#past)">${layers}</g>
   <line x1="0" x2="${W}" y1="2" y2="2" stroke="#fff" stroke-dasharray="6 6"/>
   <g id="cursor">
     <line id="cl" x1="0" x2="0" y1="0" y2="${H}" stroke="#fff" stroke-width="2"/>
     <g id="cm"><circle r="24" fill="#064635" stroke="#fff" stroke-width="2"/>
       <svg x="-12" y="-12" width="24" height="24" viewBox="0 0 53 50" fill="#fff" overflow="visible"><g id="cmr" style="transform-box:view-box;transform-origin:50% 50%"><path d="M38.9 1.4H19.4L0.6 31.4L18.8 31.2A9.9 9.9 0 0 1 29.5 16Z"/><path d="M38.9 1.4H19.4L0.6 31.4L18.8 31.2A9.9 9.9 0 0 1 29.5 16Z" transform="rotate(180 26.5 25.1)"/></g></svg>
     </g>
   </g>`;
  const clipR=$('#clipR',svg),cl=$('#cl',svg),cm=$('#cm',svg),cmr=$('#cmr',svg);
  const fmt=h=>{let hh=Math.floor(h),mm=Math.round((h%1)*60);if(mm===60){hh++;mm=0;}return String(hh%24).padStart(2,'0')+':'+String(mm).padStart(2,'0');};
  const phase=h=>h<5?'Night':h<7?'Dawn':h<11?'Morning':h<15?'Midday':h<18?'Afternoon':h<20?'Dusk':'Night';
  function update(h){
    const m=mix(h),x=xs(h);
    clipR.setAttribute('width',x);cl.setAttribute('x1',x);cl.setAttribute('x2',x);
    cm.setAttribute('transform',`translate(${Math.min(Math.max(x,24),W-24)},${ys(.5)})`);
    cmr.style.transform=`rotate(${h*15}deg)`;
    const sp=Math.round(m.s*100),wp=Math.round(m.w*100),tp=Math.max(0,100-sp-wp);
    $('#rtcTime').textContent=fmt(h);$('#rtcPhase').textContent=phase(h);
    $('#mSolar').textContent=sp+'%';$('#mWind').textContent=wp+'%';$('#mStore').textContent=tp+'%';
    range.setAttribute('aria-valuetext',`${fmt(h)}, ${phase(h)}. Solar ${sp} percent, wind ${wp} percent, storage ${tp} percent.`);
  }
  range.addEventListener('input',()=>{stop();update(+range.value);});
  let raf=null,playing=false;
  const btn=$('#rtcPlay');
  function stop(){playing=false;cancelAnimationFrame(raf);btn.textContent='▶';btn.setAttribute('aria-label','Play day cycle');}
  function play(){
    playing=true;btn.textContent='❚❚';btn.setAttribute('aria-label','Pause day cycle');let last=performance.now();
    (function loop(t){
      if(!playing)return;
      let h=+range.value+(t-last)/1000*2.4;last=t;if(h>24)h=0;
      range.value=h;update(h);raf=requestAnimationFrame(loop);
    })(last);
  }
  btn.addEventListener('click',()=>playing?stop():play());
  update(12);
  if(!reduce){const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){range.value=0;play();o.disconnect();}},{threshold:.5});o.observe($('.rtc'));}
})();

/* ---------- Plan your switch: pathfinder + estimator ---------- */
const NEEDS={
  'RTC Power':'Solar, wind and storage combined with energy trading for a steady 24x7 renewable supply.',
  'Open access PPA':'Hybrid, solar and wind PPAs that can cover up to 100% of your consumption.',
  'Energy Storage':'Battery systems that deliver power during non-generation hours.',
  'RECs & Carbon Credits':'Renewable Energy Certificates and carbon credits to meet RE100 and ESG goals.',
  'Not sure yet':'Tell us about your load and goals and our team will suggest the right mix.'
};
const SECTORS={
  'Pharma & healthcare':['Emcure','Sandoz India','Lupin'],
  'FMCG & food':['Dabur',"Haldiram's",'Bisleri'],
  'Steel & metals':['Jindal Stainless','APL Apollo'],
  'Building materials':['Kajaria Ceramics','Merino Group'],
  'IT & data':['Sify'],
  'Industrial gases & chemicals':['Inox Air Products','Deepak Fertilizers'],
  'Other':[]
};
const plan={need:'',sector:'',est:null,estTouched:false};
const out=$('#planOut');
const list=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];
function renderPlan(){
  if(!plan.need&&!plan.sector){out.innerHTML='<p class="plan-empty">Choose an option above and a short summary appears here.</p>';return;}
  let html='';
  if(plan.need){const h=document.createElement('h3');h.textContent=plan.need+(plan.sector&&plan.sector!=='Other'?' for '+plan.sector:'');html+=h.outerHTML+'<p>'+NEEDS[plan.need]+'</p>';}
  else html+='<h3>'+plan.sector.replace(/&/g,'&amp;')+'</h3>';
  const c=SECTORS[plan.sector]||[];
  if(c.length)html+='<p>Sunsure already supplies companies in this space, such as <strong>'+list(c).replace(/&/g,'&amp;')+'</strong>.</p>';
  out.innerHTML=html;
}
$$('input[name=need]').forEach(r=>r.addEventListener('change',()=>{plan.need=r.value;renderPlan();}));
$$('input[name=sector]').forEach(r=>r.addEventListener('change',()=>{plan.sector=r.value;renderPlan();}));

const inr=n=>{
  if(n>=1e7)return '₹'+(n/1e7).toFixed(2).replace(/\.?0+$/,'')+' crore';
  if(n>=1e5)return '₹'+(n/1e5).toFixed(n>=1e6?1:2).replace(/\.?0+$/,'')+' lakh';
  return '₹'+Math.round(n).toLocaleString('en-IN');
};
const num=s=>parseFloat(String(s).replace(/,/g,''));
function calc(touch){
  const L=$('#e-load'),G=$('#e-grid'),R=$('#e-green'),S=$('#e-share');
  const e=(el,msg)=>{const o=$('#'+el.id+'-err');o.textContent=msg||'';if(msg)el.setAttribute('aria-invalid','true');else el.removeAttribute('aria-invalid');return !msg;};
  const l=num(L.value),g=num(G.value),r=num(R.value),s=+S.value;
  $('#e-share-out').textContent=s+'%';
  let ok=true;
  ok=e(L,!(l>0)?'Enter a number above zero.':'')&&ok;
  ok=e(G,!(g>0)?'Enter a tariff above zero.':'')&&ok;
  ok=e(R,!(r>0)?'Enter a tariff above zero.':'')&&ok;
  const Y=$('#estYear'),M=$('#estMonth');
  if(!ok){Y.textContent='–';M.textContent='Fix the highlighted fields to see an estimate.';plan.est=null;return;}
  const perMonth=l*(s/100)*(g-r);
  if(perMonth<=0){Y.textContent='No saving';M.textContent='At these tariffs the green rate is not lower than your current rate.';plan.est=null;if(touch)plan.estTouched=true;return;}
  Y.textContent=inr(perMonth*12);M.textContent='about '+inr(perMonth)+' a month';
  plan.est={l,g,r,s,year:perMonth*12};
  if(touch)plan.estTouched=true;
}
['#e-load','#e-grid','#e-green'].forEach(s=>$(s).addEventListener('input',()=>calc(true)));
$('#e-share').addEventListener('input',()=>calc(true));
calc(false);

/* Carry choices into the enquiry form */
function setSelect(sel,val){
  const o=[...sel.options].find(x=>x.value===val||x.textContent===val);
  sel.value=o?o.value||o.textContent:'';
}
$('#planGo').addEventListener('click',()=>{
  const bits=[];
  if(plan.need){setSelect($('#f-interest'),plan.need);bits.push(plan.need);}
  if(plan.sector){setSelect($('#f-sector'),plan.sector);bits.push(plan.sector);}
  if(plan.estTouched&&plan.est){$('#f-load').value=Math.round(plan.est.l).toLocaleString('en-IN')+' kWh per month';bits.push('estimate '+inr(plan.est.year)+' a year');}
  $('#prefillNote').textContent=bits.length?'Filled in from your choices: '+bits.join(', ')+'. You can change any of it.':'';
  $('#contact').scrollIntoView({behavior:reduce?'auto':'smooth'});
  setTimeout(()=>$('#f-name').focus({preventScroll:true}),reduce?0:500);
});

/* Mobile quick-action bar: show after the hero, hide over the form */
const mbar=$('#mbar');
function mbarState(){
  const past=scrollY>innerHeight*.8;
  const c=$('#contact').getBoundingClientRect();
  const atForm=c.top<innerHeight*.6;
  mbar.classList.toggle('show',past&&!atForm);
}
addEventListener('scroll',()=>requestAnimationFrame(mbarState),{passive:true});mbarState();

/* ---------- Contact form: validation, error + loading states ---------- */
const form=$('#form'),submit=$('#submit'),note=$('#formNote');
function setErr(input,msg){
  const out=$('#'+input.getAttribute('aria-describedby'));
  out.textContent=msg||'';
  if(msg)input.setAttribute('aria-invalid','true'); else input.removeAttribute('aria-invalid');
}
function validate(){
  const n=$('#f-name'),e=$('#f-email');let first=null;
  if(!n.value.trim()){setErr(n,'Enter your name.');first=first||n;} else setErr(n,'');
  if(!e.value.trim()){setErr(e,'Enter your work email.');first=first||e;}
  else if(!/^\S+@\S+\.\S+$/.test(e.value)){setErr(e,'Enter an email like name@company.com.');first=first||e;}
  else setErr(e,'');
  return first;
}
['#f-name','#f-email'].forEach(s=>$(s).addEventListener('input',()=>{if($(s).hasAttribute('aria-invalid'))validate();}));
form.addEventListener('submit',e=>{
  e.preventDefault();note.textContent='';
  const bad=validate();
  if(bad){note.textContent='Please fix the highlighted fields.';bad.focus();return;}
  submit.setAttribute('aria-busy','true');submit.setAttribute('aria-label','Sending enquiry');
  const d=new FormData(form);
  const body=`Name: ${d.get('name')}\nCompany: ${d.get('company')}\nEmail: ${d.get('email')}\nInterested in: ${d.get('interest')||'-'}\nIndustry: ${d.get('sector')||'-'}\nConsumption: ${d.get('load')||'-'}`+(plan.estTouched&&plan.est?`\nSelf-estimate (illustrative): ${inr(plan.est.year)} a year at ${plan.est.s}% renewable share, current Rs ${plan.est.g}/kWh, green Rs ${plan.est.r}/kWh`:'');
  setTimeout(()=>{
    location.href='mailto:marketing@sunsure.in?subject='+encodeURIComponent('Enquiry from sunsure website')+'&body='+encodeURIComponent(body);
    submit.removeAttribute('aria-busy');submit.removeAttribute('aria-label');
    note.textContent='Thanks. Your email app should open with the details. If it does not, write to marketing@sunsure.in.';
  },600);
});
})();
