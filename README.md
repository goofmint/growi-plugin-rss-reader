# GROIW Plugin RSS Reader

This is a GROWI plugin to read RSS feeds.

## Usage

### Simple

```markdown
[RSS](https://qiita.com/tags/growi/feed)
```

### Advanced

```markdown
::rss[https://qiita.com/tags/growi/feed]{apiKey=API_KEY count=2 order=pubDate}
```

You need to get the API Key from [RSS to JSON Converter online](https://rss2json.com/).

## Notice

You have to set the URL of the RSS feed to the `[RSS]` macro.

This plugin uses [RSS to JSON Converter online](https://rss2json.com/). So the plguin doesn't support local RSS feeds inside LAN network.

## License

MIT

