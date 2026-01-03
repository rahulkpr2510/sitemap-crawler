# Sitemap Crawler & Link Graph Engine

A production-grade sitemap crawler and link-graph indexing service that analyzes internal and external hyperlink relationships across the Edzy.ai website.

This system builds a directed link graph of the site and exposes APIs to inspect incoming links, outgoing links, and the most linked-to pages — similar to a simplified search-engine indexing pipeline.

## 🚀 Features

• Crawls all URLs from sitemap.xml
• Extracts and normalizes hyperlinks from each page
• Classifies internal vs external links
• Builds a persistent incoming/outgoing link graph
• Computes most linked-to pages (graph ranking)
• Deterministic, restart-safe crawling
• Hardened URL normalization & deduplication
• Fault-isolated graph rebuilding
• Bruno collections for instant API testing

## 🧱 Architecture

```
Sitemap → Crawl Engine → DOM Parser → Link Normalizer → Graph Builder → MongoDB → Query APIs
```

The service behaves like a mini search-engine indexer that stores a persistent directed graph of all pages.

## 🛠 Tech Stack

```
Node.js
Express
MongoDB (Mongoose)
Axios
Cheerio
```

## 📁 Project Structure

```
src/
├ config/ # Database configuration
├ controllers/ # API controllers
├ models/ # MongoDB schemas
├ routes/ # Express routes
├ services/ # Crawler, sitemap & graph logic
├ utils/ # URL normalization utilities
├ app.js
└ index.js
```

## ⚙️ Setup

1. Clone

```
git clone <your-repo-url>
cd edzy-sitemap-crawler
npm install
```

2. Configure environment

```
Create .env:

PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/edzyCrawler
```

### ▶️ Run

```
npm start
```

### Expected output:

```
MongoDB connected
Server running
```

## 🔌 API Endpoints

Endpoint Method Description

```
/api/crawl POST Crawl sitemap & build link graph
/api/outgoing POST Get all outgoing links of a page
/api/incoming POST Get all incoming links of a page
/api/top POST Get top N most linked-to pages
```

## 📊 Example Request

Get Incoming Links

```
POST /api/incoming
Content-Type: application/json

{
"url": "https://www.edzy.ai/"
}
```
