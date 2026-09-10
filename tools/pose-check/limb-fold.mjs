/* 전 동작에서 "사지가 비정상적으로 접히는" 구간을 찾는다.
   팔꿈치·무릎이 두 포즈 사이에서 접히는 방향이 뒤집히면, 보간이 완전히 접힌 상태를
   지나가면서 손이 어깨에, 발이 골반에 닿는 그림이 된다. */
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { poses } from '../../data/poses.js';
import { movements } from '../../data/movements.js';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const w={}; new Function('window',(await readFile(join(ROOT,'public/skeleton.js'),'utf8'))
  .replace('{ render, createPlayer, VB }','{ render, createPlayer, VB, lerpPose }'))(w);
const { lerpPose } = w.Skeleton;
const ease=(t)=>(t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2);
const D=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const rows=[];
for (const mv of movements) {
  const ph=mv.phases.map(p=>poses[p.pose]).filter(Boolean);
  for (let i=0;i<ph.length-1;i++){
    const armEnds=Math.min(D(ph[i].shoulder,ph[i].wristF), D(ph[i+1].shoulder,ph[i+1].wristF));
    const legEnds=Math.min(D(ph[i].hip,ph[i].ankleF), D(ph[i+1].hip,ph[i+1].ankleF));
    let arm=Infinity, leg=Infinity;
    for(let s=1;s<20;s++){const p=lerpPose(ph[i],ph[i+1],ease(s/20));
      arm=Math.min(arm,D(p.shoulder,p.wristF)); leg=Math.min(leg,D(p.hip,p.ankleF));}
    // 두 키프레임보다 훨씬 더 접히면 보간이 만들어낸 가짜 자세다
    if (arm < armEnds-8 || leg < legEnds-8)
      rows.push([`${mv.id}`, `${mv.phases[i].name}→${mv.phases[i+1].name}`,
        `팔 ${armEnds.toFixed(0)}→${arm.toFixed(0)}`, `다리 ${legEnds.toFixed(0)}→${leg.toFixed(0)}`]);
  }
}
for (const r of rows) console.log(r[0].padEnd(22), r[1].padEnd(30), r[2].padEnd(14), r[3]);
console.log('\n비정상 접힘 구간', rows.length);
