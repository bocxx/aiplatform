---
title: <% tp.file.title %>
description: A brief description of the article.
slug: <% tp.user.slugify(tp.file.title) %>
pubDate: <% tp.date.now('YYYY-MM-DD') %>
lastModified: <% tp.date.now('YYYY-MM-DD') %>
heroImage: /path/to/image.jpg
category: <% await tp.user.selectCategory() %>
tags:
  - example
  - tutorial
draft: false
featured: false
trending: false
---

# <% tp.file.title %>

## Introduction

Write your introduction here.

## Main Content

Write the main content of your article here.

## Conclusion

Summarize your article here.
