---
permalink: feed.xml
eleventyExcludeFromCollections: true
layout: "layouts/feed.liquid"
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>{{ metadata.title }}</title>
  <subtitle>{{ metadata.summary }}</subtitle>
  <link href="{{metadata.baseUrl}}/{{ permalink }}" rel="self"/>
  <link href="{{metadata.baseUrl}}"/>
  <updated>{{ collections.comic | getNewestCollectionItemDate | dateToRfc3339 }}</updated>
  <id>{{metadata.baseUrl}}/</id>
  <author>
    <name>{{ metadata.author }}</name>
    <email>{{ metadata.authorEmail }}</email>
  </author>
  {%- for post in collections.comic | reverse %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link>{{metadata.baseUrl}}{{ post.url}}</link>
    <updated>{{ post.date | dateToRfc3339 }}</updated>
    <img src="{{ post.data.images[0] }}" width="100" alt="Thumbnail for {{ post.data.title }}"/>
    <content type="html">{{ post.content }}</content>
  </entry>
  {%- endfor %}
</feed>
