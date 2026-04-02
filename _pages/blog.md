---
layout: archive
title: "Blog"
permalink: /blog/
author_profile: true
---

<div class="blog-intro">
  <p class="lang-en">Technical notes and insights from my journey in autonomous driving and software engineering.</p>
  <p class="lang-zh">自动驾驶与软件工程之旅中的技术笔记与心得。</p>
</div>

<div class="category-nav">
  <a href="#perception" class="lang-en">Autonomous Driving Perception</a>
  <a href="#perception" class="lang-zh">自动驾驶感知</a>
  <a href="#hpc" class="lang-en">High-Performance Computing</a>
  <a href="#hpc" class="lang-zh">高性能计算</a>
  <a href="#programming" class="lang-en">Programming Languages</a>
  <a href="#programming" class="lang-zh">程序语言</a>
  <a href="#misc" class="lang-en">Miscellaneous</a>
  <a href="#misc" class="lang-zh">杂谈</a>
</div>

<!-- Perception Section -->
<div class="category-section" id="perception">
  <h2>
    <span class="lang-en">Autonomous Driving Perception</span>
    <span class="lang-zh">自动驾驶感知</span>
  </h2>
  <p class="category-desc lang-en">Deep dives into 3D detection, sensor fusion, BEV networks, and perception algorithms.</p>
  <p class="category-desc lang-zh">深入探讨3D检测、传感器融合、BEV网络及感知算法。</p>

  <div class="post-list">
    {% for post in site.posts %}
      {% if post.categories contains 'perception' %}
        {% if post.lang == 'en' %}
    <div class="post-item lang-en" data-slug="{{ post.slug }}">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <div class="post-meta">
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
        <span class="tag">perception</span>
      </div>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 150 }}</p>
    </div>
        {% elsif post.lang == 'zh' %}
    <div class="post-item lang-zh" data-slug="{{ post.slug }}">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <div class="post-meta">
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
        <span class="tag">perception</span>
      </div>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 150 }}</p>
    </div>
        {% endif %}
      {% endif %}
    {% endfor %}
    <div class="no-posts lang-en">Coming soon...</div>
    <div class="no-posts lang-zh">敬请期待...</div>
  </div>
</div>

<!-- HPC Section -->
<div class="category-section" id="hpc">
  <h2>
    <span class="lang-en">High-Performance Computing</span>
    <span class="lang-zh">高性能计算</span>
  </h2>
  <p class="category-desc lang-en">CUDA programming, TensorRT optimization, model quantization, and deployment techniques.</p>
  <p class="category-desc lang-zh">CUDA编程、TensorRT优化、模型量化与部署技术。</p>

  <div class="post-list">
    {% for post in site.posts %}
      {% if post.categories contains 'hpc' %}
        {% if post.lang == 'en' %}
    <div class="post-item lang-en" data-slug="{{ post.slug }}">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <div class="post-meta">
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
        <span class="tag">hpc</span>
      </div>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 150 }}</p>
    </div>
        {% elsif post.lang == 'zh' %}
    <div class="post-item lang-zh" data-slug="{{ post.slug }}">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <div class="post-meta">
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
        <span class="tag">hpc</span>
      </div>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 150 }}</p>
    </div>
        {% endif %}
      {% endif %}
    {% endfor %}
    <div class="no-posts lang-en">Coming soon...</div>
    <div class="no-posts lang-zh">敬请期待...</div>
  </div>
</div>

<!-- Programming Section -->
<div class="category-section" id="programming">
  <h2>
    <span class="lang-en">Programming Languages</span>
    <span class="lang-zh">程序语言</span>
  </h2>
  <p class="category-desc lang-en">C++, Python, Rust, and other language-specific tips and best practices.</p>
  <p class="category-desc lang-zh">C++、Python、Rust等语言技巧与最佳实践。</p>

  <div class="post-list">
    {% for post in site.posts %}
      {% if post.categories contains 'programming' %}
        {% if post.lang == 'en' %}
    <div class="post-item lang-en" data-slug="{{ post.slug }}">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <div class="post-meta">
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
        <span class="tag">programming</span>
      </div>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 150 }}</p>
    </div>
        {% elsif post.lang == 'zh' %}
    <div class="post-item lang-zh" data-slug="{{ post.slug }}">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <div class="post-meta">
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
        <span class="tag">programming</span>
      </div>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 150 }}</p>
    </div>
        {% endif %}
      {% endif %}
    {% endfor %}
    <div class="no-posts lang-en">Coming soon...</div>
    <div class="no-posts lang-zh">敬请期待...</div>
  </div>
</div>

<!-- Misc Section -->
<div class="category-section" id="misc">
  <h2>
    <span class="lang-en">Miscellaneous</span>
    <span class="lang-zh">杂谈</span>
  </h2>
  <p class="category-desc lang-en">Random thoughts, book notes, and everything else.</p>
  <p class="category-desc lang-zh">随想、读书笔记及其他。</p>

  <div class="post-list">
    {% for post in site.posts %}
      {% if post.categories contains 'misc' %}
        {% if post.lang == 'en' %}
    <div class="post-item lang-en" data-slug="{{ post.slug }}">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <div class="post-meta">
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
        <span class="tag">misc</span>
      </div>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 150 }}</p>
    </div>
        {% elsif post.lang == 'zh' %}
    <div class="post-item lang-zh" data-slug="{{ post.slug }}">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <div class="post-meta">
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
        <span class="tag">misc</span>
      </div>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 150 }}</p>
    </div>
        {% endif %}
      {% endif %}
    {% endfor %}
    <div class="no-posts lang-en">Coming soon...</div>
    <div class="no-posts lang-zh">敬请期待...</div>
  </div>
</div>
