---
layout: default
title: Главная
---

<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
    animation: bg-fade 10s ease-in-out infinite alternate;
  }
  @keyframes bg-fade {
    from { background-position: 0% 0%; }
    to { background-position: 100% 100%; }
  }

  .hero {
    margin: 50px auto;
    max-width: 800px;
    text-align: center;
    animation: hero-pop 1s ease-out both;
  }
  @keyframes hero-pop {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  h1 { font-size: 3em; margin-bottom: 0.2em; }
  h2, h3 { color: #2a4365; }

  .btn-github {
    display: inline-block;
    margin: 20px auto;
    padding: 12px 24px;
    background: #24292e;
    color: #fff;
    border-radius: 6px;
    font-size: 1.1em;
    text-decoration: none;
    transition: background 0.3s, transform 0.2s;
  }
  .btn-github:hover {
    background: #444d56;
    transform: translateY(-2px);
  }

  .fade-in {
    opacity: 0;
    animation: fadeUp 1s forwards;
    animation-delay: 0.5s;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .contacts {
    margin-top: 40px;
    text-align: center;
  }
  .contacts a {
    color: #2a4365;
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.2s;
  }
  .contacts a:hover {
    color: #1A365D;
  }
</style>

<div class="hero">
  <h1>👋 Привет, я Мухаммет Суханкулиев</h1>
  <p><strong>Инженер по информационной безопасности</strong> и системный разработчик из ИТМО.</p>
</div>

<div class="fade-in">
  <h2>🧠 Обо мне</h2>
  - Специализация: **DevOps**, **QA**, **Сетевое программирование**, **Системное тестирование**  
  - Языки: Python · C · SQL · Bash  
  - Инструменты: Docker · Git · pytest · Wireshark · CI/CD  
  - Участвую в CTF, создаю утилиты для безопасности и тестирования  

  <h2>💼 Портфолио</h2>
  <a href="https://github.com/JKL2theBest/ITMO" class="btn-github" target="_blank">Открыть мое ITMO‑портфолио на GitHub</a>

  <h2>📫 Контакты</h2>
  <div class="contacts">
    <a href="mailto:muhammet.jkl2.suhanguylev@gmail.com">✉️ Email</a> ·
    <a href="https://t.me/jkl2youtube">💬 Telegram</a> ·
    <span>📞 +7 (931) 535‑5395</span>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    hero.style.animationDelay = '0.2s';
    document.querySelectorAll('.fade-in').forEach((el, i) => {
      el.style.animationDelay = `${0.4 + i * 0.2}s`;
    });
  });
</script>
