import { useState } from 'react'

interface Props {
  label: string
  onConfirm: () => void
}

// Pide un segundo clic antes de una acción que no se puede deshacer.
export function ConfirmButton({ label, onConfirm }: Props) {
  const [confirming, setConfirming] = useState(false)

  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)}>
        {label}
      </button>
    )
  }
  return (
    <>
      <button type="button" onClick={onConfirm}>
        Confirmar
      </button>
      <button type="button" onClick={() => setConfirming(false)}>
        Cancelar
      </button>
    </>
  )
}
