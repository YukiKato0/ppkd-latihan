import { Card, Container, Row, Col } from 'react-bootstrap'

function DashboardPage () {
  return (
    <Container>
      <h3 className='mb-4'>Ringkasan</h3>

      <Row className='g-4'>
        <Col md={4}>
          <Card className='shadow-sm p-3 border-0'>
            <Card.Subtitle className='text-muted mb-2'>All Sales</Card.Subtitle>
            <Card.Title className='fs-3 fe-bold text-success'>
              Rp. 3.000.000
            </Card.Title>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='shadow-sm p-3 border-0'>
            <Card.Subtitle className='text-muted mb-2'>All Sales</Card.Subtitle>
            <Card.Title className='fs-3 fe-bold text-success'>
              Rp. 3.000.000
            </Card.Title>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='shadow-sm p-3 border-0'>
            <Card.Subtitle className='text-muted mb-2'>All Sales</Card.Subtitle>
            <Card.Title className='fs-3 fe-bold text-success'>
              Rp. 3.000.000
            </Card.Title>
          </Card>
        </Col>
      </Row>


    </Container>
  )
}

export default DashboardPage
