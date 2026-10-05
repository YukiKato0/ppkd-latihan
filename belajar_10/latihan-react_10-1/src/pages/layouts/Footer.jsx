import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function FooterComponent () {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-dark text-light py-4 mt-auto'>
      <Container>
        <Row className='gy-4'>
          {/* Kolom 1: Brand & Informasi */}
          <Col md={5}>
            <h5 className='fw-bold text-white mb-3'>Aplikasi Saya</h5>
            <p
              className='text-secondary small mb-0'
              style={{ maxWidth: '320px' }}
            >
              Platform manajemen data peserta dan sistem informasi terpadu.
              Memudahkan Anda mengelola data secara efisien dan aman.
            </p>
          </Col>

          {/* Kolom 2: Navigasi Cepat */}
          <Col md={3} xs={6}>
            <h6 className='fw-bold text-white mb-3'>Navigasi</h6>
            <ul className='list-unstyled d-flex flex-column gap-2 small'>
              <li>
                <Link
                  to='/dashboard'
                  className='text-secondary text-decoration-none hover-white'
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to='/peserta'
                  className='text-secondary text-decoration-none hover-white'
                >
                  Data Peserta
                </Link>
              </li>
            </ul>
          </Col>

          {/* Kolom 3: Kontak & Bantuan */}
          <Col md={4} xs={6}>
            <h6 className='fw-bold text-white mb-3'>Hubungi Kami</h6>
            <ul className='list-unstyled text-secondary small d-flex flex-column gap-1'>
              <li>Email: support@aplikasisaya.com</li>
              <li>Telepon: +62 812-3456-7890</li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </Col>
        </Row>

        <hr className='border-secondary my-4' />

        {/* Hak Cipta / Copyright */}
        <Row>
          <Col className='text-center text-secondary small'>
            &copy; {currentYear} Aplikasi Saya. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
