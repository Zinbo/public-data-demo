interface MapDetails {
    lat: number
    lng: number
    rating: number
    url: string
    userRatingsTotal: number
}

export interface TestCentre {
    name: string
    passRate: string
    mapDetails: MapDetails
}

export interface TestCentreWithDistance extends TestCentre {
    distance: number
}