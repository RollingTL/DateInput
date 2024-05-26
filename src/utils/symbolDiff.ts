export function findSymbolChange(prevStr: string, newStr: string): DiffChanged | null {
  if (prevStr === newStr) {
    return null // No changes detected
  }

  const lenDiff = newStr.length - prevStr.length

  if (Math.abs(lenDiff) > 1) {
    return null // More than one character added or removed
  }

  let i = 0
  while (i < prevStr.length && i < newStr.length && prevStr[i] === newStr[i]) {
    i++
  }

  if (lenDiff === 1) {
    // Character added
    if (prevStr === newStr.slice(0, i) + newStr.slice(i + 1)) {
      return {
        start: newStr.slice(0, i),
        changedFrom: '',
        changedTo: newStr[i],
        end: newStr.slice(i + 1)
      }
    }
  } else if (lenDiff === -1) {
    // Character removed
    if (newStr === prevStr.slice(0, i) + prevStr.slice(i + 1)) {
      return {
        start: prevStr.slice(0, i),
        changedFrom: prevStr[i],
        changedTo: '',
        end: prevStr.slice(i + 1)
      }
    }
  } else {
    // Character changed
    if (prevStr.slice(i + 1) === newStr.slice(i + 1)) {
      return {
        start: prevStr.slice(0, i),
        changedFrom: prevStr[i],
        changedTo: newStr[i],
        end: prevStr.slice(i + 1)
      }
    }
  }

  return null // No single change detected
}
