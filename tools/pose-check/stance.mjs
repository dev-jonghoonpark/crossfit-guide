/* 자세 자체가 사람이 취할 수 있는 모양인지 — 정지 화면만 봐도 알 수 있는 것들.
     ① 무릎이 뒤로만 접히는가 (사람 무릎은 앞으로 꺾이지 않는다)
     ② 발을 딛고 선 자세라면 무게중심이 발 위에 있는가
   분절 질량비는 인체측정 표준값(Dempster) 근사 — 몸통+머리 .55 / 다리 .33 / 팔 .12 */
import { poses } from '../../data/poses.js';

const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const GROUND = 300;

/** 허벅지 대비 정강이가 꺾인 각. +면 정상(발뒤꿈치가 엉덩이 쪽), -면 반대로 꺾임 */
function kneeBend(p) {
  const u = [p.kneeF[0] - p.hip[0], p.kneeF[1] - p.hip[1]];
  const v = [p.ankleF[0] - p.kneeF[0], p.ankleF[1] - p.kneeF[1]];
  return (Math.atan2(u[0] * v[1] - u[1] * v[0], u[0] * v[0] + u[1] * v[1]) * 180) / Math.PI;
}

/** 무게중심 x 와 지지면(뒤꿈치~발끝) */
function balance(p) {
  const trunk = mid(mid(p.hip, p.shoulder), p.head);
  const leg = mid(mid(p.hip, p.kneeF), p.ankleF);
  const arm = mid(p.shoulder, p.wristF);
  let mx = 0.55 * trunk[0] + 0.33 * leg[0] + 0.12 * arm[0];
  let m = 1;
  if (Array.isArray(p.bar)) { mx += 0.8 * p.bar[0]; m += 0.8; }   // 바를 들었으면 체중의 0.8배로 본다
  const com = mx / m;
  const back = Math.min(p.heelF[0], p.heelB?.[0] ?? Infinity);
  const front = Math.max(p.toeF[0], p.toeB?.[0] ?? -Infinity);
  return { com, back, front, ok: com >= back && com <= front };
}

const only = process.argv.slice(2);
let hits = 0;
for (const [name, p] of Object.entries(poses)) {
  if (only.length && !only.includes(name)) continue;
  const bend = kneeBend(p);
  // 다리가 거의 펴진 자세는 부호가 오차 수준이라 -8° 부터 본다
  if (bend < -8) { hits++; console.log('✗', name.padEnd(18), `무릎이 ${bend.toFixed(0)}° 반대로 꺾였다`); }

  // 오직 두 발로만 버티고 선 자세에서만 균형을 따진다.
  // 벤치에 누웠거나(bench) 손이 바닥에 닿아 있으면(핸드스탠드·월워크) 지지면이 발이 아니다.
  const handsDown = p.wristF[1] > GROUND - 30;
  const standing = p.toeF[1] > GROUND - 12 && p.heelF[1] > GROUND - 12
    && p.hip[1] < p.ankleF[1] - 40 && !p.bench && !p.rower && !handsDown;
  if (standing) {
    const b = balance(p);
    if (!b.ok) { hits++; console.log('✗', name.padEnd(18),
      `무게중심 x=${b.com.toFixed(0)} 이 발(${b.back.toFixed(0)}~${b.front.toFixed(0)}) 밖 — 넘어진다`); }
  }
}
console.log(hits ? `\n문제 ${hits}건` : '\n무릎 꺾임 · 균형 모두 정상');
