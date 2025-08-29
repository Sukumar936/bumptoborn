// Helpers
defineHelpers();

function defineHelpers(){
  window.$ = (s,c=document)=>c.querySelector(s);
  window.$$ = (s,c=document)=>Array.from(c.querySelectorAll(s));
}

// Hide loader on DOM ready and init interactions
document.addEventListener('DOMContentLoaded',()=>{
  const $ = window.$;
  const l=$('#loader');
  if(l){ if(window.gsap){ gsap.to(l,{autoAlpha:0,duration:.4,onComplete:()=>l.remove()}); } else { l.remove(); } }
  // Footer year
  const yearEl = $('#year');
  if(yearEl) yearEl.textContent=new Date().getFullYear();
  // Ripple
  document.addEventListener('click',e=>{ const b=e.target.closest('.btn-ripple'); if(!b) return; const r=document.createElement('span'); const rc=b.getBoundingClientRect(); const size=Math.max(rc.width,rc.height); r.className='r'; r.style.width=r.style.height=size+'px'; r.style.left=(e.clientX-rc.left-size/2)+'px'; r.style.top=(e.clientY-rc.top-size/2)+'px'; b.appendChild(r); setTimeout(()=>r.remove(),600); });
  // Smooth anchors
  document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]'); if(!a) return; const id=a.getAttribute('href'); const t=document.querySelector(id); if(t){ e.preventDefault(); window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-64,behavior:'smooth'});} });
});

// Build thumbnails
const IMGS=[
  // Maternity & newborn curated set
  'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=1600&auto=format&fit=crop', // maternity studio
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop', // newborn wrapped
  'https://images.unsplash.com/photo-1542396601-dca920ea2807?q=80&w=1600&auto=format&fit=crop', // newborn close-up
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1600&auto=format&fit=crop', // parents with baby
  'https://images.unsplash.com/photo-1513530176992-0cf39c4cfd8e?q=80&w=1600&auto=format&fit=crop', // sleeping baby
  'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?q=80&w=1600&auto=format&fit=crop', // baby feet
  'https://images.unsplash.com/photo-1511081692775-05d0f180a065?q=80&w=1600&auto=format&fit=crop', // mother holding newborn
  'https://images.unsplash.com/photo-1504439904031-93ded9f93e3f?q=80&w=1600&auto=format&fit=crop', // pregnant belly detail
  'https://images.unsplash.com/photo-1504198458649-3128b932f49b?q=80&w=1600&auto=format&fit=crop', // family cuddle
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1600&auto=format&fit=crop', // baby in blanket
  'https://images.unsplash.com/photo-1495555687392-4378f3a7e9a6?q=80&w=1600&auto=format&fit=crop', // baby hand
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1600&auto=format&fit=crop'  // maternity silhouette
];

const thumbs=()=>document.querySelector('#thumbs');
const tpl=()=>document.querySelector('#thumbTpl');
if(thumbs() && tpl()){
  IMGS.forEach((src,i)=>{ const n=tpl().content.firstElementChild.cloneNode(true); const img=n.querySelector('img'); img.src=src; img.alt='Portfolio image '+(i+1); img.loading='lazy'; n.addEventListener('click',()=>openLB(i)); n.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openLB(i);} }); thumbs().appendChild(n);});
}

// Lightbox
const lb=()=>document.querySelector('#lightbox');
const lbImg=()=>document.querySelector('#lbImg');
const lbCap=()=>document.querySelector('#lbCap');
let idx=0;
function show(){ if(!lbImg()) return; lbImg().src=IMGS[idx]; if(lbCap()) lbCap().textContent=`Image ${idx+1} of ${IMGS.length}`; }
function openLB(i){ idx=i; show(); if(lb()){ lb().classList.remove('hidden'); lb().classList.add('flex'); document.body.style.overflow='hidden'; } }
function closeLB(){ if(lb()){ lb().classList.add('hidden'); lb().classList.remove('flex'); document.body.style.overflow=''; } }
function prev(){ idx=(idx-1+IMGS.length)%IMGS.length; show(); }
function next(){ idx=(idx+1)%IMGS.length; show(); }

const lbClose=()=>document.querySelector('#lbClose');
const lbPrev=()=>document.querySelector('#lbPrev');
const lbNext=()=>document.querySelector('#lbNext');
if(lbClose()) lbClose().addEventListener('click',closeLB);
if(lbPrev()) lbPrev().addEventListener('click',prev);
if(lbNext()) lbNext().addEventListener('click',next);
if(lb()) lb().addEventListener('click',e=>{ if(e.target===lb()) closeLB(); });
let sx=0; if(lbImg()){
  lbImg().addEventListener('touchstart',e=>{sx=e.changedTouches[0].screenX;},{passive:true});
  lbImg().addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-sx; if(dx>40) prev(); else if(dx<-40) next();},{passive:true});
}

// WhatsApp CTA (set your number here, intl format without plus)
const WHATSAPP='919999999999';
const wa=()=>document.querySelector('#waBtn');
if(wa()){
  const txt=encodeURIComponent('Hello! I would like to enquire about a session.');
  wa().href=`https://wa.me/${WHATSAPP}?text=${txt}`;
}

// Subtle animations if GSAP present
if(window.gsap){
  gsap.from('.svc',{opacity:0,y:16,stagger:0.12,duration:.7,ease:'power2.out',scrollTrigger:false});
  gsap.to('#heroBg',{yPercent:12,ease:'none',scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:true}});
}
