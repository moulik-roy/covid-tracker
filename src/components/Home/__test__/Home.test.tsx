import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Home } from "../Home";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CovidData } from "../../../models/covidData";

const covidData: CovidData = {
    "ID": "08ee6634-b4d8-406d-a525-8e84191b9a39",
    "Message": "",
    "Global": {
        "NewConfirmed": 707378,
        "TotalConfirmed": 571003938,
        "NewDeaths": 1885,
        "TotalDeaths": 6383612,
        "NewRecovered": 0,
        "TotalRecovered": 0,
        "Date": "2022-07-27T09:42:36.938Z"
    },
    "Countries": [
        {
            "ID": "acbe61ac-547a-40f5-8f3a-65f6ed342e8e",
            "Country": "Afghanistan",
            "CountryCode": "AF",
            "Slug": "afghanistan",
            "NewConfirmed": 0,
            "TotalConfirmed": 185086,
            "NewDeaths": 0,
            "TotalDeaths": 7742,
            "NewRecovered": 0,
            "TotalRecovered": 0,
            "Date": "2022-07-27T09:42:36.938Z",
            "Premium": {}
        },
        {
            "ID": "cb5f5f16-b929-406b-88b6-db2b2343c54d",
            "Country": "Albania",
            "CountryCode": "AL",
            "Slug": "albania",
            "NewConfirmed": 0,
            "TotalConfirmed": 306789,
            "NewDeaths": 0,
            "TotalDeaths": 3532,
            "NewRecovered": 0,
            "TotalRecovered": 0,
            "Date": "2022-07-27T09:42:36.938Z",
            "Premium": {}
        },
        {
            "ID": "e6c3095b-c9d0-4f27-a476-83ce9cb5751f",
            "Country": "Algeria",
            "CountryCode": "DZ",
            "Slug": "algeria",
            "NewConfirmed": 0,
            "TotalConfirmed": 267010,
            "NewDeaths": 0,
            "TotalDeaths": 6876,
            "NewRecovered": 0,
            "TotalRecovered": 0,
            "Date": "2022-07-27T09:42:36.938Z",
            "Premium": {}
        }
    ]
};

const setupAxiosMock = () => new MockAdapter(axios)
    .onGet('https://api.covid19api.com/summary')
    .reply(200, covidData)
    .onAny()
    .reply(request => {
        throw Error(`**** UNMAPPED AXIOS ROUTE **** ${request.url}`);
    });

beforeAll(setupAxiosMock);
afterEach(cleanup);

const renderHome = () => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Home />
        </QueryClientProvider>
    )
}


describe("it renders without crashing", () => {
    it("renders the home component", () => {
        render(renderHome());
        const homeHeader = screen.getByText(/Covid Tracker App/i);
        expect(homeHeader).toBeDefined();
        expect(homeHeader).toBeInTheDocument();
    });

    it("renders the refresh button", async () => {
        render(renderHome());
        const refreshBttn = await waitFor(() => screen.findByText(/Refresh/i));
        expect(refreshBttn).toBeDefined();
        expect(refreshBttn).toBeInTheDocument();
        expect(refreshBttn).toHaveTextContent(/Refresh/i);
    });

    it("renders the Global section", async () => {
        render(renderHome());
        const globalTab = await waitFor(() => screen.findByText(/Global/i));
        expect(globalTab).toBeDefined();
        expect(globalTab).toBeInTheDocument();
    });

    it("renders the Country section", async () => {
        render(renderHome());
        const countryTab = await waitFor(() => screen.findByText(/Country/i));
        expect(countryTab).toBeDefined();
        expect(countryTab).toBeInTheDocument();
    });
});