---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: true
---

{% if site.portfolio.size > 0 %}
  {% for post in site.portfolio %}
    {% include archive-single.html %}
  {% endfor %}
{% else %}
  <p>Portfolio projects coming soon.</p>
{% endif %}
