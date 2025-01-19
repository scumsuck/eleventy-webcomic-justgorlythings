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
    <link href="{{metadata.baseUrl}}{{ post.url}}"/>
    <updated>{{ post.date | dateToRfc3339 }}</updated>
    <id>{{metadata.baseUrl}}{{ post.url}}</id>
    <content type="html"><![CDATA[ <img src="{{ post.data.images[0] }}" width="100" alt="Thumbnail for {{ post.data.title }}"/> ]]>{{ post.content | xml_escape }}</content>
  </entry>
  {%- endfor %}
</feed>
