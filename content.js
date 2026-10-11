// Enhanced content script for ReBrowse Pro
// Handles keyboard shortcuts and page-level functionality

(function() {
  'use strict';

  // Initialize rebrowse state
  if (!window.rebrowseState) {
    window.rebrowseState = {};
  }

  function applyFocusTheme() {
    const focusTheme = `
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
      nav, aside, .sidebar, .ads, .advertisement, .banner { display: none !important; }
      main, article, .content { display: block !important; }
    `;
    
    applyStyle(focusTheme, 'rebrowse-focus-shortcut');
    showNotification('Focus theme applied via keyboard shortcut');
  }

  function toggleQuickAction(actionId) {
    const quickActions = {
      darkMode: {
        css: `
          html { filter: invert(1) hue-rotate(180deg) !important; }
          img, video, iframe, svg, canvas, embed, object { filter: invert(1) hue-rotate(180deg) !important; }
        `,
        stateKey: 'darkModeActive'
      }
    };

    const action = quickActions[actionId];
    if (!action) return;

    if (!window.rebrowseState) window.rebrowseState = {};
    const isActive = window.rebrowseState[action.stateKey] || false;

    if (isActive) {
      const element = document.getElementById(`rebrowse-quick-${actionId}`);
      if (element) element.remove();
      window.rebrowseState[action.stateKey] = false;
      showNotification(`${actionId} disabled`);
    } else {
      const existing = document.getElementById(`rebrowse-quick-${actionId}`);
      if (existing) existing.remove();
      
      const styleElement = document.createElement("style");
      styleElement.id = `rebrowse-quick-${actionId}`;
      styleElement.textContent = action.css;
      document.head.appendChild(styleElement);
      
      window.rebrowseState[action.stateKey] = true;
      showNotification(`${actionId} enabled`);
    }
  }

  function resetAllStyles() {
    const stylesToRemove = document.querySelectorAll('style[id^="rebrowse"]');
    stylesToRemove.forEach(element => element.remove());
    document.documentElement.removeAttribute('data-rebrowse-theme');
    
    if (window.rebrowseState) {
      window.rebrowseState = {};
    }
    
    showNotification('All ReBrowse styles reset');
  }

  function applyStyle(style, id = "rebrowse-style") {
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    
    const styleElement = document.createElement("style");
    styleElement.id = id;
    styleElement.textContent = style;
    document.head.appendChild(styleElement);
  }

  function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.id = 'rebrowse-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #333;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    });
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'quickSummarize') {
      // Handle quick summarization of selected text
      const selection = message.text;
      if (selection && selection.length > 20) {
        // This would be handled by the AI system
        showNotification('Processing selected text...');
      }
      sendResponse({ success: true });
    }
    
    if (message.type === 'getPageContent') {
      // Enhanced content extraction
      let content = '';
      
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
      
      if (!content) {
        content = document.body.innerText || document.body.textContent || '';
      }
      
      sendResponse({
        content: content.slice(0, 6000),
        title: document.title,
        url: window.location.href,
        domain: window.location.hostname
      });
    }
  });

  // Auto-detect content type and suggest themes
  function analyzePageContent() {
    const title = document.title.toLowerCase();
    const url = window.location.href.toLowerCase();
    const content = document.body.innerText.toLowerCase();
    
    // Simple content-based theme suggestions
    if (url.includes('github.com') || url.includes('stackoverflow.com') || content.includes('code') || content.includes('programming')) {
      return 'hacker';
    } else if (url.includes('news') || title.includes('news') || content.includes('breaking')) {
      return 'professional';
    } else if (url.includes('blog') || content.includes('article') || content.includes('essay')) {
      return 'focus';
    } else if (url.includes('wikipedia') || url.includes('edu')) {
      return 'calm';
    }
    
    return null;
  }

  // Initialize page analysis
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const suggestedTheme = analyzePageContent();
      if (suggestedTheme) {
        // Store suggestion for popup to use
        sessionStorage.setItem('rebrowse-suggested-theme', suggestedTheme);
      }
    });
  } else {
    const suggestedTheme = analyzePageContent();
    if (suggestedTheme) {
      sessionStorage.setItem('rebrowse-suggested-theme', suggestedTheme);
    }
  }

})();