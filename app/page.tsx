"use client";

import React, { useState, useEffect } from 'react';

export default function AdiatXPanel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusText, setStatusText] = useState('⚡ STATUS: ARMED ⚡');
  const [statusStyle, setStatusStyle] = useState({ color: '#ff8888', textShadow: '0 0 10px red' });

  // KeyAuth Config
  const config = {
    name: "ADIAT X PANEL",
    ownerid: "OaREGqwvH6",
    secret: "03ca68797371bf02b0274eb15c2f1dd03cef0acbb3dfc48c4b6f17366fb99d29",
    version: "1.0"
  };

  useEffect(() => {
    // ---------- EXTREME ANTI TAMPER & DEBUG ----------
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleSelectStart = (e: Event) => e.preventDefault();
    const handleCopyCut = (e: ClipboardEvent) => e.preventDefault();

    const handleKeyDown = (e: KeyboardEvent) => {
      // F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S
      if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
        (e.ctrlKey && e.keyCode === 85) ||
        (e.ctrlKey && e.keyCode === 83)
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);

    // DevTools Detection logic
    const protectInterval = setInterval(() => {
      const before = new Date().getTime();
      console.log('');
      const after = new Date().getTime();
      if (after - before > 100) {
        document.body.style.opacity = '0.8';
      }
    }, 800);

    // Override console clear
    const originalClear = console.clear;
    console.clear = () => {
      console.warn('[PROTECTED] Console cannot be cleared.');
    };

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
      clearInterval(protectInterval);
      console.clear = originalClear;
    };
  }, []);

  const login = async () => {
    if (!username || !password) {
      alert("⛔ ERROR: CREDENTIALS MISSING ⛔");
      return;
    }

    setStatusText("🜁 CONNECTING TO SECURE NODE ...");
    setStatusStyle({ color: "#ffaa00", textShadow: "0 0 15px orange" });

    try {
      // 1. INIT
      const initUrl = `https://keyauth.win/api/1.2/?type=init&name=${encodeURIComponent(config.name)}&ownerid=${config.ownerid}&ver=${config.version}&_=${Date.now()}`;
      const initRes = await fetch(initUrl, { cache: 'no-store' });
      const initData = await initRes.json();

      if (initData.success) {
        setStatusText("🜂 AUTHENTICATING ...");
        setStatusStyle({ color: "yellow", textShadow: "0 0 10px yellow" });

        // 2. LOGIN
        const logUrl = `https://keyauth.win/api/1.2/?type=login&username=${encodeURIComponent(username)}&pass=${encodeURIComponent(password)}&sessionid=${initData.sessionid}&name=${encodeURIComponent(config.name)}&ownerid=${config.ownerid}&_=${Date.now()}`;
        const logRes = await fetch(logUrl, { cache: 'no-store' });
        const logData = await logRes.json();

        if (logData.success) {
          setStatusText("✔ ACCESS GRANTED! 核 REDIRECTING...");
          setStatusStyle({ color: "#00ff88", textShadow: "0 0 20px lime" });
          
          localStorage.setItem("adiatSession", btoa("auth:" + Date.now()));

          setTimeout(() => {
            window.location.href = "/hack"; 
          }, 1500);
        } else {
          setStatusText("✖ DENIED: " + (logData.message || "INVALID CREDENTIALS"));
          setStatusStyle({ color: "#ff0000", textShadow: "0 0 20px red" });
        }
      } else {
        setStatusText("✖ SERVER ERROR: " + (initData.message || "INIT FAIL"));
        setStatusStyle({ color: "red", textShadow: "0 0 10px red" });
      }
    } catch (err) {
      setStatusText("✖ NETWORK TIMEOUT / NODE OFFLINE");
      setStatusStyle({ color: "#ff4444", textShadow: "0 0 10px red" });
    }
  };

  return (
    <div className="main-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        .main-wrapper {
          background: radial-gradient(circle at 20% 30%, #1a0000, #000000);
          color: #ff0000;
          font-family: 'Courier New', monospace;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }
        .main-wrapper::before {
          content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: repeating-linear-gradient(0deg, rgba(255,0,0,0.03) 0px, rgba(0,0,0,0.5) 2px, transparent 3px);
          pointer-events: none; z-index: 1;
        }
        .login-card {
          width: 420px; padding: 45px 40px; background: rgba(5, 0, 0, 0.85);
          backdrop-filter: blur(4px); border: 2px solid #ff0000; border-radius: 24px;
          text-align: center; z-index: 10; position: relative;
          animation: borderPulse 2s infinite alternate;
        }
        @keyframes borderPulse {
          0% { box-shadow: 0 0 30px #ff0000, 0 0 60px #8b0000 inset; border-color: #ff2222; }
          100% { box-shadow: 0 0 70px #ff4444, 0 0 100px #ff0000 inset; border-color: #ff8888; }
        }
        .glitch { font-size: 32px; font-weight: 900; animation: glitchText 1s infinite; }
        @keyframes glitchText {
          0%, 100% { transform: skew(0deg, 0deg); opacity: 1; }
          95% { transform: skew(5deg, -2deg); opacity: 0.9; text-shadow: -4px 0 #ff4444, 3px 0 #aa0000; }
          96% { transform: skew(-5deg, 3deg); text-shadow: 4px 0 darkred, -3px 0 red; }
        }
        .version-tag {
          font-size: 11px; color: #822; letter-spacing: 3px; display: block;
          margin-bottom: 30px; background: #0f0000; padding: 5px 0;
          border-radius: 30px; border: 1px solid #330000; text-transform: uppercase;
        }
        input {
          width: 100%; padding: 16px 20px; background: #0f0303; border: 2px solid #3a0000;
          color: #fff; border-radius: 40px; text-align: center; margin-bottom: 25px; outline: none;
          box-shadow: 0 0 5px #ff0000 inset; transition: 0.25s;
        }
        input:focus { border-color: #ff0000; box-shadow: 0 0 25px #ff0000, 0 0 15px #ff0000 inset; background: #1a0303; }
        .btn-login {
          width: 100%; padding: 18px; background: linear-gradient(145deg, #c80000, #4a0000);
          color: white; border: none; font-weight: bold; cursor: pointer; text-transform: uppercase;
          border-radius: 60px; box-shadow: 0 0 30px #b30000, 0 5px 0 #2f0000; font-size: 18px;
          letter-spacing: 4px; transition: 0.2s;
        }
        .btn-login:hover { background: linear-gradient(145deg, #ff1a1a, #8b0000); box-shadow: 0 0 60px red; letter-spacing: 6px; }
        #status {
          margin-top: 20px; font-size: 14px; font-weight: bold; min-height: 28px;
          background: #0c0101; padding: 10px; border-radius: 40px; border: 1px solid #a00;
        }
        .btn-tg {
          display: block; text-decoration: none; color: #00aaff; border: 2px solid #0088cc;
          padding: 14px; border-radius: 50px; font-weight: bold; margin-top: 20px;
          background: #001c22; box-shadow: 0 0 25px #0088cc; transition: 0.3s;
        }
        .btn-tg:hover { background: #0088cc; color: black; box-shadow: 0 0 60px #00ccff; transform: scale(1.02); }
        .corner { position: absolute; width: 40px; height: 40px; border-color: red; border-style: solid; opacity: 0.7; }
        .corner-tl { top: 10px; left: 10px; border-width: 3px 0 0 3px; }
        .corner-tr { top: 10px; right: 10px; border-width: 3px 3px 0 0; }
        .corner-bl { bottom: 10px; left: 10px; border-width: 0 0 3px 3px; }
        .corner-br { bottom: 10px; right: 10px; border-width: 0 3px 3px 0; }
      `}} />

      <div className="corner corner-tl"></div>
      <div className="corner corner-tr"></div>
      <div className="corner corner-bl"></div>
      <div className="corner corner-br"></div>

      <div className="login-card">
        <h1 className="glitch">ADIAT X PANEL</h1>
        <span className="version-tag">核・KEYAUTH EXTREME V2.0</span>
        
        <input 
          type="text" 
          placeholder="❖  USERNAME  ❖" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        <input 
          type="password" 
          placeholder="❖  PASSWORD  ❖" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        
        <button className="btn-login" onClick={login}>⏻ AUTHORIZE</button>
        
        <div id="status" style={statusStyle}>{statusText}</div>

        <div style={{ marginTop: '30px', borderTop: '2px solid #3a0000', paddingTop: '20px' }}>
          <a href="https://t.me/adiat990" target="_blank" rel="noopener noreferrer" className="btn-tg">
            ⎔ BUY ACCESS / JOIN TG ⎔
          </a>
          <div style={{ fontSize: '8px', color: '#3a1a1a', marginTop: '16px', letterSpacing: '3px' }}>
            ☢️ ADIAT NUCLEAR SYSTEMS • EXTREME EDITION ☢️
          </div>
        </div>
      </div>
    </div>
  );
}