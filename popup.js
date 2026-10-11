// Enhanced popup.js with improved API handling and new features

// Enhanced style injection functions
function applyStyle(style, id = "rebrowse-mood") {
  // Remove only existing theme styles to prevent conflicts with other styles (e.g., font size)
  const existingThemeStyles = document.querySelectorAll('style[id^="rebrowse-theme-"]');
  existingThemeStyles.forEach(style => style.remove());
  
  // Apply new style
  const styleElement = document.createElement("style");
  styleElement.id = id;
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
  
  // Store applied theme
  document.documentElement.setAttribute('data-rebrowse-theme', id);
}

function resetStyles() {
  // Remove ALL rebrowse styles
  const stylesToRemove = document.querySelectorAll('style[id^="rebrowse"]');
  stylesToRemove.forEach(element => element.remove());
  document.documentElement.removeAttribute('data-rebrowse-theme');
  
  // Clear any stored state
  if (window.rebrowseState) {
    window.rebrowseState = {};
  }
}

// Enhanced theme definitions with new themes
const themes = {
  calm: {
    name: 'Calm',
    description: 'Soft pastels and serif fonts for relaxed reading',
    css: `
      * { transition: all 0.3s ease !important; }
      body { 
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important; 
        color: #2c3e50 !important; 
        font-family: 'Georgia', 'Times New Roman', serif !important; 
        line-height: 1.8 !important;
      } 
      a { 
        color: #3498db !important; 
        text-decoration: none !important;
        border-bottom: 1px dotted #3498db !important;
      }
      a:hover { 
        color: #2980b9 !important; 
        border-bottom-style: solid !important;
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #34495e !important; 
        font-weight: 300 !important;
        margin: 1em 0 0.5em 0 !important;
      }
      p { margin: 1em 0 !important; }
      img { border-radius: 8px !important; box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important; }
    `
  },
  focus: {
    name: 'Focus',
    description: 'Clean layout optimized for reading and concentration',
    css: `
      body { 
        background: #ffffff !important; 
        color: #333333 !important; 
        font-family: 'Helvetica Neue', 'Arial', sans-serif !important; 
        font-size: 18px !important; 
        line-height: 1.6 !important;
        max-width: 800px !important;
        margin: 0 auto !important;
        padding: 2rem !important;
      }
      * { max-width: 100% !important; }
      a { color: #0066cc !important; }
      h1, h2, h3 { color: #222 !important; margin: 2em 0 1em 0 !important; }
      p { margin: 1.5em 0 !important; }
      img, video { display: none !important; }
      nav, aside, .sidebar, .ads, .advertisement, .banner { display: none !important; }
      main, article, .content { display: block !important; }
    `
  },
  funky: {
    name: 'Funky',
    description: 'Vibrant colors and playful animations',
    css: `
      body { 
        background: linear-gradient(45deg, #ff2e63, #08d9d6, #ff9a3c, #ffde7d) !important;
        background-size: 400% 400% !important;
        animation: gradientShift 8s ease infinite !important;
        color: #252a34 !important; 
        font-family: 'Comic Sans MS', cursive !important;
      }
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      h1, h2, h3 { 
        text-shadow: 3px 3px #ffde7d !important; 
        color: #fff !important;
        animation: bounce 2s infinite !important;
      }
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }
      a { 
        color: #ff2e63 !important; 
        text-decoration: none !important;
        font-weight: bold !important;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3) !important;
      }
      a:hover { 
        transform: scale(1.1) rotate(5deg) !important; 
        transition: 0.3s ease-in-out !important;
        text-shadow: 2px 2px #08d9d6 !important;
      }
    `
  },
  hacker: {
    name: 'Hacker',
    description: 'Terminal-style green on black theme',
    css: `
      body { 
        background-color: #000000 !important; 
        color: #00ff00 !important; 
        font-family: 'Courier New', 'Monaco', monospace !important;
        text-shadow: 0 0 5px #00ff00 !important;
        position: relative !important;
      }
      body::before {
        content: '';
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 0, 0.03) 2px,
          rgba(0, 255, 0, 0.03) 4px
        ) !important;
        pointer-events: none !important;
        z-index: 1000 !important;
      }
      a { 
        color: #00ff00 !important; 
        text-decoration: none !important;
        border: 1px solid #00ff00 !important;
        padding: 2px 4px !important;
      }
      a:hover { 
        background: #00ff00 !important; 
        color: #000000 !important;
        box-shadow: 0 0 10px #00ff00 !important;
      }
      h1, h2, h3 { 
        color: #00ff00 !important;
        text-transform: uppercase !important;
        letter-spacing: 2px !important;
      }
      ::selection { background: #00ff00 !important; color: #000000 !important; }
    `
  },
  professional: {
    name: 'Professional',
    description: 'Corporate-friendly design with modern typography',
    css: `
      body { 
        background: #f8fafc !important; 
        color: #1e293b !important; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        line-height: 1.7 !important;
        font-size: 16px !important;
      }
      a { 
        color: #3b82f6 !important; 
        text-decoration: none !important;
        border-bottom: 1px solid transparent !important;
        transition: all 0.2s ease !important;
      }
      a:hover { 
        color: #1d4ed8 !important; 
        border-bottom-color: #1d4ed8 !important;
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #0f172a !important; 
        font-weight: 600 !important;
        margin: 1.5em 0 0.5em 0 !important;
      }
      p { margin: 1.2em 0 !important; }
      blockquote {
        border-left: 4px solid #3b82f6 !important;
        padding-left: 1rem !important;
        margin: 1.5em 0 !important;
        background: #f1f5f9 !important;
        border-radius: 0 4px 4px 0 !important;
      }
      code {
        background: #f1f5f9 !important;
        padding: 0.2em 0.4em !important;
        border-radius: 3px !important;
        font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace !important;
      }
    `
  },
  dark: {
    name: 'Dark Mode',
    description: 'Easy on the eyes dark theme',
    css: `
      body { 
        background: #0f0f0f !important; 
        color: #e5e5e5 !important; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      }
      a { 
        color: #60a5fa !important; 
        text-decoration: none !important;
      }
      a:hover { 
        color: #93c5fd !important; 
        text-decoration: underline !important;
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #ffffff !important; 
        font-weight: 600 !important;
      }
      input, textarea, select {
        background: #1f1f1f !important;
        color: #e5e5e5 !important;
        border: 1px solid #333 !important;
      }
      pre, code {
        background: #1a1a1a !important;
        color: #e5e5e5 !important;
        border: 1px solid #333 !important;
      }
    `
  },
  // New theme additions
  sepia: {
    name: 'Sepia',
    description: 'Warm sepia tones for comfortable reading',
    css: `
      body { 
        background: #f4f1e8 !important; 
        color: #5c4b37 !important; 
        font-family: 'Times New Roman', serif !important;
        line-height: 1.7 !important;
      }
      a { color: #8b4513 !important; }
      h1, h2, h3, h4, h5, h6 { color: #3e2723 !important; }
      img { filter: sepia(30%) !important; }
    `
  },
  cyberpunk: {
    name: 'Cyberpunk',
    description: 'Neon colors and futuristic styling',
    css: `
      body { 
        background: linear-gradient(45deg, #0a0a0a, #1a0033, #000a1a) !important;
        color: #ff00ff !important; 
        font-family: 'Courier New', monospace !important;
        text-shadow: 0 0 5px #ff00ff !important;
      }
      a { 
        color: #00ffff !important; 
        text-shadow: 0 0 5px #00ffff !important;
      }
      h1, h2, h3 { 
        color: #ffff00 !important; 
        text-shadow: 0 0 10px #ffff00 !important;
        text-transform: uppercase !important;
      }
    `
  }
};

