import { cleanup, render, screen } from "@testing-library/react";
import { GlobalCovidData } from "../../../models/covidData";
import { GlobalSection } from "../GlobalSection";

const data: GlobalCovidData = {
    "NewConfirmed": 606902,
    "TotalConfirmed": 569806789,
    "NewDeaths": 1322,
    "TotalDeaths": 6380936,
    "NewRecovered": 0,
    "TotalRecovered": 0,
    "Date": "2022-07-26T16:04:54.285Z"
};

const labels = [
    "New Confirmed",
    "Total Confirmed",
    "New Deaths",
    "Total Deaths",
    "New Recovered",
    "Total Recovered",
    "Date",
]

afterEach(cleanup);

describe("it renders without crashing", () => {
    it("renders all labels for global section", () => {
        render(<GlobalSection data={data} />);
        labels.forEach(label =>
            expect(screen.getByText(new RegExp(`${label}`))).toBeDefined()
        );
    });
});