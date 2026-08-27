/**
 * OG 이미지(1200×630) 템플릿 생성기.
 *
 *   node tools/make-og-template.mjs      → dist/og-template.html 생성
 *
 * 그 다음 브라우저로 http://localhost:4173/og-template.html 를 1200×630 뷰포트에서
 * 캡처해 public/og-default.png 로 저장하면 된다. (og:image 는 SVG 를 지원하지 않는
 * 플랫폼이 많아 PNG 로 굽는다.)
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { poses } from '../data/poses.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const src = await readFile(join(ROOT, 'public/skeleton.js'), 'utf8');
const w = {};
new Function('window', src)(w);

const figs = ['floorSetup', 'extension', 'splitCatch'].map((k) => w.Skeleton.render(poses[k], { ground: false }));

const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8">
<link rel="stylesheet" href="styles.css">
<style>
  html,body{margin:0;padding:0;width:1200px;height:630px;overflow:hidden}
  body{display:flex;align-items:center;
    background:radial-gradient(900px 500px at 8% -20%, #1e2b3f 0%, transparent 62%),
               radial-gradient(800px 480px at 95% 110%, #1d2a16 0%, transparent 58%), #0c0f14;}
  .L{padding:0 0 0 74px;width:600px}
  .mark{display:inline-flex;align-items:center;gap:12px;font:800 26px/1 var(--sans);color:#e8edf5;letter-spacing:-.02em}
  .mark i{width:44px;height:44px;border-radius:12px;background:#d7ff3e;color:#10140a;
    display:grid;place-items:center;font:900 26px/1 var(--sans);font-style:normal}
  h1{font:800 60px/1.18 var(--sans);letter-spacing:-.035em;color:#e8edf5;margin:34px 0 0}
  h1 em{font-style:normal;color:#d7ff3e}
  p{font:500 22px/1.55 var(--sans);color:#9fadc2;margin:22px 0 0;max-width:34ch;white-space:nowrap}
  .R{flex:1;display:flex;align-items:center;justify-content:center;gap:2px;height:630px;padding:0 20px 26px 0}
  .R>div{width:196px;height:566px;opacity:.34}
  .R>div:nth-child(2){opacity:.6}
  .R>div:nth-child(3){opacity:1}
  .R .sk-bone{stroke-width:9}.R .sk-spine{stroke-width:11}
  .R .sk-head{stroke-width:8}.R .sk-joint{r:5.4}
  .R svg{width:100%;height:100%}
  .bar{position:absolute;left:0;right:0;bottom:0;height:9px;background:#d7ff3e}
</style></head><body>
<div class="L">
  <div class="mark"><i>C</i>크로스핏 가이드</div>
  <h1>화이트보드를<br><em>읽을 수 있게</em></h1>
  <p>용어 · 수업 운영 방식 · 동작 애니메이션</p>
</div>
<div class="R">${figs.map((f) => `<div>${f}</div>`).join('')}</div>
<div class="bar"></div>
</body></html>`;

await writeFile(join(ROOT, 'dist/og-template.html'), html, 'utf8');
console.log('✔ dist/og-template.html — 1200×630 으로 캡처해 public/og-default.png 로 저장하세요');
