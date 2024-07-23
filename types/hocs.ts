import { Dispatch, SetStateAction } from 'react'

export interface IWrappedComponentProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
