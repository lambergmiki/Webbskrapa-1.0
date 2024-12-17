import axios from 'axios' // default export, no need to specify import
import { JSDOM } from 'jsdom'
import fs from 'fs/promises'

/**
 * The application module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Miki Lamberg <ml227cr@student.lnu.se>
 * @version 1.1.1
 */

/**
 * Represents the web scraping application.
 */
export class Application {
  /**
   * Creates an instance of the Application class.
   *
   * @param {string} datasource - The path to the JSON file where the scraped URLs will be saved.
   * @param {string[]} urls - An array of URLs to scrape.
   */
  constructor (datasource, urls) {
    this.datasource = datasource
    this.urls = urls
  }

  /**
   * Fetches the HTML content of a given URL.
   *
   * @param {string} url - The URL of the page to fetch.
   * @returns {Promise<Document|null>} - A promise that resolves to the parsed HTML document or null if an error occurs.
   */
  async fetchPage (url) {
    try {
      const { data } = await axios.get(url)
      const dom = new JSDOM(data)
      return dom.window.document // Return the Document object
    } catch (error) {
      console.error(`Failed to fetch page: ${url}`)
      console.error(error.message)
      return null
    }
  }

  /**
   * Extracts valid links from the given HTML content.
   *
   * @param {Document} document - The parsed HTML document.
   * @returns {string[]} - An array of valid URLs.
   */
  extractLinks (document) {
    if (!document) {
      console.error('Invalid document object. Skipping link extraction.')
      return []
    }

    const links = []
    const aElements = document.querySelectorAll('a') // Select all anchor tags
    aElements.forEach(a => {
      const href = a.href // Get the href attribute of the anchor
      if (href && this.isValidURL(href)) {
        links.push(href)
      }
    })

    return links
  }

  /**
   * Checks if the given URL is valid.
   *
   * @param {string} url - The URL to validate.
   * @returns {boolean} - True if the URL is valid, otherwise false.
   */
  isValidURL (url) {
    try {
      // When creating a new URL object, it is given a hostname property with its domain name.
      // const url1 = new URL('https://example.com')
      // console.log(url1.hostname); // Output: 'example.com'
      const parsedURL = new URL(url)
      return parsedURL.hostname !== '' // Ensure it's an absolute URL
    } catch (error) {
      return false
    }
  }

  /**
   * Reads and parses a JSON file from the given path.
   *
   * @param {string} path - The path to the JSON file.
   * @returns {Promise<object[]>} - A promise that resolves to the parsed JSON data.
   */
  async readJSONFile (path) {
    try {
      const data = await fs.readFile(path, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      return [] // Return empty array so program is always iterable, ensuring the program can always run.
    }
  }

  /**
   * Writes the collected links to the JSON file.
   *
   * @param {string} path - The path to the JSON file.
   * @param {object} data - The data to write to the JSON file.
   */
  async writeJSONFile (path, data) {
    try {
      // stringify-args in order: object/array to convert, default behavior for stringification, number of spaces for indentation.
      await fs.writeFile(path, JSON.stringify(data, null, 2)) // Prettified.
    } catch (error) {
      console.error(`Failed to write file: ${path}`)
    }
  }

  /**
   * Runs the web scraping process.
   * Fetches pages, extracts links, and writes them to the JSON file.
   */
  async run () {
    const allLinks = new Set()
    try {
      for (const url of this.urls) {
        console.log(`Fetching: ${url}`)
        const document = await this.fetchPage(url) // Fetch and parse the HTML
        if (document) {
          console.log(`Extracting links from: ${url}`)
          const links = this.extractLinks(document) // Pass the document to extract links
          links.forEach(link => allLinks.add(link))
        }
      }

      const sortedLinks = Array.from(allLinks).sort()
      await this.writeJSONFile(this.datasource, sortedLinks)

      console.log(`Scraping completed. Links saved to '${this.datasource}'.`)
    } catch (error) {
      console.error('An error occurred during the scraping process:', error.message)
    }
  }
}
