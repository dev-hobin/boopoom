export type AccordionStatus = 'idle'

export type AccordionContext = {}

export type AccordionCallbacks = {}

export type AccordionState = {
  status: AccordionStatus | (string & {})
  context: AccordionContext
  callbacks: AccordionCallbacks
  // entryActions?: Partial<Record<AccordionStatus, VoidFunction[]>>
  // exitActions?: Partial<Record<AccordionStatus, VoidFunction[]>>
}

export type AccordionEvent =
  | { type: 'SOME' }
  | { type: 'OTHER' }
  | { type: 'SYNC'; payload: AccordionContext }
