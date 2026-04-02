---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

<p class="lang-en">My academic publications and research papers.</p>
<p class="lang-zh" style="display:none;">我的学术发表与研究论文。</p>

{% if site.publications.size > 0 %}
  {% for post in site.publications reversed %}
    {% include archive-single.html %}
  {% endfor %}
{% else %}
  <div class="no-posts lang-en">Publications coming soon...</div>
  <div class="no-posts lang-zh" style="display:none;">论文即将发布...</div>
{% endif %}
