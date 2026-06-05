import { useEffect, useState } from 'react';
import { FaArrowTurnDown, FaCopy } from "react-icons/fa6";
import { ImSortAmountDesc } from "react-icons/im";
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
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
import QRModal from './QRModal';
import { Link } from 'react-router-dom';

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
    const navigate = useNavigate();
    const { userData } = useUser();
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    const openQRModal = () => {
        setIsQRModalOpen(true);
    };

    const closeQRModal = () => {
        setIsQRModalOpen(false);
    };

    const getReferralLink = () => {
        return `${window.location.origin}/register?ref=${userData?.directId || 'TEST123'}`;
    };

    // Redirect to statement page with type
    const goToStatement = (type) => {
        navigate(`/dashboard/accstatement?type=${type}`);
    };


    return (
        <div className="container-fluid">
            <QRModal
                isOpen={isQRModalOpen}
                onClose={closeQRModal}
                referralLink={getReferralLink()}
                userData={userData}
            />

            <div className="row">
                {/* Welcome Card */}
                <div className="col-12 col-lg-8 d-flex align-items-stretch">
                    <div className="card w-100 bg-primary-subtle overflow-hidden shadow-none">
                        <div className="card-body position-relative">
                            <div className="row">
                                <div className="col-12 col-sm-7">
                                    <div className="d-flex align-items-center justify-content-between mb-7">
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle overflow-hidden me-6 flex-shrink-0">
                                                <img
                                                    src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg"
                                                    alt="profile"
                                                    width="40"
                                                    height="40"
                                                />
                                            </div>
                                            <h5 className="fw-semibold mb-0 fs-5 fs-sm-4">
                                                Welcome back <span style={{ color: "#04832f" }}>{userData?.name}</span>
                                            </h5>
                                        </div>
                                        <button
                                            onClick={openQRModal}
                                            className="btn d-block d-sm-none"
                                            style={{
                                                backgroundColor: "#04832f",
                                                color: "white",
                                                border: "none",
                                                padding: "6px 16px",
                                                borderRadius: "6px",
                                                fontSize: "13px",
                                                fontWeight: "500",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Invite
                                        </button>
                                    </div>

                                    <div className="d-flex align-items-center flex-wrap gap-3">
                                        <div className="border-end pe-4">
                                            <Link to='/dashboard/InvestmentHistory'>
                                                <h3 className="mb-1 fw-semibold fs-7 d-flex align-content-center hover">
                                                    ${userData?.BotAmount?.toFixed(2) || 0}
                                                    <i className="ti ti-arrow-up-right fs-5 lh-base text-success"></i>
                                                </h3>
                                            </Link>
                                            <p className="mb-0 text-dark fs-5 fw-medium">Bot</p>
                                        </div>
                                        <div className="ps-0 ps-sm-4">
                                            <Link to='/dashboard/InvestmentHistory'>
                                                <h3 className="mb-1 fw-semibold fs-7 d-flex align-content-center hover">
                                                    ${userData?.Invest?.toFixed(2) || '0.00'}
                                                    <i className="ti ti-arrow-up-right fs-5 lh-base text-success"></i>
                                                </h3>
                                            </Link>
                                            <p className="mb-0 text-dark fs-5 fw-medium">Invest</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-5 mt-4 mt-sm-0">
                                    <div className="welcome-bg-img text-center text-sm-end position-relative">
                                        <button
                                            onClick={openQRModal}
                                            className="btn d-none d-sm-inline-block position-absolute"
                                            style={{
                                                backgroundColor: "#04832f",
                                                color: "white",
                                                border: "none",
                                                padding: "8px 24px",
                                                borderRadius: "6px",
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                cursor: "pointer",
                                                top: "0",
                                                right: "0",
                                                zIndex: 1,
                                            }}
                                        >
                                            Invite
                                        </button>
                                        <img
                                            src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/welcome-bg.svg"
                                            alt="welcome"
                                            className="img-fluid"
                                            style={{ maxWidth: "100%", height: "auto" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deposit Fund Card */}
                <div className="col-6 col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100 border-0">

                    <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
    <input type="text" className="form-control" placeholder='Enter Login Id' style={{flex: 1}} />
    <button type="button" className="btn btn-primary" style={{width: "100px"}}>
        Primary
    </button>
</div>



                        <div className="card-body p-4">
                            <Link to="Deposit-History">
                            <h3 className="fw-bold mb-1 hover">
                                ${userData?.Depositfund}
                            </h3>
                            </Link>
                            <p className="mb-3" style={{ color: "#7C8FAC", fontSize: "15px" }}>
                                Deposit Fund
                            </p>
                            <div style={{ height: "80px", width: "80px", margin: "0 auto" }}>
                            </div>
                        </div>
                    </div>
                </div>

                {/* All Income Card */}
                <div className="col-6 col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100 border-0">
                        <div className="card-body p-4">
                            <Link to="accstatement">
                            <h3 className="fw-bold mb-1 hover">
                                ${userData?.Working?.toFixed(2) || '0.00'}
                            </h3>
                             </Link>
                            <p className="mb-3" style={{ color: "#7C8FAC", fontSize: "15px" }}>
                                All Income
                            </p>                          
                            <div style={{ height: "80px" }}>
                                <Bar
                                    data={{
                                        labels: ["1", "2", "3", "4", "5"],
                                        datasets: [
                                            { data: [5, 7, 4, 8, 6], backgroundColor: "#49BEFF", borderRadius: 20, borderSkipped: false, barThickness: 8 },
                                            { data: [2, 3, 2, 3, 3], backgroundColor: "#5D87FF", borderRadius: 20, borderSkipped: false, barThickness: 8 },
                                        ],
                                    }}
                                    options={{
                                        responsive: true, maintainAspectRatio: false,
                                        plugins: { legend: { display: false }, tooltip: { enabled: false } },
                                        scales: { x: { stacked: true, grid: { display: false }, border: { display: false }, ticks: { display: false } }, y: { stacked: true, grid: { display: false }, border: { display: false }, ticks: { display: false } } }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revenue Updates */}
                {/* <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100 border-0">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <h4 className="fw-bold mb-1">Revenue Updates</h4>
                                    <p className="text-muted fs-2 mb-0">Overview of Profit</p>
                                </div>
                                <div style={{ background: "#F4F7FF", padding: "6px 12px", borderRadius: "10px", fontSize: "12px", fontWeight: "600", color: "#5D87FF" }}>+24%</div>
                            </div>
                            <div style={{ height: "155px" }}>
                                <Bar
                                    data={{
                                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                                        datasets: [{ label: "Revenue", data: [120, 190, 150, 230, 180, 260], backgroundColor: ["#E8F1FF", "#DCE8FF", "#C9DBFF", "#5D87FF", "#AFC7FF", "#7EA7FF"], borderSkipped: false, borderWidth: 0, hoverBackgroundColor: "#5D87FF", barThickness: 18 }],
                                    }}
                                    options={{
                                        responsive: true, maintainAspectRatio: false,
                                        plugins: { legend: { display: false }, tooltip: { backgroundColor: "#111827", padding: 12, cornerRadius: 12 } },
                                        scales: { x: { grid: { display: false }, border: { display: false }, ticks: { color: "#98A2B3", font: { size: 12, weight: "600" } } }, y: { beginAtZero: true, grid: { color: "#F1F5F9" }, border: { display: false }, ticks: { color: "#98A2B3", font: { size: 11 } } } }
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                <div><h5 className="fw-bold mb-0">$58.2k</h5><span className="text-muted fs-2">Monthly Revenue</span></div>
                                <div className="text-end"><h5 className="fw-bold mb-0" style={{ color: "#16C47F" }}>+18.6%</h5><span className="text-muted fs-2">Growth</span></div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Sales Overview */}
                <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body">
                            <h4 className="card-title fw-semibold">Sales Overview</h4>
                            <p className="card-subtitle mb-4">Every Month</p>
                            <div style={{ height: "150px", position: "relative" }}>
                                <Doughnut
                                    data={{ labels: ["Profit", "Expense"], datasets: [{ data: [65, 35], backgroundColor: ["#5D87FF", "#ECF2FF"], borderWidth: 0, cutout: "78%" }] }}
                                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: true } } }}
                                />
                                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                                    <h5 style={{ fontWeight: "700", color: "#5A6A85" }}>$500,458</h5>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-3">
                                <div className="d-flex align-items-center"><div style={{ width: "10px", height: "10px", background: "#5D87FF", borderRadius: "50%", marginRight: "8px" }}></div><div><h6 className="fw-semibold mb-0">$23,450</h6><span className="fs-2 text-muted">Profit</span></div></div>
                                <div className="d-flex align-items-center"><div style={{ width: "10px", height: "10px", background: "#49BEFF", borderRadius: "50%", marginRight: "8px" }}></div><div><h6 className="fw-semibold mb-0">$23,450</h6><span className="fs-2 text-muted">Expense</span></div></div>
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
                                    <div className="p-2 bg-primary-subtle rounded-2 d-inline-block mb-3"><FaArrowTurnDown fontSize={18} /></div>
                                    <div style={{ height: "50px" }}>
                                        <Line
                                            data={{
                                                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                                                datasets: [{ data: [8, 18, 12, 28, 20, 34, 26], borderColor: "#5D87FF", backgroundColor: "rgba(93,135,255,0.10)", fill: true, tension: 0.45, borderWidth: 4, pointRadius: 4, pointHoverRadius: 6, pointBackgroundColor: "#ffffff", pointBorderColor: "#5D87FF", pointBorderWidth: 3 }],
                                            }}
                                            options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: "#111827", padding: 10, displayColors: false, cornerRadius: 10 } }, scales: { x: { display: false, grid: { display: false }, border: { display: false } }, y: { display: false, grid: { display: false }, border: { display: false }, suggestedMin: 0, suggestedMax: 40 } } }}
                                        />
                                    </div>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() => goToStatement("Current Bonus")}
                                    >
                                        <h4 className="mb-1 fw-semibold d-flex align-content-center hover">
                                            ${userData?.totalWallet?.toFixed(2) || "0.00"}
                                            <i className="ti ti-arrow-up-right fs-5 text-success"></i>
                                        </h4>
                                        <p className="mb-0">Current Bonus</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 d-flex align-items-stretch">
                            <div className="card w-100 border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">
                                    <div className="p-2 bg-primary-subtle rounded-2 d-inline-block mb-3"><ImSortAmountDesc fontSize={18} /></div>
                                    <div style={{ height: "32px" }}>
                                        <Line
                                            data={{
                                                labels: ["", "", "", "", "", "", ""],
                                                datasets: [{ data: [12, 18, 15, 25, 20, 30, 28], borderColor: "#5D87FF", backgroundColor: "rgba(93,135,255,0.12)", tension: 0.5, fill: true, borderWidth: 3, pointRadius: 0 }],
                                            }}
                                            options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false, grid: { display: false }, border: { display: false } }, y: { display: false, grid: { display: false }, border: { display: false } } } }}
                                        />
                                    </div>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() => goToStatement("FUND WITHDRAWAL")}
                                    >
                                        <h3 className="fw-bold mb-1 d-flex align-items-center mt-3 hover">
                                            ${userData?.withdrawal}
                                            <i className="ti ti-arrow-up-right fs-5 text-success ms-1"></i>
                                        </h3>
                                        <p className="mb-3 text-muted fw-medium">Withdrawal</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trading Passive Income */}
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-start">
                                <div className="col-8">
                                    <h4 className="card-title mb-9 fw-semibold">Trading Passive Income</h4>
                                    <div
                                        className="d-flex align-items-center mb-3"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => goToStatement("TRADING PASSIVE INCOME")}
                                    >
                                        <h4 className="fw-semibold mb-0 me-8 hover">${userData?.TradingPassiveIncome?.toFixed(2) || "0.00"}</h4>
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
                                            <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-master-card-2.svg" alt="card" width="24" height="24" />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ height: "32px" }}>
                                    <Line
                                        data={{
                                            labels: ["", "", "", "", "", "", ""],
                                            datasets: [{ data: [12, 18, 15, 25, 20, 30, 28], borderColor: "#5D87FF", backgroundColor: "rgba(93,135,255,0.12)", tension: 0.5, fill: true, borderWidth: 3, pointRadius: 0 }],
                                        }}
                                        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false, grid: { display: false }, border: { display: false } }, y: { display: false, grid: { display: false }, border: { display: false } } } }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team/Business Details - 4 Income Cards with Click */}
                <div className="container-fluid">
                    <div className="row g-3">
                        <div className="col-12 col-lg-8">
                            <div className="row g-2">
                                {/* Card 1 - IB Income */}
                                <div className="col-6 col-md-6 col-lg-3 d-flex align-items-stretch">
                                    <div
                                        className="card w-100 border-0 shadow-sm"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => goToStatement("IB INCOME")}
                                    >
                                        <div className="card-body p-3">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div>
                                                    <p className="text-muted mb-1 fs-2">IB Income</p>
                                                    <h5 className="fw-bold mb-0 hover">
                                                        ${userData?.IBIncome?.toLocaleString() || '0.00'}
                                                    </h5>
                                                </div>
                                                <div className="p-2 bg-primary-subtle rounded-2">
                                                    <i className="ti ti-users fs-5 text-primary"></i>
                                                </div>
                                            </div>
                                            <div style={{ height: "70px", width: "70px", margin: "0 auto" }}>
                                                <Doughnut
                                                    data={{ datasets: [{ data: [65, 35], backgroundColor: ["#5D87FF", "#E8F1FF"], borderWidth: 0, cutout: "70%" }] }}
                                                    options={{ responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 - Reward Income */}
                                <div className="col-6 col-md-6 col-lg-3 d-flex align-items-stretch">
                                    <div
                                        className="card w-100 border-0 shadow-sm"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => goToStatement("REWARD INCOME")}
                                    >
                                        <div className="card-body p-3">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div>
                                                    <p className="text-muted mb-1 fs-2">Reward Income</p>
                                                    <h5 className="fw-bold mb-0 hover">
                                                        ${userData?.Reward?.toLocaleString() || '0.00'}
                                                    </h5>
                                                </div>
                                                <div className="p-2 bg-success-subtle rounded-2">
                                                    <i className="ti ti-gift fs-5 text-success"></i>
                                                </div>
                                            </div>
                                            <div style={{ height: "70px" }}>
                                                <Line
                                                    data={{
                                                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                                                        datasets: [{ data: [12, 19, 15, 25, 22, 30], borderColor: "#49BEFF", backgroundColor: "rgba(73,190,255,0.1)", fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0 }],
                                                    }}
                                                    options={{ responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3 - Royalty Income */}
                                <div className="col-6 col-md-6 col-lg-3 d-flex align-items-stretch">
                                    <div
                                        className="card w-100 border-0 shadow-sm"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => goToStatement("ROYALTY INCOME")}
                                    >
                                        <div className="card-body p-3">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div>
                                                    <p className="text-muted mb-1 fs-2">Royalty Income</p>
                                                    <h5 className="fw-bold mb-0 hover">
                                                        ${userData?.RoyaltyIncome?.toLocaleString() || '0.00'}
                                                    </h5>
                                                </div>
                                                <div className="p-2 bg-warning-subtle rounded-2">
                                                    <i className="ti ti-crown fs-5 text-warning"></i>
                                                </div>
                                            </div>
                                            <div style={{ height: "70px", width: "70px", margin: "0 auto" }}>
                                                <Doughnut
                                                    data={{ datasets: [{ data: [40, 30, 30], backgroundColor: ["#FFAE1F", "#49BEFF", "#5D87FF"], borderWidth: 0, cutout: "60%" }] }}
                                                    options={{ responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 4 - Company Profit */}
                                <div className="col-6 col-md-6 col-lg-3 d-flex align-items-stretch">
                                    <div
                                        className="card w-100 border-0 shadow-sm"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => goToStatement("Company Profit    ")}
                                    >
                                        <div className="card-body p-3">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div>
                                                    <p className="text-muted mb-1 fs-2">Company Profit</p>
                                                    <h5 className="fw-bold mb-0 hover">
                                                        ${userData?.GlobalRoyaltyIncome?.toLocaleString() || '0.00'}
                                                    </h5>
                                                </div>
                                                <div className="p-2 bg-info-subtle rounded-2">
                                                    <i className="ti ti-building fs-5 text-info"></i>
                                                </div>
                                            </div>
                                            <div style={{ height: "70px" }}>
                                                <Bar
                                                    data={{
                                                        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                                                        datasets: [{ data: [30, 45, 35, 60, 50, 75], backgroundColor: "#FFAE1F", borderRadius: 8, barThickness: 15 }],
                                                    }}
                                                    options={{ responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Team/Business Details Card */}
                        <div className="col-12 col-lg-4 d-flex align-items-stretch">
                            <div className="card w-100 border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title fw-semibold mb-3">Team/Business Details</h5>

                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="p-2 bg-primary-subtle rounded-2"><i className="ti ti-user fs-5 text-primary"></i></div>
                                            <h6 className="mb-0 fw-semibold">Direct Id</h6>
                                        </div>
                                        <h6 className="mb-0 fw-semibold">{userData?.directId || '00'}</h6>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="p-2" style={{ backgroundColor: '#E3F2FD', borderRadius: '8px' }}><i className="ti ti-chart-line fs-5" style={{ color: '#1976D2' }}></i></div>
                                            <h6 className="mb-0 fw-semibold">Invest Business</h6>
                                        </div>
                                        <h6 className="mb-0 fw-semibold">${userData?.Invest?.toLocaleString() || '0.00'}</h6>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="p-2" style={{ backgroundColor: '#E3F2FD', borderRadius: '8px' }}><i className="ti ti-arrows-exchange fs-5" style={{ color: '#1976D2' }}></i></div>
                                            <h6 className="mb-0 fw-semibold">Strong/Weaker Leg</h6>
                                        </div>
                                        <h6 className="mb-0 fw-semibold">
                                            <span className="text-success">${userData?.strongLeg?.toLocaleString() || '0'}.00</span> /
                                            <span className="text-danger"> ${userData?.weakerLeg?.toLocaleString() || '0'}.00</span>
                                        </h6>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="p-2" style={{ backgroundColor: '#E3F2FD', borderRadius: '8px' }}><i className="ti ti-repeat fs-5" style={{ color: '#1976D2' }}></i></div>
                                            <h6 className="mb-0 fw-semibold">Team Carryforward</h6>
                                        </div>
                                        <h6 className="mb-0 fw-semibold">
                                            <span className="text-success">${userData?.leftCarry?.toLocaleString() || '0'}.00</span> /
                                            <span className="text-danger"> ${userData?.rightCarry?.toLocaleString() || '0'}.00</span>
                                        </h6>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="p-2" style={{ backgroundColor: '#E3F2FD', borderRadius: '8px' }}><i className="ti ti-calendar-stats fs-5" style={{ color: '#1976D2' }}></i></div>
                                            <h6 className="mb-0 fw-semibold">Current Month Business</h6>
                                        </div>
                                        <h6 className="mb-0 fw-semibold">
                                            <span className="text-success">${userData?.LeftPerMonth?.toLocaleString() || '0'}.00</span> /
                                            <span className="text-danger"> ${userData?.RightPerMonth?.toLocaleString() || '0'}.00</span>
                                        </h6>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="p-2" style={{ backgroundColor: '#E3F2FD', borderRadius: '8px' }}><i className="ti ti-briefcase fs-5" style={{ color: '#1976D2' }}></i></div>
                                            <h6 className="mb-0 fw-semibold">Total Overall Business</h6>
                                        </div>
                                        <h6 className="mb-0 fw-semibold">
                                            <span className="text-success">${userData?.LeftBusiness?.toLocaleString() || '0'}.00</span> /
                                            <span className="text-danger"> ${userData?.RightBusiness?.toLocaleString() || '0'}.00</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;