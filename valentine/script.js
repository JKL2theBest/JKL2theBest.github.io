document.addEventListener('DOMContentLoaded', () => {
    // CONFIG

    const CONFIG = {
        isMobile: window.matchMedia('(pointer: coarse)').matches,

        stars: {
            desktop: 150,
            mobile: 70
        },

        explosionParts: {
            desktop: 50,
            mobile: 35
        },

        maxParticles: 500,

        timings: {
            trailInterval: 50,
            fireworkInterval: 700,
            heartHideDelay: 500,
            acceptHideDelay: 600,
            buttonMoveDuration: '0.4s'
        },

        padding: 20
    };

    const STAR_COUNT = CONFIG.isMobile
        ? CONFIG.stars.mobile
        : CONFIG.stars.desktop;

    const EXPLOSION_PARTS = CONFIG.isMobile
        ? CONFIG.explosionParts.mobile
        : CONFIG.explosionParts.desktop;

    // DOM

    const heart = document.getElementById('heartContainer');
    const card = document.getElementById('messageCard');
    const btnYes = document.getElementById('btnYes');
    const btnNoLayout = document.getElementById('btnNoLayout');
    const btnNoRunner = document.getElementById('btnNoRunner');
    const success = document.getElementById('successOverlay');

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // STATE

    let width;
    let height;

    let particles = [];
    let accepted = false;

    let lastFireworkTime = 0;
    let lastTrailTime = 0;
    let isNoButtonRunning = false;

    const cursor = {
        x: -999,
        y: -999
    };

    // PARTICLES

    class Particle {
        constructor(x, y, type = 'star') {
            this.x = x;
            this.y = y;
            this.type = type;

            const angle = Math.random() * Math.PI * 2;
            let speed;

            if (type === 'star') {
                this.size = Math.random() * 1.5 + 0.5;
                speed = Math.random() * 0.15 + 0.10;
                this.decay = 0;
                this.color = '#fff';
            } else if (type === 'trail') {
                this.size = Math.random() * 2 + 2;
                speed = Math.random() * 2 + 1;
                this.decay = 0.03;
                this.color = randomPink();
            } else {
                this.size = Math.random() * 5 + 2;
                speed = Math.random() * 3 + 2;
                this.decay = 0.01;
                this.color = randomPink();
            }

            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.life = 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.type === 'star') {
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            } else {
                this.life -= this.decay;
            }
        }

        draw() {
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;

            ctx.beginPath();
            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    }

    const randomPink = () =>
        `hsl(${Math.random() * 30 + 330}, 90%, 65%)`;

    const createExplosion = (x, y, count) => {
        for (let i = 0; i < count; i++) {
            particles.push(
                new Particle(x, y, 'explosion')
            );
        }
    };

    // UI

    const showCard = () => {
        const rect = heart.getBoundingClientRect();

        createExplosion(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            EXPLOSION_PARTS
        );

        heart.style.opacity = '0';
        heart.style.transform = 'scale(0) rotate(360deg)';

        setTimeout(() => {
            heart.style.display = 'none';
            card.style.display = 'block';

            requestAnimationFrame(() => {
                card.classList.add('visible');
                btnNoRunner.classList.add('visible'); 
            });
        }, CONFIG.timings.heartHideDelay);
    };

    const moveNoButton = () => {
        if (!isNoButtonRunning) {
            isNoButtonRunning = true;

            btnNoRunner.style.transition = `
                left ${CONFIG.timings.buttonMoveDuration} ease,
                top ${CONFIG.timings.buttonMoveDuration} ease,
                opacity ${CONFIG.timings.buttonMoveDuration} ease
            `;
        }

        const w = btnNoRunner.offsetWidth;
        const h = btnNoRunner.offsetHeight;

        const x = Math.max(
            CONFIG.padding,
            Math.random() * (width - w - CONFIG.padding * 2)
        );

        const y = Math.max(
            CONFIG.padding,
            Math.random() * (height - h - CONFIG.padding * 2)
        );

        btnNoRunner.style.left = `${x}px`;
        btnNoRunner.style.top = `${y}px`;
    };

    const accept = () => {
        const rect = btnYes.getBoundingClientRect();

        createExplosion(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            EXPLOSION_PARTS * 2
        );

        accepted = true;

        card.style.opacity = '0';
        btnNoRunner.style.opacity = '0';

        setTimeout(() => {
            card.style.display = 'none';
            btnNoRunner.style.display = 'none';
            success.classList.add('visible');
        }, CONFIG.timings.acceptHideDelay);
    };

    // ANIMATION

    const animate = (timestamp) => {
        ctx.clearRect(0, 0, width, height);

        if (
            card.style.display === 'block' &&
            !isNoButtonRunning
        ) {
            const rect = btnNoLayout.getBoundingClientRect();

            if (rect.width) {
                btnNoRunner.style.left = `${rect.left}px`;
                btnNoRunner.style.top = `${rect.top}px`;
            }
        }

        if (
            timestamp - lastTrailTime >
            CONFIG.timings.trailInterval
        ) {
            if (cursor.x > 0) {
                particles.push(
                    new Particle(cursor.x, cursor.y, 'trail')
                );
            }
            lastTrailTime = timestamp;
        }

        ctx.globalCompositeOperation = 'lighter';

        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.update();
            particle.draw();
            if (particle.life <= 0) {
                particles.splice(i, 1);
            }
        }

        ctx.globalCompositeOperation = 'source-over';

        if (particles.length > CONFIG.maxParticles) {
            particles.splice(0, particles.length - CONFIG.maxParticles);
        }

        if (
            accepted &&
            timestamp - lastFireworkTime > CONFIG.timings.fireworkInterval
        ) {
            createExplosion(
                Math.random() * width,
                Math.random() * height,
                EXPLOSION_PARTS
            );
            lastFireworkTime = timestamp;
        }
        
        requestAnimationFrame(animate);
    };

    // EVENTS

    const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        
        ctx.scale(dpr, dpr);
        
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    };

    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
    });

    document.addEventListener(
        'touchend',
        () => {
            cursor.x = -999;
            cursor.y = -999;
        },
        { passive: true }
    );

    document.addEventListener(
        'touchmove',
        (e) => {
            if (e.touches.length > 0) {
                cursor.x = e.touches[0].clientX;
                cursor.y = e.touches[0].clientY;
            }
        },
        { passive: true }
    );

    heart.addEventListener('click', showCard);

    const handleNoInteraction = (e) => {
        e.preventDefault();
        moveNoButton();
    };

    btnNoRunner.addEventListener('mouseenter', moveNoButton);
    btnNoRunner.addEventListener('touchstart', handleNoInteraction, { passive: false });

    btnYes.addEventListener('click', accept);

    // (It's chewsday) INIT

    resize();

    for (let i = 0; i < STAR_COUNT; i++) {
        particles.push(
            new Particle(
                Math.random() * width,
                Math.random() * height
            )
        );
    }

    requestAnimationFrame(animate);
});
