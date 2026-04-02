---
layout: archive
title: "Blog"
permalink: /blog/
author_profile: true
---

Technical notes and insights from my journey in autonomous driving and software engineering.

---

## Autonomous Driving Perception

Deep dives into 3D detection, sensor fusion, BEV networks, and perception algorithms.

{% assign perception_posts = site.posts | where_exp: "post", "post.categories contains 'perception'" %}
{% if perception_posts.size > 0 %}
  {% for post in perception_posts %}
    {% include archive-single.html %}
  {% endfor %}
{% else %}
  <p class="text-muted">Coming soon...</p>
{% endif %}

---

## High-Performance Computing

CUDA programming, TensorRT optimization, model quantization, and deployment techniques.

{% assign hpc_posts = site.posts | where_exp: "post", "post.categories contains 'hpc'" %}
{% if hpc_posts.size > 0 %}
  {% for post in hpc_posts %}
    {% include archive-single.html %}
  {% endfor %}
{% else %}
  <p class="text-muted">Coming soon...</p>
{% endif %}

---

## Programming Languages

C++, Python, Rust, and other language-specific tips and best practices.

{% assign lang_posts = site.posts | where_exp: "post", "post.categories contains 'programming'" %}
{% if lang_posts.size > 0 %}
  {% for post in lang_posts %}
    {% include archive-single.html %}
  {% endfor %}
{% else %}
  <p class="text-muted">Coming soon...</p>
{% endif %}

---

## Miscellaneous

Random thoughts, book notes, and everything else.

{% assign misc_posts = site.posts | where_exp: "post", "post.categories contains 'misc'" %}
{% if misc_posts.size > 0 %}
  {% for post in misc_posts %}
    {% include archive-single.html %}
  {% endfor %}
{% else %}
  <p class="text-muted">Coming soon...</p>
{% endif %}
