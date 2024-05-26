export function findAddedSymbol(prevStr: string, newStr: string): DiffAdded {
  for (let i = 0; i < newStr.length; i++) {
    if (prevStr[i] !== newStr[i]) {
      return {
        start: newStr.slice(0, i),
        added: newStr[i],
        end: newStr.slice(i + 1)
      }
    }
  }

  // If no difference is found till the end of prevStr, the added character is at the end of newStr
  return {
    start: newStr.slice(0, prevStr.length),
    added: newStr[prevStr.length],
    end: ''
  }
}

export function findRemovedSymbol(prevStr: string, newStr: string): DiffRemoved {
  for (let i = 0; i < prevStr.length; i++) {
    if (prevStr[i] !== newStr[i]) {
      return {
        start: prevStr.slice(0, i),
        removed: prevStr[i],
        end: prevStr.slice(i + 1)
      }
    }
  }

  // If no difference is found till the end of newStr, the removed character is at the end of prevStr
  return {
    start: prevStr.slice(0, newStr.length),
    removed: prevStr[newStr.length],
    end: ''
  }
}

export function findChangedSymbol(prevStr: string, newStr: string): DiffChanged {
  for (let i = 0; i < Math.max(prevStr.length, newStr.length); i++) {
    if (prevStr[i] !== newStr[i]) {
      return {
        start: prevStr.slice(0, i),
        changedFrom: prevStr[i],
        changedTo: newStr[i],
        end: prevStr.slice(i + 1)
      }
    }
  }

  throw new Error('No changed symbol found or multiple changes detected')
}
