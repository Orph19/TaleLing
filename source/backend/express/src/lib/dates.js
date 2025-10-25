/**
 * Generates the current date string in the 'YYYY-MM-DD' format for the Pacific Time Zone.
 * Using Intl API ensures this is accurate regardless of the server's physical location
 * and correctly handles Daylight Saving Time.
 * @returns {string} The current date in Pacific Time.
 */
export function getPacificCurrentDate() {
  const now = new Date();
  // Using Intl.DateTimeFormat is the modern, standard way to handle time zones.
  const formatter = new Intl.DateTimeFormat('en-CA', { // 'en-CA' gives the YYYY-MM-DD format
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(now);
}

/**
 * Determines if a usage reset is needed based on the Pacific Time Zone date.
 *
 * @param {string} lastResetDate The date of the last reset.
 */
export function isResetNeeded(lastResetDate){
  const pacificCurrentDate = getPacificCurrentDate();
  // Compare dates and delegate reset if a new day has started in PT
  if (pacificCurrentDate !== lastResetDate) {
    return true
  }
  return false
}
