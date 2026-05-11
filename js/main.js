// ============== Plan Exercise Muscles Mapping ==============
const PLAN_EXERCISE_MUSCLES = {
    // 增肌计划 - Day 1: 胸部 + 三头
    "史密斯机平板卧推": "胸大肌中部",
    "上斜哑铃卧推": "胸大肌上部",
    "蝴蝶机夹胸": "胸大肌内侧",
    "绳索下压": "肱三头肌",
    "哑铃颈后臂屈伸": "肱三头肌长头",

    // 增肌计划 - Day 2: 背部 + 二头
    "引体向上": "背阔肌",
    "高位下拉": "背阔肌上部",
    "坐姿器械划船": "背阔肌、菱形肌",
    "绳索直臂下压": "背阔肌",
    "哑铃交替弯举": "肱二头肌",

    // 增肌计划 - Day 3: 腿部
    "杠铃深蹲": "股四头肌、臀大肌",
    "罗马尼亚硬拉": "腘绳肌、臀大肌",
    "腿举": "股四头肌",
    "腿弯举": "腘绳肌",
    "小腿提踵": "小腿三头肌",

    // 增肌计划 - Day 4: 肩部 + 手臂
    "坐姿哑铃推举": "三角肌前中束",
    "哑铃侧平举": "三角肌中束",
    "俯身哑铃飞鸟": "三角肌后束",
    "杠铃弯举": "肱二头肌",
    "碎颅者": "肱三头肌",

    // 减脂计划
    "哑铃卧推": "胸大肌",
    "哑铃划船": "背阔肌",
    "肩推": "三角肌",
    "深蹲": "股四头肌、臀大肌",
    "硬拉": "腘绳肌、臀大肌、背部",
    "弓步蹲": "股四头肌、臀大肌"
};

// ============== Exercise Grid Rendering ==============
const exerciseGrid = document.getElementById('exerciseGrid');
let currentGroup = 'chest';

function renderExercises(group) {
    currentGroup = group;
    const exercises = EXERCISES[group];
    exerciseGrid.innerHTML = '';

    exercises.forEach((ex, i) => {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.style.animationDelay = `${i * 0.08}s`;
        card.innerHTML = `
            <div class="ex-header">
                <div class="ex-difficulty ${ex.difficulty === '初级' ? 'beginner' : 'intermediate'}">${ex.difficulty}</div>
                <div class="ex-sets">${ex.sets}</div>
            </div>
            <h3 class="ex-name">${ex.name}</h3>
            <div class="ex-muscle">${ex.muscle}</div>
            <button class="ex-detail-btn" data-group="${group}" data-index="${i}">
                查看详情
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        `;
        exerciseGrid.appendChild(card);
    });
}

// Initial render
renderExercises('chest');

// Tab switching
document.querySelectorAll('.muscle-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.muscle-tab.active').classList.remove('active');
        tab.classList.add('active');
        renderExercises(tab.dataset.group);
    });
});

// ============== Exercise Modal ==============
const modal = document.getElementById('exerciseModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

exerciseGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.ex-detail-btn');
    if (!btn) return;

    const group = btn.dataset.group;
    const index = parseInt(btn.dataset.index);
    const ex = EXERCISES[group][index];

    modalContent.innerHTML = `
        <div class="modal-header">
            <div>
                <h2 class="modal-title">${ex.name}</h2>
                <div class="modal-meta">
                    <span class="modal-muscle">${ex.muscle}</span>
                    <span class="modal-sets">${ex.sets}</span>
                </div>
            </div>
        </div>
        ${ex.youtube ? `<div class="exercise-video-container"><iframe class="exercise-video" src="https://www.youtube.com/embed/${ex.youtube}" frameborder="0" allowfullscreen></iframe></div>` : ''}
        ${ex.targetMuscles ? `<div class="muscle-anatomy-container">${getMuscleAnatomySVG(ex.targetMuscles)}</div>` : ''}
        <div class="modal-body">
            <div class="modal-section">
                <h3>动作步骤</h3>
                <ol class="modal-steps">
                    ${ex.steps.map(s => `<li>${s}</li>`).join('')}
                </ol>
            </div>
            <div class="modal-section">
                <h3>注意事项</h3>
                <ul class="modal-tips">
                    ${ex.tips.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ============== FAQ Accordion ==============
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        // Toggle current
        if (!isActive) item.classList.add('active');
    });
});

// ============== Navigation ==============
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active nav on scroll
const sections = document.querySelectorAll('.section, .hero');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Nav background on scroll
function updateNavBg() {
    if (scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============== Scroll Animations ==============
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.section-header, .plan-card, .diet-card, .diet-timing, .faq-item');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            el.classList.add('visible');
        }
    });
}

// ============== Hero Parallax ==============
function handleHeroParallax() {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        const scrolled = scrollY;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - scrolled / 600;
    }
}

// ============== Consolidated Scroll Handler ==============
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateActiveNav();
            updateNavBg();
            handleScrollAnimations();
            handleHeroParallax();
            ticking = false;
        });
        ticking = true;
    }
});

// Initial calls
updateActiveNav();
updateNavBg();
handleScrollAnimations();

// ============== Inject Muscle Tags to Plan Exercises ==============
function injectMuscleTags() {
    document.querySelectorAll('.day-exercises li').forEach(li => {
        const html = li.innerHTML;
        // 提取动作名（从 HTML 中提取文本，取第一个词）
        const exerciseName = li.textContent.trim().split(' ')[0];

        // 查找肌肉信息
        let muscle = PLAN_EXERCISE_MUSCLES[exerciseName];

        // 特殊处理：引体向上 / 高位下拉
        if (!muscle && html.includes('引体向上 / 高位下拉')) {
            muscle = PLAN_EXERCISE_MUSCLES['引体向上'];
        }

        if (muscle) {
            // 在动作名后面、<small>标签前面添加肌肉信息
            li.innerHTML = html.replace(/^(.+?) (<small>)/, '$1 <span class="ex-muscle-tag">(' + muscle + ')</span> $2');
        }
    });
}

// 页面加载完成后注入肌肉标注
document.addEventListener('DOMContentLoaded', injectMuscleTags);
