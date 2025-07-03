export type AccordionStatus = 'idle'

export type AccordionContext = {
  id: string
  value: (string | number)[]
}

export type AccordionCallbacks = {
  onValueChange: (value: (string | number)[]) => void
}

export type AccordionState = {
  status: AccordionStatus | (string & {})
  context: AccordionContext
  callbacks: AccordionCallbacks
  // entryActions?: Partial<Record<AccordionStatus, VoidFunction[]>>
  // exitActions?: Partial<Record<AccordionStatus, VoidFunction[]>>
}

export type AccordionEvent =
  | { type: 'EXPAND'; value: string | number }
  | { type: 'COLLAPSE'; value: string | number }
  | { type: 'SYNC'; payload: AccordionContext }