// Enhanced quick actions
const quickActions = {
  darkMode: {
    css: `
      html { filter: invert(1) hue-rotate(180deg) !important; }
      img, video, iframe, svg, canvas, embed, object { filter: invert(1) hue-rotate(180deg) !important; }
    `,
    isToggleable: true,
    stateKey: 'darkModeActive'
  },
  readingMode: {
    css: `
      body { 
        max-width: 800px !important; 
        margin: 0 auto !important; 
        padding: 2rem !important;
        background: #fffef7 !important;
        color: #2a2a2a !important;
        font-family: Georgia, serif !important;
        font-size: 18px !important;
        line-height: 1.8 !important;
      }
      nav, aside, .sidebar, .ads, header, footer, .advertisement, .banner, .popup, .modal { display: none !important; }
      img { max-width: 100% !important; height: auto !important; margin: 1em 0 !important; }
      main, article, .content, .post { display: block !important; }
      * { max-width: 100% !important; }
    `,
    isToggleable: true,
    stateKey: 'readingModeActive'
  }
};

// Enhanced status management with better UX
class StatusManager {
  static show(message, type = 'info', duration = 3000) {
    const statusEl = document.getElementById('status');
    if (!statusEl) return;

    // Clear existing classes
    statusEl.className = '';
    statusEl.classList.add(`status-${type}`);
    
    // Add appropriate icons and styling
    const icons = {
      'info': '🔄',
      'success': '✅',
      'error': '❌',
      'warning': '⚠️'
    };
    
    const icon = icons[type] || '💡';
    
    // Add loading spinner for processing states
    if (type === 'info' && message.toLowerCase().includes('processing')) {
      statusEl.innerHTML = `<div class="loading-spinner"></div><span>${message}</span>`;
    } else {
      statusEl.innerHTML = `<span class="status-icon">${icon}</span><span>${message}</span>`;
    }
    
    // Auto-clear after duration (except for errors)
    if (type !== 'error' && duration > 0) {
      setTimeout(() => {
        statusEl.textContent = '';
        statusEl.className = '';
      }, duration);
    }
  }

