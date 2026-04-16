import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --navy: #0B1F3A;
    --teal: #0ABFBC;
    --teal-dark: #089490;
    --gold: #C8A96E;
    --white: #FFFFFF;
    --off-white: #F5F8FC;
    --gray-100: #EDF2F7;
    --gray-400: #A0AEC0;
    --gray-600: #4A5568;
    --gray-800: #2D3748;
    --shadow-sm: 0 2px 8px rgba(11,31,58,0.08);
    --shadow-md: 0 8px 32px rgba(11,31,58,0.12);
    --shadow-lg: 0 20px 60px rgba(11,31,58,0.18);
    --radius: 12px;
    --radius-lg: 20px;
    --container: min(100%, 1280px);
    --px: clamp(16px, 5vw, 48px);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    color: var(--gray-800);
    background: var(--white);
    overflow-x: hidden;
    -webkit-text-size-adjust: 100%;
  }

  img { max-width: 100%; height: auto; display: block; }

  button { font-family: inherit; cursor: pointer; }

  .topbar {
    background: var(--navy);
    color: rgba(255,255,255,0.75);
    font-size: 0.78rem;
    padding: 8px var(--px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .topbar-left { display: flex; align-items: center; gap: 6px; }
  .topbar-right {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    align-items: center;
  }
  .topbar-right span { display: flex; align-items: center; gap: 4px; white-space: nowrap; }
  .topbar strong { color: var(--teal); }

  .navbar {
    background: var(--white);
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--px);
    height: 68px;
    box-shadow: var(--shadow-sm);
    border-bottom: 1px solid var(--gray-100);
    gap: 12px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    flex-shrink: 0;
    text-decoration: none;
  }
  .logo-icon {
    width: 40px; height: 40px;
    background: var(--navy);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: var(--teal);
    font-size: 18px;
    font-weight: 900;
    letter-spacing: -1px;
    flex-shrink: 0;
  }
  .logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--navy);
    white-space: nowrap;
  }
  .logo-text span { color: var(--teal); }

  .nav-links {
    display: flex;
    gap: 2px;
    list-style: none;
    align-items: center;
  }
  .nav-links li button {
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--gray-600);
    cursor: pointer;
    padding: 8px 14px;
    border-radius: 8px;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .nav-links li button:hover,
  .nav-links li button.active {
    color: var(--navy);
    background: var(--gray-100);
  }
  .nav-links li button.active { color: var(--teal); }

  .nav-cta {
    background: var(--teal) !important;
    color: var(--white) !important;
    padding: 10px 20px !important;
    border-radius: 8px !important;
    font-weight: 600 !important;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .nav-cta:hover { background: var(--teal-dark) !important; }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 6px;
    border-radius: 8px;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .hamburger:hover { background: var(--gray-100); }
  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--navy);
    border-radius: 2px;
    transition: all 0.3s;
  }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-drawer {
    display: none;
    position: fixed;
    top: 68px;
    left: 0; right: 0;
    background: var(--white);
    border-bottom: 1px solid var(--gray-100);
    box-shadow: var(--shadow-md);
    z-index: 999;
    padding: 16px var(--px) 24px;
    flex-direction: column;
    gap: 4px;
    max-height: calc(100vh - 68px);
    overflow-y: auto;
  }
  .mobile-drawer.open { display: flex; }
  .mobile-drawer button {
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--gray-600);
    cursor: pointer;
    padding: 12px 16px;
    border-radius: 10px;
    text-align: left;
    transition: all 0.2s;
  }
  .mobile-drawer button:hover,
  .mobile-drawer button.active { background: var(--gray-100); color: var(--teal); }
  .mobile-drawer .mobile-cta {
    background: var(--teal) !important;
    color: var(--white) !important;
    margin-top: 8px;
    text-align: center;
    font-weight: 600 !important;
  }
  .mobile-drawer .mobile-cta:hover { background: var(--teal-dark) !important; }

  .section { animation: fadeUp 0.45s ease both; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .container {
    width: 100%;
    max-width: var(--container);
    margin: 0 auto;
    padding: 0 var(--px);
  }

  .hero {
    background: linear-gradient(120deg, var(--navy) 0%, #0e2d54 60%, #16406e 100%);
    padding: clamp(48px, 8vw, 88px) var(--px);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    min-height: clamp(480px, 60vh, 600px);
  }
  .hero::before {
    content: '';
    position: absolute;
    right: -80px; top: -80px;
    width: min(500px, 60vw); height: min(500px, 60vw);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(10,191,188,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero::after {
    content: '';
    position: absolute;
    left: 30%; bottom: -100px;
    width: 280px; height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,169,110,0.10) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-content {
    max-width: 600px;
    position: relative;
    z-index: 1;
    width: 100%;
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(10,191,188,0.15);
    border: 1px solid rgba(10,191,188,0.35);
    color: var(--teal);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 100px;
    margin-bottom: 20px;
  }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5.5vw, 3.5rem);
    font-weight: 800;
    color: var(--white);
    line-height: 1.15;
    margin-bottom: 18px;
  }
  .hero h1 span { color: var(--teal); }
  .hero p {
    color: rgba(255,255,255,0.72);
    font-size: clamp(0.95rem, 2vw, 1.05rem);
    line-height: 1.75;
    margin-bottom: 32px;
    max-width: 480px;
  }
  .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }

  .btn-primary {
    background: var(--teal);
    color: var(--white);
    border: none;
    padding: 13px 28px;
    border-radius: var(--radius);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.93rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 18px rgba(10,191,188,0.32);
    white-space: nowrap;
  }
  .btn-primary:hover { background: var(--teal-dark); transform: translateY(-2px); }
  .btn-outline {
    background: transparent;
    color: var(--white);
    border: 1.5px solid rgba(255,255,255,0.35);
    padding: 13px 28px;
    border-radius: var(--radius);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.93rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .btn-outline:hover { border-color: var(--teal); color: var(--teal); }

  .icon-cards {
    display: flex;
    gap: 10px;
    margin-top: 36px;
    flex-wrap: wrap;
  }
  .icon-card {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: var(--radius);
    padding: 14px 16px;
    text-align: center;
    min-width: 90px;
    flex: 1;
    transition: all 0.2s;
  }
  .icon-card:hover { background: rgba(10,191,188,0.15); border-color: rgba(10,191,188,0.4); }
  .icon-card .ic { font-size: 1.5rem; margin-bottom: 6px; }
  .icon-card span { font-size: 0.72rem; color: rgba(255,255,255,0.72); font-weight: 500; display: block; }

  .stats-row {
    display: flex;
    gap: clamp(24px, 5vw, 48px);
    margin-top: 40px;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.1);
    flex-wrap: wrap;
  }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 2.2rem);
    font-weight: 700;
    color: var(--teal);
    display: block;
  }
  .stat-label {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.52);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .sec-wrap {
    padding: clamp(48px, 8vw, 80px) var(--px);
  }
  .sec-wrap--alt { background: var(--off-white); }
  .sec-wrap--dark { background: var(--navy); }
  .sec-wrap--navy-deep { background: #060e1c; }

  .section-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 8px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--navy);
    line-height: 1.25;
    margin-bottom: 14px;
  }
  .section-title--light { color: var(--white); }
  .section-sub {
    color: var(--gray-600);
    font-size: 0.97rem;
    line-height: 1.72;
    max-width: 520px;
  }
  .section-sub--light { color: rgba(255,255,255,0.55); }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 64px;
    align-items: center;
  }

  .h-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: clamp(24px, 4vw, 36px) clamp(20px, 3vw, 28px);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--gray-100);
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  .h-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 4px; height: 100%;
    background: var(--teal);
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.3s;
  }
  .h-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
  .h-card:hover::before { transform: scaleY(1); }
  .h-card-icon {
    width: 52px; height: 52px;
    background: rgba(10,191,188,0.1);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
    margin-bottom: 18px;
  }
  .h-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: var(--navy);
    margin-bottom: 8px;
  }
  .h-card p { color: var(--gray-600); font-size: 0.87rem; line-height: 1.65; }

  .doc-card {
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--white);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--gray-100);
    transition: all 0.3s;
  }
  .doc-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
  .doc-photo-bg {
    width: 100%;
    aspect-ratio: 5/4;
    min-height: 160px;
    display: flex; align-items: center; justify-content: center;
    font-size: clamp(3rem, 5vw, 4.5rem);
  }
  .doc-info { padding: 18px 18px 22px; }
  .doc-specialty {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--teal);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  .doc-name {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: var(--navy);
    font-weight: 600;
    margin-bottom: 4px;
  }
  .doc-exp { font-size: 0.8rem; color: var(--gray-400); }

  .t-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-lg);
    padding: clamp(20px, 4vw, 32px) clamp(18px, 3vw, 28px);
  }
  .t-stars { color: var(--gold); font-size: 0.95rem; margin-bottom: 14px; }
  .t-text {
    color: rgba(255,255,255,0.75);
    font-size: 0.9rem;
    line-height: 1.75;
    margin-bottom: 18px;
    font-style: italic;
  }
  .t-author { display: flex; align-items: center; gap: 12px; }
  .t-avatar {
    width: 42px; height: 42px;
    border-radius: 50%;
    background: rgba(10,191,188,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.15rem;
    border: 2px solid rgba(10,191,188,0.35);
    flex-shrink: 0;
  }
  .t-name { font-weight: 600; color: var(--white); font-size: 0.88rem; }
  .t-role { font-size: 0.76rem; color: var(--gray-400); }

  .appt-section { text-align: center; }
  .appt-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3.5vw, 2rem);
    color: var(--navy);
    margin-bottom: 12px;
  }
  .appt-section p {
    color: var(--gray-600);
    font-size: 0.97rem;
    max-width: 460px;
    margin: 0 auto 28px;
    line-height: 1.7;
  }
  .appt-form {
    display: flex;
    gap: 10px;
    max-width: 540px;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: center;
  }
  .appt-form input {
    flex: 1;
    min-width: 180px;
    padding: 13px 16px;
    border: 1.5px solid var(--gray-100);
    border-radius: var(--radius);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    color: var(--navy);
    outline: none;
    transition: border-color 0.2s;
    background: var(--white);
  }
  .appt-form input:focus { border-color: var(--teal); }
  .appt-form input::placeholder { color: var(--gray-400); }

  .page-hero {
    background: linear-gradient(135deg, var(--navy) 0%, #13375e 100%);
    padding: clamp(56px, 8vw, 88px) var(--px) clamp(48px, 6vw, 68px);
    text-align: center;
  }
  .page-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4.5vw, 3rem);
    color: var(--white);
    font-weight: 800;
    margin-bottom: 14px;
    line-height: 1.2;
  }
  .page-hero p {
    color: rgba(255,255,255,0.65);
    font-size: clamp(0.93rem, 2vw, 1.05rem);
    max-width: 540px;
    margin: 0 auto;
    line-height: 1.72;
  }
  .breadcrumb {
    display: flex;
    justify-content: center;
    gap: 8px;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.45);
    margin-bottom: 14px;
    flex-wrap: wrap;
  }
  .breadcrumb span { color: var(--teal); }

  .about-img-block { position: relative; }
  .about-img-main {
    width: 100%;
    aspect-ratio: 4/3;
    background: linear-gradient(135deg, rgba(10,191,188,0.15) 0%, rgba(11,31,58,0.1) 100%);
    border-radius: var(--radius-lg);
    display: flex; align-items: center; justify-content: center;
    font-size: clamp(4rem, 8vw, 7rem);
    border: 1px solid var(--gray-100);
  }
  .about-badge-float {
    position: absolute;
    bottom: -16px; right: -16px;
    background: var(--teal);
    color: var(--white);
    border-radius: var(--radius);
    padding: 16px 20px;
    text-align: center;
    box-shadow: var(--shadow-md);
  }
  .about-badge-float .num {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    display: block;
  }
  .about-badge-float .lbl { font-size: 0.72rem; opacity: 0.85; }

  .about-content h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3.5vw, 2.1rem);
    color: var(--navy);
    font-weight: 700;
    line-height: 1.25;
    margin-bottom: 18px;
  }
  .about-content p {
    color: var(--gray-600);
    font-size: 0.95rem;
    line-height: 1.8;
    margin-bottom: 14px;
  }
  .about-list { list-style: none; margin-top: 22px; display: flex; flex-direction: column; gap: 10px; }
  .about-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    color: var(--gray-600);
    font-size: 0.9rem;
    line-height: 1.6;
  }
  .about-list li::before {
    content: '✓';
    min-width: 22px; height: 22px;
    background: rgba(10,191,188,0.12);
    color: var(--teal);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.68rem;
    font-weight: 800;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .v-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: clamp(22px, 4vw, 30px) clamp(18px, 3vw, 22px);
    text-align: center;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--gray-100);
    transition: all 0.3s;
  }
  .v-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: rgba(10,191,188,0.3); }
  .v-card .icon { font-size: 2rem; margin-bottom: 14px; }
  .v-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: var(--navy);
    margin-bottom: 8px;
  }
  .v-card p { font-size: 0.83rem; color: var(--gray-600); line-height: 1.65; }

  .team-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--gray-100);
    transition: all 0.3s;
  }
  .team-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
  .team-photo {
    width: 100%;
    aspect-ratio: 4/3;
    display: flex; align-items: center; justify-content: center;
    font-size: clamp(3rem, 6vw, 5rem);
  }
  .team-body { padding: 22px; }
  .team-role {
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--teal); margin-bottom: 5px;
  }
  .team-body h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem; color: var(--navy);
    font-weight: 600; margin-bottom: 7px;
  }
  .team-body p { font-size: 0.83rem; color: var(--gray-600); line-height: 1.6; }

  .awards-bar {
    background: var(--navy);
    padding: clamp(40px, 6vw, 60px) var(--px);
    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .award-item { text-align: center; }
  .award-item .aw-icon { font-size: 2.2rem; margin-bottom: 8px; }
  .award-item h4 {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem;
    color: var(--white);
    margin-bottom: 3px;
  }
  .award-item p { font-size: 0.76rem; color: rgba(255,255,255,0.55); }
  .award-divider { width: 1px; height: 50px; background: rgba(255,255,255,0.12); }

  .srv-card {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: clamp(24px, 4vw, 36px) clamp(20px, 3vw, 28px);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--gray-100);
    transition: all 0.35s;
    position: relative;
    overflow: hidden;
  }
  .srv-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: var(--teal);
    transform: scaleX(0);
    transition: transform 0.35s;
  }
  .srv-card:hover { transform: translateY(-7px); box-shadow: var(--shadow-lg); }
  .srv-card:hover::after { transform: scaleX(1); }
  .srv-icon {
    width: 58px; height: 58px;
    background: linear-gradient(135deg, rgba(10,191,188,0.12) 0%, rgba(10,191,188,0.05) 100%);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.7rem;
    margin-bottom: 20px;
    border: 1px solid rgba(10,191,188,0.2);
    transition: all 0.3s;
  }
  .srv-card:hover .srv-icon { background: var(--teal); }
  .srv-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    color: var(--navy);
    font-weight: 600;
    margin-bottom: 10px;
  }
  .srv-card p {
    color: var(--gray-600);
    font-size: 0.87rem;
    line-height: 1.7;
    margin-bottom: 18px;
  }
  .srv-features { list-style: none; display: flex; flex-direction: column; gap: 7px; }
  .srv-features li {
    font-size: 0.8rem;
    color: var(--gray-600);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .srv-features li::before { content: '→'; color: var(--teal); font-weight: 700; }

  .process-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 48px;
    position: relative;
  }
  .process-steps::before {
    content: '';
    position: absolute;
    top: 36px; left: 12%;
    right: 12%; height: 2px;
    background: linear-gradient(90deg, var(--teal) 0%, rgba(10,191,188,0.2) 100%);
    z-index: 0;
    pointer-events: none;
  }
  .step-card {
    text-align: center;
    position: relative;
    z-index: 1;
  }
  .step-num {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: var(--navy);
    color: var(--teal);
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 18px;
    border: 3px solid rgba(10,191,188,0.3);
    box-shadow: var(--shadow-sm);
  }
  .step-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 0.98rem;
    color: var(--navy);
    margin-bottom: 7px;
  }
  .step-card p { font-size: 0.83rem; color: var(--gray-600); line-height: 1.6; }

  .emergency-banner {
    background: linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%);
    padding: clamp(40px, 6vw, 56px) var(--px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }
  .emergency-banner h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.4rem, 3vw, 1.8rem);
    color: var(--white);
    font-weight: 700;
    margin-bottom: 6px;
  }
  .emergency-banner p { color: rgba(255,255,255,0.8); font-size: 0.92rem; }
  .emergency-phone {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.2rem, 3vw, 2rem);
    color: var(--white);
    font-weight: 700;
    display: flex; align-items: center; gap: 10px;
    white-space: nowrap;
  }

  .footer {
    background: #060e1c;
    color: rgba(255,255,255,0.55);
    padding: clamp(40px, 6vw, 56px) var(--px) 24px;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    gap: 36px;
    margin-bottom: 36px;
    padding-bottom: 36px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .footer-brand .logo-text { color: var(--white); }
  .footer-brand p {
    font-size: 0.85rem;
    line-height: 1.75;
    margin-top: 12px;
    color: rgba(255,255,255,0.42);
  }
  .footer-col h4 {
    font-family: 'Playfair Display', serif;
    font-size: 0.92rem;
    color: var(--white);
    margin-bottom: 14px;
    font-weight: 600;
  }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .footer-col ul li {
    font-size: 0.82rem;
    cursor: pointer;
    transition: color 0.2s;
    display: flex; align-items: flex-start; gap: 6px;
    line-height: 1.5;
  }
  .footer-col ul li:hover { color: var(--teal); }
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.78rem;
    gap: 12px;
    flex-wrap: wrap;
  }
  .footer-bottom span { color: var(--teal); }

  @media (max-width: 1024px) {
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .process-steps { grid-template-columns: repeat(2, 1fr); }
    .process-steps::before { display: none; }
    .grid-2 { gap: 48px; }
  }

  @media (max-width: 768px) {
    .nav-links, .nav-cta { display: none; }
    .hamburger { display: flex; }
    .grid-3 { grid-template-columns: repeat(2, 1fr); }
    .grid-2 { grid-template-columns: 1fr; gap: 48px; }
    .about-badge-float { bottom: -12px; right: -8px; }
    .emergency-banner { flex-direction: column; text-align: center; }
    .emergency-phone { justify-content: center; }
    .topbar { font-size: 0.73rem; padding: 7px var(--px); }
    .topbar-right { gap: 10px; }
    .section-header { align-items: flex-start; }
    .section-header .btn-primary { width: 100%; text-align: center; }
    .icon-cards { gap: 8px; }
    .icon-card { min-width: 78px; padding: 12px 10px; }
    .awards-bar { gap: 20px; }
    .award-divider { display: none; }
  }

  @media (max-width: 540px) {
    .topbar { display: none; }
    .navbar { height: 62px; }
    .logo-icon { width: 36px; height: 36px; font-size: 16px; }
    .logo-text { font-size: 1.2rem; }
    .hero { min-height: unset; padding-top: 40px; padding-bottom: 40px; }
    .hero p { max-width: 100%; }
    .hero-btns { flex-direction: column; }
    .hero-btns .btn-primary,
    .hero-btns .btn-outline { width: 100%; text-align: center; padding: 14px; }
    .icon-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .stats-row { gap: 20px; }
    .grid-3, .grid-4 { grid-template-columns: 1fr; }
    .grid-2 { grid-template-columns: 1fr; gap: 40px; }
    .about-img-main { aspect-ratio: 16/9; }
    .about-badge-float { position: static; margin-top: 12px; display: inline-block; }
    .about-img-block { display: flex; flex-direction: column; }
    .process-steps { grid-template-columns: 1fr; }
    .process-steps::before { display: none; }
    .footer-grid { grid-template-columns: 1fr; gap: 28px; }
    .footer-bottom { flex-direction: column; text-align: center; }
    .appt-form { flex-direction: column; }
    .appt-form input,
    .appt-form .btn-primary { width: 100%; }
    .emergency-banner { align-items: flex-start; text-align: left; }
    .emergency-phone { font-size: 1.15rem; }
    .section-header .btn-primary { width: auto; }
  }

  @media (max-width: 380px) {
    :root { --px: 14px; }
    .hero h1 { font-size: 1.75rem; }
    .section-title { font-size: 1.45rem; }
    .step-num { width: 60px; height: 60px; font-size: 1.2rem; }
  }
