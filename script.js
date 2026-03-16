// =============================================
//  DR. MSS PORTFOLIO — SCRIPT (ROBUST FIX)
// =============================================

// Immediately make all reveal elements visible as fallback
// (will be overridden by animation if JS works fine)
function showAllContent() {
    document.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// Safety net: if page takes too long, force show everything
var safetyTimer = setTimeout(showAllContent, 2000);

document.addEventListener('DOMContentLoaded', function () {

    // ---- Navbar scroll ----
    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        });
    }

    // ---- Mobile menu ----
    var menuBtn = document.getElementById('menu-btn');
    var navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            menuBtn.classList.toggle('open');
        });
        navLinks.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
                menuBtn.classList.remove('open');
            });
        });
    }

    // ---- Typewriter ----
    var typewriterEl = document.getElementById('typewriter');
    var roles = [
        'Vice Principal',
        'Associate Professor',
        'Researcher',
        'Mentor & Educator'
    ];
    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function typeWriter() {
        if (!typewriterEl) return;
        var current = roles[roleIndex];
        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }
        var speed = isDeleting ? 45 : 90;
        if (!isDeleting && charIndex === current.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }
        setTimeout(typeWriter, speed);
    }
    setTimeout(typeWriter, 600);

    // ---- Reveal on scroll ----
    var revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function(entries, obs) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

        revealEls.forEach(function(el) { revealObserver.observe(el); });
    } else {
        // Fallback for no IntersectionObserver
        showAllContent();
    }

    // Trigger reveal for any elements already in viewport on load
    setTimeout(function() {
        revealEls.forEach(function(el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // ---- Stat counters ----
    var statCounters = document.querySelectorAll('.stat-counter');

    function runCounters() {
        statCounters.forEach(function(counter) {
            var target = parseInt(counter.getAttribute('data-target'), 10);
            var numEl = counter.querySelector('.stat-number');
            if (!numEl) return;
            var count = 0;
            var duration = 1800;
            var step = target / (duration / 16);
            function tick() {
                count += step;
                if (count < target) {
                    numEl.textContent = Math.ceil(count);
                    requestAnimationFrame(tick);
                } else {
                    numEl.textContent = target;
                }
            }
            tick();
        });
    }
    setTimeout(runCounters, 800);

    // Cancel safety timer since JS loaded fine
    clearTimeout(safetyTimer);

    // ---- Collapse: Experience ----
    var btnExp = document.getElementById('show-more-exp');
    var moreExp = document.getElementById('more-exp');
    if (btnExp && moreExp) {
        btnExp.addEventListener('click', function() {
            var isOpen = moreExp.style.display !== 'none';
            moreExp.style.display = isOpen ? 'none' : 'block';
            btnExp.classList.toggle('open', !isOpen);
            btnExp.querySelector('span').textContent = isOpen ? 'View Earlier Experience' : 'View Less';
        });
    }

    // ---- Collapse: Patents ----
    var btnPatents = document.getElementById('show-more-patents');
    var morePatents = document.getElementById('more-patents');
    if (btnPatents && morePatents) {
        btnPatents.addEventListener('click', function() {
            var isOpen = morePatents.style.display !== 'none';
            morePatents.style.display = isOpen ? 'none' : 'grid';
            btnPatents.classList.toggle('open', !isOpen);
            btnPatents.querySelector('span').textContent = isOpen ? 'View 4 More Patents' : 'View Less';
        });
    }

    // ---- Subtle parallax on hero name ----
    var heroName = document.querySelector('.hero-name');
    if (heroName) {
        document.addEventListener('mousemove', function(e) {
            var xRatio = (e.clientX / window.innerWidth - 0.5) * 6;
            var yRatio = (e.clientY / window.innerHeight - 0.5) * 4;
            heroName.style.transform = 'translate(' + xRatio + 'px, ' + yRatio + 'px)';
        });
    }

});

// ---- Contact form ----
function handleSubmit(e) {
    e.preventDefault();
    var btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#2D5A3F';
    btn.disabled = true;
    setTimeout(function() {
        btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        btn.style.background = '';
        btn.disabled = false;
        e.target.reset();
    }, 3000);
}
