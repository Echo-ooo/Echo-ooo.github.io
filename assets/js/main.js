// ============================================
// ETHAN'S SITE - Global JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // LANGUAGE SWITCHER (Global)
  // ============================================
  const langBtns = document.querySelectorAll('.lang-btn');
  const LANG_KEY = 'ethan-site-lang';

  function switchLanguage(lang) {
    // Update button states
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Toggle all language-specific content
    document.querySelectorAll('.lang-en').forEach(el => {
      el.style.display = lang === 'en' ? '' : 'none';
    });
    document.querySelectorAll('.lang-zh').forEach(el => {
      el.style.display = lang === 'zh' ? '' : 'none';
    });

    // Handle blog post lists with translations
    document.querySelectorAll('.post-list').forEach(list => {
      const enPosts = list.querySelectorAll('.post-item.lang-en');
      const zhPosts = list.querySelectorAll('.post-item.lang-zh');

      // Remove existing placeholders
      list.querySelectorAll('.no-translation').forEach(el => el.remove());

      // Collect slugs
      const enSlugs = new Set(Array.from(enPosts).map(p => p.dataset.slug).filter(Boolean));
      const zhSlugs = new Set(Array.from(zhPosts).map(p => p.dataset.slug).filter(Boolean));

      if (lang === 'zh') {
        // Show placeholders for posts without Chinese translation
        enPosts.forEach(post => {
          const slug = post.dataset.slug;
          if (slug && !zhSlugs.has(slug)) {
            const title = post.querySelector('h3 a')?.textContent || 'Article';
            const placeholder = document.createElement('div');
            placeholder.className = 'post-item no-translation';
            placeholder.innerHTML = `
              <h3>${title}</h3>
              <p class="post-excerpt text-muted">中文版即将推出...</p>
            `;
            list.appendChild(placeholder);
          }
        });
      } else {
        // Show placeholders for posts without English translation
        zhPosts.forEach(post => {
          const slug = post.dataset.slug;
          if (slug && !enSlugs.has(slug)) {
            const title = post.querySelector('h3 a')?.textContent || 'Article';
            const placeholder = document.createElement('div');
            placeholder.className = 'post-item no-translation';
            placeholder.innerHTML = `
              <h3>${title}</h3>
              <p class="post-excerpt text-muted">English version coming soon...</p>
            `;
            list.appendChild(placeholder);
          }
        });
      }

      // Show "coming soon" if category is empty
      const visiblePosts = list.querySelectorAll(`.post-item.lang-${lang}:not([style*="display: none"])`);
      const placeholders = list.querySelectorAll('.no-translation');
      if (visiblePosts.length === 0 && placeholders.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'no-posts no-translation';
        emptyMsg.textContent = lang === 'en' ? 'Coming soon...' : '敬请期待...';
        list.appendChild(emptyMsg);
      }
    });

    // Save preference
    localStorage.setItem(LANG_KEY, lang);

    // Dispatch custom event for other components
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  // Bind click events
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
  });

  // Initialize with saved preference or default
  const savedLang = localStorage.getItem(LANG_KEY) || 'en';
  switchLanguage(savedLang);


  // ============================================
  // MOBILE NAVIGATION
  // ============================================
  const navToggle = document.querySelector('.nav-toggle');
  const navCenter = document.querySelector('.nav-center');

  if (navToggle && navCenter) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navCenter.classList.toggle('active');
    });

    // Close menu when clicking a link
    navCenter.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navCenter.classList.remove('active');
      });
    });
  }


  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });


  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header?.offsetHeight || 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ============================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.post-item, .category-section').forEach(el => {
    observer.observe(el);
  });

});
