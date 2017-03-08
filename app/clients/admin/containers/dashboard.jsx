import React from 'react'
import { connect } from '../lib/helper'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts'

export class Dashboard extends React.Component {
  render () {
    const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
    ]
    const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
    {name: 'Group C', value: 300}, {name: 'Group D', value: 200}]

    const data02 = [{name: 'A1', value: 100},
    {name: 'A2', value: 300},
    {name: 'B1', value: 100},
    {name: 'B2', value: 80},
    {name: 'B3', value: 40},
    {name: 'B4', value: 30},
    {name: 'B5', value: 50},
    {name: 'C1', value: 100},
    {name: 'C2', value: 200},
    {name: 'D1', value: 150},
    {name: 'D2', value: 50}]

    return (
      <article className='content dashboard-page'>
        <section className='section'>
          <div className='row sameheight-container'>
            <div className='col-xl-8'>
              <div className='card sameheight-item items' data-exclude='xs,sm,lg'>
                <div className='card-header bordered'>
                  <div className='header-block'>
                    <h3 className='title'> Line Chart </h3>
                  </div>
                </div>
                <div>
                  <LineChart width={700} height={300} data={data}
                    margin={{top: 30, right: 30, left: 30, bottom: 30}}>
                    <XAxis dataKey='name'/>
                    <YAxis />
                    <CartesianGrid strokeDasharray='3 3'/>
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='pv' stroke='#8884d8' activeDot={{r: 8}}/>
                    <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
                  </LineChart>
                </div>
              </div>
            </div>
            <div className='col-xl-4'>
              <div className='card sameheight-item sales-breakdown' data-exclude='xs,sm,lg'>
                <div className='card-header'>
                  <div className='header-block'>
                    <h3 className='title'> Pie Chart </h3>
                  </div>
                </div>
                <div className='card-block'>
                  <PieChart width={300} height={300}>
                    <Pie data={data01} outerRadius={60} fill="#8884d8"/>
                    <Pie data={data02} innerRadius={70} outerRadius={90} fill="#82ca9d" label/>
                  </PieChart>
                </div>
              </div>
            </div>
            </div>
          </section>
        </article>
    )
  }
}

export default connect(state => ({ oauth: state.oauth }))(Dashboard)
