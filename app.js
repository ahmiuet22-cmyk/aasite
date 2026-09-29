/**
 * AA SITE SOLUTIONS — ULTRA-PREMIUM INTERACTIVE JAVASCRIPT
 * Designed with Framer / Lovable quality UI, instant calculations & rich micro-interactions
 */

// ========================================================
// 1. CENTRALIZED BUSINESS CONFIGURATION (EASY TO UPDATE)
// ========================================================
const SITE_CONFIG = {
    companyName: "AA Site Solutions",
    location: "West Yorkshire, England, UK",
    tiktok: "https://www.tiktok.com/@aasitesolutionsuk",
    defaultPostcodes: ["LS", "BD", "WF", "HD", "HX"],
    contactPhone: "",
    contactEmail: "",
    whatsapp: ""
};

// ========================================================
// 2. DOM INITIALIZATION
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCursorGlow();
    initScrollObserver();
    initScrollHeaderAndProgress();
    initMobileNav();
    initHeroTilt();
    initBeforeAfterSlider();
    initCostEstimator();
    initProjectGallery();
    initNumberCounters();
    initQuoteForm();
    initSmoothAnchors();
});

// ========================================================
// 3. PRELOADER (INSTANT FAST LOADING)
// ========================================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.style.display = 'none', 300);
    });

    setTimeout(() => {
        if (!preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.style.display = 'none', 300);
        }
    }, 400);
}

// ========================================================
// 4. INTERACTIVE CURSOR GLOW ORB (BUTTERY LERP PHYSICS)
// ========================================================
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 1024) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(renderCursor);
        }
    }, { passive: true });

    function renderCursor() {
        // Smooth Linear Interpolation (Lerp)
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;

        glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

        if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
            requestAnimationFrame(renderCursor);
        } else {
            isMoving = false;
        }
    }
}

// ========================================================
// 5. SCROLL-TRIGGERED REVEAL ANIMATIONS (INTERSECTION OBSERVER)
// ========================================================
function initScrollObserver() {
    const reveals = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale');
    if (!reveals.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => revealObserver.observe(el));
}

// ========================================================
// 6. SCROLL HEADER, PROGRESS LINE & DOCK (PASSIVE & RAF OPTIMIZED)
// ========================================================
function initScrollHeaderAndProgress() {
    const siteHeader = document.getElementById('siteHeader');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const dockScrollTop = document.getElementById('dockScrollTop');
    const navItems = document.querySelectorAll('.desktop-menu .nav-item');
    const sections = document.querySelectorAll('section[id]');

    let ticking = false;

    function onScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${scrollPercent}%`;
        }

        if (siteHeader) {
            if (scrollTop > 40) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        }

        if (dockScrollTop) {
            if (scrollTop > 400) {
                dockScrollTop.classList.add('visible');
            } else {
                dockScrollTop.classList.remove('visible');
            }
        }

        // Active Section Link Highlighting
        let currentId = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 140;
            const height = sec.offsetHeight;
            if (scrollTop >= top && scrollTop < top + height) {
                currentId = sec.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentId}`) {
                item.classList.add('active');
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    if (dockScrollTop) {
        dockScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ========================================================
// 7. MOBILE DRAWER NAVIGATION
// ========================================================
function initMobileNav() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerClose = document.getElementById('drawerClose');
    const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-action-btn');

    function openNav() {
        if (!mobileDrawer) return;
        mobileDrawer.classList.add('open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        if (!mobileDrawer) return;
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openNav);
    if (drawerClose) drawerClose.addEventListener('click', closeNav);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeNav);

    drawerLinks.forEach(link => link.addEventListener('click', closeNav));
}

// ========================================================
// 8. 3D SMOOTH DAMPED HERO CARD TILT
// ========================================================
function initHeroTilt() {
    const card = document.getElementById('heroTiltCard');
    if (!card || window.innerWidth < 1024) return;

    let targetRotX = 0, targetRotY = 0;
    let currentRotX = 0, currentRotY = 0;
    let isHovering = false;
    let rafId = null;

    function renderTilt() {
        currentRotX += (targetRotX - currentRotX) * 0.12;
        currentRotY += (targetRotY - currentRotY) * 0.12;

        const scale = isHovering ? 1.02 : 1;
        card.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

        if (isHovering || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
            rafId = requestAnimationFrame(renderTilt);
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            rafId = null;
        }
    }

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetRotX = ((y - centerY) / centerY) * -6;
        targetRotY = ((x - centerX) / centerX) * 6;
        isHovering = true;

        if (!rafId) rafId = requestAnimationFrame(renderTilt);
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
        targetRotX = 0;
        targetRotY = 0;
        isHovering = false;
    });
}