  static clear() {
    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.innerHTML = '';
      statusEl.className = '';
    }
  }
}

// Enhanced modal system with better accessibility
class ModalManager {
  static show(title, content, type = 'info') {
    this.hide(); // Remove any existing modal

    const modal = document.createElement('div');
    modal.id = 'rebrowse-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');
    
    modal.innerHTML = `
      <div class="modal-backdrop" role="presentation"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="modal-title">${this.getIconForType(type)} ${title}</h2>
          <button id="closeModal" aria-label="Close modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-text">${this.formatContent(content, type)}</div>
          ${type === 'translate' ? '<button id="copyTranslation" class="btn secondary">Copy Translation</button>' : ''}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Focus management
    const closeBtn = document.getElementById('closeModal');
    closeBtn.focus();

    // Event listeners
    closeBtn.addEventListener('click', () => this.hide());
    modal.querySelector('.modal-backdrop').addEventListener('click', () => this.hide());
    
    // Copy functionality for translations
    const copyBtn = document.getElementById('copyTranslation');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(content).then(() => {
          StatusManager.show('Translation copied to clipboard!', 'success');
        });
      });
    }
    
    // Escape key handler
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        this.hide();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  static hide() {
    const modal = document.getElementById('rebrowse-modal');
    if (modal) {
      modal.remove();
      // Return focus to the button that opened the modal (if possible)
      const lastFocusedElement = document.activeElement;
      if (lastFocusedElement && lastFocusedElement.blur) {
        lastFocusedElement.blur();
      }
    }
  }

  static getIconForType(type) {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      error: '❌',
      warning: '⚠️',
      summary: '📝',
      highlight: '✨',
      recommend: '🔗',
      translate: '🌐',
      accessibility: '♿',
      autoDetect: '🧠'
    };
    return icons[type] || 'ℹ️';
  }

  static formatContent(content, type) {
    if (type === 'highlight') {
      // Format key points as a list
      const lines = content.split('\n').filter(line => line.trim());
      if (lines.length > 1) {
        return '<ul>' + lines.map(line => `<li>${line.replace(/^\d+\.\s*/, '')}</li>`).join('') + '</ul>';
      }
    }
    
    if (type === 'recommend') {
      // Format recommendations nicely
      const lines = content.split('\n').filter(line => line.trim());
      if (lines.length > 1) {
        return '<ol>' + lines.map(line => `<li>${line.replace(/^\d+\.\s*/, '')}</li>`).join('') + '</ol>';
      }
    }
    
    return `<pre>${content}</pre>`;
  }
}

// Significantly improved API manager with better error handling
class ApiManager {
  static async callAI(feature, prompt, options = {}) {
    return new Promise((resolve, reject) => {
      // First check if we have an API key
      chrome.storage.local.get('geminiApiKey', (data) => {
        if (chrome.runtime.lastError) {
          reject(new Error('Failed to access storage: ' + chrome.runtime.lastError.message));
          return;
        }

        if (!data.geminiApiKey) {
          reject(new Error('Please save your Gemini API key first in the Configuration section'));
          return;
        }

        const enhancedPrompt = this.enhancePrompt(feature, prompt, options);
        
        // Send message to background script
        chrome.runtime.sendMessage({
          type: 'aiRequest',
          prompt: enhancedPrompt,
          apiKey: data.geminiApiKey
        }, (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error('Extension error: ' + chrome.runtime.lastError.message));
            return;
          }

          if (!response) {
            reject(new Error('No response from background script. Please try refreshing the extension.'));
            return;
          }

          if (response.error) {
            reject(new Error(response.error));
            return;
          }

          if (!response.result) {
            reject(new Error('Empty response from AI service'));
            return;
          }

          resolve(response);
        });
      });
    });
  }

  static enhancePrompt(feature, content, options = {}) {
    // Optimize token usage by truncating content intelligently
    const optimizedContent = this.optimizeContent(content);
    const pageContext = `
Webpage Content:
---
${optimizedContent}
---
`;
    
    const prompts = {
      autoDetect: `You are a UI/UX expert. Analyze the following webpage content and recommend ONE theme from this list: calm, focus, funky, hacker, professional, dark, sepia, cyberpunk.

Consider the content's topic (e.g., technical, artistic, news), purpose, and the likely user intent.

${pageContext}

Your response must be a single word: the name of the theme.`,

      summarize: `You are an expert summarizer. Create a concise, neutral, and informative summary of the following webpage content. The summary should be 3-4 sentences long and capture the main arguments and conclusions.

${pageContext}`,

      highlight: `You are a research assistant. Extract and list the top 5 most important key points, facts, or takeaways from the provided webpage content.

${pageContext}

Format your response as a numbered list (1., 2., 3., etc.). Each point should be a single, clear sentence.`,

      recommend: `You are a helpful discovery engine. Based on the following webpage content, suggest exactly 3 related topics, concepts, or articles for further exploration.

${pageContext}

Format your response as a numbered list. For each item, provide a title and a one-sentence explanation of why it's relevant.`,

