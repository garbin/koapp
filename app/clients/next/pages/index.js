import React from 'react'
import { compose } from 'recompose'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import provider from '../redux'
import Link from 'next/link'
import page from '../components/page'
import Header from '../components/header'
import { Container, Row, Col, Card, CardTitle, CardBody, CardFooter, CardLink } from 'reactstrap'
import Avatar from 'react-user-avatar'
import { Icon } from '../components/icon'

const query = gql`
  query {
    hello {
      name
    }
  }
`

export class Index extends React.Component {
  render () {
    const photos = [
      { src: 'https://images.unsplash.com/photo-1454991727061-be514eae86f7?dpr=2&auto=format&crop=faces&fit=crop&w=300&h=300' },
      { src: 'https://images.unsplash.com/photo-1470619549108-b85c56fe5be8?dpr=2&auto=format&w=1024' },
      { src: 'https://images.unsplash.com/photo-1455717974081-0436a066bb96?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' }
    ]
    return (
      <div>
        <Header />
        <Container className='mt-2'>
          <Row>
            <Col sm={3}>
              <Card>
                <CardBody>
                  <Avatar className='d-flex justify-content-center' name='Garbin Huang' size='128' src='//tvax1.sinaimg.cn/crop.0.75.800.800.180/6c0c559aly8fiobg7frjyj20m80qwmz8.jpg' />
                  <div className='text-center'>
                    <label><Link href=':;'><a className='font-weight-bold'>Garbin Huang</a></Link></label>
                    <div className='font-weight-light mb-2'>Coding, Investing, Loving</div>
                  </div>
                  <Row className='text-center'>
                    <Col xs={4}>
                      <Link href=':;'><a>28</a></Link>
                      <label className='text-secondary font-size-sm'>Presses</label>
                    </Col>
                    <Col xs={4}>
                      <Link href=':;'><a>12</a></Link>
                      <label className='text-secondary font-size-sm'>Friends</label>
                    </Col>
                    <Col xs={4}>
                      <Link href=':;'><a>3</a></Link>
                      <label className='text-secondary font-size-sm'>Networks</label>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card className='mt-2 mb-2'>
                <CardBody>
                  <CardTitle>#Hashtags</CardTitle>
                  <ul className='list-unstyled'>
                    <li><Link href=':;'><a>#Coding</a></Link></li>
                    <li><Link href=':;'><a>#Investing</a></Link></li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
            <Col sm={9}>
              <Card className='mb-2'>
                <CardBody>
                  ePress is out!!!, Thank you all!!!
                  <div>
                    <CardLink href='#'>more...</CardLink>
                  </div>
                </CardBody>
                <CardFooter>
                  <span className='text-secondary'>
                  1 days ago
                  </span>
                  <div className='float-sm-right'>
                    <Link href=':;'><a className='mr-2'><Icon icon='edit' />Edit</a></Link>
                    <Link href=':;'><a><Icon icon='trash-alt' />Delete</a></Link>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default compose(
  provider(),
  page(props => ({
    title: 'Hello World'
  }))
)(Index)
