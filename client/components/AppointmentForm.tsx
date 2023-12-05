import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { TimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import moment from 'moment'

export default function AppointmentForm() {
  const navigate = useNavigate()
  const location = useLocation()

  const { day, date } = useParams()
  const parsedDate = moment(date).format('YYYY-MM-DD')
  const [formData, setFormData] = useState(
    location.state?.formData || {
      title: '',
      description: '',
    }
  )
  const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | null>(null)
  const [selectedEndTime, setSelectedEndTime] = useState<Dayjs | null>(null)

  useEffect(() => {
    if (day) {
      // Do something with the selected day data
      console.log('Selected Day:', day)
    }
  }, [day])

  const handleTimeChange = (time: Date | string, type: 'start' | 'end') => {
    const timeValue = dayjs(time) // Convert to Dayjs object
    if (type === 'start') {
      setSelectedStartTime(timeValue.isValid() ? timeValue : null)
    } else {
      setSelectedEndTime(timeValue.isValid() ? timeValue : null)
    }
  }

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Include selected start and end times in the request body
    const requestBody = {
      ...formData,
      appointmentDate: parsedDate,
      startTime: selectedStartTime ? selectedStartTime.format('HH:mm') : null,
      endTime: selectedEndTime ? selectedEndTime.format('HH:mm') : null,
    }

    try {
      const response = await fetch(
        '/api/v1/friendbooking/:userId/appointment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      )

      if (response.ok) {
        navigate('/form/confirmation', { state: { formData: requestBody } })
        console.log(requestBody, 'Data passing correctly')
      } else {
        console.error('Failed to submit form data:', response.statusText)
      }
    } catch (error) {
      console.error('Error submitting form data:', error)
    }
  }

  const handleReturnClick = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    navigate('/user')
  }

  return (
    <>
      <div className="h1Headers">
        <h1>APPOINTMENT FORM!</h1>
      </div>
      <div id="appointmentBox">
        <div id="dayTime">
          <p>
            <strong>Day:</strong> {day}
          </p>
          <p>
            <strong>Date:</strong> {parsedDate}
          </p>
        </div>
        <form className="appointmentForm" onSubmit={handleSubmit}>
          <div id="titleDescription">
            <label htmlFor="title">
              <strong>Title:</strong>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">
              <strong>Description:</strong>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div id="startEnd">
            <div id="startTime" htmlFor="startTime">
              Start Time:
            </div>
            <TimePicker
              className="dropdownTimeAppointmentInput"
              value={selectedStartTime}
              onChange={(time: any) => handleTimeChange(time, 'start')}
            />
            <div id="endTime" htmlFor="endTime">
              End Time:
            </div>
            <TimePicker
              className="dropdownTimeAppointmentInput"
              value={selectedEndTime}
              onChange={(time: any) => handleTimeChange(time, 'end')}
            />
          </div>
          <button type="submit">Submit Appointment</button>
        </form>
      </div>
      <button className="calendar-return" onClick={handleReturnClick}>
        Return to Owner Calendar
      </button>
    </>
  )
}