// ========================================================
// 9. BUTTERY SMOOTH BEFORE / AFTER SLIDER (TOUCH + MOUSE POINTERS)
// ========================================================
function initBeforeAfterSlider() {
    const container = document.getElementById('baSliderContainer');
    const beforeLayer = document.getElementById('baBeforeLayer');
    const handle = document.getElementById('baDividerHandle');

    if (!container || !beforeLayer || !handle) return;

    let isDragging = false;
    let targetPercent = 50;
    let currentPercent = 50;
    let animFrame = null;

    function renderSlider() {
        currentPercent += (targetPercent - currentPercent) * 0.25;
        beforeLayer.style.clipPath = `polygon(0 0, ${currentPercent.toFixed(2)}% 0, ${currentPercent.toFixed(2)}% 100%, 0 100%)`;
        handle.style.left = `${currentPercent.toFixed(2)}%`;

        if (Math.abs(targetPercent - currentPercent) > 0.05) {
            animFrame = requestAnimationFrame(renderSlider);
        } else {
            animFrame = null;
        }
    }

    function setPosition(clientX) {
        const rect = container.getBoundingClientRect();
        let posX = clientX - rect.left;
        if (posX < 0) posX = 0;
        if (posX > rect.width) posX = rect.width;

        targetPercent = (posX / rect.width) * 100;
        if (!animFrame) {
            animFrame = requestAnimationFrame(renderSlider);
        }
    }

    container.addEventListener('pointerdown', (e) => {
        isDragging = true;
        container.setPointerCapture(e.pointerId);
        setPosition(e.clientX);
    });

    container.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        setPosition(e.clientX);
    }, { passive: true });

    const stopDrag = (e) => {
        if (isDragging && e.pointerId) {
            try { container.releasePointerCapture(e.pointerId); } catch(err){}
        }
        isDragging = false;
    };

    container.addEventListener('pointerup', stopDrag);
    container.addEventListener('pointercancel', stopDrag);
}

