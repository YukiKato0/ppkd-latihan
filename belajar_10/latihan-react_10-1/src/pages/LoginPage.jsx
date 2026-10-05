import { useState } from 'react'
import { Button, Form, Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function LoginPage () {
  const navigate = useNavigate()
  const initialForm = {
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState(initialForm)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      navigate('/dashboard')
      console.log('Data dikirim:', formData)
    }, 1000)
  }

  return (
    <Container className='d-flex align-items-center justify-content-center min-vh-100'>
      <Card className='shadow' style={{ width: '400px' }}>
        <Card.Body>
          <h2 className='font-weight-bold text-center mb-4'>Login Form</h2>

          <p className='text-muted small text-center mb-3'>
            <strong>Email:</strong> {formData.email} |{' '}
            <strong>Password:</strong> {formData.password}
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Masukkan email'
                required
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Masukkan password'
                required
              />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              className='w-100'
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Sign in'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}
