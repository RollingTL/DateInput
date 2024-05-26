type InputSpec = {
  oldString: string
  newString: string
  selectionStart: number | null
}
type OutputSpec = {
  newString: string
  selectionStart: number | null
}

type TextInputData = {
  str: string
  cursor: number | null
}
type StringDiff = {
  startStr: string
  endStr: string
  insertedStr: string
  deletedStr: string
}

type DiffAdded = {
  start: string
  added: string
  end: string
}

type DiffRemoved = {
  start: string
  removed: string
  end: string
}
type DiffChanged = {
  start: string
  changedFrom: string
  changedTo: string
  end: string
}

type DateObject = { month: string; day: string; year: number }
