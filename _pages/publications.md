---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% if site.publications.size > 0 %}
  {% for post in site.publications reversed %}
    {% include archive-single.html %}
  {% endfor %}
{% else %}
  <p>Publications coming soon.</p>
{% endif %}
