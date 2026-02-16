"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function AdiatAdminPanel() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [dbUsers, setDbUsers] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState('0');
  const [activeUsers, setActiveUsers] = useState('0');
  const [serverLoad, setServerLoad] = useState('47%');
  
  // Create User States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ১. ইউজার লিস্ট আনা
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (Array.isArray(data)) {
        setDbUsers(data);
        setTotalUsers(data.length.toString());
      }
    } catch (err) {
      console.error("Fetch failed");
    }
  };

  // ২. নতুন ইউজার তৈরি করা (UPDATED)
  const createUser = async () => {
    if (!newUsername || !newPassword) {
      return alert("⚠️ Please enter both Username and Password!");
    }
    
    try {
      const res = await fetch('/api/setup-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: newUsername.trim(), 
          password: newPassword 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ AGENT CREATED SUCCESSFULLY!");
        setShowCreateModal(false);
        setNewUsername('');
        setNewPassword('');
        fetchUsers(); // লিস্ট রিফ্রেশ করো
      } else {
        // যদি ডাটাবেসে ইউজার থেকে থাকে তবে এই মেসেজ দেখাবে
        alert(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      alert("❌ Server connection lost! Check your terminal.");
    }
  };

  // ৩. ব্যান/আনব্যান করা
  const toggleBan = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/users/ban', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, isBanned: currentStatus }),
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      alert("❌ Failed to update status.");
    }
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 50).toString());
      setServerLoad(Math.floor(30 + Math.random() * 50) + '%');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ড্যাশবোর্ড এনিমেশন
  useEffect(() => {
    if (currentPage === 'dashboard' && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 100; i++) {
          ctx.lineTo(i * 8, 75 + Math.sin(i * 0.3) * 40);
        }
        ctx.stroke();
      }
    }
  }, [currentPage]);

  return (
    <div className="admin-body">
      <style dangerouslySetInnerHTML={{ __html: `
        .admin-body { background: #000; color: #ff4444; min-height: 100vh; display: flex; font-family: 'Courier New', monospace; }
        .sidebar { width: 280px; background: #0f0000; border-right: 3px solid #ff0000; padding: 30px 20px; }
        .menu-item { padding: 15px 20px; margin: 5px 0; cursor: pointer; border-radius: 10px; font-weight: bold; border: 1px solid transparent; transition: 0.3s; }
        .menu-item:hover, .menu-item.active { border-color: #ff0000; background: #1f0000; color: white; }
        .main-content { flex: 1; padding: 30px; background: radial-gradient(circle at 80% 20%, #1a0000, #000000); }
        .stat-card { background: #0f0303; border: 2px solid #8b0000; padding: 25px; border-radius: 20px; text-align: center; }
        .stat-value { font-size: 38px; color: #ff0000; text-shadow: 0 0 20px red; }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; z-index: 100; }
        .modal-box { background: #0f0303; padding: 30px; border: 2px solid #ff0000; border-radius: 20px; width: 350px; box-shadow: 0 0 50px rgba(255,0,0,0.2); }
        input { width: 100%; padding: 12px; margin-bottom: 15px; background: #000; border: 1px solid #444; color: #fff; border-radius: 5px; outline: none; }
        input:focus { border-color: #ff0000; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #330000; }
        th { color: #888; text-transform: uppercase; font-size: 12px; }
        .btn-create { background: #ff0000; color: #fff; border: none; padding: 10px 20px; cursor: pointer; font-weight: bold; border-radius: 5px; transition: 0.3s; }
        .btn-create:hover { background: #cc0000; box-shadow: 0 0 15px red; }
      `}} />

      {/* Sidebar */}
      <div className="sidebar">
        <h2 style={{textAlign:'center', letterSpacing:'5px'}}>ADIAT</h2>
        <p style={{fontSize:'10px', textAlign:'center', color:'#555', marginBottom:'40px'}}>NUCLEAR_CONTROL_v2</p>
        <div className={`menu-item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentPage('dashboard')}>📊 DASHBOARD</div>
        <div className={`menu-item ${currentPage === 'users' ? 'active' : ''}`} onClick={() => setCurrentPage('users')}>👥 USERS</div>
        <div className="menu-item" onClick={() => router.push('/')} style={{marginTop:'50px', color:'#666'}}>🚪 LOGOUT</div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {currentPage === 'dashboard' && (
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'20px'}}>
            <div className="stat-card"><div>TOTAL USERS</div><div className="stat-value">{totalUsers}</div></div>
            <div className="stat-card"><div>ACTIVE NOW</div><div className="stat-value">{activeUsers}</div></div>
            <div className="stat-card"><div>SERVER LOAD</div><div className="stat-value">{serverLoad}</div></div>
            <div style={{gridColumn:'span 3', background:'#0f0303', padding:'20px', border:'2px solid #8b0000', borderRadius:'20px', marginTop:'20px'}}>
              <p style={{marginBottom:'10px', fontSize:'12px'}}>⚡ LIVE TRAFFIC MONITOR</p>
              <canvas ref={canvasRef} width={800} height={150} style={{width:'100%'}} />
            </div>
          </div>
        )}

        {currentPage === 'users' && (
          <div style={{background:'#0f0303', padding:'25px', borderRadius:'20px', border:'2px solid #8b0000'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
              <h3 style={{margin:0}}>AGENT DATABASE</h3>
              <button className="btn-create" onClick={() => setShowCreateModal(true)}>+ CREATE NEW USER</button>
            </div>

            {/* Create User Modal */}
            {showCreateModal && (
              <div className="modal-overlay">
                <div className="modal-box">
                  <h3 style={{textAlign:'center', color:'#fff', marginBottom:'20px'}}>☢️ AUTHORIZE NEW AGENT ☢️</h3>
                  <input 
                    type="text" 
                    placeholder="USERNAME" 
                    value={newUsername} 
                    onChange={(e)=>setNewUsername(e.target.value)} 
                  />
                  <input 
                    type="password" 
                    placeholder="PASSWORD" 
                    value={newPassword} 
                    onChange={(e)=>setNewPassword(e.target.value)} 
                  />
                  <button onClick={createUser} className="btn-create" style={{width:'100%', padding:'15px'}}>CONFIRM ACCESS</button>
                  <button onClick={()=>setShowCreateModal(false)} style={{width:'100%', background:'none', color:'#666', border:'none', marginTop:'15px', cursor:'pointer'}}>CANCEL</button>
                </div>
              </div>
            )}

            <table>
              <thead>
                <tr><th>USERNAME</th><th>ROLE</th><th>STATUS</th><th>ACTION</th></tr>
              </thead>
              <tbody>
                {dbUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td><span style={{background:'#222', padding:'2px 8px', borderRadius:'4px', fontSize:'12px'}}>{user.role}</span></td>
                    <td style={{color: user.isBanned ? '#ff0000' : '#00ff00', fontWeight:'bold'}}>
                      {user.isBanned ? '● BANNED' : '● ACTIVE'}
                    </td>
                    <td>
                      <button 
                        onClick={() => toggleBan(user._id, user.isBanned)} 
                        style={{
                          background: user.isBanned ? '#00ff0022' : '#ff000022', 
                          border: `1px solid ${user.isBanned ? '#00ff00' : '#ff0000'}`, 
                          color: user.isBanned ? '#00ff00' : '#ff0000', 
                          cursor:'pointer', padding:'5px 12px', borderRadius:'4px', fontSize:'11px'
                        }}
                      >
                        {user.isBanned ? 'RESTORE' : 'TERMINATE'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}