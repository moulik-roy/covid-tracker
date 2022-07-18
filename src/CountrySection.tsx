import React from "react";
import { CountryCovidData } from "./models/covidData";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface Props {
    data: CountryCovidData[];
}

export const CountrySection: React.FC<Props> = ({ data }) => {
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
        sortable: true,
        flex: 1,
        filterParams: {
            debounceMs: 0
        }
    }

    return (
        <div className="ag-theme-alpine" style={{ height: 550, width: '100%' }}>
            <AgGridReact
                rowData={data}
                columnDefs={columnDefs}
                defaultColDef={defaultColumnDef}
                pagination={true}
                paginationPageSize={25}
            />
        </div>
    )
}