/**
 * Shriya Mishra Portfolio - Main JavaScript
 * Vanilla JS (Zero dependencies, fast, modular)
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initial Page Loader
  const loader = document.getElementById('site-loader');
  const loaderProgress = document.getElementById('loader-progress-bar');
  const loaderText = document.getElementById('loader-percentage');

  if (loader && loaderProgress && loaderText) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        loaderProgress.style.width = '100%';
        loaderText.textContent = '100%';
        setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.pointerEvents = 'none';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }, 300);
      } else {
        loaderProgress.style.width = `${progress}%`;
        loaderText.textContent = `${progress}%`;
      }
    }, 80);
  }

  // 2. Scroll Progress Bar at Top
  const scrollProgressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      if (scrollProgressBar) {
        scrollProgressBar.style.width = `${progress}%`;
      }
    }
  }, { passive: true });

  // 3. Theme Toggle (Light mode by default, support dark mode switch)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');

  const getSavedTheme = () => {
    return localStorage.getItem('portfolio-theme') || 'light';
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      if (themeIconSun) themeIconSun.classList.remove('hidden');
      if (themeIconMoon) themeIconMoon.classList.add('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      if (themeIconSun) themeIconSun.classList.add('hidden');
      if (themeIconMoon) themeIconMoon.classList.remove('hidden');
    }
    localStorage.setItem('portfolio-theme', theme);
  };

  applyTheme(getSavedTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // 4. Hero Role Typing Effect
  const typingRoleEl = document.getElementById('typing-role');
  const roles = [
    'MERN Stack Developer',
    'React.js Engineer',
    'Frontend Specialist',
    'JavaScript Enthusiast'
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  const typeEffect = () => {
    if (!typingRoleEl) return;
    const currentRole = roles[roleIdx];

    if (!isDeleting) {
      typingRoleEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      setTimeout(typeEffect, 80);
    } else {
      typingRoleEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeEffect, 400);
        return;
      }
      setTimeout(typeEffect, 40);
    }
  };

  typeEffect();

  // 5. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (menuIconOpen) menuIconOpen.classList.add('hidden');
        if (menuIconClose) menuIconClose.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        if (menuIconOpen) menuIconOpen.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (menuIconOpen) menuIconOpen.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
      });
    });
  }

  // 6. Active Navbar Section Highlight on Scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 250;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-primary-600', 'dark:text-primary-400', 'font-semibold', 'bg-primary-50/80', 'dark:bg-primary-950/40');
            link.classList.remove('text-slate-600', 'dark:text-slate-300');
          } else {
            link.classList.remove('text-primary-600', 'dark:text-primary-400', 'font-semibold', 'bg-primary-50/80', 'dark:bg-primary-950/40');
            link.classList.add('text-slate-600', 'dark:text-slate-300');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // 7. Animated Count-Up Counters
  const counterElements = document.querySelectorAll('.stat-counter');
  let countersAnimated = false;

  const animateCounters = () => {
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      let current = 0;
      const duration = 1800;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = `${target}${suffix}`;
          clearInterval(timer);
        } else {
          counter.textContent = `${Math.floor(current)}${suffix}`;
        }
      }, stepTime);
    });
  };

  const statsSection = document.getElementById('stats-grid');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    }, { threshold: 0.25 });
    observer.observe(statsSection);
  }

  // 8. Skill Progress Bars & Interactive 3D Tilt Skill Cards
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillsSection = document.getElementById('skills');

  if (skillsSection && skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        skillBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width;
        });
      }
    }, { threshold: 0.2 });
    skillObserver.observe(skillsSection);
  }

  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const x = (relX / rect.width) - 0.5;
      const y = (relY / rect.height) - 0.5;

      card.style.setProperty('--mouse-x', `${relX}px`);
      card.style.setProperty('--mouse-y', `${relY}px`);
      card.style.transition = 'transform 0.08s ease-out, border-color 0.25s ease, box-shadow 0.25s ease';
      card.style.transform = `perspective(800px) translateY(-8px) rotateX(${(-y * 16).toFixed(2)}deg) rotateY(${(x * 16).toFixed(2)}deg) rotateZ(${(x * 5).toFixed(2)}deg) scale(1.04)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s ease, box-shadow 0.25s ease';
      card.style.transform = '';
    });
  });

  // 9. Timeline Scroll-Tracking Moving Circle
  const setupTimelineTracker = (containerId, circleId, fillLineId) => {
    const container = document.getElementById(containerId);
    const circle = document.getElementById(circleId);
    const fillLine = document.getElementById(fillLineId);

    if (!container || !circle) return;

    window.addEventListener('scroll', () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;

      // Calculate progress while container is in view
      const startOffset = windowHeight * 0.7;
      const currentScroll = startOffset - rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalHeight));

      const percentage = (progress * 96) + 2;
      circle.style.top = `${percentage}%`;
      if (fillLine) {
        fillLine.style.height = `${progress * 100}%`;
      }
    }, { passive: true });
  };

  setupTimelineTracker('experience-timeline', 'exp-scroll-circle', 'exp-fill-line');
  setupTimelineTracker('education-timeline', 'edu-scroll-circle', 'edu-fill-line');

  // 10. Reveal on Scroll Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 11. Contact Form Submission (Direct Email via FormSubmit to panditsimmi0@gmail.com)
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success-state');
  const sendAnotherBtn = document.getElementById('send-another-btn');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      let isValid = true;

      // Validation
      const clearError = (input) => {
        input.classList.remove('border-rose-400', 'bg-rose-50/30');
        const err = input.parentElement.querySelector('.form-error-msg');
        if (err) err.remove();
      };

      const showError = (input, msg) => {
        clearError(input);
        input.classList.add('border-rose-400', 'bg-rose-50/30');
        const err = document.createElement('p');
        err.className = 'form-error-msg text-xs text-rose-500 mt-1 font-medium';
        err.textContent = msg;
        input.parentElement.appendChild(err);
        isValid = false;
      };

      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name.');
      } else {
        clearError(nameInput);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email address.');
      } else if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address.');
      } else {
        clearError(emailInput);
      }

      if (!messageInput.value.trim()) {
        showError(messageInput, 'Please enter your message.');
      } else if (messageInput.value.trim().length < 5) {
        showError(messageInput, 'Message must be at least 5 characters.');
      } else {
        clearError(messageInput);
      }

      if (!isValid) return;

      // Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2"></div>
          <span>Sending Message...</span>
        `;
      }

      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        _subject: subjectInput.value.trim() || `New Portfolio Message from ${nameInput.value.trim()}`,
        message: messageInput.value.trim(),
        _replyto: emailInput.value.trim(),
        _template: 'table',
        _captcha: 'false'
      };

      const isFileProtocol = window.location.protocol === 'file:';
      const mailSubject = payload._subject;
      const mailBody = `Hello Shriya,\n\nName: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}\n\n---\nSent from Portfolio Contact Form`;
      const mailtoUrl = `mailto:panditsimmi0@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=panditsimmi0@gmail.com&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
      const whatsappMsg = `Hi Shriya, I'm ${payload.name} (${payload.email}). ${payload.message}`;
      const whatsappUrl = `https://wa.me/918052625007?text=${encodeURIComponent(whatsappMsg)}`;

      let apiDelivered = false;

      if (!isFileProtocol) {
        try {
          const res = await fetch('https://formsubmit.co/ajax/panditsimmi0@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          const result = await res.json();
          if (result && (result.success === 'true' || result.success === true)) {
            apiDelivered = true;
          }
        } catch (err) {
          console.warn('FormSubmit AJAX failed, activating direct email client:', err);
        }
      }

      // If running locally on file:/// or if API didn't deliver, trigger mail client
      if (isFileProtocol || !apiDelivered) {
        // Automatically open the user's default email composer
        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 150);
      }

      // Show success screen with instant 1-click delivery buttons
      if (contactForm && formSuccess) {
        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');

        const successName = document.getElementById('success-user-name');
        const successEmail = document.getElementById('success-user-email');
        const emailGmailBtn = document.getElementById('email-gmail-link');
        const emailAppBtn = document.getElementById('email-app-link');
        const emailWhatsAppBtn = document.getElementById('email-whatsapp-link');

        if (successName) successName.textContent = payload.name;
        if (successEmail) successEmail.textContent = payload.email;

        if (emailGmailBtn) {
          emailGmailBtn.href = gmailUrl;
        }
        if (emailAppBtn) {
          emailAppBtn.href = mailtoUrl;
        }
        if (emailWhatsAppBtn) {
          emailWhatsAppBtn.href = whatsappUrl;
        }
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Message</span>`;
      }
    });
  }

  if (sendAnotherBtn && contactForm && formSuccess) {
    sendAnotherBtn.addEventListener('click', () => {
      contactForm.reset();
      contactForm.classList.remove('hidden');
      formSuccess.classList.add('hidden');
    });
  }

  // 12. Copy to Clipboard Utility
  window.copyText = (text, btnElement) => {
    navigator.clipboard.writeText(text);
    const originalHTML = btnElement.innerHTML;
    btnElement.innerHTML = `
      <svg class="w-4 h-4 text-emerald-600 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    `;
    setTimeout(() => {
      btnElement.innerHTML = originalHTML;
    }, 2000);
  };

  // 13. Back to Top Smooth Scroll
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
