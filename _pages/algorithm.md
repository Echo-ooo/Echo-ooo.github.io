---
layout: default
title: "Algorithm"
permalink: /algorithm/
---

<div class="algorithm-index">
  <div class="page-header">
    <h1 class="lang-en">Algorithm Notes</h1>
    <h1 class="lang-zh">算法笔记</h1>
    <p class="lang-en">LeetCode problem solutions and algorithm analysis</p>
    <p class="lang-zh">力扣题解与算法分析</p>
  </div>

  <div class="algorithm-grid">
    {% for item in site.algorithm %}
    <a href="{{ item.url }}" class="algorithm-card">
      <div class="card-icon">{{ item.icon }}</div>
      <h3>
        <span class="lang-en">{{ item.title }}</span>
        <span class="lang-zh">{{ item.title_zh }}</span>
      </h3>
      <p class="card-desc">
        <span class="lang-en">{{ item.excerpt }}</span>
        <span class="lang-zh">{{ item.excerpt_zh }}</span>
      </p>
      <div class="card-tags">
        {% for tag in item.tags %}
        <span class="tag">{{ tag }}</span>
        {% endfor %}
      </div>
    </a>
    {% endfor %}
  </div>
</div>

<style>
.algorithm-index {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(232, 197, 71, 0.2);
}

.page-header h1 {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.algorithm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.algorithm-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(232, 197, 71, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: block;
}

.algorithm-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color);
  box-shadow: 0 8px 30px rgba(232, 197, 71, 0.15);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.algorithm-card h3 {
  color: var(--text-primary);
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  font-family: 'Playfair Display', serif;
}

.algorithm-card:hover h3 {
  color: var(--primary-color);
}

.card-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: rgba(100, 255, 218, 0.1);
  color: var(--accent-color);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .algorithm-grid {
    grid-template-columns: 1fr;
  }
}
</style>
