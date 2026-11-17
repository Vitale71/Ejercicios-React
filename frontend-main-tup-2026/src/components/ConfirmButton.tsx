import { useState } from 'react'

interface Props {
  label: string
  onConfirm: () => void
  disabled?: boolean
}

// Pide un segundo clic antes de una acción que no se puede deshacer.
export function ConfirmButton({ label, onConfirm, disabled = false }: Props) {
  const [confirming, setConfirming] = useState(false)

  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)} disabled={disabled}>
        {label}
      </button>
    )
  }
  return (
    <>
      <button type="button" onClick={onConfirm} disabled={disabled}>
        {disabled ? 'Cargando…' : 'Confirmar'} {/* <-- Feedback visual */}
      </button>
      <button type="button" onClick={() => setConfirming(false)} disabled={disabled}>
        Cancelar
      </button>
    </>
  )
}
