import React, { useState } from 'react'
import { DateRangePicker } from "mui-daterange-picker";

export default function DatePicker() {
    const [open, setOpen] = useState(true);
    const [dateRange, setDateRange] = useState({});

    const toggle = () => setOpen(!open);

    console.log(dateRange);
    return (
        <div>
            <button onClick={toggle}>X</button>
            <DateRangePicker
                open={open}
                toggle={toggle}
                onChange={(range) => setDateRange(range)}
            />
        </div>
    )
}

// npm i @mui/material date-fns @mui/icons-material/ArrowRightAlt @mui/icons-material/ChevronLeft @mui/icons-material/ChevronRight