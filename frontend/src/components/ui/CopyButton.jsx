import React, { useState, useCallback } from 'react';
import { copyToClipboard } from '../../utils/clipboard';

/**
 * Accessible copy-to-clipboard button with visual feedback.
 */
export default function CopyButton({ text, label = 'ID', className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy credential ID: ${text}`}
      title={copied ? 'Copied!' : 'Copy Credential ID'}
      className={`flex items-center gap-1 cursor-pointer transition-colors text-xs ${
        copied ? 'text-accent' : 'text-text-dim hover:text-text-muted'
      } ${className}`}
    >
      {copied ? '✓ Copied' : label}
    </button>
  );
}
