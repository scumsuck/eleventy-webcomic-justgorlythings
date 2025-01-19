---
permalink: feed.xml
eleventyExcludeFromCollections: true
layout: "layouts/feed.liquid"
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>{{ site.title }}</title>
  <subtitle>{{ site.summary }}</subtitle>
  <link href="{{ site.url }}/{{ permalink }}" rel="self"/>
  <link href="{{ site.url }}"/>
  <updated>{{ collections.comic | getNewestCollectionItemDate | dateToRfc3339 }}</updated>
  <id>{{ site.url }}/</id>
  <author>
    <name>{{ site.author }}</name>
    <email>{{ site.authorEmail }}</email>
  </author>
  {%- for post in collections.comic | reverse %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link>{{ site.url }}{{ post.url }}</link>
    <updated>{{ post.date | dateToRfc3339 }}</updated>
    <img src="{{ post.data.images[0] }}" width="100" alt="Thumbnail for {{ post.data.title }}"/>
    <content type="html">{{ post.content }}</content>
  </entry>
  {%- endfor %}
</feed>
