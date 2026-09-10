/* 애니메이션 전 구간에서 몸통·다리 뼈가 봉(원 r=7)을 지나가는지 검사한다.
   손·팔뚝은 봉을 잡고 있으니 제외한다. */
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { poses } from '../../data/poses.js';
import { movements } from '../../data/movements.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
let src = await readFile(join(ROOT, 'public/skeleton.js'), 'utf8');
src = src.replace('{ render, createPlayer, VB }', '{ render, createPlayer, VB, lerpPose }');
const w = {}; new Function('window', src)(w);
const { lerpPose } = w.Skeleton;
const easeInOut = (t) => (t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2);

const BAR_R = 7;  // 봉 반지름 (줄여 그리는 계열은 scale 이 곱해진다)
const BONES = [['neck','shoulder'],['shoulder','hip'],['hip','kneeF'],['kneeF','ankleF'],
  ['hip','kneeB'],['kneeB','ankleB'],['shoulder','elbowF'],['shoulder','elbowB']];

// 선분과 원의 최단거리
function segDist(a, b, c) {
  const vx = b[0]-a[0], vy = b[1]-a[1];
  const wx = c[0]-a[0], wy = c[1]-a[1];
  const L2 = vx*vx + vy*vy;
  let t = L2 ? (wx*vx + wy*vy) / L2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(a[0]+vx*t - c[0], a[1]+vy*t - c[1]);
}

const mv = movements.find(m => m.id === (process.argv[2] || 'bar-muscle-up'));
const ph = mv.phases.map(p => poses[p.pose]);
const hits = [];
for (let i = 0; i < ph.length - 1; i++) {
  for (let s = 0; s <= 20; s++) {
    const f = easeInOut(s / 20);
    const p = s === 0 ? ph[i] : s === 20 ? ph[i+1] : lerpPose(ph[i], ph[i+1], f);
    const bar = p.rig;
    if (!bar) continue;
    const R = BAR_R * (p.scale || 1);
    for (const [a, b] of BONES) {
      if (!p[a] || !p[b]) continue;
      const dd = segDist(p[a], p[b], bar);
      if (dd < R) hits.push({ seg: `${mv.phases[i].name}→${mv.phases[i+1].name}`, t: (s/20).toFixed(2), bone: `${a}-${b}`, d: dd.toFixed(1) });
    }
  }
}
const by = {};
for (const h of hits) (by[h.seg + ' ' + h.bone] ??= []).push(h);
for (const k of Object.keys(by)) {
  const g = by[k];
  console.log('✗', k.padEnd(42), `t=${g[0].t}~${g.at(-1).t}`, '최소거리', Math.min(...g.map(x=>+x.d)).toFixed(1), `(봉 반지름 ${(BAR_R*(ph[0].scale||1)).toFixed(1)})`);
}
console.log(hits.length ? `\n관통 프레임 ${hits.length}개` : '\n관통 없음');
