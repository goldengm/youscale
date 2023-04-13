export const ORDER_STATS_DATA = {
    labels: [
        "Delivred",
        "Pending",
        "Cancelled"
    ],
    datasets: [
        {
            label: "Local",
            data: [164, 85, 91],
            fill: true,
            backgroundColor: ["#43A047", "#F68407", "#E53935"],
        }
    ],
};

export const PERFORMANCE_STATS_DATA = {
    labels: [
        "Errone",
        "Confirme",
        "Injoignable",
        "Annule",
        "Refuse",
        "Reporte",
        "Livre",
        "Expedie"
    ],
    datasets: [
        {
            label: "Aicha",
            data: [2, 77, 95, 26, 73, 25, 63, 65, 73],
            fill: true,
            backgroundColor: ["rgb(91,155,213)"],
        }
    ],
};

export const EARNING_STATS_DATA = {
    labels: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Main",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
    ],
    datasets: [
        {
            label: "Aicha",
            data: [2, 77, 60, 26, 73, 25, 63, 65, 73, 20, 18, 13],
            fill: true,
            backgroundColor: ["#DC6232"],
        }
    ],
};

export const DATA_LINE = {
    labels: ["03/01", "04/01", "05/01", "06/01", "07/01", "08/01", "09/01", "10/01", "11/01", "12/01"],
    datasets: [{
        label: 'Delivred',
        data: [65, 59, 80, 81, 56, 55, 40, 10, 23, 34],
        fill: false,
        borderColor: '#43A047',
        tension: 0.3
    },
    {
        label: 'Pending',
        data: [10, 32, 45, 53, 64, 6, 23, 43, 36, 21],
        fill: false,
        borderColor: 'rgba(250, 182, 35, 0.5)',
        tension: 0.3
    },
    {
        label: 'Canceled',
        data: [80, 75, 78, 20, 15, 35, 66, 9, 56, 48],
        fill: false,
        borderColor: '#E53935',
        tension: 0.3
    },
    ]
}

export const INCOMES_EXPENSES_DATA = {
    labels: ["03/01", "04/01", "05/01", "06/01", "07/01", "08/01", "09/01"],
    datasets: [{
        label: 'Incomes',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: '#3A974C',
        tension: 0.3
    },
    {
        label: 'Expenses',
        data: [10, 32, 45, 53, 64, 6, 23],
        fill: false,
        backgroundColor: '#E53935',
        tension: 0.3
    }
    ]
}