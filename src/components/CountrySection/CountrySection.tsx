import React, { useEffect, useState } from "react";
import { CountryCovidData } from "../../models/covidData";
import { Input } from "@material-ui/core";
import { GridApi } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './CountrySection.css';

interface Props {
    data: CountryCovidData[];
}

export const CountrySection: React.FC<Props> = ({ data }) => {
    const [gridApi, setGridApi] = useState<GridApi>();
    const [filter, setFilter] = useState<string>("");

    const onGridReady = (params: { api: GridApi }) => {
        setGridApi(params.api);
    }

    useEffect(() => gridApi?.setQuickFilter(filter)
        , [gridApi, filter]);

    const columnDefs = [
        {
            field: 'Country',
            headerName: 'Country Name',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'NewConfirmed',
            headerName: 'New Confirmed',
            filter: 'agNumberColumnFilter',
        },
        {
            field: 'TotalConfirmed',
            headerName: 'Total Confirmed',
            filter: 'agNumberColumnFilter',
        },
        {
            field: 'NewDeaths',
            headerName: 'New Deaths',
            filter: 'agNumberColumnFilter',
        },
        {
            field: 'TotalDeaths',
            headerName: 'Total Deaths',
            filter: 'agNumberColumnFilter',
        },
        {
            field: 'NewRecovered',
            headerName: 'New Recovered',
            filter: 'agNumberColumnFilter',
        },
        {
            field: 'TotalRecovered',
            headerName: 'Total Recovered',
            filter: 'agNumberColumnFilter',
        }
    ];

    const defaultColumnDef = {
        flex: 1,
        resizable: true,
        sortable: true,
    }

    return (
        <>
            <div id="search-div">
                <Input
                    id="quick-searchbar"
                    type="search"
                    placeholder="Filter on any value ..."
                    onChange={(event): void => setFilter(event.target.value)}
                    color="primary"
                    fullWidth
                    disableUnderline
                />
            </div>
            <div className="ag-theme-alpine">
                <AgGridReact
                    onGridReady={onGridReady}
                    rowData={data}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColumnDef}
                    domLayout="autoHeight"
                    pagination={true}
                    paginationPageSize={25}
                />
            </div>
        </>
    )
}