      translate: `Translate the following text to ${options.targetLang}. Maintain the original meaning and tone. If you cannot translate to ${options.targetLang}, respond with "Translation to ${options.targetLang} is not available."

Text to translate:
---
${content}
---`,

      accessibility: `You are an accessibility (a11y) specialist. Analyze the provided webpage content and provide 3-5 specific, actionable recommendations to improve its accessibility for users with disabilities.

${pageContext}

Focus on practical improvements related to readability, semantics (like heading structure), and content clarity. Do not suggest code changes. Format as a numbered list.`
    };

    return prompts[feature] || `Analyze the following content: ${optimizedContent}`;
  }

  static optimizeContent(content) {
    if (!content || typeof content !== 'string') {
      return 'No content available';
    }

    // Remove extra whitespace and normalize
    let cleaned = content.replace(/\s+/g, ' ').trim();
    
    // Remove common non-content elements
    cleaned = cleaned.replace(/\b(cookie|privacy policy|terms|subscribe|newsletter|advertisement)\b/gi, '');
    
    // Prioritize meaningful content over navigation/footer text
    if (cleaned.length > 4000) {
      // Take first 2500 chars and last 1000 chars to capture intro and conclusion
      const firstPart = cleaned.substring(0, 2500);
      const lastPart = cleaned.substring(cleaned.length - 1000);
      return firstPart + "\n\n[Content truncated...]\n\n" + lastPart;
    }
    
    return cleaned;
  }

  static async testConnection() {
    try {
      StatusManager.show('Testing API connection...', 'info');
      
      // Test with a simple prompt
      const response = await this.callAI('summarize', 'This is a test message to verify the Gemini API connection is working properly. Please respond with "API test successful" if you can read this.');
      
      if (response && response.result) {
        StatusManager.show('API connection successful!', 'success', 3000);
        return true;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      StatusManager.show(`API test failed: ${error.message}`, 'error', 0);
      return false;
    }
  }
}

// Enhanced application initialization
document.addEventListener('DOMContentLoaded', async () => {
  await initializeApp();
  setupEventListeners();
  loadUserPreferences();
  checkForUpdates();
});

async function initializeApp() {
  try {
    // Load saved API key with better error handling
    const data = await new Promise((resolve) => {
      chrome.storage.local.get(['geminiApiKey', 'apiUsageStats'], (result) => {
        if (chrome.runtime.lastError) {
          console.warn('Storage access error:', chrome.runtime.lastError);
          resolve({});
        } else {
          resolve(result);
        }
      });
    });

    const apiKeyInput = document.getElementById('apiKey');
    if (data.geminiApiKey) {
      // Show masked API key
      apiKeyInput.value = '••••••••••••••••••••••••••••••••••••' + data.geminiApiKey.slice(-4);
      apiKeyInput.setAttribute('data-has-key', 'true');
      StatusManager.show('API key loaded', 'success', 2000);
    } else {
      StatusManager.show('Please configure your API key', 'warning', 3000);
    }

    // Display usage stats if available
    if (data.apiUsageStats && data.apiUsageStats.totalCalls > 0) {
      console.log('API Usage:', data.apiUsageStats);
    }

  } catch (error) {
    console.error('Initialization error:', error);
    StatusManager.show('Initialization error occurred', 'error');
  }
}

async function checkForUpdates() {
  // Check if this is a new version
  const manifest = chrome.runtime.getManifest();
  const currentVersion = manifest.version;
  
  chrome.storage.local.get('lastVersion', (data) => {
    if (data.lastVersion !== currentVersion) {
      chrome.storage.local.set({ lastVersion: currentVersion });
      if (data.lastVersion) {
        StatusManager.show(`Updated to v${currentVersion}!`, 'success', 4000);
      }
    }
  });
}

