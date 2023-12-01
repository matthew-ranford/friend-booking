import { useNavigate, useLocation } from 'react-router-dom'

export default function Confirmation() {
  const navigate = useNavigate()
  const location = useLocation()
  const formData = location.state?.formData

  const handleReturnClick = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    navigate('/user')
    console.log('Form submitted with data:')
  }

  if (!formData) {
    return (
      <div>
        <p>No form data found for confirmation!</p>
      </div>
    )
  }
  return (
    <>
      <div className="confirmation-container">
        <h1 className="confirmation-title">
          SUCCESS! Your friend wants to catchup!
        </h1>
        <ul className="confirmation-list">
          <li>Title: {formData.title}</li>
          <li>Description: {formData.description}</li>
          <li>Start Time: {formData.startTime}</li>
          <li>End Time: {formData.endTime}</li>
        </ul>
        <button className="calendar-return" onClick={handleReturnClick}>
          Return to Owner's Calendar
        </button>
      </div>
    </>
  )
}