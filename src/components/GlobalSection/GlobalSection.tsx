import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import { GlobalCovidData } from "../../models/covidData";

interface Props {
    data: GlobalCovidData;
}

const mapDataToList = (data: GlobalCovidData) => {
    return [
        {
            'id': 0,
            'label': 'New Confirmed',
            'value': data.NewConfirmed,
        },
        {
            'id': 1,
            'label': 'Total Confirmed',
            'value': data.TotalConfirmed,
        },
        {
            'id': 2,
            'label': 'New Deaths',
            'value': data.NewDeaths,
        },
        {
            'id': 3,
            'label': 'Total Deaths',
            'value': data.TotalDeaths,
        },
        {
            'id': 4,
            'label': 'New Recovered',
            'value': data.NewRecovered,
        },
        {
            'id': 5,
            'label': 'Total Recovered',
            'value': data.TotalRecovered,
        },
        {
            'id': 6,
            'label': 'Date',
            'value': new Date(data.Date).toString(),
        }
    ]
}

export const GlobalSection: React.FC<Props> = ({ data }) => {
    const items = mapDataToList(data);
    return (
        <Card variant="outlined">
            <CardContent>
                {
                    items.map(item => (
                        <Grid container spacing={4} key={item.id}>
                            <Grid container item xs={12}>
                                <>
                                    <Grid item xs={5}>
                                        <Typography variant="h5" component="h5" color="primary">
                                            {item.label}
                                        </Typography>
                                    </Grid>
                                </>
                                <>
                                    <Grid item xs={1}>
                                        <Typography variant="h5" component="h5" color="initial">
                                            :
                                        </Typography>
                                    </Grid>
                                </>
                                <>
                                    <Grid item xs={6}>
                                        <Typography variant="h5" component="h5" color="initial">
                                            {item.value}
                                        </Typography>
                                    </Grid>
                                </>
                            </Grid>
                        </Grid>
                    ))
                }
            </CardContent>
        </Card>
    )
}