import { AppBar, Box, CircularProgress, IconButton, Tab, Tabs, Typography, Toolbar, Tooltip } from "@material-ui/core";
import React, { useState, useEffect, useMemo } from "react";
import { useQueryClient } from "react-query";
import { CountrySection } from "../CountrySection/CountrySection";
import { GlobalSection } from "../GlobalSection/GlobalSection";
import { CovidDataUseQuery } from "../../react-query/covid";
import RefreshIcon from "@material-ui/icons/Refresh";

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

    const refreshHandler = (): void => {
        if (covidDataQuery.isStale) {
            queryClient.invalidateQueries("covidData");
        }
    }

    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography style={{ userSelect: "none" }} variant="h4" component="h4" align="center">
                            Covid Tracker
                        </Typography>
                    </Box>
                    <IconButton
                        id="refresh-bttn"
                        data-testid="refresh-bttn"
                        color="inherit"
                        disabled={!covidData}
                        onClick={refreshHandler}
                    >
                        <Tooltip title="Refresh" aria-label="Refresh"><RefreshIcon /></Tooltip>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
        <div className="body-div">
            {covidDataQuery.isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress color="secondary" />
                </Box>
            )}
            {covidData && (
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
            )}
            {covidData && (section === "Global"
                ? <GlobalSection data={covidData.Global} />
                : <CountrySection data={covidData.Countries} />
            )}
            {error && <Typography variant="h6" component="h6" color="error" align="center">{error}</Typography>}
        </div>
    </>);
};
