export function processDateString(dateString: string): string {
  let date = parseISODate(dateString)
  if (!date) {
    date = parseEuropeanDate(dateString) // Prioritize European format
  }
  if (!date) {
    date = parseAmericanDate(dateString)
  }
  if (!date) return ''

  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()

  if (year >= 1900 && year <= 2099) {
    return `${month}/${day}/${year}`
  } else {
    return `${month}/${day}/`
  }
}

function parseISODate(dateString: string) {
  const isoRegex = /^(\d{4})-(\d{2})-(\d{2})$/
  const match = dateString.match(isoRegex)
  if (match) {
    const year = parseInt(match[1])
    const month = parseInt(match[2])
    const day = parseInt(match[3])
    if (month < 1 || month > 12 || day < 1 || day > new Date(year, month, 0).getDate()) {
      return null // Return null for invalid date
    }
    return new Date(year, month - 1, day)
  }
  return null
}

export function parseAmericanDate(dateString: string) {
  const americanRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/
  const match = dateString.match(americanRegex)
  if (match) {
    const month = parseInt(match[1]) - 1 // Month is the first captured group, subtract 1 to get zero-based index
    const day = parseInt(match[2])
    const year = parseInt(match[3])
    // Validate if the date is valid
    if (month < 0 || month > 11 || day < 1 || day > new Date(year, month + 1, 0).getDate()) {
      return null
    }
    return new Date(year, month, day)
  }
  return null
}

export function parseEuropeanDate(dateString: string) {
  const europeanRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/
  const match = dateString.match(europeanRegex)
  if (match) {
    const day = parseInt(match[1])
    const month = parseInt(match[2]) - 1 // Month is the first captured group, subtract 1 to get zero-based index
    const year = parseInt(match[3])
    if (month < 0 || month > 11 || day < 1 || day > new Date(year, month + 1, 0).getDate()) {
      return null // Return null for invalid date
    }
    return new Date(year, month, day)
  }
  return null
}
