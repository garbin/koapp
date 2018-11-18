import React from 'react'
import { compose } from 'recompose'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import provider from '../redux'
import Link from 'next/link'
import page from '../components/page'
import Header from '../components/header'
import { Container, Row, Col, Card, CardBody, CardLink } from 'reactstrap'

const query = gql`
  query {
    hello {
      name
    }
  }
`

export class Index extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <Container className='mt-2'>
          <Row>
            <Col xs={3}>
              <Card>
                <CardBody>
                abc
                  <CardLink href='#'>abc</CardLink>
                </CardBody>
              </Card>
              <Card className='mt-4'>
                <CardBody>
                abc
                  <CardLink href='#'>abc</CardLink>
                </CardBody>
              </Card>
            </Col>
            <Col xs={9}>
              <Card>
                <CardBody>
                abc
                  <CardLink href='#'>abc</CardLink>
                </CardBody>
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
    title: 'Welcome to our Store'
  }))
)(Index)
