import  { useState } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);



const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('1');



    const products = [
        {
            id: 1,
            name: 'Minecraft App',
            owner: 'Jason Roy',
            progress: '73.2%',
            priority: 'Low',
            priorityClass: 'success',
            budget: '$3.5k',
            image: 'product-1.jpg'
        },
        {
            id: 2,
            name: 'Web App Project',
            owner: 'Mathew Flintoff',
            progress: '56.8%',
            priority: 'Medium',
            priorityClass: 'warning',
            budget: '$3.5k',
            image: 'product-2.jpg'
        },
        {
            id: 3,
            name: 'Modernize Dashboard',
            owner: 'Anil Kumar',
            progress: '25%',
            priority: 'Very high',
            priorityClass: 'info',
            budget: '$3.5k',
            image: 'product-3.jpg'
        },
        {
            id: 4,
            name: 'Dashboard Co',
            owner: 'George Cruize',
            progress: '96.3%',
            priority: 'High',
            priorityClass: 'danger',
            budget: '$3.5k',
            image: 'product-4.jpg'
        }
    ];

    const transactions = [
        { time: '09:30', desc: 'Payment received from John Doe of $385.90', type: 'primary', hasLink: false },
        { time: '10:00 am', desc: 'New sale recorded', link: '#ML-3467', type: 'info', hasLink: true },
        { time: '12:00 am', desc: 'Payment was made of $64.95 to Michael', type: 'success', hasLink: false },
        { time: '09:30 am', desc: 'New sale recorded', link: '#ML-3467', type: 'warning', hasLink: true },
        { time: '09:30 am', desc: 'New arrival recorded', link: '#ML-3467', type: 'danger', hasLink: true },
        { time: '12:00 am', desc: 'Payment Done', type: 'success', hasLink: false }
    ];

    const paymentGateways = [
        { name: 'PayPal', desc: 'Big Brands', amount: '+$6,235', icon: 'icon-paypal2.svg', bg: 'primary' },
        { name: 'Wallet', desc: 'Bill payment', amount: '+$345', icon: 'icon-wallet.svg', bg: 'success', textMuted: true },
        { name: 'Credit card', desc: 'Money reversed', amount: '+$2,235', icon: 'icon-credit-card.svg', bg: 'warning' },
        { name: 'Refund', desc: 'Bill payment', amount: '-$32', icon: 'icon-pie2.svg', bg: 'danger', textMuted: true }
    ];

    const weeklyStats = [
        { title: 'Top Sales', name: 'Johnathan Doe', value: '+68', bg: 'primary' },
        { title: 'Best Seller', name: 'Footware', value: '+68', bg: 'success' },
        { title: 'Most Commented', name: 'Fashionware', value: '+68', bg: 'danger' }
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Welcome Card */}
                <div className="col-lg-8 d-flex align-items-stretch">
                    <div className="card w-100 bg-primary-subtle overflow-hidden shadow-none">
                        <div className="card-body position-relative">
                            <div className="row">
                                <div className="col-sm-7">
                                    <div className="d-flex align-items-center mb-7">
                                        <div className="rounded-circle overflow-hidden me-6">
                                            <img
                                                src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg"
                                                alt="profile"
                                                width="40"
                                                height="40"
                                            />
                                        </div>
                                        <h5 className="fw-semibold mb-0 fs-5">Welcome back Mathew Anderson!</h5>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="border-end pe-4">
                                            <h3 className="mb-1 fw-semibold fs-8 d-flex align-content-center">
                                                $2,340
                                                <i className="ti ti-arrow-up-right fs-5 lh-base text-success"></i>
                                            </h3>
                                            <p className="mb-0 text-dark">Today's Sales</p>
                                        </div>
                                        <div className="ps-4">
                                            <h3 className="mb-1 fw-semibold fs-8 d-flex align-content-center">
                                                35%
                                                <i className="ti ti-arrow-up-right fs-5 lh-base text-success"></i>
                                            </h3>
                                            <p className="mb-0 text-dark">Overall Performance</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-5">
                                    <div className="welcome-bg-img mb-n7 text-end">
                                        <img
                                            src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/welcome-bg.svg"
                                            alt="welcome"
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expense Card */}
                <div className="col-sm-6 col-lg-2 d-flex align-items-stretch">
                    <div
                        className="card w-100 border-0"
                    >
                        <div className="card-body p-4">

                            <h3
                                className="fw-bold mb-1"
                                style={{ color: "#2A3547" }}
                            >
                                $10,230
                            </h3>

                            <p
                                className="mb-3"
                                style={{
                                    color: "#7C8FAC",
                                    fontSize: "15px",
                                }}
                            >
                                Expense
                            </p>

                            <div
                                style={{
                                    height: "80px",
                                    width: "80px",
                                    margin: "0 auto",
                                }}
                            >
                                <Doughnut
                                    data={{
                                        datasets: [
                                            {
                                                data: [65, 20, 15],

                                                backgroundColor: [
                                                    "#5D87FF",
                                                    "#49BEFF",
                                                    "#FFAE1F",
                                                ],

                                                borderWidth: 0,

                                                cutout: "72%",
                                            },
                                        ],
                                    }}

                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,

                                        plugins: {
                                            legend: {
                                                display: false,
                                            },

                                            tooltip: {
                                                enabled: false,
                                            },
                                        },
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Sales Card */}
                <div className="col-sm-6 col-lg-2 d-flex align-items-stretch">
                    <div
                        className="card w-100 border-0"
                    >
                        <div className="card-body p-4">

                            <h3
                                className="fw-bold mb-1"
                                style={{ color: "#2A3547" }}
                            >
                                $65,432
                            </h3>

                            <p
                                className="mb-3"
                                style={{
                                    color: "#7C8FAC",
                                    fontSize: "15px",
                                }}
                            >
                                Sales
                            </p>

                            <div style={{ height: "80px" }}>
                                <Bar
                                    data={{
                                        labels: ["1", "2", "3", "4", "5"],

                                        datasets: [
                                            {
                                                data: [5, 7, 4, 8, 6],

                                                backgroundColor: "#49BEFF",

                                                borderRadius: 20,

                                                borderSkipped: false,

                                                barThickness: 8,
                                            },

                                            {
                                                data: [2, 3, 2, 3, 3],

                                                backgroundColor: "#5D87FF",

                                                borderRadius: 20,

                                                borderSkipped: false,

                                                barThickness: 8,
                                            },
                                        ],
                                    }}

                                    options={{
                                        responsive: true,

                                        maintainAspectRatio: false,

                                        plugins: {
                                            legend: {
                                                display: false,
                                            },

                                            tooltip: {
                                                enabled: false,
                                            },
                                        },

                                        scales: {
                                            x: {
                                                stacked: true,

                                                grid: {
                                                    display: false,
                                                },

                                                border: {
                                                    display: false,
                                                },

                                                ticks: {
                                                    display: false,
                                                },
                                            },

                                            y: {
                                                stacked: true,

                                                grid: {
                                                    display: false,
                                                },

                                                border: {
                                                    display: false,
                                                },

                                                ticks: {
                                                    display: false,
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Revenue Updates */}
                <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
                    <div
                        className="card w-100 border-0">
                        <div className="card-body p-4">

                            {/* Heading */}
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <h4 className="fw-bold mb-1">
                                        Revenue Updates
                                    </h4>

                                    <p className="text-muted fs-2 mb-0">
                                        Overview of Profit
                                    </p>
                                </div>

                                <div
                                    style={{
                                        background: "#F4F7FF",
                                        padding: "6px 12px",
                                        borderRadius: "10px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        color: "#5D87FF",
                                    }}
                                >
                                    +24%
                                </div>
                            </div>

                            {/* Chart */}
                            <div style={{ height: "155px" }}>
                                <Bar
                                    data={{
                                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

                                        datasets: [
                                            {
                                                label: "Revenue",

                                                data: [120, 190, 150, 230, 180, 260],

                                                backgroundColor: [
                                                    "#E8F1FF",
                                                    "#DCE8FF",
                                                    "#C9DBFF",
                                                    "#5D87FF",
                                                    "#AFC7FF",
                                                    "#7EA7FF",
                                                ],



                                                borderSkipped: false,

                                                borderWidth: 0,

                                                hoverBackgroundColor: "#5D87FF",

                                                barThickness: 18,
                                            },
                                        ],
                                    }}

                                    options={{
                                        responsive: true,

                                        maintainAspectRatio: false,

                                        plugins: {
                                            legend: {
                                                display: false,
                                            },

                                            tooltip: {
                                                backgroundColor: "#111827",
                                                padding: 12,
                                                cornerRadius: 12,
                                                titleColor: "#fff",
                                                bodyColor: "#fff",
                                            },
                                        },

                                        scales: {
                                            x: {
                                                grid: {
                                                    display: false,
                                                },

                                                border: {
                                                    display: false,
                                                },

                                                ticks: {
                                                    color: "#98A2B3",

                                                    font: {
                                                        size: 12,
                                                        weight: "600",
                                                    },
                                                },
                                            },

                                            y: {
                                                beginAtZero: true,

                                                grid: {
                                                    color: "#F1F5F9",
                                                },

                                                border: {
                                                    display: false,
                                                },

                                                ticks: {
                                                    color: "#98A2B3",

                                                    font: {
                                                        size: 11,
                                                    },
                                                },
                                            },
                                        },

                                        animation: {
                                            duration: 1800,
                                            easing: "easeOutQuart",
                                        },
                                    }}
                                />
                            </div>



                            {/* Footer Stats */}
                            <div className="d-flex justify-content-between mt-4">

                                <div>
                                    <h5 className="fw-bold mb-0">
                                        $58.2k
                                    </h5>

                                    <span className="text-muted fs-2">
                                        Monthly Revenue
                                    </span>
                                </div>

                                <div className="text-end">
                                    <h5
                                        className="fw-bold mb-0"
                                        style={{ color: "#16C47F" }}
                                    >
                                        +18.6%
                                    </h5>

                                    <span className="text-muted fs-2">
                                        Growth
                                    </span>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                {/* Sales Overview */}
                <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body">

                            <h4 className="card-title fw-semibold">
                                Sales Overview
                            </h4>

                            <p className="card-subtitle mb-4">
                                Every Month
                            </p>

                            <div
                                style={{
                                    height: "150px",
                                    position: "relative"
                                }}
                            >
                                <Doughnut
                                    data={{
                                        labels: ["Profit", "Expense"],

                                        datasets: [
                                            {
                                                data: [65, 35],

                                                backgroundColor: [
                                                    "#5D87FF",
                                                    "#ECF2FF"
                                                ],

                                                borderWidth: 0,

                                                cutout: "78%",
                                            },
                                        ],
                                    }}

                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,

                                        plugins: {
                                            legend: {
                                                display: false,
                                            },

                                            tooltip: {
                                                enabled: true,
                                            },
                                        },
                                    }}
                                />

                                <div
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        textAlign: "center",
                                    }}
                                >
                                    <h5
                                        style={{
                                            fontWeight: "700",
                                            color: "#5A6A85",
                                        }}
                                    >
                                        $500,458
                                    </h5>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between mt-3">

                                <div className="d-flex align-items-center">
                                    <div
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                            background: "#5D87FF",
                                            borderRadius: "50%",
                                            marginRight: "8px",
                                        }}
                                    ></div>

                                    <div>
                                        <h6 className="fw-semibold mb-0">
                                            $23,450
                                        </h6>

                                        <span className="fs-2 text-muted">
                                            Profit
                                        </span>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <div
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                            background: "#49BEFF",
                                            borderRadius: "50%",
                                            marginRight: "8px",
                                        }}
                                    ></div>

                                    <div>
                                        <h6 className="fw-semibold mb-0">
                                            $23,450
                                        </h6>

                                        <span className="fs-2 text-muted">
                                            Expense
                                        </span>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>



                {/* Right Column */}
                <div className="col-lg-4">
                    <div className="row">
                        <div className="col-sm-6 d-flex align-items-stretch">
                            <div className="card w-100">
                                <div className="card-body">
                                    <div className="p-2 bg-primary-subtle rounded-2 d-inline-block mb-3">
                                        <img
                                            src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-cart.svg"
                                            alt="cart"
                                            width="24"
                                            height="24"
                                        />
                                    </div>

                                    <div style={{ height: "50px" }}>
                                        <Line
                                            data={{
                                                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

                                                datasets: [
                                                    {
                                                        data: [8, 18, 12, 28, 20, 34, 26],

                                                        borderColor: "#5D87FF",

                                                        backgroundColor: "rgba(93,135,255,0.10)",

                                                        fill: true,

                                                        tension: 0.45,

                                                        borderWidth: 4,

                                                        pointRadius: 4,

                                                        pointHoverRadius: 6,

                                                        pointBackgroundColor: "#ffffff",

                                                        pointBorderColor: "#5D87FF",

                                                        pointBorderWidth: 3,
                                                    },
                                                ],
                                            }}

                                            options={{
                                                responsive: true,

                                                maintainAspectRatio: false,

                                                plugins: {
                                                    legend: {
                                                        display: false,
                                                    },

                                                    tooltip: {
                                                        backgroundColor: "#111827",

                                                        padding: 10,

                                                        displayColors: false,

                                                        cornerRadius: 10,
                                                    },
                                                },

                                                scales: {
                                                    x: {
                                                        display: false,

                                                        grid: {
                                                            display: false,
                                                        },

                                                        border: {
                                                            display: false,
                                                        },
                                                    },

                                                    y: {
                                                        display: false,

                                                        grid: {
                                                            display: false,
                                                        },

                                                        border: {
                                                            display: false,
                                                        },

                                                        suggestedMin: 0,

                                                        suggestedMax: 40,
                                                    },
                                                },

                                                elements: {
                                                    line: {
                                                        cubicInterpolationMode: "monotone",
                                                    },
                                                },

                                                interaction: {
                                                    intersect: false,

                                                    mode: "index",
                                                },
                                            }}
                                        />
                                    </div>



                                    <h4 className="mb-1 fw-semibold d-flex align-content-center">
                                        $16.5k
                                        <i className="ti ti-arrow-up-right fs-5 text-success"></i>
                                    </h4>
                                    <p className="mb-0">Sales</p>
                                </div>
                            </div>
                        </div>



                        {/* Growth Card */}
                        <div className="col-sm-6 d-flex align-items-stretch">
                            <div className="card w-100 border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">

                                    <div className="p-2 bg-info-subtle rounded-3 d-inline-flex mb-3">
                                        <img
                                            src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-bar.svg"
                                            alt="bar"
                                            width="20"
                                            height="20"
                                        />
                                    </div>

                                    <div style={{ height: "32px" }}>
                                        <Line
                                            data={{
                                                labels: ["", "", "", "", "", "", ""],

                                                datasets: [
                                                    {
                                                        data: [12, 18, 15, 25, 20, 30, 28],

                                                        borderColor: "#5D87FF",

                                                        backgroundColor: "rgba(93,135,255,0.12)",

                                                        tension: 0.5,

                                                        fill: true,

                                                        borderWidth: 3,

                                                        pointRadius: 0,
                                                    },
                                                ],
                                            }}

                                            options={{
                                                responsive: true,

                                                maintainAspectRatio: false,

                                                plugins: {
                                                    legend: {
                                                        display: false,
                                                    },

                                                    tooltip: {
                                                        enabled: false,
                                                    },
                                                },

                                                scales: {
                                                    x: {
                                                        display: false,

                                                        grid: {
                                                            display: false,
                                                        },

                                                        border: {
                                                            display: false,
                                                        },
                                                    },

                                                    y: {
                                                        display: false,

                                                        grid: {
                                                            display: false,
                                                        },

                                                        border: {
                                                            display: false,
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </div>

                                    <h3 className="fw-bold mb-1 text-dark d-flex align-items-center">
                                        24%
                                        <i className="ti ti-arrow-up-right fs-5 text-success ms-1"></i>
                                    </h3>

                                    <p className="mb-3 text-muted fw-medium">
                                        Growth
                                    </p>

                                    {/* Mini Line Chart */}


                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Earnings */}
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-start">
                                <div className="col-8">
                                    <h4 className="card-title mb-9 fw-semibold">Monthly Earnings</h4>
                                    <div className="d-flex align-items-center mb-3">
                                        <h4 className="fw-semibold mb-0 me-8">$6,820</h4>
                                        <div className="d-flex align-items-center">
                                            <span className="me-2 rounded-circle bg-success-subtle text-success round-20 d-flex align-items-center justify-content-center">
                                                <i className="ti ti-arrow-up-left"></i>
                                            </span>
                                            <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="d-flex justify-content-end">
                                        <div className="p-2 bg-primary-subtle rounded-2 d-inline-block">
                                            <img
                                                src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-master-card-2.svg"
                                                alt="card"
                                                width="24"
                                                height="24"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ height: "32px" }}>
                                    <Line
                                        data={{
                                            labels: ["", "", "", "", "", "", ""],

                                            datasets: [
                                                {
                                                    data: [12, 18, 15, 25, 20, 30, 28],

                                                    borderColor: "#5D87FF",

                                                    backgroundColor: "rgba(93,135,255,0.12)",

                                                    tension: 0.5,

                                                    fill: true,

                                                    borderWidth: 3,

                                                    pointRadius: 0,
                                                },
                                            ],
                                        }}

                                        options={{
                                            responsive: true,

                                            maintainAspectRatio: false,

                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },

                                                tooltip: {
                                                    enabled: false,
                                                },
                                            },

                                            scales: {
                                                x: {
                                                    display: false,

                                                    grid: {
                                                        display: false,
                                                    },

                                                    border: {
                                                        display: false,
                                                    },
                                                },

                                                y: {
                                                    display: false,

                                                    grid: {
                                                        display: false,
                                                    },

                                                    border: {
                                                        display: false,
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weekly Stats */}
                <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body">
                            <h4 className="card-title fw-semibold">Weekly Stats</h4>
                            <p className="card-subtitle mb-0">Average sales</p>
                            <div style={{ height: "100px" }}>
                                <Line
                                    data={{
                                        labels: ["", "", "", "", "", "", "", ""],

                                        datasets: [
                                            {
                                                data: [10, 24, 16, 32, 22, 38, 30, 42],

                                                borderColor: "#5D87FF",

                                                backgroundColor: (context) => {
                                                    const chart = context.chart;
                                                    const { ctx, chartArea } = chart;

                                                    if (!chartArea) return null;

                                                    const gradient = ctx.createLinearGradient(
                                                        0,
                                                        0,
                                                        0,
                                                        chartArea.bottom
                                                    );

                                                    gradient.addColorStop(
                                                        0,
                                                        "rgba(93,135,255,0.35)"
                                                    );

                                                    gradient.addColorStop(
                                                        1,
                                                        "rgba(93,135,255,0)"
                                                    );

                                                    return gradient;
                                                },

                                                fill: true,

                                                tension: 0.6,

                                                borderWidth: 4,

                                                pointRadius: 0,

                                                pointHoverRadius: 6,

                                                pointHoverBackgroundColor: "#5D87FF",

                                                pointHoverBorderColor: "#fff",

                                                pointHoverBorderWidth: 3,
                                            },
                                        ],
                                    }}

                                    options={{
                                        responsive: true,

                                        maintainAspectRatio: false,

                                        plugins: {
                                            legend: {
                                                display: false,
                                            },

                                            tooltip: {
                                                enabled: false,
                                            },
                                        },

                                        scales: {
                                            x: {
                                                display: false,

                                                grid: {
                                                    display: false,
                                                },

                                                border: {
                                                    display: false,
                                                },
                                            },

                                            y: {
                                                display: false,

                                                grid: {
                                                    display: false,
                                                },

                                                border: {
                                                    display: false,
                                                },
                                            },
                                        },

                                        elements: {
                                            line: {
                                                cubicInterpolationMode: "monotone",
                                            },
                                        },
                                    }}
                                />
                            </div>
                            <div className="position-relative mt-4">
                                {weeklyStats.map((stat, index) => (
                                    <div key={index} className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="d-flex">
                                            <div className={`p-6 bg-${stat.bg}-subtle text-${stat.bg} rounded-2 me-6 d-flex align-items-center justify-content-center`}>
                                                <i className="ti ti-grid-dots fs-6"></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-1 fs-4 fw-semibold">{stat.title}</h6>
                                                <p className="fs-3 mb-0">{stat.name}</p>
                                            </div>
                                        </div>
                                        <div className={`bg-${stat.bg}-subtle text-${stat.bg} badge`}>
                                            <p className="fs-3 fw-semibold mb-0">{stat.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Yearly Sales */}
                <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body">
                            <h4 className="card-title fw-semibold">Yearly Sales</h4>
                            <p className="card-subtitle">Every month</p>



                            {/* Monthly Column Chart */}
<div style={{ height: "240px" }}>
  <Bar
    data={{
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

      datasets: [
        {
          data: [22, 35, 28, 42, 36, 48],

          backgroundColor: [
            "rgba(93,135,255,1)",
            "rgba(73,190,255,1)",
            "rgba(93,135,255,1)",
            "rgba(73,190,255,1)",
            "rgba(93,135,255,1)",
            "rgba(73,190,255,1)",
          ],

          borderRadius: 30,

          borderSkipped: false,

          borderWidth: 0,

          barThickness: 16,

          hoverBackgroundColor: [
            "#7C9CFF",
            "#6DD3FF",
            "#7C9CFF",
            "#6DD3FF",
            "#7C9CFF",
            "#6DD3FF",
          ],
        },
      ],
    }}

    options={{
      responsive: true,

      maintainAspectRatio: false,

      layout: {
        padding: {
          top: 10,
        },
      },

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          backgroundColor: "#111827",

          padding: 12,

          cornerRadius: 14,

          displayColors: false,

          callbacks: {
            label: function (context) {
              return `$${context.raw}k Revenue`;
            },
          },
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },

          border: {
            display: false,
          },

          ticks: {
            color: "#7C8FAC",

            padding: 12,

            font: {
              size: 13,
              weight: "600",
            },
          },
        },

        y: {
          display: false,

          grid: {
            display: false,
          },

          border: {
            display: false,
          },
        },
      },

      animation: {
        duration: 1800,

        easing: "easeOutQuart",
      },
    }}
  />
</div>
                            <div className="d-flex align-items-center justify-content-between mt-4">
                                <div className="d-flex align-items-center">
                                    <div className="bg-primary-subtle text-primary rounded-2 me-8 p-8 d-flex align-items-center justify-content-center">
                                        <i className="ti ti-grid-dots fs-6"></i>
                                    </div>
                                    <div>
                                        <p className="fs-3 mb-0 fw-normal">Total Sales</p>
                                        <h6 className="fw-semibold text-dark fs-4 mb-0">$36,358</h6>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="bg-light-subtle text-muted rounded-2 me-8 p-8 d-flex align-items-center justify-content-center">
                                        <i className="ti ti-grid-dots fs-6"></i>
                                    </div>
                                    <div>
                                        <p className="fs-3 mb-0 fw-normal">Expenses</p>
                                        <h6 className="fw-semibold text-dark fs-4 mb-0">$5,296</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Gateways */}
                <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body">
                            <h4 className="card-title fw-semibold">Payment Gateways</h4>
                            <p className="card-subtitle mb-7">Platform for Income</p>
                            <div className="position-relative">
                                {paymentGateways.map((gateway, index) => (
                                    <div key={index} className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="d-flex">
                                            <div className={`p-8 bg-${gateway.bg}-subtle rounded-2 d-flex align-items-center justify-content-center me-6`}>
                                                <img
                                                    src={`https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/${gateway.icon}`}
                                                    alt={gateway.name}
                                                    width="24"
                                                    height="24"
                                                />
                                            </div>
                                            <div>
                                                <h6 className="mb-1 fs-4 fw-semibold">{gateway.name}</h6>
                                                <p className="fs-3 mb-0">{gateway.desc}</p>
                                            </div>
                                        </div>
                                        <h6 className={`mb-0 fw-semibold ${gateway.textMuted ? 'text-muted' : ''}`}>{gateway.amount}</h6>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-outline-primary w-100">View all transactions</button>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body">
                            <div className="mb-4">
                                <h4 className="card-title fw-semibold">Recent Transactions</h4>
                                <p className="card-subtitle">How to Secure Recent Transactions</p>
                            </div>
                            <ul className="timeline-widget mb-0 position-relative">
                                {transactions.map((transaction, index) => (
                                    <li key={index} className="timeline-item d-flex position-relative overflow-hidden mb-3">
                                        <div className="timeline-time text-dark flex-shrink-0 text-end" style={{ minWidth: '70px' }}>
                                            {transaction.time}
                                        </div>
                                        <div className="timeline-badge-wrap d-flex flex-column align-items-center mx-3">
                                            <span className={`timeline-badge border-2 border border-${transaction.type} flex-shrink-0 my-8`} style={{ width: '12px', height: '12px', borderRadius: '50%' }}></span>
                                            {index !== transactions.length - 1 && (
                                                <span className="timeline-badge-border d-block flex-shrink-0" style={{ width: '2px', height: '100%', background: '#e0e0e0' }}></span>
                                            )}
                                        </div>
                                        <div className="timeline-desc fs-3 text-dark mt-n1">
                                            {transaction.desc}
                                            {transaction.hasLink && (
                                                <a href="javascript:void(0)" className="text-primary d-block fw-normal">{transaction.link}</a>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Product Performances Table */}
                <div className="col-md-12 col-lg-8 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body">
                            <div className="d-sm-flex d-block align-items-center justify-content-between mb-3">
                                <div className="mb-3 mb-sm-0">
                                    <h4 className="card-title fw-semibold">Product Performances</h4>
                                    <p className="card-subtitle">What Impacts Product Performance?</p>
                                </div>
                                <div>
                                    <select
                                        className="form-select fw-semibold"
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                    >
                                        <option value="1">March 2024</option>
                                        <option value="2">April 2024</option>
                                        <option value="3">May 2024</option>
                                        <option value="4">June 2024</option>
                                    </select>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table align-middle text-nowrap mb-0">
                                    <thead>
                                        <tr className="text-muted fw-semibold">
                                            <th scope="col" className="ps-0">Assigned</th>
                                            <th scope="col">Progress</th>
                                            <th scope="col">Priority</th>
                                            <th scope="col">Budget</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top">
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td className="ps-0">
                                                    <div className="d-flex align-items-center">
                                                        <div className="me-2 pe-1">
                                                            <img
                                                                src={`https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/products/${product.image}`}
                                                                className="rounded-2"
                                                                width="48"
                                                                height="48"
                                                                alt={product.name}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h6 className="fw-semibold mb-1">{product.name}</h6>
                                                            <p className="fs-2 mb-0 text-muted">{product.owner}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0 fs-3 text-dark">{product.progress}</p>
                                                </td>
                                                <td>
                                                    <span className={`badge fw-semibold py-1 px-3 bg-${product.priorityClass}-subtle text-${product.priorityClass}`}>
                                                        {product.priority}
                                                    </span>
                                                </td>
                                                <td>
                                                    <p className="fs-3 text-dark mb-0">{product.budget}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;