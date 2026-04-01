---
layout: archive
title: "Talks"
permalink: /talks/
author_profile: true
---

{% if site.talks.size > 0 %}
  {% for post in site.talks reversed %}
    {% include archive-single.html %}
  {% endfor %}
{% else %}
  <p>Talks coming soon.</p>
{% endif %}
