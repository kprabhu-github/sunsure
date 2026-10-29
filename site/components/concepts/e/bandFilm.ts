// @ts-nocheck
/* Live canvas film for the night band: original Sunsure artwork (no map). */
export function startFilm(cv: HTMLCanvasElement, host: Element): () => void {
const W=1280,H=720,HY=Math.round(H*.58),g=cv.getContext('2d');
const TAU=Math.PI*2,clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),sm=v=>{v=clamp(v);return v*v*(3-2*v)},lerp=(a,b,t)=>a+(b-a)*t;
const hex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const mix=(a,b,t)=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)];
const rgb=(c,a=1)=>`rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
let seed=11;const rnd=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
/* sky colours across the day: dawn, noon, dusk, night */
const ST=[[0,'#0b0d1c','#1b2140'],[4.5,'#1a2442','#6b4a55'],[6.5,'#3d5f8f','#f4a76a'],[11,'#3f78ad','#f3d3a0'],[16,'#34406b','#f08a4b'],[18.5,'#241a38','#fe3a20'],[21,'#0a0c18','#1b2140'],[24,'#0b0d1c','#1b2140']].map(s=>[s[0],hex(s[1]),hex(s[2])]);
function sky(t){let i=0;while(i<ST.length-2&&t>ST[i+1][0])i++;const a=ST[i],b=ST[i+1],u=sm((t-a[0])/(b[0]-a[0]));return{top:mix(a[1],b[1],u),hor:mix(a[2],b[2],u)}}
const nightAt=t=>t<6?1-sm((t-3.8)/2.4):sm((t-17.6)/3);
const sol=h=>Math.max(0,Math.sin(((h-6)/12)*Math.PI))**1.25;
const wnd=h=>.42+.3*Math.cos(((h-2)/24)*TAU)+.05*Math.sin(h*1.7);
const soc=t=>{const h=t<6?t+24:t;return h<15?.15+.85*sm((h-6)/9):h<18?1:1-.85*sm((h-18)/12)};
const stars=Array.from({length:110},()=>({x:rnd()*W,y:rnd()*HY*.85,r:1+rnd()*1.8,p:rnd()*TAU}));
/* one visual language: the logo's slash. Everything leans the same way. */
const SK=.36;
function para(x,y,w,h,k=SK){g.beginPath();g.moveTo(x,y);g.lineTo(x+w,y);g.lineTo(x+w+k*h,y-h);g.lineTo(x+k*h,y-h);g.closePath()}
/* fin ridges: steep slanted rise, long gentle fall */
function ridge(seedv,base,amp,step){const pts=[];let x=-60;seed=seedv;while(x<W+160){const w=step*(.8+rnd()*.7),h=amp*(.4+rnd()*.6);pts.push([x,base],[x+w*.3,base-h]);x+=w}pts.push([x,base]);return pts}
const R1=ridge(5,HY-34,92,150),R2=ridge(9,HY+4,54,110);
function drawRidge(pts,col,hi){g.fillStyle=col;g.beginPath();g.moveTo(pts[0][0],H);pts.forEach(p=>g.lineTo(p[0],p[1]));g.lineTo(pts[pts.length-1][0],H);g.fill();
  g.strokeStyle=hi;g.lineWidth=1.2;g.beginPath();for(let i=1;i<pts.length;i+=2){g.moveTo(pts[i-1][0],pts[i-1][1]);g.lineTo(pts[i][0],pts[i][1])}g.stroke()}
function ridgeY(pts,x){let y=pts[0][1];for(let i=1;i<pts.length;i++)if(x<=pts[i][0]){const a=pts[i-1],b=pts[i],u=(x-a[0])/(b[0]-a[0]||1);y=lerp(a[1],b[1],u);break}return y}
/* wind: three slanted blades, red tips, light trail */
function turbine(x,s,t,ph,col,night,hor){const y=ridgeY(R1,x)+4,hh=120*s,hx=x+SK*hh*.25,hy=y-hh;
  g.fillStyle=col;para(x-2.4*s,y,4.8*s,hh,SK*.25);g.fill();
  const spin=t*(.9+.5*Math.sin(t*.4+ph))+ph;
  g.strokeStyle=`rgba(255,120,80,${.07+.06*night})`;g.lineWidth=1;g.beginPath();g.arc(hx,hy,60*s,0,TAU);g.stroke();
  for(let b=0;b<3;b++){const a=spin+b*TAU/3,c=Math.cos(a),d=Math.sin(a),L=64*s,w=5.4*s,px=-d,py=c;
    g.fillStyle=col;g.beginPath();g.moveTo(hx+px*w*.5,hy+py*w*.5);g.lineTo(hx+c*L+px*w*.1,hy+d*L+py*w*.1);g.lineTo(hx+c*L-px*w*.5-c*3*s,hy+d*L-py*w*.5-d*3*s);g.lineTo(hx-px*w*.5,hy-py*w*.5);g.closePath();g.fill();
    g.fillStyle=`rgba(254,58,32,${.55+.4*night})`;g.beginPath();g.moveTo(hx+c*L*.8+px*w*.2,hy+d*L*.8+py*w*.2);g.lineTo(hx+c*L+px*w*.1,hy+d*L+py*w*.1);g.lineTo(hx+c*L-px*w*.5-c*3*s,hy+d*L-py*w*.5-d*3*s);g.lineTo(hx+c*L*.8-px*w*.3,hy+d*L*.8-py*w*.3);g.closePath();g.fill()}
  g.fillStyle=col;g.beginPath();g.arc(hx,hy,3.8*s,0,TAU);g.fill()}
/* solar: a field of leaning panels that open to the sun and fold flat at night */
function field(t,hor,night,sunU){
  const rows=8,wake=sm((t-5.2)/1.6)*(1-sm((t-18.2)/1.6));
  for(let k=0;k<rows;k++){
    const u=Math.pow(k/(rows-1),1.5),y=HY+22+(H*.9-HY-22)*u,sc=.36+u*1.7,ph=30*sc,pw=22*sc,step=64*sc;
    for(let x=-70+((k*17)%step);x<W*.7;x+=step){
      const wave=.5+.5*Math.sin(x*.011-k*.5-t*1.3),open=clamp(.28+wake*(.3+.55*wave),0,1),w=pw*(.3+.7*open),sk=SK*ph;
      const face=mix(hex('#0b1228'),hex('#1f3a78'),open*.9),lit=mix(face,hor,.06+.16*open*(1-night)*wake);
      const gg=g.createLinearGradient(x,y-ph,x,y);gg.addColorStop(0,rgb(lit));gg.addColorStop(1,rgb(mix(lit,[255,255,255],.12*open)));
      g.fillStyle=gg;para(x,y-ph*.12,w,ph*.88);g.fill();
      g.strokeStyle=`rgba(254,58,32,${(.15+.45*open*(1-night*.4))*u})`;g.lineWidth=Math.max(.8,1.3*sc);g.beginPath();g.moveTo(x+sk*.88+w,y-ph*.12-ph*.88+0);g.lineTo(x+sk*.88,y-ph*.12-ph*.88);g.stroke();
      if(open>.88&&night<.5){g.fillStyle=`rgba(255,236,200,${(open-.88)*3*(1-night)})`;para(x,y-ph*.12,w*.35,ph*.88);g.fill()}
    }
  }
}
/* transmission: slim leaning poles */
const PY=[];for(let i=0;i<7;i++){const u=i/6,x=lerp(W*.27,W*.8,u),base=lerp(HY+205,HY+30,Math.pow(u,.8)),h=lerp(255,54,Math.pow(u,.8));PY.push({x,base,h,top:base-h})}
function pylon(p,col){g.fillStyle=col;para(p.x-p.h*.025,p.base,p.h*.05,p.h,SK*.22);g.fill();
  g.strokeStyle=col;g.lineWidth=Math.max(1.2,p.h*.02);const ax=p.x+SK*.22*p.h;
  g.beginPath();g.moveTo(ax-p.h*.2,p.top+p.h*.1);g.lineTo(ax+p.h*.2,p.top+p.h*.1);g.stroke();
  g.beginPath();g.moveTo(ax-p.h*.14,p.top+p.h*.24);g.lineTo(ax+p.h*.14,p.top+p.h*.24);g.stroke();
  g.fillStyle=`rgba(254,58,32,.9)`;g.beginPath();g.arc(ax,p.top-1,Math.max(1.2,p.h*.014),0,TAU);g.fill()}
/* industry: leaning halls, a slanted stack, two tanks, glowing pipe */
function factory(t,night,hor){g.save();g.translate(W*.78,HY+34);g.scale(1.3,1.3);g.translate(-W*.78,-(HY+34));const x=W*.78,y=HY+34,dark=rgb(mix(hex('#0a0b11'),hor,.09)),mid=rgb(mix(hex('#131521'),hor,.12));
  g.fillStyle=mid;para(x+84,y,70,96);g.fill();                       /* tall block */
  g.fillStyle=dark;para(x,y,150,52);g.fill();                          /* long hall */
  g.fillStyle=dark;para(x+158,y,16,150,SK*.4);g.fill();                /* leaning chimney */
  g.fillStyle=mid;g.beginPath();g.rect(x+186,y-64,30,64);g.fill();g.beginPath();g.ellipse(x+201,y-64,15,5,0,0,TAU);g.fill();
  g.beginPath();g.rect(x+222,y-46,24,46);g.fill();g.beginPath();g.ellipse(x+234,y-46,12,4,0,0,TAU);g.fill();
  const on=.5+.5*night;g.globalCompositeOperation='lighter';
  for(let r=0;r<2;r++)for(let c=0;c<9;c++){const a=on*(((c*3+r*5)%7)<5?1:.35)*(.75+.25*Math.sin(t*2+c+r));g.fillStyle=`rgba(255,190,110,${a*.9})`;para(x+10+c*14+r*6,y-12-r*16,9,5);g.fill()}
  for(let r=0;r<4;r++){const a=on*(.55+.45*Math.sin(t*1.7+r*1.3));g.fillStyle=`rgba(255,190,110,${a*.8})`;para(x+96+r*0,y-16-r*20,34,5);g.fill()}
  /* solar roof strip */
  g.fillStyle='rgba(90,130,220,.55)';para(x+4,y-52,120,4);g.fill();
  /* glowing pipe */
  g.strokeStyle=`rgba(254,58,32,${.4+.4*night})`;g.lineWidth=2;g.beginPath();g.moveTo(x+150,y-18);g.lineTo(x+186,y-18);g.stroke();
  const q=(t*.5)%1;g.fillStyle='rgba(255,220,180,.9)';g.beginPath();g.arc(x+150+36*q,y-18,2.2,0,TAU);g.fill();
  const gr=g.createRadialGradient(x+90,y-30,0,x+90,y-30,190);gr.addColorStop(0,`rgba(255,150,80,${.3*on})`);gr.addColorStop(1,'rgba(255,100,40,0)');g.fillStyle=gr;g.fillRect(x-110,y-220,420,300);
  g.globalCompositeOperation='source-over';g.fillStyle=`rgba(254,58,32,${(.4+.6*night)*(.5+.5*Math.sin(t*3))})`;g.beginPath();g.arc(x+158+SK*.4*150,y-152,2.8,0,TAU);g.fill();g.restore()}
/* storage: slanted cells, filling in the sun, draining at night */
function batteries(t,night,hor){const lv=soc(t),x0=W*.66,yb=H*.9;
  for(let i=0;i<5;i++){const x=x0+i*50,w=28,h=96;g.fillStyle=rgb(mix(hex('#161922'),hor,.08));para(x,yb,w,h);g.fill();
    g.strokeStyle=rgb(mix(hex('#2a2f3e'),hor,.14));g.lineWidth=1.2;para(x,yb,w,h);g.stroke();
    const segs=8,sl=lv*segs-i*.12;g.globalCompositeOperation='lighter';
    for(let s=0;s<segs;s++){const on=clamp(sl-s,0,1);if(on<=0)continue;g.fillStyle=`rgba(255,${110+s*10},64,${.2+.7*on})`;para(x+3+SK*(8+s*10.6),yb-8-s*10.6,w-6,7,0);g.fill()}
    g.globalCompositeOperation='source-over'}
  const gr=g.createRadialGradient(x0+120,yb-50,0,x0+120,yb-50,230);g.globalCompositeOperation='lighter';gr.addColorStop(0,`rgba(255,110,60,${.2*lv*(.4+night)})`);gr.addColorStop(1,'rgba(255,80,40,0)');g.fillStyle=gr;g.fillRect(x0-120,yb-260,520,320);g.globalCompositeOperation='source-over'}
/* the supply strip: solar + wind + storage always add up to the full day */
function strip(t){const x0=W*.16,x1=W*.62,y=H-30,mh=24,bw=(x1-x0)/24;
  for(let h=0;h<24;h++){const s=Math.min(1,sol(h)*1.1),w=Math.min(1-s,wnd(h)*.55),b=1-s-w,x=x0+h*bw;
    let yy=y;[[s,'#f2b04a'],[w,'#8aa4b8'],[b,'#fe3a20']].forEach(([v,c])=>{const hh=v*mh;g.fillStyle=c;g.globalAlpha=.55;g.fillRect(x+1,yy-hh,bw-2,hh);yy-=hh});g.globalAlpha=1}
  const cx=x0+clamp(t/24)*(x1-x0);g.fillStyle='rgba(255,255,255,.85)';g.fillRect(cx-1,y-mh-8,2,mh+12)}
function frame(t){
  seed=11;const {top,hor}=sky(t),night=nightAt(t),sunU=clamp((t-5.5)/12.5);
  let gr=g.createLinearGradient(0,0,0,HY+10);gr.addColorStop(0,rgb(top));gr.addColorStop(.7,rgb(mix(top,hor,.45)));gr.addColorStop(1,rgb(hor));g.fillStyle=gr;g.fillRect(0,0,W,H);
  /* stars as small diamonds */
  if(night>0)for(const s of stars){const a=night*(.45+.55*Math.sin(t*1.6+s.p))*(1-s.y/HY*.5);if(a<=.02)continue;g.fillStyle=`rgba(255,244,230,${a})`;g.beginPath();g.moveTo(s.x,s.y-s.r);g.lineTo(s.x+s.r*.6,s.y);g.lineTo(s.x,s.y+s.r);g.lineTo(s.x-s.r*.6,s.y);g.fill()}
  /* brand slants: two light shafts that drift */
  g.save();const dx=Math.sin(t*.3)*46;g.globalAlpha=.06+.04*(1-night);g.fillStyle='#fe3a20';g.beginPath();g.moveTo(160+dx,HY);g.lineTo(520+dx,HY);g.lineTo(400+dx,0);g.lineTo(40+dx,0);g.fill();g.globalAlpha=.035;g.fillStyle='#fff';g.beginPath();g.moveTo(700-dx,HY);g.lineTo(1040-dx,HY);g.lineTo(920-dx,0);g.lineTo(580-dx,0);g.fill();g.restore();
  /* sun: flat disc with rings */
  if(t>5&&t<19.2){const sx=lerp(.06,.94,sunU)*W,sy=HY+22-Math.sin(sunU*Math.PI)*HY*.8,a=sm((t-5)/1)*(1-sm((t-18.2)/1));
    g.globalCompositeOperation='lighter';[[110,.08],[72,.12],[44,.2]].forEach(([r,al])=>{g.fillStyle=`rgba(255,200,130,${al*a})`;g.beginPath();g.arc(sx,sy,r,0,TAU);g.fill()});g.globalCompositeOperation='source-over';
    g.fillStyle=`rgba(255,238,208,${.95*a})`;g.beginPath();g.arc(sx,sy,20,0,TAU);g.fill()}
  /* moon: crescent */
  if(night>.02){const mu=t>=18?(t-18)/12:(t+6)/12,mx=lerp(.1,.9,mu)*W,my=HY+30-Math.sin(mu*Math.PI)*HY*.72,r=15;
    g.save();g.beginPath();g.arc(mx,my,r,0,TAU);g.clip();g.fillStyle=`rgba(228,236,255,${.9*night})`;g.beginPath();g.rect(mx-r,my-r,2*r,2*r);g.arc(mx+r*.5,my-r*.25,r*.85,0,TAU,true);g.fill();g.restore();
    g.globalCompositeOperation='lighter';const gm=g.createRadialGradient(mx,my,0,mx,my,70);gm.addColorStop(0,`rgba(170,195,255,${.16*night})`);gm.addColorStop(1,'rgba(150,180,255,0)');g.fillStyle=gm;g.fillRect(mx-70,my-70,140,140);g.globalCompositeOperation='source-over'}
  drawRidge(R1,rgb(mix(hex('#141725'),hor,.2-.12*night)),`rgba(${hor[0]|0},${hor[1]|0},${hor[2]|0},.45)`);
  const tc=rgb(mix(hex('#0b0c13'),hor,.1-.05*night));g.globalAlpha=1;[[.05,1.05],[.115,.9],[.18,.76],[.24,.64],[.29,.52]].forEach((p,i)=>turbine(p[0]*W,p[1],t,i*1.7,tc,night,hor));
  drawRidge(R2,rgb(mix(hex('#0e1019'),hor,.12-.07*night)),`rgba(${hor[0]|0},${hor[1]|0},${hor[2]|0},.35)`);
  gr=g.createLinearGradient(0,HY,0,H);gr.addColorStop(0,rgb(mix(hex('#0a0b10'),hor,.1)));gr.addColorStop(1,'#060608');g.fillStyle=gr;g.fillRect(0,HY+8,W,H-HY);
  factory(t,night,hor);field(t,hor,night,sunU);
  const pc=rgb(mix(hex('#07080b'),hor,.06));PY.forEach(p=>pylon(p,pc));
  g.strokeStyle='rgba(0,0,0,.8)';g.lineWidth=1.3;for(const dy of[0,.14]){g.beginPath();for(let i=0;i<PY.length-1;i++){const a=PY[i],b=PY[i+1];for(let s=0;s<=14;s++){const u=s/14,x=lerp(a.x,b.x,u),y=lerp(a.top+a.h*dy*.5,b.top+b.h*dy*.5,u)+Math.sin(u*Math.PI)*lerp(a.h,b.h,u)*.1;(i||s)?g.lineTo(x,y):g.moveTo(x,y)}}g.stroke()}
  const flow=.45+.55*Math.max(sol(t<6?t+24:t),.5);g.globalCompositeOperation='lighter';
  for(let n=0;n<9;n++){const pos=((((t*.17+n/9)%1)+1)%1)*(PY.length-1),i=Math.max(0,Math.min(PY.length-2,Math.floor(pos))),f=pos-i,a=PY[i],b=PY[i+1],x=lerp(a.x,b.x,f),y=lerp(a.top+a.h*.07,b.top+b.h*.07,f)+Math.sin(f*Math.PI)*lerp(a.h,b.h,f)*.1,R=lerp(13,6,pos/(PY.length-1));
    const gp=g.createRadialGradient(x,y,0,x,y,R);gp.addColorStop(0,`rgba(255,236,204,${flow})`);gp.addColorStop(.3,`rgba(255,120,70,${.7*flow})`);gp.addColorStop(1,'rgba(254,58,32,0)');g.fillStyle=gp;g.fillRect(x-R,y-R,R*2,R*2)}
  g.globalCompositeOperation='source-over';
  batteries(t,night,hor);strip(t);
  const vg=g.createRadialGradient(W/2,H*.5,H*.25,W/2,H*.5,H*.95);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');g.fillStyle=vg;g.fillRect(0,0,W,H);
  const f=Math.max(1-sm(t/.9),sm((t-23)/1));if(f>0){g.fillStyle=`rgba(8,8,10,${f})`;g.fillRect(0,0,W,H)}
  g.globalAlpha=.03;g.fillStyle='#fff';for(let i=0;i<400;i++)g.fillRect((Math.random()*W)|0,(Math.random()*H)|0,1,1);g.globalAlpha=1}

let run=true,t0=performance.now(),last=0,raf=0,dead=false;
function tick(now){if(dead)return;if(run&&now-last>=1000/30){last=now;frame(((Math.max(0,now-t0)/1000)%24))}raf=requestAnimationFrame(tick)}
frame(13);raf=requestAnimationFrame(tick);
const io=new IntersectionObserver(function(es){run=es[0].isIntersecting});io.observe(host);
return ()=>{dead=true;cancelAnimationFrame(raf);io.disconnect()};
}