`;

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
interface Doctor {
  emoji: string;
  name: string;
  specialty: string;
  exp: string;
  bg: string;
}

interface Highlight {
  icon: string;
  title: string;
  desc: string;
}

interface Testimonial {
  stars: number;
  text: string;
  name: string;
  role: string;
  emoji: string;
}

interface Value {
  icon: string;
  title: string;
  desc: string;
}

interface TeamMember {
  emoji: string;
  role: string;
  name: string;
  bio: string;
  bg: string;
}

interface Award {
  icon: string;
  title: string;
  sub: string;
}

interface Service {
  icon: string;
  title: string;
  desc: string;
  features: string[];
}

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface AppointmentCTAProps {
  title: string;
  subtitle: string;
}

interface FooterProps {
  setPage: (id: string) => void;
}

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const doctors: Doctor[] = [
  { emoji: "👨‍⚕️", name: "Dr. Jonathan Reed", specialty: "Cardiologist", exp: "18 yrs experience", bg: "#E8F4FD" },
  { emoji: "👩‍⚕️", name: "Dr. Sarah Patel", specialty: "Neurologist", exp: "14 yrs experience", bg: "#FDF0F8" },
  { emoji: "👨‍⚕️", name: "Dr. Michael Torres", specialty: "Orthopedics", exp: "21 yrs experience", bg: "#F0FDF4" },
  { emoji: "👩‍⚕️", name: "Dr. Amelia Wong", specialty: "Dermatologist", exp: "11 yrs experience", bg: "#FFF7ED" },
];

const highlights: Highlight[] = [
  { icon: "🏥", title: "State-of-the-Art Facility", desc: "Our clinic is equipped with the latest diagnostic and treatment technology to ensure the most accurate care." },
  { icon: "⏱️", title: "24/7 Emergency Care", desc: "Round-the-clock emergency services with rapid response teams ready for any critical medical situation." },
  { icon: "🤝", title: "Patient-Centered Approach", desc: "Every treatment plan is personalised to each patient's unique health profile, lifestyle, and goals." },
];

const testimonials: Testimonial[] = [
  { stars: 5, text: "The level of care and compassion I received at Medisch was extraordinary. The doctors took time to explain everything clearly.", name: "Margaret L.", role: "Cardiac Patient", emoji: "👩" },
  { stars: 5, text: "From the moment I walked in, the staff made me feel welcome. My recovery was faster than expected thanks to their expertise.", name: "David K.", role: "Orthopedic Patient", emoji: "👨" },
  { stars: 5, text: "World-class facilities combined with genuinely caring professionals. I wouldn't trust my family's health anywhere else.", name: "Priya R.", role: "Pediatric Patient Parent", emoji: "👩" },
];

const values: Value[] = [
  { icon: "💡", title: "Innovation", desc: "We embrace the latest medical advancements to deliver better outcomes for our patients." },
  { icon: "❤️", title: "Compassion", desc: "Every patient is treated with dignity, empathy, and personalised attention." },
  { icon: "🎯", title: "Excellence", desc: "We hold ourselves to the highest clinical and service standards in everything we do." },
  { icon: "🤝", title: "Integrity", desc: "Honest, transparent communication is the foundation of every patient relationship." },
];

const team: TeamMember[] = [
  { emoji: "👨‍⚕️", role: "Chief Medical Officer", name: "Dr. William Hartley", bio: "35 years of experience leading clinical teams. Former Head of Surgery at Johns Hopkins Medical Center.", bg: "#E8F4FD" },
  { emoji: "👩‍⚕️", role: "Director of Patient Care", name: "Dr. Natalia Cruz", bio: "Pioneer in patient-centered healthcare models. Published researcher in clinical ethics and patient outcomes.", bg: "#FDF0F8" },
  { emoji: "👨‍⚕️", role: "Head of Diagnostics", name: "Dr. Samuel Obi", bio: "Leading expert in advanced diagnostics with proficiency in AI-assisted imaging and precision pathology.", bg: "#F0FDF4" },
];

const services: Service[] = [
  { icon: "❤️", title: "Cardiology", desc: "Comprehensive diagnosis and treatment of heart conditions using the latest non-invasive and interventional techniques.", features: ["ECG & Echocardiography", "Coronary Angioplasty", "Heart Failure Management"] },
  { icon: "🧠", title: "Neurology", desc: "Expert evaluation and management of neurological disorders, from migraines to complex neurological diseases.", features: ["EEG & EMG Testing", "Stroke Prevention", "Epilepsy Management"] },
  { icon: "🦴", title: "Orthopedics", desc: "Surgical and non-surgical treatments for bone, joint, and muscle conditions to restore mobility and reduce pain.", features: ["Joint Replacement", "Sports Medicine", "Spine Surgery"] },
  { icon: "🔬", title: "Oncology", desc: "Cutting-edge cancer diagnostics and personalised treatment plans using the most advanced therapies available.", features: ["Chemotherapy", "Radiation Therapy", "Immunotherapy"] },
  { icon: "👁️", title: "Ophthalmology", desc: "Complete eye care services from routine vision correction to complex surgical procedures.", features: ["LASIK Surgery", "Cataract Removal", "Retinal Care"] },
  { icon: "🫁", title: "Pulmonology", desc: "Diagnosis and treatment of respiratory conditions affecting the lungs and breathing system.", features: ["Spirometry Testing", "Sleep Apnea Treatment", "Asthma Management"] },
];

const steps: Step[] = [
  { num: "01", title: "Book Appointment", desc: "Schedule online or call our 24/7 helpline to book with your preferred specialist." },
  { num: "02", title: "Consultation", desc: "Meet your doctor for an in-depth assessment and discussion of your health concerns." },
  { num: "03", title: "Diagnosis", desc: "Receive precise diagnostics using our advanced laboratory and imaging technologies." },
  { num: "04", title: "Treatment & Care", desc: "Follow a personalised treatment plan with ongoing support from our medical team." },
];

const awards: Award[] = [
  { icon: "🏆", title: "Best Hospital 2023", sub: "National Health Awards" },
  { icon: "⭐", title: "Top 10 Clinics", sub: "US Medical Review" },
  { icon: "🔬", title: "Research Excellence", sub: "Medical Innovation Prize" },
  { icon: "🤝", title: "Patient Choice Award", sub: "5 Consecutive Years" },
];

const navItems: string[] = ["Home", "About Us", "Services", "Doctors", "Blog", "Contact"];

// Maps nav label → page id. Typed with Record<string, string> to allow string indexing.
const pageIdMap: Record<string, string> = {
  "Home": "home",
  "About Us": "about",
  "Services": "services",
  "Doctors": "home",
  "Blog": "home",
  "Contact": "home",
};

// ─────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────
function AppointmentCTA({ title, subtitle }: AppointmentCTAProps) {
  return (
    <div className="sec-wrap sec-wrap--alt">
      <div className="appt-section">
        <div className="section-label">Book Today</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <div className="appt-form">
          <input placeholder="Your full name" />
          <input placeholder="Phone number" />
          <button className="btn-primary">Book Now →</button>
        </div>
      </div>
    </div>
  );
}

function Footer({ setPage }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo" onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
            <div className="logo-icon">M</div>
            <span className="logo-text">Medi<span>sch</span></span>
          </div>
          <p>Providing exceptional, compassionate healthcare to the Brooklyn community and beyond since 1993. Your health is our mission.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>{["Home", "About Us", "Services", "Doctors", "Blog", "Contact"].map((l: string) => <li key={l}>{l}</li>)}</ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>{["Cardiology", "Neurology", "Orthopedics", "Oncology", "Ophthalmology", "Pulmonology"].map((l: string) => <li key={l}>{l}</li>)}</ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>📍 123 Medical Drive, Brooklyn, NY</li>
            <li>📞 002 010 6124 5741</li>
            <li>✉️ info@medisch.com</li>
            <li>🕐 Mon–Fri: 8am – 7pm</li>
            <li>🚨 Emergency: 24/7</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 <span>Medisch Clinic</span>. All rights reserved.</div>
        <div>Privacy Policy · Terms of Service · Cookie Policy</div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="section">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">⚕ Trusted by 10,000+ patients yearly</div>
          <h1>True Healthcare<br />For Your <span>Family</span></h1>
          <p>Your health and well-being is our highest priority. We combine world-class expertise with compassionate care to deliver outcomes that change lives.</p>
          <div className="hero-btns">
            <button className="btn-primary">Make an Appointment →</button>
            <button className="btn-outline">Meet Our Doctors</button>
          </div>
          <div className="icon-cards">
            {[["🫀", "Examination"], ["📋", "Prescription"], ["📈", "Cardiogram"], ["🩺", "Blood Pressure"]].map(([ic, lbl]: string[]) => (
              <div key={lbl} className="icon-card"><div className="ic">{ic}</div><span>{lbl}</span></div>
            ))}
          </div>
          <div className="stats-row">
            <div><span className="stat-num">10K+</span><span className="stat-label">Patients Yearly</span></div>
            <div><span className="stat-num">48</span><span className="stat-label">Specialists</span></div>
            <div><span className="stat-num">98%</span><span className="stat-label">Satisfaction Rate</span></div>
          </div>
        </div>
      </section>

      <div className="sec-wrap sec-wrap--alt">
        <div className="section-label">Why Choose Us</div>
        <div className="section-title">Healthcare You Can Trust</div>
        <div className="section-sub">We deliver exceptional medical care backed by decades of clinical experience and a patient-first philosophy.</div>
        <div className="grid-3" style={{ marginTop: 40 }}>
          {highlights.map((h: Highlight) => (
            <div key={h.title} className="h-card">
              <div className="h-card-icon">{h.icon}</div>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sec-wrap">
        <div className="section-header">
          <div>
            <div className="section-label">Our Specialists</div>
            <div className="section-title">Meet Our Expert<br />Medical Team</div>
          </div>
          <button className="btn-primary" style={{ alignSelf: "flex-end" }}>View All Doctors →</button>
        </div>
        <div className="grid-4">
          {doctors.map((d: Doctor) => (
            <div key={d.name} className="doc-card">
              <div className="doc-photo-bg" style={{ background: d.bg }}>{d.emoji}</div>
              <div className="doc-info">
                <div className="doc-specialty">{d.specialty}</div>
                <div className="doc-name">{d.name}</div>
                <div className="doc-exp">{d.exp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec-wrap sec-wrap--dark">
        <div className="section-label">Patient Stories</div>
        <div className="section-title section-title--light">What Our Patients Say</div>
        <div className="section-sub section-sub--light">Real experiences from real patients who trusted us with their care.</div>
        <div className="grid-3" style={{ marginTop: 40 }}>
          {testimonials.map((t: Testimonial) => (
            <div key={t.name} className="t-card">
              <div className="t-stars">{"★".repeat(t.stars)}</div>
              <div className="t-text">"{t.text}"</div>
              <div className="t-author">
                <div className="t-avatar">{t.emoji}</div>
                <div><div className="t-name">{t.name}</div><div className="t-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AppointmentCTA
        title="Ready to Take Charge of Your Health?"
        subtitle="Join thousands of patients who trust Medisch for expert, compassionate care. Book your appointment in minutes."
      />
    </div>
  );
}

function AboutPage() {
  return (
    <div className="section">
      <section className="page-hero">
        <div className="breadcrumb">Home <span>›</span> About Us</div>
        <h1>About Medisch Clinic</h1>
        <p>For over three decades, we've been a beacon of medical excellence — combining cutting-edge science with the warmth of personalised care.</p>
      </section>

      <div className="sec-wrap">
        <div className="grid-2">
          <div className="about-img-block">
            <div className="about-img-main">🏥</div>
            <div className="about-badge-float">
              <span className="num">30+</span>
              <span className="lbl">Years of Excellence</span>
            </div>
          </div>
          <div className="about-content">
            <div className="section-label">Our Story</div>
            <h2>A Legacy of Healing, Built on Science and Compassion</h2>
            <p>Medisch Clinic was founded in 1993 by a team of visionary physicians committed to transforming healthcare in Brooklyn. What began as a small general practice has grown into a world-class multi-specialty clinic serving over 10,000 patients each year.</p>
            <p>We believe that exceptional healthcare is not just about medical expertise — it's about listening, understanding, and treating each patient as a unique individual with unique needs.</p>
            <ul className="about-list">
              <li>Accredited by the Joint Commission on Accreditation of Healthcare Organizations</li>
              <li>Home to 48 board-certified specialists across 12 medical disciplines</li>
              <li>State-of-the-art diagnostic laboratories and imaging centers on-site</li>
              <li>Award-winning patient experience with a 98% satisfaction rate</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sec-wrap sec-wrap--alt">
        <div className="section-label">Our Values</div>
        <div className="section-title">The Principles That Guide Us</div>
        <div className="section-sub">Every decision we make is grounded in these core values that define who we are.</div>
        <div className="grid-4" style={{ marginTop: 40 }}>
          {values.map((v: Value) => (
            <div key={v.title} className="v-card">
              <div className="icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sec-wrap">
        <div className="section-label">Leadership</div>
        <div className="section-title">Meet Our Leadership Team</div>
        <div className="section-sub">The experienced professionals who guide our clinical and operational excellence.</div>
        <div className="grid-3" style={{ marginTop: 40 }}>
          {team.map((t: TeamMember) => (
            <div key={t.name} className="team-card">
              <div className="team-photo" style={{ background: t.bg }}>{t.emoji}</div>
              <div className="team-body">
                <div className="team-role">{t.role}</div>
                <h3>{t.name}</h3>
                <p>{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="awards-bar">
        {awards.map((a: Award, i: number) => (
          <div key={a.title} style={{ display: "contents" }}>
            <div className="award-item">
              <div className="aw-icon">{a.icon}</div>
              <h4>{a.title}</h4>
              <p>{a.sub}</p>
            </div>
            {i < awards.length - 1 && <div className="award-divider" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="section">
      <section className="page-hero" style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #0a2f50 100%)" }}>
        <div className="breadcrumb">Home <span>›</span> Services</div>
        <h1>Our Medical Services</h1>
        <p>Comprehensive, specialised healthcare across a wide range of medical disciplines — all under one roof.</p>
      </section>

      <div className="sec-wrap sec-wrap--alt">
        <div className="section-label">What We Offer</div>
        <div className="section-title">Comprehensive Care Across<br />All Specialties</div>
        <div className="section-sub">From routine check-ups to complex procedures, our specialists are equipped to handle all your healthcare needs.</div>
        <div className="grid-3" style={{ marginTop: 40 }}>
          {services.map((s: Service) => (
            <div key={s.title} className="srv-card">
              <div className="srv-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="srv-features">
                {s.features.map((f: string) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="sec-wrap">
        <div style={{ textAlign: "center" }}>
          <div className="section-label">How It Works</div>
          <div className="section-title">Your Care Journey</div>
          <div className="section-sub" style={{ margin: "0 auto" }}>Simple, transparent steps from first contact to full recovery.</div>
        </div>
        <div className="process-steps">
          {steps.map((s: Step) => (
            <div key={s.num} className="step-card">
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="emergency-banner">
        <div>
          <h2>Medical Emergency?</h2>
          <p>Our emergency department is open 24 hours a day, 7 days a week.</p>
        </div>
        <div className="emergency-phone">📞 002 010 6124 5741</div>
        <button className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}>
          Find Our Location →
        </button>
      </div>

      <AppointmentCTA
        title="Schedule Your Appointment"
        subtitle="Our specialists are ready to help. Book your consultation today and take the first step towards better health."
      />
    </div>
  );
}

// ─────────────────────────────────────────
// APP
// ─────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function navigate(id: string): void {
    setPage(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <style>{style}</style>

      <div className="topbar">
        <div className="topbar-left">
          <span>⭐ Over <strong>10,000 patients</strong> yearly — Hear Their Real Stories →</span>
        </div>
        <div className="topbar-right">
          <span>📞 Emergency: <strong>002 010 6124 5741</strong></span>
          <span>📍 Brooklyn, New York</span>
          <span>🕐 Mon–Fri: 8am – 7pm</span>
        </div>
      </div>

      <nav className="navbar">
        <div className="logo" onClick={() => navigate("home")}>
          <div className="logo-icon">M</div>
          <span className="logo-text">Medi<span>sch</span></span>
        </div>

        <ul className="nav-links">
          {navItems.map((label: string) => (
            <li key={label}>
              <button
                className={
                  page === pageIdMap[label] && ["Home", "About Us", "Services"].includes(label)
                    ? "active"
                    : ""
                }
                onClick={() => navigate(pageIdMap[label] ?? "home")}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button className="btn-primary nav-cta" onClick={() => navigate("services")}>
          Make Appointment →
        </button>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        {navItems.map((label: string) => (
          <button
            key={label}
            className={
              page === pageIdMap[label] && ["Home", "About Us", "Services"].includes(label)
                ? "active"
                : ""
            }
            onClick={() => navigate(pageIdMap[label] ?? "home")}
          >
            {label}
          </button>
        ))}
        <button className="mobile-cta" onClick={() => navigate("services")}>
          Make Appointment →
        </button>
      </div>

      {page === "home" && <HomePage />}
      {page === "about" && <AboutPage />}
      {page === "services" && <ServicesPage />}

      <Footer setPage={(id: string) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
    </>
  );
}