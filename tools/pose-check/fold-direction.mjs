/* 구간마다 팔꿈치·무릎이 "펴진 상태(0°)"를 지나 도는지, "완전히 접힌 상태(±180°)"를
   지나 도는지 판정한다. 후자면 중간 프레임에서 관절이 반대로 꺾여 몸이 튄다. */
import { poses } from '../../data/poses.js';
import { movements } from '../../data/movements.js';
const ang=(a,b)=>Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI;
const wrap=(d)=>((d%360)+540)%360-180;
const fold=(p,a,b,c)=>wrap(ang(p[b],p[c]) - ang(p[a],p[b]));
const JOINTS=[['팔꿈치','shoulder','elbowF','wristF'],['무릎','hip','kneeF','ankleF']];

const ids = process.argv.slice(2).length ? process.argv.slice(2) : movements.map(m=>m.id);
let hits=0;
for (const id of ids) {
  const mv=movements.find(x=>x.id===id);
  if (!mv) { console.log('알 수 없는 동작:', id); continue; }
  for (let i=0;i<mv.phases.length-1;i++){
    const A=poses[mv.phases[i].pose], B=poses[mv.phases[i+1].pose];
    for (const [name,a,b,c] of JOINTS) {
      const fa=fold(A,a,b,c), fb=fold(B,a,b,c);
      const direct=fb-fa;                       // 0° 을 지나는 경로
      const viaFold=Math.abs(direct)>180;       // 짧은 쪽이 ±180 을 넘어가는가
      if (viaFold) { hits++; console.log('✗', id.padEnd(22), `${mv.phases[i].name}→${mv.phases[i+1].name}`.padEnd(26),
        name, `${fa.toFixed(0)}° → ${fb.toFixed(0)}°`.padEnd(16), `직선경로 ${direct.toFixed(0)}°`); }
    }
  }
}
console.log(hits ? `\n완전히 접힌 상태를 지나는 구간 ${hits}개` : '\n모두 편 상태(0°)를 지나 돈다 — 문제 없음');
