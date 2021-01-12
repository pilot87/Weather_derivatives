import React, {useState} from 'react'
import {useSelector} from "react-redux"
import {Stat, StatDetail} from '../features/stats/statsSlice'
import {city_img} from "../components/Images"

interface State {
    stats: Stat
}

export const Statistic = () => {

    const init = useSelector((state: State) => Object.keys(state.stats.city).map(city =>
    {
        return {
            index: 0,
            active: ['active', '', '']
        }
    }))

    // useSelector(
    // for (const city of state.stats.city){}

    const [active_tab, setActive_tab] = useState<{index: number, active: string[]}[]>(init)

    const show = (s: StatDetail) =>
        <table className="striped">
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


    let cities: any = useSelector((state: State) =>
        Object.entries(state.stats.city).map((city: [string, StatDetail[]], index: number) => {
            // console.log(city)
            const tab_content: any = [
                'Test 0', // show(city[1][0]),
                'Quantity of futures: ' + city[1].length,
                'Test 2',
            ]
            if (city[1].length !== 0) {
                // console.log(city[0] + ' is not empty')
                tab_content[0] = city[1].map(detail => show(detail))
                // show(city[1][0])
            }
            if (active_tab[index] === undefined) {
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
                                    const ac = active_tab
                                    ac[index].index = 0
                                    ac[index].active = ['active', '', '']
                                    setActive_tab(ac)
                                }}><p className={active_tab[index].active[0]}>Test 0</p></li>
                                <li className="tab" style={{cursor: 'pointer'}} onClick={() => {
                                    const ac = active_tab
                                    ac[index].index = 1
                                    ac[index].active = ['', 'active', '']
                                    setActive_tab(ac)
                                }}><p className={active_tab[index].active[1]}>Test 1</p></li>
                                <li className="tab" style={{cursor: 'pointer'}} onClick={() => {
                                    const ac = active_tab
                                    ac[index].index = 2
                                    ac[index].active = ['', '', 'active']
                                    setActive_tab(ac)
                                }}><p className={active_tab[index].active[2]}>Test 2</p></li>
                            </ul>
                        </div>
                        {/*<div className="card-content grey lighten-4">*/}
                        {/*    <div id="test4">{tab_content[active_tab[index].index]}</div>*/}
                        {/*</div>*/}
                    </div>
            )
                {/*<div className="card-content grey lighten-4">*/}
                {/*    <div id="test4">{tab_content[active_tab[index].index]}</div>*/}
                {/*</div>*/}
            // console.log(city[0] + ' ' + ret.length)
            return re.concat(tab_content[active_tab[index].index])
        })
    )

    const view: any = []

    // if(cities === []) {
    //     view.push(<div className="progress">
    //         <div className="indeterminate"/>
    //     </div>)
    // } else {
    //     const max = Math.max(cities.map((city: any) => city.length))
    //
    // }



    let i = 0

    // console.log(cities)

    // console.log(Math.max(cities.map((city: any) => city.length)))

    do {
        view.push(
            <tr>
                {cities.map((city: any) => {
                    if (city.length > i) {
                        return <td>{city[i]}</td>
                    } else {
                        return <td>Blob</td>
                    }
                })}
            </tr>
        )
        i++
    } while (Math.max(...cities.map((city: any) => city.length)) > i)

    // view.push(
    //     <tr>
    //         {cities.map((city: any) => city[i])}
    //     </tr>
    // )

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
                {view}
            </table>
        </>
    )
    // return (<table>
    //     {view}
    // </table>)
}