function setupEventListeners() {
  // API Key management with improved validation
  document.getElementById('saveApiKey').addEventListener('click', handleSaveApiKey);
  document.getElementById('testApi').addEventListener('click', handleTestApi);
  document.getElementById('clearData').addEventListener('click', handleClearData);
  document.getElementById('getApiKey').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://makersuite.google.com/app/apikey' });
  });
  document.getElementById('viewStats').addEventListener('click', handleViewStats);
  document.getElementById('showHelp').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') });
  });

  // Theme buttons with enhanced feedback
  Object.keys(themes).forEach(themeId => {
    const btn = document.getElementById(themeId);
    if (btn) {
      btn.addEventListener('click', () => applyTheme(themeId));
      // Add tooltip with theme description
      btn.title = themes[themeId].description;
    }
  });

  // Reset button
  document.getElementById('reset').addEventListener('click', handleReset);

  // AI feature buttons with better error handling
  const aiFeatures = ['autoDetect', 'summarize', 'highlight', 'recommend', 'translate', 'accessibility'];
  aiFeatures.forEach(feature => {
    const btn = document.getElementById(feature);
    if (btn) {
      btn.addEventListener('click', () => handleAiFeature(feature));
      btn.setAttribute('data-feature', feature);
    }
  });

  // Quick action buttons
  document.getElementById('darkMode').addEventListener('click', () => applyQuickAction('darkMode'));
  document.getElementById('readingMode').addEventListener('click', () => applyQuickAction('readingMode'));
  document.getElementById('exportTheme').addEventListener('click', handleExportTheme);
  document.getElementById('importTheme').addEventListener('click', handleImportTheme);

  // Enhanced font size controls with additional buttons
  const fontSizeSlider = document.getElementById('fontSizeSlider');
  const fontSizeValue = document.getElementById('fontSizeValue');
  const resetFontSize = document.getElementById('resetFontSize');
  const decreaseFontSize = document.getElementById('decreaseFontSize');
  const increaseFontSize = document.getElementById('increaseFontSize');

  let fontSizeTimeout;
  fontSizeSlider.addEventListener('input', (e) => {
    const fontSize = e.target.value;
    fontSizeValue.textContent = fontSize + '%';
    
    // Debounce the application to avoid too many DOM updates
    clearTimeout(fontSizeTimeout);
    fontSizeTimeout = setTimeout(() => applyFontSize(fontSize), 100);
  });

  resetFontSize.addEventListener('click', () => {
    fontSizeSlider.value = 100;
    fontSizeValue.textContent = '100%';
    removeFontSizeStyle();
  });

  decreaseFontSize.addEventListener('click', () => {
    const currentValue = parseInt(fontSizeSlider.value);
    const newValue = Math.max(60, currentValue - 20);
    fontSizeSlider.value = newValue;
    fontSizeValue.textContent = newValue + '%';
    applyFontSize(newValue);
  });

  increaseFontSize.addEventListener('click', () => {
    const currentValue = parseInt(fontSizeSlider.value);
    const newValue = Math.min(250, currentValue + 20);
    fontSizeSlider.value = newValue;
    fontSizeValue.textContent = newValue + '%';
    applyFontSize(newValue);
  });

  // Import file handler
  document.getElementById('importFileInput').addEventListener('change', handleImportFile);

  // Keyboard shortcuts
  document.addEventListener('keydown', handlePopupKeyboardShortcuts);
}

function handlePopupKeyboardShortcuts(e) {
  // Escape to close modal
  if (e.key === 'Escape') {
    ModalManager.hide();
    const langModal = document.getElementById('language-selector-modal');
    if (langModal) {
      langModal.remove();
    }
  }

  // Ctrl/Cmd + T for test API (only when popup is open)
  if ((e.ctrlKey || e.metaKey) && e.key === 't') {
    e.preventDefault();
    handleTestApi();
  }
}

function applyFontSize(percentage) {
  const css = `
    * { 
      font-size: ${percentage}% !important; 
      line-height: 1.6 !important; 
    }
    input, button, select, textarea { 
      font-size: ${Math.max(80, percentage * 0.9)}% !important; 
    }
  `;

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) {
      StatusManager.show('Cannot access current tab', 'error');
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (css) => {
        // Remove existing font size style
        const existing = document.getElementById('rebrowse-font-size');
        if (existing) existing.remove();
        
        // Add new style
        const styleElement = document.createElement("style");
        styleElement.id = 'rebrowse-font-size';
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
      },
      args: [css]
    }).catch(error => {
      StatusManager.show('Failed to apply font size', 'error');
      console.error('Font size error:', error);
    });
  });
}

function removeFontSizeStyle() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) return;

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const existing = document.getElementById('rebrowse-font-size');
        if (existing) existing.remove();
      }
    }).catch(error => {
      console.error('Remove font size error:', error);
    });
  });
}

async function handleSaveApiKey() {
  const apiKeyInput = document.getElementById('apiKey');
  const apiKey = apiKeyInput.value.trim();
  
  if (!apiKey) {
    StatusManager.show('Please enter an API key', 'error');
    apiKeyInput.focus();
    return;
  }

  if (apiKey.startsWith('••••')) {
    StatusManager.show('API key already saved', 'info');
    return;
  }

  // Enhanced API key validation
  if (!apiKey.startsWith('AIza') || apiKey.length < 35) {
    StatusManager.show('Invalid API key format. Expected format: AIzaXXX...', 'error');
    apiKeyInput.focus();
    return;
  }

  try {
    StatusManager.show('Saving API key...', 'info');
    
    await new Promise((resolve, reject) => {
      chrome.storage.local.set({ geminiApiKey: apiKey }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      });
    });
    
    // Mask the API key in the input
    apiKeyInput.value = '••••••••••••••••••••••••••••••••••••' + apiKey.slice(-4);
    apiKeyInput.setAttribute('data-has-key', 'true');
    StatusManager.show('API key saved successfully!', 'success');
    
    // Auto-test the API key
    setTimeout(() => {
      handleTestApi();
    }, 1000);
    
  } catch (error) {
    StatusManager.show(`Failed to save API key: ${error.message}`, 'error');
  }
}

