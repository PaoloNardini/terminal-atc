import { Lens } from './Lens'

export interface Level {
    flight_level: number
    altitude: number    
}

const getFlightLevel = (whole: Level): number => whole.flight_level;
const setFlightLevel = (whole: Level) => (part: number): Level => ({...whole, flight_level: Math.floor(part), altitude: Math.floor(part * 100)})
export const LevelLens = Lens<Level, number>(getFlightLevel, setFlightLevel)

const getAltitude = (whole: Level): number => whole.altitude;
const setAltitude = (whole: Level) => (part: number): Level => ({...whole, flight_level: Math.floor(part / 100), altitude: part})
export const AltitudeLens = Lens<Level, number>(getAltitude, setAltitude)

export const createFlightLevel = (fl: number): Level => {
    const empty: Level = { flight_level: 0, altitude: 0}
    const level = setFlightLevel(empty)(fl)
    return level
}

export const createAltitude = (feet: number): Level => {
    const empty: Level = { flight_level: 0, altitude: 0}
    const level = setAltitude(empty)(feet)
    return level
}
