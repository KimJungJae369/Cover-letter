const quotes = [
    '"사용자 경험은 화면의 모양이 아니라, 흐름의 설계에서 시작됩니다."',
    '"좋은 인터페이스는 사용자가 멈추지 않고 다음 행동으로 자연스럽게 이어지게 합니다."',
    '"기초를 이해한 개발은 빠를 뿐 아니라 오래 유지됩니다."'
];

const quoteText = document.getElementById('quoteText');
const quoteButton = document.getElementById('quoteButton');
const currentYear = document.getElementById('currentYear');
const toTopButton = document.getElementById('toTopButton');
const sections = Array.from(document.querySelectorAll('.sect[id]'));
const navLinks = Array.from(document.querySelectorAll('.heads__links a'));
const revealItems = document.querySelectorAll('.reveal');

let quoteIndex = 0;

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (quoteButton && quoteText) {
    quoteButton.addEventListener('click', () => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteText.textContent = quotes[quoteIndex];
    });
}

if (toTopButton) {
    toTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    });
}

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealItems.forEach(item => revealObserver.observe(item));

const setActiveLink = () => {
    const marker = window.scrollY + window.innerHeight * 0.32;

    let activeId = sections[0]?.id;
    sections.forEach(section => {
        if (marker >= section.offsetTop) {
            activeId = section.id;
        }
    });

    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${activeId}`;
        link.classList.toggle('is-active', isActive);
    });

    if (toTopButton) {
        toTopButton.classList.toggle('is-visible', window.scrollY > 500);
    }
};

setActiveLink();
window.addEventListener('scroll', setActiveLink, { passive: true });