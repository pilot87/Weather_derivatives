const axios = require('axios')
const config = require('config')

import {billing} from './billing.update'

const City = require('../models/City')

interface Hourly3 {
    data: {
        list: {
            main: {
                temp: number,
                pressure: number,
                humidity: number
            },
            wind: {
                speed: number
            },
            clouds: {
                all: number
            },
            visibility: number
        }[]
    }
}

interface Current {
    data: {
        coord: {
            lon: number,
            lat: number
        },
        weather:
            {
                id: number,
                main: string,
                description: string,
                icon: string
            }[],
        base: string,
        main: {
            temp: number,
            feels_like: number,
            temp_min: number,
            temp_max: number,
            pressure: number,
            humidity: number
        },
        visibility: number,
        wind: {
            speed: number,
            deg: number
        },
        clouds: {
            all: number
        },
        dt: number,
        sys: {
            type: number,
            id: number,
            message: number,
            country: string,
            sunrise: number,
            sunset: number
        },
        timezone: number,
        id: number,
        name: string,
        cod: number
    }
}

interface Record {
    name: string,
    lat: string,
    lon: string,
    current_temp: string,
    hourly_temp: string[],
    current_wind_speed: string,
    hourly_wind_speed: string[],
    current_clouds: string,
    hourly_clouds: string[],
    current_pressure: string,
    hourly_pressure: string[],
    current_humidity: string,
    hourly_humidity: string[],
    current_visibility: string,
    hourly_visibility: string[],
    expected_value: string[],
    variance: string[],
    standard_deviation: string[],
    history_temp: string[],
    init_phase: boolean
}

export const forecast = async() => {
    const base = ['Hong Kong', 'San Francisco', 'New York', 'Paris']
    for (const city of base) {
        const c = await City.findOne({name: city})
        if(!c) {
            axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' +
                config.get('apiKey'))
            .then((current: Current) => {
                axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' +
                    config.get('apiKey'))
                    .then(async (hourly3: Hourly3) => {
                        try {
                            const expected_value = await hourly3.data.list.map((hour, index, array) =>
                                array.slice(0, index + 1).reduce(
                                    (res, curr) => {
                                        return res + curr.main.temp - 273.15 }, 0) / (index + 1))
                            const variance = await hourly3.data.list.map((hour, index) =>
                                (hour.main.temp- 273.15 - expected_value[index]) ** 2)
                            const standard_deviation = await variance.map((value: number) => Math.sqrt(value))

                            const blob = new City({
                                name: city,
                                current_temp: (current.data.main.temp - 273.15).toString(),
                                hourly_temp: hourly3.data.list.map(hour =>
                                    (hour.main.temp - 273.15).toString()),
                                current_wind_speed: current.data.wind.speed.toString(),
                                hourly_wind_speed: hourly3.data.list.map(hour =>
                                    hour.wind.speed.toString()),
                                current_clouds: current.data.clouds.all.toString(),
                                hourly_clouds: hourly3.data.list.map(hour =>
                                    hour.clouds.all.toString()),
                                current_pressure: current.data.main.pressure.toString(),
                                hourly_pressure: hourly3.data.list.map(hour =>
                                    hour.main.pressure.toString()),
                                current_humidity: current.data.main.humidity.toString(),
                                hourly_humidity: hourly3.data.list.map(hour =>
                                    hour.main.humidity.toString()),
                                current_visibility: current.data.visibility.toString(),
                                hourly_visibility: hourly3.data.list.map(hour =>
                                    hour.visibility.toString()),
                                expected_value: expected_value.map(ev => ev.toString()),
                                variance: variance.map(ev => ev.toString()),
                                standard_deviation: standard_deviation.map(ev => ev.toString()),
                                history_temp: [],
                                init_phase: true
                            })


                            await blob.save()
                        } catch (e) {
                            console.log('creating error')
                        }
                    })
                    .catch((e: any) => console.log('error in ring 0: ' + JSON.stringify(e)))
            })
            .catch((e: any) => console.log('error in ring 1' + JSON.stringify(e)))
            await new Promise(r => setTimeout(r, 20))
        } else {
            await City.findOneAndUpdate({name: city}, { $set: {init_phase: false}})
        }
    }
    const cities: Record[] = await City.find()

    cities.forEach(city => {
        if(!city.init_phase) {
            axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city.name + '&appid=' +
                config.get('apiKey'))
                .then(async (current: Current) => {
                    axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' + city.name + '&appid=' +
                        config.get('apiKey'))
                        .then(async (hourly3: Hourly3) => {
                            const expected_value = await hourly3.data.list.map((hour, index, array) =>
                                array.slice(0, index + 1).reduce(
                                    (res, curr) => {
                                    return res + curr.main.temp - 273.15 }, 0) / (index + 1))
                            const variance = await hourly3.data.list.map((hour, index) =>
                                (hour.main.temp - 273.15 - expected_value[index]) ** 2)
                            const standard_deviation = await variance.map((value: number) => Math.sqrt(value))
                            city.history_temp.push(city.current_temp)

                            await City.findOneAndUpdate({name: city.name}, { $set: {
                                current_temp: (current.data.main.temp - 273.15).toString(),
                                hourly_temp: hourly3.data.list.map(hour =>
                                    (hour.main.temp - 273.15).toString()),
                                current_wind_speed: current.data.wind.speed.toString(),
                                hourly_wind_speed: hourly3.data.list.map(hour =>
                                    hour.wind.speed.toString()),
                                current_clouds: current.data.clouds.all.toString(),
                                hourly_clouds: hourly3.data.list.map(hour =>
                                    hour.clouds.all.toString()),
                                current_pressure: current.data.main.pressure.toString(),
                                hourly_pressure: hourly3.data.list.map(hour =>
                                    hour.main.pressure.toString()),
                                current_humidity: current.data.main.humidity.toString(),
                                hourly_humidity: hourly3.data.list.map(hour =>
                                    hour.main.humidity.toString()),
                                current_visibility: current.data.visibility.toString(),
                                hourly_visibility: hourly3.data.list.map(hour =>
                                    hour.visibility.toString()),
                                expected_value: expected_value.map(ev => ev.toString()),
                                variance: variance.map(ev => ev.toString()),
                                standard_deviation: standard_deviation.map(ev => ev.toString()),
                                history_temp: city.history_temp
                            }})

                            await billing(city.name)
                        })
                        .catch((err: any) => {
                            console.log('req 0 error' + ' ' + JSON.stringify(err))
                        })
                })
                .catch((err: any) => {
                    console.log('req 1 error' + ' ' + JSON.stringify(err))
                })
        }
    })
}
