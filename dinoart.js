/* Crteži dinosaura za igru Dino dolina. Svi gledaju udesno, viewBox 0 0 300 220, tlo je na y = 200.
   dinoSvg(id) vraća SVG; dinoDefs() se jednom umeće u stranicu (prijelazi boja i izrezi). */
'use strict';
const DINO_ART = (() => {
  const eye = (x, y, r) => '<g class="eye"><ellipse cx="' + x + '" cy="' + y + '" rx="' + r + '" ry="' + (r*1.12).toFixed(1) + '" fill="#fff"/><circle cx="' + (x + r*.22).toFixed(1) + '" cy="' + (y + r*.1).toFixed(1) + '" r="' + (r*.64).toFixed(1) +
    '" fill="#1d2536"/><circle cx="' + (x + r*.46).toFixed(1) + '" cy="' + (y - r*.26).toFixed(1) + '" r="' + (r*.25).toFixed(1) + '" fill="#fff"/></g>';
  const cheek = (x, y, r) => '<ellipse cx="' + x + '" cy="' + y + '" rx="' + r + '" ry="' + (r*.7).toFixed(1) + '" fill="#ff7b8a" opacity=".45"/>';
  const leg = (x, y, w, h) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (w*.42).toFixed(1) + '"/>';
  const nails = (x, w) => [0.2, 0.5, 0.8].map(k => '<ellipse cx="' + (x + w*k).toFixed(1) + '" cy="197.5" rx="' + (w*.12).toFixed(1) + '" ry="3.4" fill="#fff6dc" stroke="none"/>').join('');
  const legs4 = (a, b) => ({far:leg(a[0] + a[2]*.9, a[1], a[2]*.9, 200 - a[1]) + leg(b[0] + b[2]*.9, b[1], b[2]*.9, 200 - b[1]),
    near:leg(a[0], a[1], a[2], 200 - a[1]) + nails(a[0], a[2]) + leg(b[0], b[1], b[2], 200 - b[1]) + nails(b[0], b[2])});
  const stripes = list => list.map(s => '<path d="M' + s[0] + ' ' + s[1] + ' q' + (s[3]||6) + ' ' + s[2]*.5 + ' 0 ' + s[2] + '" fill="none" stroke-width="' + (s[4]||7) + '" stroke-linecap="round"/>').join('');
  const dots = list => list.map(s => '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '"/>').join('');
  /* dvonožac: bedro i stopalo */
  const biped = (x, y, k) => 'M' + x + ' ' + y + ' c' + (-8*k) + ' ' + 30*k + ' ' + 8*k + ' ' + 46*k + ' ' + 16*k + ' ' + 52*k + ' L' + (x + 10*k) + ' 200 L' + (x + 56*k) + ' 200 c0 -10 -12 -14 -18 -16 c12 -14 16 -36 8 -' + (200 - y - 8*k - 16 + 14).toFixed(0) + ' Z';

  const A = {};
  A.tiranosaur = {col:['#4cc884', '#2b9562', '#e9f7b4', '#2b9562'],
    body:'M10 120 C46 112 82 96 112 86 C132 64 156 40 186 30 C214 18 262 20 280 42 C290 56 288 76 272 82 C258 98 230 102 210 96 C206 122 196 150 172 162 C142 174 110 162 96 142 C68 140 38 132 10 120 Z',
    belly:[190, 150, 70, 46],
    far:'<path d="M150 136 C144 168 160 184 166 190 L160 200 L204 200 C204 190 192 186 186 184 C196 170 200 150 194 136 Z"/><path d="M208 104 q18 4 26 16 q-3 6 -9 3 q-8 -8 -19 -9 z"/>',
    spots:stripes([[52,104,22],[78,94,26],[106,82,30],[136,58,30],[164,36,28],[196,22,20]]),
    near:'<path d="M112 136 C104 170 122 186 128 190 L122 200 L168 200 C168 190 156 186 150 184 C164 168 168 146 160 130 C150 116 120 120 112 136 Z"/>' + nails(150, 20) + '<path d="M192 110 q18 6 24 20 q-4 6 -10 2 q-7 -9 -18 -11 z"/>',
    face:'<path d="M284 62 C264 74 240 76 220 66" fill="none" stroke="#1f6a47" stroke-width="3.5" stroke-linecap="round"/>' +
      '<path d="M232 71 l5 9 l5 -8 M246 72 l5 9 l5 -9 M260 70 l5 8 l4 -10 M273 66 l4 7 l3 -10" fill="#fff" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>' +
      eye(236, 46, 9.5) + '<path d="M222 34 q13 -9 27 -2" fill="none" stroke="#1f6a47" stroke-width="4" stroke-linecap="round"/><circle cx="273" cy="42" r="2.6" fill="#1f6a47"/>'};

  A.triceratops = (() => { const L = legs4([62, 148, 36], [162, 150, 32]); return {col:['#ffa24a', '#de7a2c', '#ffe7b0', '#ff6f61'],
    body:'M14 152 C30 130 54 112 84 102 C112 86 160 84 190 98 C208 106 216 122 216 142 C216 164 204 178 190 182 L70 182 C52 178 40 168 34 162 C26 160 18 156 14 152 Z',
    belly:[130, 186, 96, 34], far:L.far,
    spots:dots([[70,116,8],[96,104,6],[124,100,9],[150,104,6],[104,124,5],[176,112,7],[50,136,5]]),
    near:L.near,
    face:'<path d="M196 134 C166 124 154 86 170 56 C182 34 208 26 228 38 C246 50 242 82 232 102 C224 118 210 130 196 134 Z" fill="url(#gx-triceratops)" stroke="#c9483f" stroke-width="2.5"/>' +
      dots([[170,70,5],[178,50,5],[196,38,5],[216,36,5],[166,94,5],[174,114,5]]).replace(/<circle/g, '<circle fill="#ffe7b0"') +
      '<path d="M222 90 C224 68 234 50 250 40 C250 58 246 76 240 94 Z" fill="#e8d9b0" stroke="#bfae82" stroke-width="2"/>' +
      '<path d="M200 98 C212 82 238 80 256 92 C272 102 288 114 290 126 C292 136 284 142 274 142 C262 152 240 156 222 152 C206 148 196 132 198 114 Z" fill="url(#g-triceratops)" stroke="#de7a2c" stroke-width="2.5"/>' +
      '<path d="M236 92 C240 70 252 54 268 46 C266 64 260 80 252 96 Z" fill="#fff6dc" stroke="#cdbb8e" stroke-width="2"/>' +
      '<path d="M268 104 C270 94 276 86 284 84 C284 94 282 104 278 110 Z" fill="#fff6dc" stroke="#cdbb8e" stroke-width="2"/>' +
      '<path d="M290 126 C294 134 286 142 274 142 C270 136 276 126 290 126 Z" fill="#e8c98a"/>' +
      '<path d="M284 136 q-10 6 -24 3" fill="none" stroke="#b55d1f" stroke-width="3" stroke-linecap="round"/>' + eye(244, 112, 7.5) + cheek(232, 130, 7) + '<circle cx="280" cy="122" r="2" fill="#b55d1f"/>'}; })();

  A.stegosaur = (() => { const L = legs4([70, 146, 34], [160, 152, 28]);
    const plate = (x, y, s, r) => '<path transform="rotate(' + r + ' ' + x + ' ' + y + ')" d="M' + (x - s*.52) + ' ' + (y + s*.25) + ' C' + (x - s*.6) + ' ' + (y - s*.3) + ' ' + (x - s*.2) + ' ' + (y - s*.8) + ' ' + x + ' ' + (y - s) + ' C' + (x + s*.2) + ' ' + (y - s*.8) + ' ' + (x + s*.6) + ' ' + (y - s*.3) + ' ' + (x + s*.52) + ' ' + (y + s*.25) + ' Z"/>';
    return {col:['#3cbccd', '#2390a2', '#d2f4ef', '#ff8f4d'],
    back:'<g fill="url(#gx-stegosaur)" stroke="#d9652a" stroke-width="2.5" stroke-linejoin="round">' + plate(62, 108, 22, -38) + plate(92, 88, 30, -24) + plate(128, 74, 38, -8) + plate(166, 78, 36, 12) + plate(198, 96, 28, 30) + plate(224, 116, 20, 42) + '</g>' +
      '<g fill="#fff6dc" stroke="#cdbb8e" stroke-width="2" stroke-linejoin="round"><path d="M20 134 L4 106 L32 128 Z"/><path d="M36 130 L26 100 L48 124 Z"/></g>',
    body:'M8 136 C36 128 60 106 92 88 C124 72 164 74 192 94 C212 108 230 124 252 128 C270 130 286 136 288 147 C288 157 276 161 262 159 C240 160 222 158 206 152 C200 168 190 178 176 182 L84 182 C66 174 56 160 50 150 C36 148 20 144 8 136 Z',
    belly:[130, 190, 100, 36], far:L.far,
    spots:dots([[88,112,7],[112,98,9],[140,92,7],[166,100,9],[190,116,6],[120,124,5],[66,130,5]]),
    near:L.near,
    face:'<path d="M286 150 q-8 5 -18 3" fill="none" stroke="#1b6f7e" stroke-width="3" stroke-linecap="round"/>' + eye(264, 140, 6) + '<circle cx="282" cy="140" r="1.8" fill="#1b6f7e"/>'}; })();

  A.brahiosaur = (() => { const L = legs4([74, 148, 32], [160, 150, 30]); return {col:['#62a8f8', '#3d7dd4', '#dcebff', '#3d7dd4'],
    body:'M8 168 C34 162 56 142 84 126 C112 110 150 108 172 116 C186 98 196 68 204 42 C208 22 222 10 242 10 C262 10 276 22 276 34 C276 46 264 50 252 50 C242 50 236 54 234 62 C230 94 224 132 210 154 C202 172 188 182 172 184 L88 184 C70 178 58 168 50 164 C36 168 22 170 8 168 Z',
    belly:[150, 190, 86, 40], far:L.far,
    spots:dots([[96,134,8],[122,122,10],[150,126,7],[178,128,8],[196,96,6],[206,64,5],[110,150,5],[70,146,5]]),
    near:L.near,
    face:'<path d="M224 14 q8 -10 18 -4" fill="none" stroke="#3d7dd4" stroke-width="6" stroke-linecap="round"/><path d="M272 40 q-8 5 -18 3" fill="none" stroke="#2a5aa6" stroke-width="3" stroke-linecap="round"/>' + eye(248, 27, 6.5) + '<circle cx="269" cy="28" r="1.9" fill="#2a5aa6"/>' + cheek(240, 40, 5.5)}; })();

  A.velociraptor = {col:['#f46a62', '#c5424c', '#ffdfc0', '#ffd24a'],
    back:'<g fill="url(#gx-velociraptor)" stroke="#d99a16" stroke-width="2" stroke-linejoin="round"><path d="M226 58 L196 52 L212 48 L194 38 L216 40 L206 28 L236 48 Z"/><path d="M22 96 L2 84 L10 100 L0 110 L26 104 Z"/></g>',
    body:'M8 98 C50 98 90 100 120 104 C140 94 164 92 184 98 C196 84 206 66 222 58 C240 50 272 54 288 67 C294 73 292 81 284 83 C268 90 246 90 232 86 C226 102 216 120 200 132 C176 146 146 144 128 130 C92 122 46 110 8 98 Z',
    belly:[190, 138, 62, 34],
    far:'<path d="M178 122 C168 140 174 156 186 164 L178 190 L168 200 L206 200 C204 192 196 190 192 190 L200 164 C210 150 208 132 200 120 Z"/>',
    spots:stripes([[40,96,10,3,5],[62,96,13,3,5],[86,98,15,3,5],[110,100,18,4,6],[136,96,20,5,6],[160,92,20,5,6],[200,72,16,5,6]]),
    near:'<path d="M150 122 C140 140 146 156 158 164 L150 190 L140 200 L180 200 C178 192 170 190 164 190 L172 164 C182 150 180 132 172 120 C164 112 154 114 150 122 Z"/>' +
      '<path d="M178 200 C174 190 176 184 184 180 C184 188 186 194 190 200 Z" fill="#fff6dc" stroke="#cdbb8e" stroke-width="1.5"/>' +
      '<g fill="url(#gx-velociraptor)" stroke="#d99a16" stroke-width="2" stroke-linejoin="round"><path d="M192 108 C206 110 218 118 226 130 L232 146 L220 138 L220 152 L210 138 L206 150 L200 132 L192 124 Z"/></g>',
    face:'<path d="M288 76 C272 83 256 83 242 78" fill="none" stroke="#8f2a36" stroke-width="3" stroke-linecap="round"/><path d="M250 81 l4 7 l4 -7 M262 81 l4 7 l4 -8 M274 79 l3 6 l3 -8" fill="#fff" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/>' +
      eye(250, 66, 7) + '<path d="M240 56 q10 -6 20 -1" fill="none" stroke="#8f2a36" stroke-width="3.2" stroke-linecap="round"/><circle cx="282" cy="68" r="1.9" fill="#8f2a36"/>'};

  A.ankilosaur = (() => { const L = legs4([76, 160, 32], [168, 160, 30]);
    const knobs = []; [[84,128],[104,116],[128,110],[152,108],[176,112],[198,120],[96,134],[120,126],[146,123],[172,126],[194,134]].forEach(p => knobs.push('<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="8" ry="6.5"/>'));
    const spikes = [70, 96, 122, 148, 174, 200].map((x, i) => '<path d="M' + (x - 8) + ' ' + (143 + (i % 2)) + ' L' + x + ' ' + 160 + ' L' + (x + 9) + ' ' + (143 + (i % 2)) + ' Z"/>').join('');
    return {col:['#d9ac5e', '#a57a38', '#f6e6b8', '#7b8f5a'],
    back:'<path d="M46 142 C36 140 28 142 22 146" fill="none" stroke="#a57a38" stroke-width="12" stroke-linecap="round"/><ellipse cx="20" cy="142" rx="17" ry="13" fill="#8a9c68" stroke="#62744a" stroke-width="2.5"/><ellipse cx="15" cy="138" rx="6" ry="4" fill="#a9b98a"/>',
    body:'M34 142 C52 134 60 118 84 106 C116 92 170 92 204 106 C224 114 236 124 250 128 C270 130 288 136 290 148 C290 160 278 164 264 162 C246 162 232 160 220 156 C214 170 204 178 192 182 L80 182 C66 176 58 164 56 154 C46 154 40 150 34 142 Z',
    belly:[140, 190, 96, 30], far:L.far, spots:'',
    near:'<path d="M60 146 C76 104 204 96 228 132 C210 148 110 154 60 146 Z" fill="url(#gx-ankilosaur)" stroke="#62744a" stroke-width="2.5"/><g fill="#f6e6b8" stroke="#c8b47c" stroke-width="1.5">' + knobs.join('') + '</g>' +
      '<g fill="#fff6dc" stroke="#c8b47c" stroke-width="1.5" stroke-linejoin="round">' + spikes + '</g>' + L.near,
    face:'<path d="M236 128 L228 112 L246 124 Z M250 130 L246 114 L260 128 Z" fill="#fff6dc" stroke="#c8b47c" stroke-width="1.5" stroke-linejoin="round"/><path d="M288 152 q-8 5 -18 3" fill="none" stroke="#7a5622" stroke-width="3" stroke-linecap="round"/>' +
      eye(266, 142, 6) + '<circle cx="284" cy="142" r="1.8" fill="#7a5622"/>' + cheek(256, 153, 5)}; })();

  A.spinosaur = {col:['#a973ee', '#7a47c6', '#eddcff', '#ff8a5c'],
    back:'<path d="M66 118 C70 70 100 30 140 26 C174 24 200 48 204 78 C160 86 110 100 66 118 Z" fill="url(#gx-spinosaur)" stroke="#d95a3a" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<g fill="none" stroke="#d95a3a" stroke-width="2.5" stroke-linecap="round" opacity=".7"><path d="M92 106 C94 78 104 54 118 38"/><path d="M118 96 C122 70 130 46 140 30"/><path d="M146 88 C152 66 158 46 164 34"/><path d="M174 82 C180 66 186 54 190 48"/></g>',
    body:'M8 130 C44 126 80 114 112 102 C140 88 168 80 190 74 C206 60 222 52 240 52 C262 52 288 60 294 70 C298 78 292 84 282 84 C264 88 246 88 230 86 C222 106 208 138 184 154 C154 168 120 160 102 144 C72 144 40 140 8 130 Z',
    belly:[196, 156, 70, 44],
    far:'<path d="M158 140 C152 168 166 184 172 190 L166 200 L208 200 C208 190 196 186 190 184 C200 170 204 152 198 140 Z"/><path d="M214 104 q16 8 20 24 q-4 5 -10 1 q-5 -10 -16 -14 z"/>',
    spots:stripes([[40,122,12,3,5],[64,116,16,4,6],[90,106,20,5,6],[214,60,16,4,6]]),
    near:'<path d="M122 140 C114 170 130 186 136 190 L130 200 L176 200 C176 190 164 186 158 184 C170 170 174 150 168 136 C158 124 130 126 122 140 Z"/>' + nails(158, 20) + '<path d="M196 110 q16 10 20 28 q-5 5 -11 0 q-5 -11 -15 -16 z"/>',
    face:'<path d="M292 78 C272 84 252 84 236 78" fill="none" stroke="#4d2a8a" stroke-width="3" stroke-linecap="round"/><path d="M246 81 l4 7 l4 -7 M258 82 l4 7 l4 -7 M270 81 l4 7 l3 -8 M281 80 l3 6 l3 -8" fill="#fff" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/>' +
      eye(240, 64, 6.5) + '<path d="M230 55 q10 -6 20 -1" fill="none" stroke="#4d2a8a" stroke-width="3.2" stroke-linecap="round"/><circle cx="286" cy="68" r="1.9" fill="#4d2a8a"/>'};

  A.diplodok = (() => { const L = legs4([82, 150, 32], [166, 150, 30]); return {col:['#c4d94e', '#93ab2c', '#f5f8c2', '#93ab2c'],
    body:'M4 152 C40 150 70 134 100 118 C126 104 160 102 184 110 C208 102 236 86 256 74 C268 66 286 66 292 77 C296 88 290 96 280 98 C258 106 234 124 214 138 C208 162 198 176 186 182 L96 182 C80 176 70 164 64 154 C44 160 22 160 4 152 Z',
    belly:[146, 190, 90, 38], far:L.far,
    spots:stripes([[60,142,12,3,6],[84,128,16,4,7],[110,114,18,5,7],[138,106,18,5,7],[166,106,16,5,7],[204,104,12,4,6],[232,90,10,3,5]]),
    near:L.near,
    face:'<path d="M291 90 q-8 5 -17 3" fill="none" stroke="#66791a" stroke-width="3" stroke-linecap="round"/>' + eye(274, 79, 5.6) + '<circle cx="289" cy="79" r="1.7" fill="#66791a"/>'}; })();

  A.parasaurolof = {col:['#f78fb5', '#d2638f', '#ffe4ee', '#8d6be8'],
    back:'<path d="M218 46 C198 30 170 14 138 10 C146 28 172 46 202 60 Z" fill="url(#gx-parasaurolof)" stroke="#6a49c9" stroke-width="2.5" stroke-linejoin="round"/>',
    body:'M10 128 C46 120 82 104 112 94 C134 78 158 62 182 50 C204 40 240 38 262 50 C280 56 292 64 292 74 C292 84 280 88 266 86 C250 90 234 90 220 88 C214 114 202 148 176 162 C146 174 114 162 100 144 C70 144 38 138 10 128 Z',
    belly:[192, 156, 70, 46],
    far:'<path d="M152 140 C146 168 160 184 166 190 L160 200 L204 200 C204 190 192 186 186 184 C196 170 200 152 194 140 Z"/><path d="M212 106 q20 8 28 26 q-4 7 -11 2 q-8 -12 -21 -15 z"/>',
    spots:dots([[70,116,7],[96,106,6],[124,90,8],[150,72,7],[178,58,6],[110,124,5]]),
    near:'<path d="M116 140 C108 170 124 186 130 190 L124 200 L170 200 C170 190 158 186 152 184 C164 170 168 150 162 136 C152 124 124 126 116 140 Z"/>' + nails(152, 20) + '<path d="M194 112 q22 10 30 32 q-5 7 -12 1 q-8 -14 -22 -19 z"/>',
    face:'<path d="M266 86 C278 88 292 84 292 74 C292 68 286 62 278 58 C270 64 264 76 266 86 Z" fill="#ffd9a0"/><path d="M290 78 q-10 5 -22 3" fill="none" stroke="#a03f69" stroke-width="3" stroke-linecap="round"/>' +
      eye(240, 60, 8) + '<circle cx="282" cy="68" r="1.9" fill="#a03f69"/>' + cheek(228, 76, 7)};

  A.pteranodon = {col:['#7f90f4', '#5a69cc', '#e3e6ff', '#ff6b6b'], fly:true,
    back:'<path d="M200 104 C186 66 150 24 78 4 C88 30 100 48 114 62 C102 64 92 68 84 74 C102 84 116 92 128 100 C120 104 114 110 110 116 C142 124 176 124 200 118 Z" fill="#5a69cc" stroke="#44519f" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M238 74 C224 54 204 40 180 34 C192 52 206 70 224 84 Z" fill="url(#gx-pteranodon)" stroke="#d14848" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M130 124 L98 142 L100 150 L136 136 Z M140 130 L112 152 L116 159 L148 140 Z" fill="#5a69cc" stroke="#44519f" stroke-width="2" stroke-linejoin="round"/>',
    body:'M118 120 C138 106 168 102 190 106 C204 98 214 86 226 78 C238 70 256 72 263 82 C268 90 264 98 258 100 C250 106 240 106 232 102 C222 118 206 134 186 140 C160 146 132 138 118 120 Z',
    belly:[172, 142, 54, 20], far:'', spots:'',
    near:'<path d="M168 110 C150 72 110 32 38 16 C50 42 62 58 78 72 C66 74 56 78 48 84 C68 94 82 102 94 110 C86 114 80 120 76 126 C108 132 144 132 168 126 Z" fill="url(#g-pteranodon)" stroke="#5a69cc" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<g fill="none" stroke="#5a69cc" stroke-width="2.5" stroke-linecap="round" opacity=".6"><path d="M160 108 C132 78 96 50 52 26"/><path d="M158 116 C130 104 104 92 78 74"/><path d="M156 122 C132 122 112 118 94 110"/></g>',
    face:'<path d="M254 78 L298 92 L254 102 Z" fill="#ffd24a" stroke="#d99a16" stroke-width="2.5" stroke-linejoin="round"/><path d="M258 91 L292 92" stroke="#d99a16" stroke-width="2" stroke-linecap="round"/>' + eye(246, 86, 6) + cheek(236, 96, 5)};

  const shade = {tiranosaur:'#37b06f', triceratops:'#f58a30', stegosaur:'#2aa6b8', brahiosaur:'#4a90ea', velociraptor:'#e0525a', ankilosaur:'#c4944a', spinosaur:'#9159dc', diplodok:'#aec43a', parasaurolof:'#ea7aa4', pteranodon:'#6b7de6'};
  const light = (hex, k) => { const n = parseInt(hex.slice(1), 16), f = c => Math.round(c + (255 - c)*k); return 'rgb(' + f(n >> 16) + ',' + f(n >> 8 & 255) + ',' + f(n & 255) + ')'; };

  function defs(){
    let h = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>';
    for(const id in A){ const a = A[id];
      h += '<linearGradient id="g-' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + light(a.col[0], .22) + '"/><stop offset=".55" stop-color="' + a.col[0] + '"/><stop offset="1" stop-color="' + shade[id] + '"/></linearGradient>' +
        '<linearGradient id="gx-' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + light(a.col[3], .3) + '"/><stop offset="1" stop-color="' + a.col[3] + '"/></linearGradient>' +
        '<clipPath id="c-' + id + '"><path d="' + a.body + '"/></clipPath>';
    }
    return h + '<radialGradient id="g-shadow"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs></svg>';
  }
  function svg(id, cls){
    const a = A[id], c = a.col;
    return '<svg class="dino ' + (cls||'') + '" viewBox="0 0 300 220" aria-hidden="true">' +
      (a.fly ? '' : '<ellipse cx="150" cy="202" rx="118" ry="11" fill="url(#g-shadow)"/>') +
      '<g class="dbody">' +
      '<g fill="' + c[1] + '" stroke="' + c[1] + '" stroke-width="2" stroke-linejoin="round">' + a.far + '</g>' + (a.back||'') +
      '<path d="' + a.body + '" fill="url(#g-' + id + ')"/>' +
      '<g clip-path="url(#c-' + id + ')"><ellipse cx="' + a.belly[0] + '" cy="' + a.belly[1] + '" rx="' + a.belly[2] + '" ry="' + a.belly[3] + '" fill="' + c[2] + '"/>' +
      '<g fill="' + c[1] + '" stroke="' + c[1] + '" opacity=".5">' + a.spots + '</g></g>' +
      '<path d="' + a.body + '" fill="none" stroke="' + c[1] + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<g fill="url(#g-' + id + ')" stroke="' + c[1] + '" stroke-width="2.5" stroke-linejoin="round">' + a.near + '</g>' + a.face + '</g></svg>';
  }
  /* jaje u bojama vrste; cracked = donja polovica ljuske (za mladunce) */
  function egg(id, cls){
    const c = A[id].col;
    return '<svg class="egg ' + (cls||'') + '" viewBox="0 0 120 150" aria-hidden="true"><ellipse cx="60" cy="140" rx="40" ry="7" fill="url(#g-shadow)"/>' +
      '<g class="eggin"><path d="M60 8 C92 8 108 58 108 90 C108 122 86 140 60 140 C34 140 12 122 12 90 C12 58 28 8 60 8 Z" fill="#fff8e6" stroke="#e2d2a8" stroke-width="3"/>' +
      '<g fill="' + c[0] + '"><circle cx="42" cy="52" r="10"/><circle cx="80" cy="70" r="13"/><circle cx="46" cy="98" r="12"/><circle cx="84" cy="112" r="8"/><circle cx="66" cy="30" r="6"/></g>' +
      '<g fill="' + c[3] + '" opacity=".8"><circle cx="62" cy="76" r="5"/><circle cx="30" cy="78" r="5"/><circle cx="68" cy="124" r="5"/><circle cx="92" cy="92" r="4"/></g>' +
      '<path d="M32 30 C40 18 50 14 58 13" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".9"/></g></svg>';
  }
  function shell(){
    return '<svg class="shell" viewBox="0 0 120 70" aria-hidden="true"><path d="M10 14 L24 26 L36 10 L50 26 L62 10 L74 26 L86 10 L98 26 L110 14 C112 44 90 64 60 64 C30 64 8 44 10 14 Z" fill="#fff8e6" stroke="#e2d2a8" stroke-width="3" stroke-linejoin="round"/></svg>';
  }
  return {A, svg, egg, shell, defs};
})();
