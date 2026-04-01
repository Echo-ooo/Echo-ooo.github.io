---
layout: archive
title: "Blog"
permalink: /blog/
author_profile: true
---

{% if site.posts.size > 0 %}
  {% for post in site.posts %}
    {% include archive-single.html %}
  {% endfor %}
{% else %}
  <p>Blog posts coming soon.</p>
{% endif %}
