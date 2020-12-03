---
layout: basic
---

# Digital Publishing Prototype Kit

## Overview

- The Prototype Kit uses the [ONS Website Pattern Library](http://onsdigital.github.io/ons-pattern-library-starter) styles as its base
- It also includes [TailwindCSS](https://tailwindcss.com/) for rapid styling

## [Prototypes](prototypes)

<ul class="padding-left--0">
{%- for proto in collections.index -%}
<li class="margin--0 padding-left--0">
	<h3 class="margin--0 padding--0">
		<a href="{{ proto.url }}">{% if proto.data.title %}{{ proto.data.title }}{% else %}{{ proto.url }}{% endif %}</a></h3>{% if proto.data.description %}<p class="padding-top--0 margin-top--0 padding-bottom--0 margin-bottom--0">{{proto.data.description}}</p>{% endif %}
	</li>
{%- endfor -%}
</ul>