async function handleTestApi() {
  const testBtn = document.getElementById('testApi');
  const originalText = testBtn.textContent;
  
  try {
    testBtn.disabled = true;
    testBtn.innerHTML = '<div class="loading-spinner"></div> Testing...';
    
    const success = await ApiManager.testConnection();
    
    if (success) {
      // Update usage stats
      updateApiUsageDisplay();
    }
  } catch (error) {
    console.error('Test API error:', error);
  } finally {
    testBtn.disabled = false;
    testBtn.innerHTML = '<span class="btn-emoji">🧪</span> Test API';
  }
}

function updateApiUsageDisplay() {
  chrome.storage.local.get('apiUsageStats', (data) => {
    if (data.apiUsageStats && data.apiUsageStats.totalCalls > 0) {
      const stats = data.apiUsageStats;
      const successRate = Math.round((stats.successfulCalls / stats.totalCalls) * 100);
      console.log(`API Usage: ${stats.totalCalls} calls, ${successRate}% success rate`);
    }
  });
}

function handleClearData() {
  const confirmMessage = 'Are you sure you want to clear all saved data including API key, themes, and preferences?';
  
  if (confirm(confirmMessage)) {
    chrome.storage.local.clear(() => {
      if (chrome.runtime.lastError) {
        StatusManager.show('Failed to clear data', 'error');
      } else {
        document.getElementById('apiKey').value = '';
        document.getElementById('apiKey').removeAttribute('data-has-key');
        clearActiveTheme();
        StatusManager.show('All data cleared successfully', 'success');
      }
    });
  }
}

function applyTheme(themeId) {
  const theme = themes[themeId];
  if (!theme) {
    StatusManager.show('Theme not found', 'error');
    return;
  }

  StatusManager.show(`Applying ${theme.name} theme...`, 'info', 1500);
  
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) {
      StatusManager.show('Cannot access current tab', 'error');
      return;
    }

    // Listen for theme application from background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'applyTheme' && message.themeId) {
        applyTheme(message.themeId);
        sendResponse({success: true});
      }
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: applyStyle,
      args: [theme.css, `rebrowse-theme-${themeId}`]
    }).then(() => {
      updateActiveTheme(themeId);
      StatusManager.show(`${theme.name} theme applied!`, 'success', 2000);
      
      // Save last used theme
      chrome.storage.local.set({ lastUsedTheme: themeId });
    }).catch(error => {
      StatusManager.show('Failed to apply theme. Try refreshing the page.', 'error');
      console.error('Theme application error:', error);
    });
  });
}

function applyQuickAction(actionId) {
  const action = quickActions[actionId];
  if (!action) {
    StatusManager.show('Quick action not found', 'error');
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) {
      StatusManager.show('Cannot access current tab', 'error');
      return;
    }

    if (action.isToggleable) {
      // Check current state
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (stateKey) => {
          if (!window.rebrowseState) window.rebrowseState = {};
          return window.rebrowseState[stateKey] || false;
        },
        args: [action.stateKey]
      }).then(([result]) => {
        const isActive = result?.result || false;
        
        if (isActive) {
          // Remove the specific quick action
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (actionId, stateKey) => {
              const element = document.getElementById(`rebrowse-quick-${actionId}`);
              if (element) element.remove();
              if (!window.rebrowseState) window.rebrowseState = {};
              window.rebrowseState[stateKey] = false;
            },
            args: [actionId, action.stateKey]
          });
          StatusManager.show(`${actionId} disabled`, 'success', 1500);
          updateQuickActionButton(actionId, false);
        } else {
          // Apply the quick action
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (css, actionId, stateKey) => {
              // Remove existing quick action of same type
              const existing = document.getElementById(`rebrowse-quick-${actionId}`);
              if (existing) existing.remove();
              
              // Add new style
              const styleElement = document.createElement("style");
              styleElement.id = `rebrowse-quick-${actionId}`;
              styleElement.textContent = css;
              document.head.appendChild(styleElement);
              
              // Update state
              if (!window.rebrowseState) window.rebrowseState = {};
              window.rebrowseState[stateKey] = true;
            },
            args: [action.css, actionId, action.stateKey]
          });
          StatusManager.show(`${actionId} enabled`, 'success', 1500);
          updateQuickActionButton(actionId, true);
        }
      }).catch(error => {
        StatusManager.show('Failed to toggle quick action', 'error');
        console.error('Quick action error:', error);
      });
    }
  });
}

function updateQuickActionButton(actionId, isActive) {
  const btn = document.getElementById(actionId);
  if (btn) {
    if (isActive) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }
}

function handleReset() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) {
      StatusManager.show('Cannot access current tab', 'error');
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: resetStyles
    }).then(() => {
      clearActiveTheme();
      StatusManager.show('All styles reset successfully', 'success', 2000);
    }).catch(error => {
      StatusManager.show('Failed to reset styles', 'error');
      console.error('Reset error:', error);
    });
  });
}

