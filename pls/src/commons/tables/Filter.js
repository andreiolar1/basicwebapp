import { useMemo, useState } from "react";
import * as React from "react";
import { useAsyncDebounce } from "react-table";
import { Label, Input, Row } from "reactstrap";

// Component for Global Filter
export function GlobalFilter({ globalFilter, setGlobalFilter }) {
    const [value, setValue] = useState(globalFilter);

    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div>
            <Label>Search Table: </Label>
            <Input
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder=" Enter value "
                className="w-25"
                style={{
                    fontSize: "1.1rem",
                    margin: "15px",
                    display: "inline",
                }}
            />
        </div>
    );
}

// Component for Default Column Filter
export function DefaultFilterForColumn({
    column: {
        filterValue,
        preFilteredRows: { length },
        setFilter,
    },
}) {
    return (
        <Input
            value={filterValue || ""}
            onChange={(e) => {
                // Set undefined to remove the filter entirely
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Search ${length} records..`}
            style={{ marginTop: "10px" }}
        />
    );
}

// Component for Custom Select Filter
