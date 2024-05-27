//

type TextInputData = {
  str: string
  cursor: number | null
}

type DiffChanged = {
  start: string
  changedFrom: string
  changedTo: string
  end: string
}

type DateObject = { month: string; day: string; year: number }
