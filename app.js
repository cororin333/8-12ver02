(() => {
  'use strict';

  /* ===== 定数 ===== */
  const POINTS_12 = [15,12,10,9,8,7,6,5,4,3,2,1];
  const POINTS_24 = [15,12,10,9,9,8,8,7,7,6,6,6,5,5,5,4,4,4,3,3,3,2,2,1];

  /* ===== 状態 ===== */
  let state = {
    players: 24,
    mode: 'FFA',
    raceCount: 12,
    raceIndex: 0,
    tags: [],
    colors: [],
    keys: [],
    raceScores: [],
    adjustments: [],
    logs: {
      adjust: [],
      course: []
    }
  };

  /* ===== ユーティリティ ===== */
  function normalizeKey(k){
    if(!k) return '';
    return k.normalize('NFKC').toLowerCase().slice(0,1);
  }

  /* ===== 集計 ===== */
  function recalc(){
    const teamTotal = {};
    state.raceScores.forEach(r=>{
      Object.keys(r).forEach(t=>{
        teamTotal[t]=(teamTotal[t]||0)+r[t];
      });
    });

    state.adjustments.forEach(adj=>{
      teamTotal[adj.team]=(teamTotal[adj.team]||0)+adj.value;
    });

    renderOutput(teamTotal);
  }

  /* ===== 出力 ===== */
  function renderOutput(teamTotal){
    const out=document.getElementById('outMain');
    const entries=Object.entries(teamTotal).sort((a,b)=>b[1]-a[1]);
    out.textContent=entries.map(([t,v],i)=>`${i+1}位:${t}${v}`).join(' / ');
  }

  /* ===== 初期化 ===== */
  document.addEventListener('DOMContentLoaded',()=>{
    recalc();
  });

})();
