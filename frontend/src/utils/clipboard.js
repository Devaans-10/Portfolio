/**
 * Copies text to the clipboard with error handling.
 * Returns true on success, false on failure.
 *
 * @param {string} text - The text to copy to clipboard
 * @returns {Promise<boolean>} Whether the copy succeeded
 */
export async function copyToClipboard(text) {
  if (!navigator.clipboard) {
    console.warn('Clipboard API not available');
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}
