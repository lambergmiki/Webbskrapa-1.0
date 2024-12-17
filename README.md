# The Promising Web Scraper

In this exercise, you will create a web scraper, i.e., an application that, to some extent, acts as a web browser.

The application will request pages from web servers, extract the links and write the URLs to the web sources to a JSON file. The user must pass the path to the JSON file as the first command-line argument and the URLs to scrape as additional command-line arguments. Only extracted links with absolute URLs that are interesting and relative can be ignored. The JSON file must not contain duplicate URLs that must be sorted in ascending order.

To avoid callback hell, you are obliged to use promises instead of callback functions.

## A little help to get started

A project has already started, and your task is to complete the Application class and add additional classes if you find it appropriate (which you should do).

All necessary boiler-plate files are there, `README.md`, `package.json`, `.gitignore`, and `src/app.js`, as well as more specific files and folders such as `src/application.js` and `data`.

You should not need to edit the `src/app.js` file, but read it and familiarize yourself with the code to understand how the `Application` class must be implemented for the code in the file to work.

 Node.js has a promises API for reading and writing files, [`readFile`](https://nodejs.org/dist/latest-v17.x/docs/api/fs.html#filehandlereadfileoptions) and [`writeFile`](https://nodejs.org/dist/latest-v17.x/docs/api/fs.html#filehandlewritefiledata-options).

## A few JavaScript hints

JavaScript has several features that can be useful. Some examples are:

- The [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) object contains methods for parsing and converting the values to JSON.
- The [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object is handy to collect unique values.
- The array method [flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) may be useful as well.
- Do not forget the [spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax). You can use it to expand arrays and Set objects.

## Dependencies

Although JavaScript and the Node API offer a lot, some external packages may come in handy. In the file `packages.json`, you will find a list of suggestions for dependencies, and packages required by your application during production.

Suggested dependencies have functionality for validating URLs (Why request something that is not formatted as a URL?), making promisefied HTTP requests, and parsing text into a DOM structure. By reading each package's documentation (search for the package at [npm](https://www.npmjs.com/) to find its' documentation), you can learn what they offer.

## Example use and output

Example of the command line to run the application.

```text
npm start ./data/links.json https://nodejs.org/en/ https://developer.mozilla.org/en-US/
```

The content of the file after the command. Web sources retrieved from [https://nodejs.org/en/](https://nodejs.org/en/) and [https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/). [25th October 2022]

(For the JSON data to be easy to read, make sure it's "prettified" before writing it to the file.)

```text
[
    "https://bylaws.openjsf.org/",
    "https://code-of-conduct.openjsf.org/",
    "https://discourse.mozilla.org/c/mdn/236",
    "https://foundation.mozilla.org/",
    "https://github.com/mdn/",
    "https://github.com/mdn/content",
    "https://github.com/mdn/content/pull/21764",
    "https://github.com/mdn/content/pull/21770",
    "https://github.com/mdn/content/pull/21772",
    "https://github.com/mdn/content/pull/21787",
    "https://github.com/mdn/content/pull/21791",
    "https://github.com/mdn/content/pull/21792",
    "https://github.com/mdn/content/pull/21793",
    "https://github.com/mdn/content/pull/21794",
    "https://github.com/mdn/content/pull/21795",
    "https://github.com/mdn/content/pull/21796",
    "https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security",
    "https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V16.md#16.18.0",
    "https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V19.md#19.0.0",
    "https://github.com/nodejs/nodejs.org/edit/main/locale/en/index.md",
    "https://github.com/nodejs/release#release-schedule",
    "https://hacks.mozilla.org/",
    "https://hacks.mozilla.org/?p=47805",
    "https://hacks.mozilla.org/?p=47913",
    "https://hacks.mozilla.org/?p=47919",
    "https://hacks.mozilla.org/category/mdn/",
    "https://nodejs.org/dist/latest-v16.x/docs/api/",
    "https://nodejs.org/dist/latest-v19.x/docs/api/",
    "https://nodejs.org/dist/v16.18.0/",
    "https://nodejs.org/dist/v19.0.0/",
    "https://nodejs.org/en/blog/announcements/v19-release-announce/",
    "https://openjsf.org/",
    "https://openjsf.org/certification",
    "https://privacy-policy.openjsf.org/",
    "https://support.mozilla.org/products/mdn-plus",
    "https://terms-of-use.openjsf.org/",
    "https://trademark-list.openjsf.org/",
    "https://trademark-policy.openjsf.org/",
    "https://twitter.com/mozdevnet",
    "https://wiki.mozilla.org/Matrix",
    "https://www.linuxfoundation.org/cookies",
    "https://www.mozilla.org/",
    "https://www.mozilla.org/about/governance/policies/participation/",
    "https://www.mozilla.org/about/legal/terms/mozilla",
    "https://www.mozilla.org/en-US/careers/listings/?team=Marketing",
    "https://www.mozilla.org/privacy/websites/",
    "https://www.mozilla.org/privacy/websites/#cookies"
]
```

## Hints

- [Web Scraping with JavaScript and NodeJS](https://www.scrapingbee.com/blog/web-scraping-javascript/)
- [Parsing HTML: A Guide to Select the Right Library](https://tomassetti.me/parsing-html/#nodejs)
