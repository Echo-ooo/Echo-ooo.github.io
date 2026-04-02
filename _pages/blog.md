---
layout: archive
title: "Blog"
permalink: /blog/
author_profile: true
---

<div class="lang-switch">
  <button class="lang-btn active" data-lang="en">EN</button>
  <button class="lang-btn" data-lang="zh">中文</button>
</div>

<p class="lang-en">Technical notes and insights from my journey in autonomous driving and software engineering.</p>
<p class="lang-zh" style="display:none;">自动驾驶与软件工程之旅中的技术笔记与心得。</p>

<div class="category-nav">
  <a href="#perception" class="lang-en">Autonomous Driving Perception</a>
  <a href="#perception" class="lang-zh" style="display:none;">自动驾驶感知</a>
  <a href="#hpc" class="lang-en">High-Performance Computing</a>
  <a href="#hpc" class="lang-zh" style="display:none;">高性能计算</a>
  <a href="#programming" class="lang-en">Programming Languages</a>
  <a href="#programming" class="lang-zh" style="display:none;">程序语言</a>
  <a href="#misc" class="lang-en">Miscellaneous</a>
  <a href="#misc" class="lang-zh" style="display:none;">杂谈</a>
</div>

---

<h2 id="perception">
  <span class="lang-en">Autonomous Driving Perception</span>
  <span class="lang-zh" style="display:none;">自动驾驶感知</span>
</h2>

<p class="lang-en">Deep dives into 3D detection, sensor fusion, BEV networks, and perception algorithms.</p>
<p class="lang-zh" style="display:none;">深入探讨3D检测、传感器融合、BEV网络及感知算法。</p>

<div class="post-list" data-category="perception">
  {% assign en_posts = site.posts | where: "lang", "en" | where_exp: "post", "post.categories contains 'perception'" %}
  {% assign zh_posts = site.posts | where: "lang", "zh" | where_exp: "post", "post.categories contains 'perception'" %}

  {% for post in en_posts %}
  <div class="post-item lang-en" data-slug="{{ post.slug }}">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
  </div>
  {% endfor %}

  {% for post in zh_posts %}
  <div class="post-item lang-zh" style="display:none;" data-slug="{{ post.slug }}">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
  </div>
  {% endfor %}

  {% if en_posts.size == 0 and zh_posts.size == 0 %}
  <p class="text-muted lang-en">Coming soon...</p>
  <p class="text-muted lang-zh" style="display:none;">敬请期待...</p>
  {% endif %}
</div>

---

<h2 id="hpc">
  <span class="lang-en">High-Performance Computing</span>
  <span class="lang-zh" style="display:none;">高性能计算</span>
</h2>

<p class="lang-en">CUDA programming, TensorRT optimization, model quantization, and deployment techniques.</p>
<p class="lang-zh" style="display:none;">CUDA编程、TensorRT优化、模型量化与部署技术。</p>

<div class="post-list" data-category="hpc">
  {% assign en_posts = site.posts | where: "lang", "en" | where_exp: "post", "post.categories contains 'hpc'" %}
  {% assign zh_posts = site.posts | where: "lang", "zh" | where_exp: "post", "post.categories contains 'hpc'" %}

  {% for post in en_posts %}
  <div class="post-item lang-en" data-slug="{{ post.slug }}">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
  </div>
  {% endfor %}

  {% for post in zh_posts %}
  <div class="post-item lang-zh" style="display:none;" data-slug="{{ post.slug }}">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
  </div>
  {% endfor %}

  {% if en_posts.size == 0 and zh_posts.size == 0 %}
  <p class="text-muted lang-en">Coming soon...</p>
  <p class="text-muted lang-zh" style="display:none;">敬请期待...</p>
  {% endif %}
</div>

---

<h2 id="programming">
  <span class="lang-en">Programming Languages</span>
  <span class="lang-zh" style="display:none;">程序语言</span>
</h2>

<p class="lang-en">C++, Python, Rust, and other language-specific tips and best practices.</p>
<p class="lang-zh" style="display:none;">C++、Python、Rust等语言技巧与最佳实践。</p>