// ========================================================
// 10. REAL-TIME INSTANT COST ESTIMATOR (SMOOTH NUMBER ROLLER)
// ========================================================
function initCostEstimator() {
    const pillButtons = document.querySelectorAll('.calc-pill-btn');
    const scaleRange = document.getElementById('calcScaleRange');
    const scaleDisplay = document.getElementById('calcScaleDisplay');
    const priceDisplay = document.getElementById('calcPriceRange');
    const applyBtn = document.getElementById('applyEstimateToQuoteBtn');

    if (!scaleRange || !priceDisplay) return;

    let currentCategory = 'waste';
    let displayedMin = 60;
    let displayedMax = 110;
    let priceAnimRaf = null;

    const priceMatrix = {
        waste: {
            1: { text: "Small Load / Single Area", min: 60, max: 110, desc: "Quick trade waste / single item removal" },
            2: { text: "Medium Load (Half Van / Site Area)", min: 110, max: 190, desc: "Standard residential / trade waste clearance" },
            3: { text: "Large Load (Full Van / Multi-Area)", min: 190, max: 320, desc: "Heavy builders rubble, kitchen or bathroom rip-out" },
            4: { text: "Multi-Load / Commercial Site", min: 350, max: 680, desc: "Extensive site clearance & bulk commercial waste" }
        },
        building: {
            1: { text: "Small Repair / Minor Structural Work", min: 150, max: 300, desc: "Brick repair, patch alterations, minor joinery" },
            2: { text: "Medium Domestic Building Work", min: 350, max: 800, desc: "Wall modifications, doorway creation, ground prep" },
            3: { text: "Large Renovation & Structural Support", min: 800, max: 2200, desc: "Multi-room structural renovations & alterations" },
            4: { text: "Full Scale Contractor Site Works", min: 2500, max: 6500, desc: "Extensive building developments & contract works" }
        },
        garden: {
            1: { text: "Small Patio / Pathway De-Weeding", min: 50, max: 95, desc: "Thermal eco-friendly propane weed treatment" },
            2: { text: "Standard Garden Clearance & Weeding", min: 95, max: 180, desc: "Lawn care, hedge trimming & weed treatment" },
            3: { text: "Large Grounds Clean-Up & Green Waste", min: 180, max: 340, desc: "Overgrown garden clearance & green waste hauling" },
            4: { text: "Commercial Grounds & Estate Care", min: 380, max: 750, desc: "Ongoing outdoor site management & clearance" }
        },
        contracts: {
            1: { text: "Short-Term Trade Supervision", min: 200, max: 450, desc: "Site trade management per day / milestone" },
            2: { text: "Medium Phase Coordination", min: 500, max: 1200, desc: "Multi-trade alignment & logistics oversight" },
            3: { text: "Sub-Contractor Project Management", min: 1200, max: 3000, desc: "Full renovation management & compliance control" },
            4: { text: "Full Commercial Contract Management", min: 3500, max: 8500, desc: "End-to-end site operations & delivery" }
        }
    };

    function updateCalculatedPrice() {
        const val = scaleRange.value;
        const config = priceMatrix[currentCategory][val];

        if (scaleDisplay) scaleDisplay.textContent = config.text;

        const targetMin = config.min;
        const targetMax = config.max;

        if (priceAnimRaf) cancelAnimationFrame(priceAnimRaf);

        function animatePrice() {
            displayedMin += (targetMin - displayedMin) * 0.25;
            displayedMax += (targetMax - displayedMax) * 0.25;

            priceDisplay.textContent = `${Math.round(displayedMin)} - ${Math.round(displayedMax)}`;

            if (Math.abs(targetMin - displayedMin) > 1 || Math.abs(targetMax - displayedMax) > 1) {
                priceAnimRaf = requestAnimationFrame(animatePrice);
            } else {
                displayedMin = targetMin;
                displayedMax = targetMax;
                priceDisplay.textContent = `${targetMin} - ${targetMax}`;
                priceAnimRaf = null;
            }
        }

        priceAnimRaf = requestAnimationFrame(animatePrice);
    }

    pillButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            pillButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-val');
            updateCalculatedPrice();
        });
    });

    scaleRange.addEventListener('input', updateCalculatedPrice);

    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const val = scaleRange.value;
            const config = priceMatrix[currentCategory][val];
            
            // Map category to select dropdown
            const serviceSelect = document.getElementById('fService');
            if (serviceSelect) {
                if (currentCategory === 'waste') serviceSelect.value = 'Waste Removal';
                else if (currentCategory === 'building') serviceSelect.value = 'Building Services';
                else if (currentCategory === 'garden') serviceSelect.value = 'Garden & Outdoor Maintenance';
                else if (currentCategory === 'contracts') serviceSelect.value = 'Contracts Management';
            }

            // Fill details
            const details = document.getElementById('fDetails');
            if (details) {
                details.value = `Instant Estimator Selected: ${config.text} (Estimated Range: £${config.min} - £${config.max}). Please contact me with availability.`;
            }

            // Smooth scroll to form
            const quoteSection = document.getElementById('quote-section');
            if (quoteSection) {
                quoteSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    const nameInput = document.getElementById('fName');
                    if (nameInput) nameInput.focus();
                }, 600);
            }
        });
    }
}

// ========================================================
// 11. PROJECT GALLERY & LIGHTBOX
// ========================================================
function initProjectGallery() {
    const filterBtns = document.querySelectorAll('.g-filter-btn');
    const projectCards = document.querySelectorAll('.g-card-wrap');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 30);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => card.style.display = 'none', 250);
                }
            });
        });
    });
}

