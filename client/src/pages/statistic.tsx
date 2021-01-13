import React from 'react'
import {connect} from 'react-redux'
import {Stat, StatDetail, page_city_change} from '../features/stats/statsSlice'
import {city_img} from "../components/Images"

const Statistic = ({stats, page_city_change}: any): any => {

    // console.log(stats)

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
                    <td>Temperature</td>
                    <td style={{textAlign: 'right'}}>{s.temp}</td>
                </tr>
                <tr>
                    <td>Quantity</td>
                    <td style={{textAlign: 'right'}}>{s.quantity}</td>
                </tr>
                <tr>
                    <td>Duration</td>
                    <td style={{textAlign: 'right'}}>{s.duration}</td>
                </tr>
                <tr>
                    <td>Duration left</td>
                    <td style={{textAlign: 'right'}}>{s.duration_left}</td>
                </tr>
                <tr>
                    <td>Buyer's email</td>
                    <td style={{textAlign: 'right'}}>{s.email}</td>
                </tr>
            </tbody>
        </table>

    const cities: any = Object.entries(stats.city).map((city: any, index: number) => {
            const tab_content: any = [
                'No futures',
                'Quantity of futures: ' + city[1].length,
                'Test 2',
            ]
            if (city[1].length !== 0) {
                tab_content[0] = city[1].map((detail: any, index2: number) => show(detail, index2))
            }
            if (stats.page[index] === undefined) {
                window.location.replace('about')
            }
            const re: any = []
            re.push(
                    <div className="card">
                        <div className="card-image">
                            <img src={city_img[index]} alt={city[0]} style={{maxWidth: '100%', height: 'auto'}}/>
                            <span className="card-title">{city[0]}</span>
                        </div>
                        <div className="card-tabs">
                            <ul className="tabs tabs-fixed-width">
                                <li className="tab" style={{cursor: 'pointer'}} onClick={() => {
                                    page_city_change({index: index, payload:
                                            {index: 0, active: ['green lighten-4', '', '']}})
                                    // store.dispatch(page_city_change({index: index, payload:
                                    //         {index: 0, active: ['green lighten-4', '', '']}}))
                                }}>
                                    <p className={stats.page[index].active[0]}>Futures</p>
                                </li>
                                <li className="tab" style={{cursor: 'pointer'}} onClick={() => {
                                    page_city_change({index: index, payload:
                                            {index: 1, active: ['', 'green lighten-4', '']}})
                                }}>
                                    <p className={stats.page[index].active[1]}>Statistic</p>
                                </li>
                                <li className="tab" style={{cursor: 'pointer'}} onClick={() => {
                                    page_city_change({index: index, payload:
                                            {index: 2, active: ['', '', 'green lighten-4']}})
                                }}>
                                    <p className={stats.page[index].active[2]}>Test 2</p>
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
                        <a href="/" className="breadcrumb">Home</a>
                        <a className="breadcrumb">Statistic</a>
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

interface State {
    stats: Stat
}

export default connect((state: State) => {
        return {stats: state.stats}
    }, {
    page_city_change: page_city_change
})(Statistic)
