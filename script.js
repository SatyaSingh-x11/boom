const loader = document.getElementById('loader');
const progress = document.getElementById('loader-progress');
let pct = 0;
const intro = setInterval(() => {
  pct += Math.random() * 18;
  progress.style.width = `${Math.min(pct, 100)}%`;
  if (pct >= 100) {
    clearInterval(intro);
    loader.classList.add('hide');
  }
}, 140);

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
window.addEventListener('mousemove', (e) => {
  const { clientX:x, clientY:y } = e;
  cursorDot.style.left = `${x}px`; cursorDot.style.top = `${y}px`;
  cursorRing.style.left = `${x}px`; cursorRing.style.top = `${y}px`;
});

const observer = new IntersectionObserver((entries)=>entries.forEach((e)=>e.target.classList.toggle('show',e.isIntersecting)),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counters = document.querySelectorAll('[data-counter]');
const animateCounter = (el) => {
  const target = +el.dataset.counter;
  let n = 0;
  const step = Math.max(1, Math.floor(target / 65));
  const t = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(t); }
    el.textContent = target > 1000 ? `${(n/1000).toFixed(n===target?0:1)}K+` : `${n}${target===98?'%+':'+'}`;
    if (target===14) el.textContent = `${n} Min`;
  }, 28);
};
const counterObs = new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){animateCounter(e.target);counterObs.unobserve(e.target)}}),{threshold:.5});
counters.forEach(c=>counterObs.observe(c));

const feed = document.getElementById('live-orders');
const items = ['Order #A91 delivered in 11m','New pickup: Indiranagar Kirana','AI reroute saved 4 min','3 bulk orders from HSR','Stock alert auto-solved'];
let idx = 0;
setInterval(()=>{
  const li = document.createElement('li');
  li.textContent = items[idx % items.length];
  li.style.color = '#b9ff62';
  feed.prepend(li);
  if (feed.children.length > 4) feed.lastChild.remove();
  idx++;
}, 1600);

const magnetics = document.querySelectorAll('.magnetic');
magnetics.forEach((el)=>{
  el.addEventListener('mousemove',(e)=>{
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.15}px,${(e.clientY-r.top-r.height/2)*0.18}px)`;
  });
  el.addEventListener('mouseleave',()=>{el.style.transform='translate(0,0)';});
});

document.querySelector('.menu-toggle').addEventListener('click',()=>document.querySelector('.nav-links').classList.toggle('open'));

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
resize(); addEventListener('resize', resize);
for(let i=0;i<72;i++) particles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+0.4});
(function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = 'rgba(157,255,0,.7)';
  particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.28);ctx.fill();});
  requestAnimationFrame(draw);
})();
