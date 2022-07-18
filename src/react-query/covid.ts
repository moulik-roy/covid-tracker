import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { CovidData } from "../models/covidData";

export const CovidDataUseQuery = (): UseQueryResult<CovidData> => {
    return useQuery({
        queryKey: 'covidData',
        queryFn: async () => (await axios.get('https://api.covid19api.com/summary')).data
    });
}