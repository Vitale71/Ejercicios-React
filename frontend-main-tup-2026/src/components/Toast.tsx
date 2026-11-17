import { useToast } from '../context/useToast'

export function Toast() {
  const { message } = useToast()

  if (!message) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#2e7d32', // Verde éxito
      color: 'white',
      padding: '12px 24px',
      borderRadius: '4px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 1000,
      fontWeight: 'bold'
    }}>
      {message}
    </div>
  )
}