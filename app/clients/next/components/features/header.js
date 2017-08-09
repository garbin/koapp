import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import { translate } from 'react-i18next'
import { Link } from '../../routes'

export default translate(['common'])(({t, product = {}, url, active}) => {
  const navs = [
    { key: 'overview', route: 'product_overview', text: t('feature/overview') },
    { key: 'specs', route: 'product_specs', text: t('feature/specs') },
    { key: 'gallery', route: 'product_gallery', text: t('feature/gallery') },
    { key: 'buy', route: 'product_buy', text: t('feature/buy') }
  ]
  return (
    <Container>
      <Row>
        <Col xs={12} sm={6} className='text-center text-md-left'>
          <h3>{product.name}</h3>
        </Col>
        <Col xs={12} sm={6} className='text-center text-md-right'>
          <ul className='list-inline'>
            {navs.map(nav => (
              <li key={nav.key} className='list-inline-item'>
                <Link route={nav.route} params={{slug: url.query.slug}}>
                  <a className={classnames({active: active === nav.key})}>
                    {nav.text}<span className='centerer' />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  )
})
