import { FW, FH } from './fps-style-common.js';

export function drawFPSCanvas(ctx, s) {
  ctx.save();
  if (s.screenShake > 0) {
    const shakeX = Math.sin(s.effectClock * 77) * s.screenShake;
    const shakeY = Math.cos(s.effectClock * 91) * s.screenShake;
    ctx.translate(shakeX, shakeY);
  }

  const bg = ctx.createLinearGradient(0,0,0,FH);
  bg.addColorStop(0,'#040008');
  bg.addColorStop(.65,'#120324');
  bg.addColorStop(1,'#030007');
  ctx.fillStyle=bg;
  ctx.fillRect(0,0,FW,FH);

  const horizonY=FH*.65, vanishX=FW/2;
  ctx.strokeStyle='rgba(191,0,255,.16)';
  ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(0,horizonY); ctx.lineTo(FW,horizonY); ctx.stroke();
  for(let x=-FW;x<=FW*2;x+=120){
    ctx.beginPath();ctx.moveTo(vanishX,horizonY);ctx.lineTo(x,FH);ctx.stroke();
  }
  for(let y=horizonY;y<=FH;y+=(FH-y)*.28+14){
    ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(FW,y);ctx.stroke();
  }
  ctx.strokeStyle='rgba(191,0,255,.08)';
  ctx.beginPath();
  ctx.arc(FW/2,horizonY-40,180,0,Math.PI*2);
  ctx.arc(FW/2,horizonY-40,260,0,Math.PI*2);
  ctx.stroke();

  for(const t of s.targets){
    ctx.save();
    ctx.translate(t.x,t.y);
    ctx.scale(t.scale,t.scale);
    ctx.globalAlpha=Math.max(0,t.alpha);
    const r=t.type.radius;
    ctx.shadowColor=t.type.color;ctx.shadowBlur=15;
    ctx.strokeStyle=t.type.color;ctx.lineWidth=3;
    ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();
    ctx.save();ctx.rotate(t.ringRotation);ctx.lineWidth=2;
    for(let i=0;i<4;i++){
      ctx.rotate(Math.PI/2);
      ctx.beginPath();ctx.moveTo(r-4,-4);ctx.lineTo(r+6,0);ctx.lineTo(r-4,4);ctx.stroke();
    }
    ctx.restore();
    ctx.beginPath();ctx.arc(0,0,r*.55,0,Math.PI*2);
    ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=1.5;ctx.stroke();
    ctx.beginPath();ctx.arc(0,0,r*.28,0,Math.PI*2);
    ctx.fillStyle='#fff';ctx.shadowColor='#fff';ctx.shadowBlur=10;ctx.fill();
    const progress=t.lifeTime/t.maxLifeTime;
    ctx.beginPath();ctx.arc(0,0,r+8,-Math.PI/2,-Math.PI/2+Math.PI*2*progress);
    ctx.strokeStyle=t.type.color;ctx.lineWidth=2;ctx.stroke();
    ctx.restore();
  }

  for(const tr of s.tracers){
    ctx.save();ctx.globalAlpha=Math.max(0,tr.alpha);
    ctx.strokeStyle='#00f0ff';ctx.shadowColor='#00f0ff';ctx.shadowBlur=12;ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(tr.startX,tr.startY);ctx.lineTo(tr.endX,tr.endY);ctx.stroke();ctx.restore();
  }

  for(const p of s.particles){
    ctx.save();ctx.globalAlpha=Math.max(0,p.alpha);ctx.fillStyle=p.color;
    ctx.shadowColor=p.color;ctx.shadowBlur=8;
    ctx.fillRect(p.x-p.size/2,p.y-p.size/2,p.size,p.size);ctx.restore();
  }

  for(const t of s.floatingTexts){
    ctx.save();ctx.globalAlpha=Math.max(0,t.alpha);
    ctx.font=t.big?'bold 24px monospace':'bold 16px monospace';
    ctx.fillStyle=t.color;ctx.shadowColor=t.color;ctx.shadowBlur=10;ctx.textAlign='center';
    ctx.fillText(t.text,t.x,t.y);ctx.restore();
  }

  if(s.muzzleFlash>0){
    ctx.save();ctx.globalAlpha=s.muzzleFlash;
    ctx.fillStyle='rgba(191,0,255,.18)';ctx.fillRect(0,0,FW,FH);
    const g=ctx.createRadialGradient(740,FH-20,5,740,FH-20,140);
    g.addColorStop(0,'#fff');g.addColorStop(.3,'#bf00ff');g.addColorStop(.7,'#ff007f');g.addColorStop(1,'transparent');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(740,FH-20,140,0,Math.PI*2);ctx.fill();ctx.restore();
  }

  const x=s.crosshair.x,y=s.crosshair.y;
  ctx.save();ctx.translate(x,y);
  ctx.strokeStyle='#00f0ff';ctx.fillStyle='#00f0ff';ctx.shadowColor='#00f0ff';ctx.shadowBlur=8;ctx.lineWidth=1.8;
  ctx.beginPath();ctx.arc(0,0,2.5,0,Math.PI*2);ctx.fill();
  const gap=8,len=18;
  ctx.beginPath();
  ctx.moveTo(0,-gap);ctx.lineTo(0,-(gap+len));
  ctx.moveTo(0,gap);ctx.lineTo(0,gap+len);
  ctx.moveTo(-gap,0);ctx.lineTo(-(gap+len),0);
  ctx.moveTo(gap,0);ctx.lineTo(gap+len,0);
  ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,gap+len+3,0,Math.PI*2);
  ctx.strokeStyle='rgba(0,240,255,.25)';ctx.lineWidth=1;ctx.stroke();
  ctx.restore();

  ctx.restore();
}
