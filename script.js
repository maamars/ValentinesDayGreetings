document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const introSection = document.getElementById('intro-section');
    const growthSection = document.getElementById('growth-section');
    const startBtn = document.getElementById('start-btn');
    const countdownEl = document.getElementById('countdown');
    const finalMessage = document.getElementById('final-message');
    const surpriseBtn = document.getElementById('surprise-btn');
    const revealMessage = document.getElementById('reveal-message');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = document.getElementById('music-icon');
    const bgDecorations = document.getElementById('bg-decorations');

    // 1. Intro Sequence
    const textLines = [
        document.getElementById('text-1'),
        document.getElementById('text-2'),
        document.getElementById('text-3')
    ];

    let currentLine = 0;
    function showIntroLines() {
        if (currentLine < textLines.length) {
            textLines[currentLine].classList.add('show');
            currentLine++;
            setTimeout(showIntroLines, 1500);
        } else {
            startBtn.classList.add('show');
        }
    }

    showIntroLines();

    // 2. Start Growth Process
    startBtn.addEventListener('click', () => {
        introSection.classList.add('hidden');
        growthSection.classList.remove('hidden');
        growthSection.classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
        startCountdown();
    });

    // 3. Countdown
    function startCountdown() {
        let count = 3;
        countdownEl.innerText = count;

        const timer = setInterval(() => {
            count--;
            if (count > 0) {
                countdownEl.innerText = count;
            } else {
                clearInterval(timer);
                countdownEl.innerText = "";
                growFlower();
            }
        }, 1000);
    }

    // 4. Bouquet v2 Growth Animation
    function growFlower() {
        const wrapper = document.getElementById('wrapper');
        const ribbonBack = document.getElementById('ribbon-back');
        const ribbonFront = document.getElementById('ribbon-front');
        const flowers = [
            { id: 'flower-blue', tx: 90, ty: 180 },
            { id: 'flower-pink', tx: 160, ty: 190 },
            { id: 'flower-yellow', tx: 220, ty: 170 },
            { id: 'lily-1', tx: 150, ty: 100 },
            { id: 'lily-2', tx: 100, ty: 120 },
            { id: 'lily-3', tx: 200, ty: 120 }
        ];
        const hbMsg = document.getElementById('handwritten-msg');

        // 1. Show Wrapper and Back Ribbon
        wrapper.classList.add('show');
        ribbonBack.classList.add('pop');

        // 2. Pop flowers one by one
        flowers.forEach((f, index) => {
            setTimeout(() => {
                const el = document.getElementById(f.id);
                el.style.transform = `translate(${f.tx}px, ${f.ty}px) scale(1)`;
                el.classList.add('pop');
                createSparkles(5);
            }, 500 + (index * 300));
        });

        // 3. Pop Bow at the end
        setTimeout(() => {
            ribbonFront.style.transform = `translate(150px, 320px) scale(1)`;
            ribbonFront.classList.add('pop');

            // Show handwritten message
            hbMsg.classList.remove('hidden');
            setTimeout(() => hbMsg.classList.add('show'), 100);

            // Show Final Messages
            setTimeout(() => {
                finalMessage.classList.remove('hidden');
                const fades = finalMessage.querySelectorAll('.fade-in');
                fades.forEach(f => f.classList.add('show'));
                surpriseBtn.classList.add('show');

                // Allow user to scroll to see the message
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1000);
        }, 500 + (flowers.length * 300) + 500);
    }

    // 5. Surprise Button
    surpriseBtn.addEventListener('click', (e) => {
        surpriseBtn.classList.add('hidden');
        revealMessage.classList.remove('hidden');
        revealMessage.classList.add('active');

        // Scroll to the surprise reveal
        setTimeout(() => {
            revealMessage.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        // Add a soft glowing pulse animation class to the reveal container
        revealMessage.style.animation = "glowPulse 2s infinite";

        // Confetti-like sparkles
        createSparkles(30);
    });

    // 6. Background Decorations (Hearts and Medical Icons)
    const icons = [
        // Heart
        '<svg class="floating-icon" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
        // Stethoscope
        '<svg class="floating-icon" viewBox="0 0 24 24"><path d="M12 2c-3.31 0-6 2.69-6 6v4h12V8c0-3.31-2.69-6-6-6zm4 8H8V8c0-2.21 1.79-4 4-4s4 1.79 4 4v2zm-4 4c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>',
        // Pill
        '<svg class="floating-icon" viewBox="0 0 24 24"><path d="M10 3L3 10c-1.33 1.33-1.33 3.5 0 4.83l6.17 6.17c1.33 1.33 3.5 1.33 4.83 0l7-7c1.33-1.33 1.33-3.5 0-4.83l-6.17-6.17c-1.33-1.33-3.5-1.33-4.83 0zM12 11h2v2h-2v-2zm-3 0h2v2H9v-2z"/></svg>',
        // Heartbeat line
        '<svg class="floating-icon" viewBox="0 0 24 24"><path d="M7 13.33L9.67 9l3 6 4-6L20 13.33" stroke-width="2" stroke="currentColor" fill="none"/></svg>'
    ];

    function createFloatingDecorations() {
        for (let i = 0; i < 15; i++) {
            const div = document.createElement('div');
            div.innerHTML = icons[Math.floor(Math.random() * icons.length)];
            const icon = div.firstChild;

            icon.style.left = Math.random() * 100 + 'vw';
            icon.style.top = Math.random() * 100 + 'vh';
            icon.style.fontSize = (Math.random() * 20 + 10) + 'px';
            icon.style.animationDelay = Math.random() * 5 + 's';
            icon.style.animationDuration = (Math.random() * 5 + 5) + 's';

            bgDecorations.appendChild(icon);
        }
    }

    createFloatingDecorations();

    // 7. Sparkles Effect
    function createSparkles(num) {
        const container = document.getElementById('flower-sparkles');
        for (let i = 0; i < num; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');

            const size = Math.random() * 6 + 2;
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';

            // Position around center of flower
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 20;
            sparkle.style.left = `calc(50% + ${Math.cos(angle) * distance}px)`;
            sparkle.style.top = `calc(40% + ${Math.sin(angle) * distance}px)`;

            sparkle.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
            sparkle.style.animationDelay = (Math.random() * 2) + 's';

            container.appendChild(sparkle);

            // Remove after animation
            setTimeout(() => sparkle.remove(), 3000);
        }
    }

    // 8. Music Handling
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Audio play blocked"));
            musicIcon.innerText = "🔊";
        } else {
            bgMusic.pause();
            musicIcon.innerText = "🔇";
        }
    });
});
