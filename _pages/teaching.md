---
layout: archive
title: "Teaching"
permalink: /teaching/
author_profile: true
---

{% if site.teaching.size > 0 %}
  {% for post in site.teaching reversed %}
    {% include archive-single.html %}
  {% endfor %}
{% else %}
  <p>Teaching experience coming soon.</p>
{% endif %}