async function handleAiFeature(feature) {
  const featureBtn = document.getElementById(feature);
  const originalContent = featureBtn.innerHTML;
  
  try {
    // Disable button during processing
    featureBtn.disabled = true;
    featureBtn.innerHTML = '<div class="loading-spinner"></div> Processing...';

    // Special handling for translate feature
    if (feature === 'translate') {
      const targetLang = await showLanguageSelector();
      if (!targetLang) {
        return; // User cancelled
      }
      
      StatusManager.show(`Translating to ${targetLang}...`, 'info');
      await processAiFeature(feature, { targetLang });
    } else {
      StatusManager.show(`Processing ${feature}...`, 'info');
      await processAiFeature(feature);
    }
  } catch (error) {
    StatusManager.show(`${error.message}`, 'error', 0);
  } finally {
    featureBtn.disabled = false;
    featureBtn.innerHTML = originalContent;
  }
}

async function processAiFeature(feature, options = {}) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      throw new Error('Cannot access current tab');
    }

    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // Enhanced content extraction
        let content = '';
        let title = document.title || '';
        
        // Try to get main content first
        const mainSelectors = [
          'main', 'article', '.content', '.post', '#content', 
          '.entry-content', '.post-content', '.article-content',
          '[role="main"]', '.main-content'
        ];
        
        for (const selector of mainSelectors) {
          const element = document.querySelector(selector);
          if (element && element.innerText && element.innerText.trim().length > 200) {
            content = element.innerText.trim();
            break;
          }
        }
        
        // Fallback to body content if main content not found
        if (!content) {
          content = document.body.innerText || document.body.textContent || '';
        }
        
        // Clean up content
        content = content.replace(/\n\s*\n/g, '\n').trim();
        
        return {
          content: content.slice(0, 6000), // Increased limit for better context
          title: title,
          url: window.location.href,
          domain: window.location.hostname
        };
      }
    });

    if (chrome.runtime.lastError) {
      throw new Error('Unable to access page content: ' + chrome.runtime.lastError.message);
    }

    const pageData = result.result;
    
    if (!pageData.content || pageData.content.trim().length < 50) {
      throw new Error('Insufficient content found on this page');
    }

    const response = await ApiManager.callAI(feature, pageData.content, options);

    if (feature === 'autoDetect') {
      const detectedTheme = response.result.toLowerCase().trim();
      const validThemes = Object.keys(themes);
      const matchedTheme = validThemes.find(theme => 
        detectedTheme.includes(theme) || theme === detectedTheme
      );
      
      if (matchedTheme) {
        applyTheme(matchedTheme);
        StatusManager.show(`AI detected and applied: ${themes[matchedTheme].name}`, 'success', 3000);
      } else {
        StatusManager.show(`AI suggested: ${response.result}`, 'info', 4000);
      }
    } else {
      ModalManager.show(
        feature.charAt(0).toUpperCase() + feature.slice(1),
        response.result,
        feature
      );
      StatusManager.clear();
    }

    // Update usage stats
    updateApiUsageStats(true);

  } catch (error) {
    updateApiUsageStats(false);
    throw error;
  }
}

function updateApiUsageStats(success) {
  chrome.storage.local.get('apiUsageStats', (data) => {
    const stats = data.apiUsageStats || {
      totalCalls: 0,
      successfulCalls: 0,
      failedCalls: 0,
      lastUsed: null
    };
    
    stats.totalCalls++;
    stats.lastUsed = new Date().toISOString();
    
    if (success) {
      stats.successfulCalls++;
    } else {
      stats.failedCalls++;
    }
    
    chrome.storage.local.set({ apiUsageStats: stats });
  });
}

function showLanguageSelector() {
  return new Promise((resolve) => {
    const languages = [
      'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
      'Chinese (Simplified)', 'Chinese (Traditional)', 'Japanese', 'Korean', 
      'Arabic', 'Hindi', 'Dutch', 'Swedish', 'Norwegian', 'Danish', 
      'Finnish', 'Polish', 'Turkish', 'Greek', 'Hebrew', 'Thai', 'Vietnamese'
    ];

    const modal = document.createElement('div');
    modal.id = 'language-selector-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2>🌐 Select Target Language</h2>
          <button id="closeLangModal" aria-label="Close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="language-search">
            <input type="text" id="languageSearch" placeholder="Search languages..." 
                   style="width: 100%; padding: 8px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 4px;">
          </div>
          <div class="language-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; max-height: 300px; overflow-y: auto;">
            ${languages.map(lang => 
              `<button class="btn language-btn" data-lang="${lang}" style="padding: 8px 12px; font-size: 12px;">${lang}</button>`
            ).join('')}
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Search functionality
    const searchInput = document.getElementById('languageSearch');
    const languageButtons = modal.querySelectorAll('.language-btn');
    
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      languageButtons.forEach(btn => {
        const langName = btn.textContent.toLowerCase();
        btn.style.display = langName.includes(query) ? 'block' : 'none';
      });
    });

    // Focus search input
    searchInput.focus();

    // Event listeners
    modal.addEventListener('click', (e) => {
      if (e.target.matches('.language-btn')) {
        const selectedLang = e.target.dataset.lang;
        modal.remove();
        resolve(selectedLang);
      } else if (e.target.id === 'closeLangModal' || e.target.classList.contains('modal-backdrop')) {
        modal.remove();
        resolve(null);
      }
    });

    // Keyboard navigation
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        resolve(null);
      }
    });
  });
}

