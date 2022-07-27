import { Container, Button, Tab, Tabs, Typography, CircularProgress } from "@material-ui/core";
import React, { useState, useEffect, useMemo } from "react";
import { useQueryClient } from "react-query";
import { CountrySection } from "../CountrySection/CountrySection";
import { GlobalSection } from "../GlobalSection/GlobalSection";
import { CovidDataUseQuery } from "../../react-query/covid";

type Section = "Global" | "Country";

export const Home: React.FC = () => {
    const [section, setSection] = useState<Section>("Global");
    const [error, setError] = useState<string>();

    const queryClient = useQueryClient();

    const covidDataQuery = CovidDataUseQuery();

    const covidData = useMemo(() => covidDataQuery.data
        , [covidDataQuery.data]);

    useEffect(() => covidDataQuery.isError
        ? setError(`Error in fetching data. ${covidDataQuery.error}`)
        : setError(undefined)
        , [covidDataQuery.isError, covidDataQuery.error]
    );

    return (
        <Container>
            <Typography variant="h2" component="h2" color="primary" align="center">
                Covid Tracker App
            </Typography>
            {
                covidDataQuery.isLoading && <CircularProgress color="secondary" />
            }
            {covidData && (<>
                <Button
                    id="refresh-bttn"
                    variant="contained"
                    color="primary"
                    onClick={() => queryClient.invalidateQueries("covidData")}
                >
                    Refresh
                </Button>
                <Tabs
                    value={section}
                    onChange={(event: React.ChangeEvent<{}>, newValue: Section) => setSection(newValue)}
                    textColor="secondary"
                    indicatorColor="primary"
                    variant="fullWidth"
                >
                    <Tab value="Global" label="Global" />
                    <Tab value="Country" label="Country" />
                </Tabs>
            </>)
            }
            {
                covidData && (section === "Global"
                    ? <GlobalSection data={covidData.Global} />
                    : <CountrySection data={covidData.Countries} />)
            }
            {error && <Typography variant="h6" component="h6" color="error">{error}</Typography>}
        </Container >
    );
};