<div class="post-list" data-category="programming">
  {% assign en_posts = site.posts | where: "lang", "en" | where_exp: "post", "post.categories contains 'programming'" %}
  {% assign zh_posts = site.posts | where: "lang", "zh" | where_exp: "post", "post.categories contains 'programming'" %}

  {% for post in en_posts %}
  <div class="post-item lang-en" data-slug="{{ post.slug }}">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
  </div>
  {% endfor %}

  {% for post in zh_posts %}
  <div class="post-item lang-zh" style="display:none;" data-slug="{{ post.slug }}">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
  </div>
  {% endfor %}

  {% if en_posts.size == 0 and zh_posts.size == 0 %}
  <p class="text-muted lang-en">Coming soon...</p>
  <p class="text-muted lang-zh" style="display:none;">敬请期待...</p>
  {% endif %}
</div>

---

<h2 id="misc">
  <span class="lang-en">Miscellaneous</span>
  <span class="lang-zh" style="display:none;">杂谈</span>
</h2>

<p class="lang-en">Random thoughts, book notes, and everything else.</p>
<p class="lang-zh" style="display:none;">随想、读书笔记及其他。</p>

<div class="post-list" data-category="misc">
  {% assign en_posts = site.posts | where: "lang", "en" | where_exp: "post", "post.categories contains 'misc'" %}
  {% assign zh_posts = site.posts | where: "lang", "zh" | where_exp: "post", "post.categories contains 'misc'" %}

  {% for post in en_posts %}
  <div class="post-item lang-en" data-slug="{{ post.slug }}">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
  </div>
  {% endfor %}

  {% for post in zh_posts %}
  <div class="post-item lang-zh" style="display:none;" data-slug="{{ post.slug }}">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
    <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
  </div>
  {% endfor %}

  {% if en_posts.size == 0 and zh_posts.size == 0 %}
  <p class="text-muted lang-en">Coming soon...</p>
  <p class="text-muted lang-zh" style="display:none;">敬请期待...</p>
  {% endif %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const langBtns = document.querySelectorAll('.lang-btn');

  function switchLang(lang) {
    // Update button states
    langBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');

    // Toggle static content
    document.querySelectorAll('.lang-en').forEach(el => {
      el.style.display = lang === 'en' ? '' : 'none';
    });
    document.querySelectorAll('.lang-zh').forEach(el => {
      el.style.display = lang === 'zh' ? '' : 'none';
    });

    // Handle posts with missing translations
    document.querySelectorAll('.post-list').forEach(list => {
      const enPosts = list.querySelectorAll('.post-item.lang-en');
      const zhPosts = list.querySelectorAll('.post-item.lang-zh');

      // Remove existing "coming soon" messages for posts
      list.querySelectorAll('.no-translation').forEach(el => el.remove());

      if (lang === 'zh') {
        // Check each English post for Chinese translation
        enPosts.forEach(enPost => {
          const slug = enPost.dataset.slug;
          const hasZh = Array.from(zhPosts).some(p => p.dataset.slug === slug);
          if (!hasZh && slug) {
            // Show placeholder for missing Chinese translation
            const placeholder = document.createElement('div');
            placeholder.className = 'post-item no-translation';
            placeholder.innerHTML = `<p class="text-muted">「${enPost.querySelector('h3').textContent}」中文版即将推出...</p>`;
            list.appendChild(placeholder);
          }
        });
      } else {
        // Check each Chinese post for English translation
        zhPosts.forEach(zhPost => {
          const slug = zhPost.dataset.slug;
          const hasEn = Array.from(enPosts).some(p => p.dataset.slug === slug);
          if (!hasEn && slug) {
            // Show placeholder for missing English translation
            const placeholder = document.createElement('div');
            placeholder.className = 'post-item no-translation';
            placeholder.innerHTML = `<p class="text-muted">"${zhPost.querySelector('h3').textContent}" English version coming soon...</p>`;
            list.appendChild(placeholder);
          }
        });
      }

      // Show "coming soon" if no posts at all in this category for selected language
      const visiblePosts = list.querySelectorAll(`.post-item.lang-${lang}`);
      const noTranslation = list.querySelectorAll('.no-translation');
      if (visiblePosts.length === 0 && noTranslation.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'text-muted no-translation';
        emptyMsg.textContent = lang === 'en' ? 'Coming soon...' : '敬请期待...';
        list.appendChild(emptyMsg);
      }
    });

    localStorage.setItem('preferred-lang', lang);
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      switchLang(this.dataset.lang);
    });
  });

  // Initialize with saved preference or default to English
  const savedLang = localStorage.getItem('preferred-lang') || 'en';
  switchLang(savedLang);
});
</script>
