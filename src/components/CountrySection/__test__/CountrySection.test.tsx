import { cleanup, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { CountryCovidData } from "../../../models/covidData";
import { CountrySection } from "../CountrySection";

const country = "India";

const data: CountryCovidData[] = [
    {
        "ID": "99827876-6a29-42de-b840-1bd24a88aeac",
        "Country": country,
        "CountryCode": "IN",
        "Slug": "india",
        "NewConfirmed": 0,
        "TotalConfirmed": 184819,
        "NewDeaths": 0,
        "TotalDeaths": 7738,
        "NewRecovered": 0,
        "TotalRecovered": 0,
        "Date": "2022-07-26T16:04:54.285Z",
        "Premium": {}
    },
    {
        "ID": "c868cfb7-044c-4ea3-901a-9ddb13482903",
        "Country": "Albania",
        "CountryCode": "AL",
        "Slug": "albania",
        "NewConfirmed": 0,
        "TotalConfirmed": 293917,
        "NewDeaths": 0,
        "TotalDeaths": 3517,
        "NewRecovered": 0,
        "TotalRecovered": 0,
        "Date": "2022-07-26T16:04:54.285Z",
        "Premium": {}
    }
];

afterEach(cleanup);

describe("it renders without crashing", () => {
    it("renders the search bar correctly", () => {
        render(<CountrySection data={data} />);
        const filterInput = screen.getByRole("searchbox");
        expect(filterInput).toBeInTheDocument();
        expect(filterInput).toBeDefined();
    });

    it("can type in the search bar", () => {
        render(<CountrySection data={data} />);
        const filterInput = screen.getByRole("searchbox");
        expect(filterInput).toBeDefined();
        user.type(filterInput, country);
    });

    it("renders the ag grid correctly", () => {
        render(<CountrySection data={data} />);
        const gridCell = screen.getAllByText(country);
        expect(gridCell).toBeDefined();
    });
});