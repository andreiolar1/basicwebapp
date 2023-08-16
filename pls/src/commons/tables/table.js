import React from 'react';
import { useTable, useGlobalFilter, useFilters, useAsyncDebounce } from 'react-table';
import { Col, Row } from 'react-bootstrap';
import { GlobalFilter, DefaultFilterForColumn } from './Filter';

// Inserts filters

function getTRPropsType(state, rowInfo) {
    if (rowInfo) {
        return {
            style: {
                textAlign: 'center',
            },
        };
    } else return {};
}

function filter(data, filtered) {
    let accepted = true;

    filtered.forEach((val) => {
        if (String(val.value) === '') {
            accepted = true;
        }

        if (
            !String(data[val.column.id]).includes(String(val.value)) &&
            !String(val.value).includes(String(data[val.column.id]))
        ) {
            accepted = false;
        }
    });

    return accepted;
}

export default function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        visibleColumns,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn: { Filter: DefaultFilterForColumn },
            filterFn: filter,
        },
        useFilters,
        useGlobalFilter
    );

    const handleFilterInputChange = (e) => {
        const { value } = e.currentTarget;
        setGlobalFilter(value);
    };

    return (
        <table {...getTableProps()}>
            <thead>
                <tr>
                    <th
                        colSpan={visibleColumns.length}
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        {/* rendering global filter */}
                        <GlobalFilter
                            // preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    </th>
                </tr>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                                {/* rendering column filter */}
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
