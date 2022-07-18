export interface GlobalCovidData {
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    Date: string;
}

export interface CountryCovidData extends GlobalCovidData {
    ID: string;
    Country: string;
    CountryCode: string;
    Slug: string;
    Premium: JSON;
}

export interface CovidData {
    ID: string;
    Message: string;
    Global: GlobalCovidData;
    Countries: CountryCovidData[];
}