function handleExportTheme() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) {
      StatusManager.show('Cannot access current tab', 'error');
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const styles = [];
        const themeElements = document.querySelectorAll('style[id^="rebrowse"]');
        themeElements.forEach(el => {
          styles.push({
            id: el.id,
            css: el.textContent
          });
        });
        return {
          styles,
          url: window.location.href,
          title: document.title
        };
      }
    }).then((results) => {
      if (!results || results.length === 0) {
        StatusManager.show('No styles to export', 'warning');
        return;
      }

      const data = results[0].result;
      if (data.styles.length === 0) {
        StatusManager.show('No active theme to export', 'warning');
        return;
      }

      const themeData = {
        name: `ReBrowse Theme - ${data.title}`,
        exportedAt: new Date().toISOString(),
        sourceUrl: data.url,
        styles: data.styles,
        version: chrome.runtime.getManifest().version
      };

      const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `rebrowse-theme-${Date.now()}.json`;
      a.click();

      URL.revokeObjectURL(url);
      StatusManager.show('Theme exported successfully!', 'success');
    }).catch(error => {
      StatusManager.show('Export failed', 'error');
      console.error('Export error:', error);
    });
  });
}

function handleImportTheme() {
  document.getElementById('importFileInput').click();
}

function handleImportFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.type !== 'application/json') {
    StatusManager.show('Please select a valid JSON theme file', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const themeData = JSON.parse(e.target.result);
      
      if (!themeData.styles || !Array.isArray(themeData.styles)) {
        throw new Error('Invalid theme file format');
      }

      // Apply imported theme
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (!tab) {
          StatusManager.show('Cannot access current tab', 'error');
          return;
        }

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (styles) => {
            // Remove existing theme styles
            const existing = document.querySelectorAll('style[id^="rebrowse"]');
            existing.forEach(el => el.remove());

            // Apply imported styles
            styles.forEach(styleData => {
              const styleElement = document.createElement("style");
              styleElement.id = styleData.id;
              styleElement.textContent = styleData.css;
              document.head.appendChild(styleElement);
            });
          },
          args: [themeData.styles]
        }).then(() => {
          StatusManager.show(`Imported theme: ${themeData.name}`, 'success');
        }).catch(error => {
          StatusManager.show('Failed to apply imported theme', 'error');
          console.error('Import application error:', error);
        });
      });

    } catch (error) {
      StatusManager.show('Failed to parse theme file', 'error');
      console.error('Import error:', error);
    }
  };

  reader.readAsText(file);
  // Reset file input
  event.target.value = '';
}

function updateActiveTheme(themeId) {
  // Remove active class from all theme buttons
  document.querySelectorAll('[data-theme]').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to current theme
  const activeBtn = document.querySelector(`[data-theme="${themeId}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

function clearActiveTheme() {
  document.querySelectorAll('[data-theme]').forEach(btn => {
    btn.classList.remove('active');
  });
}

function loadUserPreferences() {
  chrome.storage.local.get(['lastUsedTheme', 'autoSavePreferences'], (data) => {
    if (chrome.runtime.lastError) {
      console.warn('Error loading preferences:', chrome.runtime.lastError);
      return;
    }

    if (data.lastUsedTheme && themes[data.lastUsedTheme]) {
      updateActiveTheme(data.lastUsedTheme);
    }
  });
}

// New function to handle stats viewing
function handleViewStats() {
  chrome.storage.local.get('apiUsageStats', (data) => {
    const stats = data.apiUsageStats || {
      totalCalls: 0,
      successfulCalls: 0,
      failedCalls: 0,
      lastUsed: null
    };

    const successRate = stats.totalCalls > 0 ? Math.round((stats.successfulCalls / stats.totalCalls) * 100) : 0;
    const lastUsedFormatted = stats.lastUsed ? new Date(stats.lastUsed).toLocaleDateString() : 'Never';

    const statsContent = `
API Usage Statistics:

Total API Calls: ${stats.totalCalls}
Successful Calls: ${stats.successfulCalls}
Failed Calls: ${stats.failedCalls}
Success Rate: ${successRate}%
Last Used: ${lastUsedFormatted}

${stats.totalCalls === 0 ? 'No API calls made yet. Try using an AI feature!' : ''}
`;

    ModalManager.show('Usage Statistics', statsContent, 'info');
  });
}