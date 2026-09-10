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

/** 킵의 아치·호로우가 제 모양인지.
    아치 = 가슴을 내밀고 발을 뒤로 → 고관절이 어깨-발목 선보다 앞
    호로우 = 엉덩이를 빼고 발을 앞으로 → 고관절이 선보다 뒤
    둘 다 다리는 편 채 흔든다 — 무릎이 많이 굽으면 "앉은" 모양이 된다. */
function kip(p) {
  const t = (p.hip[1] - p.shoulder[1]) / (p.ankleF[1] - p.shoulder[1]);
  const lineX = p.shoulder[0] + t * (p.ankleF[0] - p.shoulder[0]);
  const torsoUp = Math.atan2(p.shoulder[1] - p.hip[1], p.shoulder[0] - p.hip[0]);
  const thigh = Math.atan2(p.kneeF[1] - p.hip[1], p.kneeF[0] - p.hip[0]);
  let d = (thigh - torsoUp) * 180 / Math.PI;
  d = ((d % 360) + 540) % 360 - 180;
  return { off: p.hip[0] - lineX, hipFlex: 180 - Math.abs(d), footBehindHip: p.toeF[0] < p.hip[0] };
}

const only = process.argv.slice(2);
let hits = 0;
for (const [name, p] of Object.entries(poses)) {
  if (only.length && !only.includes(name)) continue;
  const bend = kneeBend(p);
  // 다리가 거의 펴진 자세는 부호가 오차 수준이라 -8° 부터 본다
  if (bend < -8) { hits++; console.log('✗', name.padEnd(18), `무릎이 ${bend.toFixed(0)}° 반대로 꺾였다`); }

  // 킵 자세(이름이 Arch / Hollow 로 끝나는 포즈)
  if (/Arch$/.test(name) || /Hollow$/.test(name)) {
    const k = kip(p);
    const isArch = /Arch$/.test(name);
    if (isArch && (k.off <= 2 || !k.footBehindHip)) { hits++;
      console.log('✗', name.padEnd(18), `아치인데 고관절이 선보다 ${k.off.toFixed(0)}, 발끝이 고관절보다 ${k.footBehindHip?'뒤':'앞'} — 호로우와 구분이 안 된다`); }
    if (!isArch && (k.off >= -2 || k.footBehindHip)) { hits++;
      console.log('✗', name.padEnd(18), `호로우인데 고관절이 선보다 ${k.off.toFixed(0)}, 발끝이 고관절보다 ${k.footBehindHip?'뒤':'앞'}`); }
    if (k.hipFlex > 32) { hits++;
      console.log('✗', name.padEnd(18), `고관절이 ${k.hipFlex.toFixed(0)}° 접혔다 — 킵은 몸을 편 채 흔든다(앉은 모양이 된다)`); }
    if (bend > 15) { hits++;
      console.log('✗', name.padEnd(18), `무릎이 ${bend.toFixed(0)}° 굽었다 — 아치·호로우는 다리를 편다`); }
  }

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
