# ReBrowse Pro - AI-Powered Browser Extension

![ReBrowse Pro](https://img.shields.io/badge/ReBrowse_Pro-v2.0.0-6366f1?style=for-the-badge)
![Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**ReBrowse Pro** is a sophisticated, AI-driven browser extension for Chrome designed to enhance the web browsing experience. It empowers users to dynamically re-theme websites, analyze content, and improve readability through a rich set of features, all managed from a user-friendly popup interface. The core of its intelligent capabilities is powered by Google's Gemini AI.

---

## ✨ Features

The extension's functionality is divided into three main categories: Theming, AI Analysis, and Configuration.

### 🎨 Website Theming & Customization

*   **8 Preset Themes:** Instantly change the look and feel of any webpage with a single click.
    *   **Calm:** Soft pastels and serif fonts for relaxed reading.
    *   **Focus:** A clean, minimalist layout optimized for concentration.
    *   **Funky:** A vibrant, animated theme with playful fonts.
    *   **Hacker:** A classic terminal-style green-on-black theme.
    *   **Professional:** A modern, corporate-friendly design.
    *   **Dark Mode:** A standard dark theme for reduced eye strain.
    *   **Sepia:** Warm, sepia tones for comfortable, book-like reading.
    *   **Cyberpunk:** A futuristic, neon-on-dark aesthetic.
*   **Quick Actions:**
    *   **Toggle Dark Mode:** Applies a quick `invert` CSS filter for an instant dark mode effect.
    *   **Reading Mode:** Strips away non-essential elements (ads, sidebars, etc.) for a clean, focused reading experience.
*   **Font Size Control:** Dynamically adjust the font size on the page from 60% to 250%.
*   **Style Management:**
    *   **Reset:** A one-click button to remove all applied styles.
    *   **Import/Export:** Save your current style combination as a `.json` file and import it later, allowing for custom theme sharing.

### 🤖 AI-Powered Features (via Gemini)

*   **Auto-Detect Theme:** The AI analyzes the page's content and context to automatically apply the most appropriate theme.
*   **Summarize:** Generates a concise, 3-4 sentence summary of the webpage's main content.
*   **Key Points:** Extracts and lists the top 5 most important takeaways from the page.
*   **Recommend:** Suggests three related topics for further reading based on the current page.
*   **Translate:** Translates the page content into a user-selected language.
*   **Accessibility (A11y) Check:** Provides 3-5 actionable recommendations to improve the webpage's accessibility.

### ⚙️ Configuration & Utilities

*   **Secure API Key Management:** A dedicated section to securely save and test your Gemini API key.
*   **API Usage Statistics:** View a modal with stats on your API usage, including total calls and success rate.
*   **Clear Data:** A function to wipe all locally stored data (API key, preferences).
*   **Help & Onboarding:** A built-in help page to guide new users.

---

## 🛠️ Technical Overview

The extension is built using standard web technologies (HTML, CSS, JavaScript) and follows the Chrome Extension Manifest V3 specification.

*   **`manifest.json`**
    *   Defines the extension's core properties, permissions (`scripting`, `storage`, `tabs`, `contextMenus`), and icons.
    *   Registers the background service worker and the popup UI.
    *   Sets the Content Security Policy (CSP) and host permissions required for the Gemini API.

*   **`popup.html` / `popup.css` / `popup.js`**
    *   This is the heart of the user interface.
    *   `popup.html` provides the UI structure, and `popup.css` delivers the modern, responsive styling.
    *   `popup.js` is the main logic controller for the UI. It handles all user interactions, manages application state (using classes like `ApiManager`, `StatusManager`, and `ModalManager`), and communicates with the other scripts.

*   **`background.js`**
    *   The extension's service worker. Its primary role is to act as a secure intermediary for external API calls.
    *   It listens for messages from `popup.js`, constructs the API request with the user's prompt and API key, and uses the `fetch` API to communicate with the Gemini endpoint.
    *   Includes robust error handling and retry logic with exponential backoff for API calls.

*   **`content.js`**
    *   This script is injected into active web pages.
    *   Its sole responsibility is to manipulate the page's DOM by adding or removing `<style>` tags to apply themes and other visual changes requested by the user from the popup.

*   **`welcome.html`**
    *   A static HTML page that serves as a welcome and help guide for new users.

---

## 🚀 Deployment & Installation (for Development)

To run this extension on your local machine for development or testing, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/YourUsername/Rebrowse-Extension.git
    ```
    (Or simply download the project files into a folder).

2.  **Open Chrome Extensions:**
    *   Open Google Chrome and navigate to `chrome://extensions`.

3.  **Enable Developer Mode:**
    *   In the top-right corner of the Extensions page, toggle the "Developer mode" switch to **On**.

4.  **Load the Extension:**
    *   Click the **"Load unpacked"** button that appears.
    *   In the file selection dialog, navigate to and select the `Rebrowse-Extension` directory (the folder containing `manifest.json`).

5.  **Pin the Extension:**
    *   Click the puzzle piece icon (🧩) in the Chrome toolbar and pin **ReBrowse Pro** for easy access.

---

## 🔑 Usage

To use the AI-powered features, you must provide your own Google Gemini API key.

1.  **Get an API Key:**
    *   Visit Google AI Studio to generate a free API key.

2.  **Save the Key in the Extension:**
    *   Click the ReBrowse Pro icon in your toolbar to open the popup.
    *   Scroll down to the **"API Configuration"** section.
    *   Paste your API key into the input field and click **"Save"**.
    *   The extension will automatically test the connection and confirm if it's successful.

You are now ready to use all the features!

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.