window.showProjectDetails = function(title, category, location, desc) {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    document.getElementById('mTitle').textContent = title;
    document.getElementById('mCategory').textContent = category;
    document.getElementById('mLocation').textContent = location;
    document.getElementById('mDesc').textContent = desc;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};

// ========================================================
// 12. QUICK SERVICE SELECTION HELPER
// ========================================================
window.quickSelectService = function(serviceName) {
    const select = document.getElementById('fService');
    if (select) {
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
                select.selectedIndex = i;
                break;
            }
        }
    }
};

// ========================================================
// 13. STATS NUMBER COUNTER ANIMATION
// ========================================================
function initNumberCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const speed = 25;
                const inc = target / 30;

                const updateCount = () => {
                    count += inc;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, speed);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
                obs.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ========================================================
// 14. QUOTE FORM VALIDATION & SUBMISSION
// ========================================================
function initQuoteForm() {
    const form = document.getElementById('mainQuoteForm');
    const submitBtn = document.getElementById('fSubmitBtn');
    const successMsg = document.getElementById('fSuccessMsg');
    const dropzone = document.getElementById('fileUploadZone');
    const fileInput = document.getElementById('fFileInput');
    const previewWrap = document.getElementById('fileUploadPreview');

    if (!form) return;

    // Drag & Drop
    if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });

        dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                renderPreviews(fileInput.files);
            }
        });

        fileInput.addEventListener('change', () => renderPreviews(fileInput.files));
    }

    function renderPreviews(files) {
        if (!previewWrap) return;
        if (!files.length) {
            previewWrap.innerHTML = '';
            return;
        }
        previewWrap.innerHTML = Array.from(files).map(f => `<i class="fa-solid fa-paperclip"></i> ${f.name} (${(f.size/1024).toFixed(0)} KB)`).join('<br>');
    }

    // Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.querySelectorAll('.f-group').forEach(g => g.classList.remove('has-error'));
        if (successMsg) successMsg.classList.add('d-none');

        let valid = true;
        const name = document.getElementById('fName');
        const phone = document.getElementById('fPhone');
        const email = document.getElementById('fEmail');
        const postcode = document.getElementById('fPostcode');
        const service = document.getElementById('fService');
        const details = document.getElementById('fDetails');

        if (!name.value.trim()) { name.closest('.f-group').classList.add('has-error'); valid = false; }
        if (!phone.value.trim() || phone.value.trim().length < 7) { phone.closest('.f-group').classList.add('has-error'); valid = false; }
        
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailReg.test(email.value.trim())) { email.closest('.f-group').classList.add('has-error'); valid = false; }
        
        if (!postcode.value.trim()) { postcode.closest('.f-group').classList.add('has-error'); valid = false; }
        if (!service.value) { service.closest('.f-group').classList.add('has-error'); valid = false; }
        if (!details.value.trim()) { details.closest('.f-group').classList.add('has-error'); valid = false; }

        if (!valid) return;

        // Button state
        const lbl = submitBtn.querySelector('.btn-lbl');
        const spinner = submitBtn.querySelector('.btn-spinner');
        const icon = submitBtn.querySelector('.fa-paper-plane');

        if (lbl) lbl.textContent = "PROCESSING ENQUIRY...";
        if (spinner) spinner.classList.remove('d-none');
        if (icon) icon.classList.add('d-none');
        submitBtn.disabled = true;

        setTimeout(() => {
            if (lbl) lbl.textContent = "SUBMIT QUOTE ENQUIRY";
            if (spinner) spinner.classList.add('d-none');
            if (icon) icon.classList.remove('d-none');
            submitBtn.disabled = false;

            if (successMsg) {
                successMsg.innerHTML = `
                    <strong><i class="fa-solid fa-circle-check"></i> Thank You! Your enquiry has been received.</strong><br>
                    An AA Site Solutions specialist will review your details and contact you promptly with a formal quotation.
                `;
                successMsg.classList.remove('d-none');
            }

            form.reset();
            if (previewWrap) previewWrap.innerHTML = '';
        }, 1200);
    });
}

// ========================================================
// 15. SMOOTH IN-PAGE ANCHORS
// ========================================================
function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });
}
