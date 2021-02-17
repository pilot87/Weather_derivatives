import React from 'react'
import {NavLink} from 'react-router-dom'

import {StatDetail} from '../features/stats/statsSlice'
import {city_img} from '../components/Images'

export const Statistic = ({stats, page_city_change, baseUrl}: any): any => {

    const show = (s: StatDetail, index: number) =>
        <table className={[0].map((condition) => {
            if(index % 2 === 0) {
                return "striped collection-item yellow lighten-4 grey-text text-darken-3"
            } else {
                return "striped collection-item green lighten-4 grey-text text-darken-3"
            }
        })[0]}>
            <tbody>
                <tr>
                    <td>Completed</td>
                    <td className='statistics_table_right'>{s.completed.toString()}</td>
                </tr>
                <tr>
                    <td>Paid</td>
                    <td className='statistics_table_right'>{s.paid + ' USD'}</td>
                </tr>
                <tr>
                    <td>Temperature</td>
                    <td className='statistics_table_right'>{s.temp}</td>
                </tr>
                <tr>
                    <td>Quantity</td>
                    <td className='statistics_table_right'>{s.quantity}</td>
                </tr>
                <tr>
                    <td>Rises above</td>
                    <td className='statistics_table_right'>{s.temp_reach.toString()}</td>
                </tr>
                <tr>
                    <td>Privacy</td>
                    <td className='statistics_table_right'>{s.hidden.toString()}</td>
                </tr>
                <tr>
                    <td>Duration</td>
                    <td className='statistics_table_right'>{s.duration}</td>
                </tr>
                <tr>
                    <td>Duration left</td>
                    <td className='statistics_table_right'>{s.duration_left}</td>
                </tr>
                <tr>
                    <td>Buyer's user</td>
                    <td className='statistics_table_right'>{s.user}</td>
                </tr>
            </tbody>
        </table>

    const cities: any = Object.entries(stats.city).map((city: any, index: number) => {
            const tab_content: any = [
                'No futures',
                'Quantity of futures: ' + city[1].length,
                '',
            ]
            if (city[1].length !== 0) {
                tab_content[0] = city[1].map((detail: any, index2: number) => show(detail, index2))
            }
            if (stats.page[index] === undefined) {
                window.location.assign('about')
            }
            const re: any = []
            re.push(
                    <div className="card">
                        <div className="card-image">
                            <img className='statistics_img' src={city_img[index]} alt={city[0]}/>
                            <span className="card-title">{city[0]}</span>
                        </div>
                        <div className="card-tabs">
                            <ul className="tabs tabs-fixed-width">
                                <li className="tab statistics_pointer" onClick={() => {
                                    page_city_change({index: index, payload:
                                            {index: 0, active: ['green lighten-4', '', '']}})
                                }}>
                                    <p className={stats.page[index].active[0]}>Futures</p>
                                </li>
                                <li className="tab statistics_pointer" onClick={() => {
                                    page_city_change({index: index, payload:
                                            {index: 1, active: ['', 'green lighten-4', '']}})
                                }}>
                                    <p className={stats.page[index].active[1]}>Statistic</p>
                                </li>
                            </ul>
                        </div>
                    </div>
            )
            return re.concat(tab_content[stats.page[index].index])
    })

    let view: any = []

    let i = 0
    do {
        view.push(
            <tr>
                {cities.map((city: any) => {
                    if (city.length > i) {
                        return <td className="">{city[i]}</td>
                    } else {
                        return <td/>
                    }
                })}
            </tr>
        )
        i++
    } while (Math.max(...cities.map((city: any) => city.length)) > i)


    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <NavLink to="/" className="breadcrumb">Home</NavLink>
                        <NavLink to="/statistic" className="breadcrumb">Statistic</NavLink>
                    </div>
                </div>
            </nav>
            <table>
                <tbody>
                    {view}
                </tbody>
            </table>
        </>
    )
}
