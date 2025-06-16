---
layout: default
title: Главная
---

<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #1a202c;
    background: linear-gradient(135deg, #e6f0ff, #f9f9f9);
    margin: 0;
    padding: 0;
    animation: bg-fade 15s ease-in-out infinite alternate;
    background-size: 400% 400%;
  }

  @keyframes bg-fade {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
  }

  .container {
    max-width: 900px;
    margin: 50px auto;
    padding: 0 20px;
  }

  .hero {
    text-align: center;
    animation: hero-appear 1.2s ease-out forwards;
  }

  @keyframes hero-appear {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  h1 {
    font-size: 3em;
    margin-bottom: 0.2em;
  }

  h2 {
    margin-top: 2em;
    color: #2b6cb0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  h2::before {
    content: "💡";
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  ul li::before {
    content: "✓ ";
    color: #2f855a;
    font-weight: bold;
  }

  .btn-github {
    display: inline-block;
    margin-top: 20px;
    padding: 14px 28px;
    background: #2b6cb0;
    color: #fff;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1.1em;
    text-decoration: none;
    transition: transform 0.3s ease, background-color 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .btn-github:hover {
    background-color: #2c5282;
    transform: translateY(-3px);
  }

  .contacts {
    margin-top: 30px;
    font-size: 1.05em;
  }

  .contacts a {
    color: #2b6cb0;
    margin-right: 15px;
    text-decoration: none;
    transition: color 0.3s;
  }

  .contacts a:hover {
    color: #1a365d;
  }

  .info-block {
    animation: fadeInUp 1s ease forwards;
  }

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .emoji {
    font-style: normal;
    font-size: 1.3em;
  }
</style>

<div class="container">
  <div class="hero">
    <h1>Суханкулиев Мухаммет</h1>
    <p><strong>DevOps · QA · Security · C/Python Developer</strong></p>
    <a href="https://github.com/JKL2theBest/ITMO" class="btn-github" target="_blank">
      🔗 Открыть учебный GitHub-репозиторий ITMO
    </a>
  </div>

  <div class="info-block">
    <h2><span class="emoji">🧠</span> О себе</h2>
    <ul>
      <li>3 курс ИТМО, Информационная безопасность</li>
      <li>DevOps-инженер, тестировщик, специалист по кибербезопасности</li>
      <li>Языки: Python, C, SQL, Bash</li>
      <li>Инструменты: Docker, PyTest, Git, Wireshark, Burp Suite</li>
      <li>Участвую в CTF, разрабатываю тестовые эксплойты</li>
    </ul>

    <h2><span class="emoji">🛠️</span> Навыки</h2>
    <ul>
      <li>Информационная безопасность, DevSecOps, ручное и автотестирование</li>
      <li>CI/CD, Web Vulnerabilities (XSS, SQLi, CSRF, SSRF, LFI, SSTI)</li>
      <li>Linux/Unix, Shell-скрипты, сетевые протоколы (TCP/IP, HTTP, DNS)</li>
      <li>Git, Docker, HTML, CSS, JavaScript, PostgreSQL</li>
    </ul>

    <h2><span class="emoji">📜</span> Образование и курсы</h2>
    <ul>
      <li>НИУ ИТМО, Информационная безопасность (до 2027)</li>
      <li>Курсы: Машинное обучение, Веб-технологии, Анализ данных, Кибербезопасность</li>
    </ul>

    <h2><span class="emoji">📫</span> Контакты</h2>
    <div class="contacts">
      <a href="mailto:muhammet.jkl2.suhanguylev@gmail.com">✉️ Email</a>
      <a href="https://t.me/jkl2youtube" target="_blank">💬 Telegram</a>
      <span>📞 +7 (931) 535‑5395</span>
    </div>
  </div>
</div>
