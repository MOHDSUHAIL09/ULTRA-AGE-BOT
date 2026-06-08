import { useEffect, useState } from 'react';
import { FaArrowTurnDown, FaCopy, FaMintbit, FaWallet, FaCreditCard } from "react-icons/fa6";
import { ImSortAmountDesc } from "react-icons/im";
import { GiProfit } from "react-icons/gi";
import { IoSend } from 'react-icons/io5';
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
import Botsubscription from './botsubscription/Botsubscription';
import toast from 'react-hot-toast';
import apiClient from '../../api/apiClient';

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
    const { userData, refreshData } = useUser();
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    
    // Countdown Timer State
    const [remainingTime, setRemainingTime] = useState({
        days: 294,
        hours: 11,
        minutes: 42,
        seconds: 7
    });
    
    // Withdraw Modal States
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successAmount, setSuccessAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawOtp, setWithdrawOtp] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('BANK CARD');
    const [otpSent, setOtpSent] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [otpIntervalId, setOtpIntervalId] = useState(null);
    const [payoutAmount, setPayoutAmount] = useState('');
    const [minimumWithdraw, setMinimumWithdraw] = useState(20);
    
    const displayBalance = userData?.Working || 0;
    
    // Countdown Timer Effect
    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prev => {
                let { days, hours, minutes, seconds } = prev;
                
                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days--;
                            }
                        }
                    }
                }
                
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, []);
    
    // Format remaining time
    const formatRemainingTime = () => {
        return `${remainingTime.days}d ${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`;
    };
    
    // Helper to get loginid
    const getLoginId = () => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            try {
                const parsed = JSON.parse(storedUserData);
                if (parsed.loginid) return parsed.loginid;
                if (parsed.me) return parsed.me;
            } catch (e) { }
        }
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.loginid) return user.loginid;
        if (user?.me) return user.me;
        return 'india';
    };
    
    const loginid = getLoginId();
    const regno = userData?.regno || userData?.Regno || localStorage.getItem('regno');
    
    const openQRModal = () => {
        setIsQRModalOpen(true);
    };
    
    const closeQRModal = () => {
        setIsQRModalOpen(false);
    };
    
    const getReferralLink = () => {
        return `${window.location.origin}/register?ref=${userData?.directId || 'TEST123'}`;
    };
    
    const goToStatement = (type) => {
        navigate(`/dashboard/accstatement?type=${type}`);
    };
    
    // Clean API message
    const cleanApiMessage = (message, defaultMsg) => {
        if (!message) return defaultMsg;
        const hasEmail = message.includes('@') && (message.includes('.com') || message.includes('.in') || message.includes('.net'));
        if (hasEmail) return defaultMsg;
        return message;
    };
    
    // Send OTP
    const sendOtp = async () => {
        if (otpTimer > 0 || sendingOtp || verifyingOtp) return;
        
        if (!regno) {
            toast.error('Registration number not found');
            return;
        }
        
        setSendingOtp(true);
        try {
            const response = await apiClient.post(`/User/genrate-otp?loginid=${loginid}&regno=${regno}`, {});
            
            if (response.data.success || response.data.status === 'success') {
                const cleanMessage = cleanApiMessage(response.data.message, 'OTP sent successfully!');
                toast.success(cleanMessage);
                setOtpSent(true);
                setOtpTimer(300);
                
                const interval = setInterval(() => {
                    setOtpTimer((prev) => {
                        if (prev <= 1) {
                            clearInterval(interval);
                            setOtpIntervalId(null);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
                setOtpIntervalId(interval);
            } else {
                toast.error(response.data.message || 'Failed to send OTP');
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Error sending OTP');
        } finally {
            setSendingOtp(false);
        }
    };
    
    // Handle Withdraw
    const handleWithdraw = async () => {
        const amountNum = parseFloat(withdrawAmount);
        
        if (!withdrawAmount || isNaN(amountNum) || amountNum <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }
        if (amountNum < minimumWithdraw) {
            toast.error(`Minimum withdrawal amount is $${minimumWithdraw.toFixed(2)}`);
            return;
        }
        if (amountNum > displayBalance) {
            toast.error(`Amount exceeds available balance $${displayBalance.toFixed(2)}`);
            return;
        }
        if (!withdrawOtp || withdrawOtp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }
        
        setVerifyingOtp(true);
        try {
            const verifyRes = await apiClient.post('/User/verify-otp', null, {
                params: {
                    loginid: loginid,
                    regno: regno,
                    otp: String(withdrawOtp)
                }
            });
            
            if (!verifyRes.data?.success) {
                toast.error(verifyRes.data?.message || 'Invalid OTP');
                setVerifyingOtp(false);
                return;
            }
            
            const payload = {
                regNo: parseInt(regno),
                amount: amountNum,
                payMode: selectedMethod === 'BANK CARD' ? 'inr' : 'usdt',
                walletAddress: selectedMethod === 'BANK CARD' ? localStorage.getItem('accountNumber') || '' : localStorage.getItem('bep20Wallet') || ''
            };
            
            const withdrawalRes = await apiClient.post('/IncomePayout/withdraw-request', payload);
            
            if (withdrawalRes.data?.success) {
                setSuccessAmount(amountNum);
                setShowSuccessModal(true);
                setTimeout(() => setShowSuccessModal(false), 3000);
                await refreshData();
                
                setTimeout(() => {
                    setShowWithdrawModal(false);
                    setWithdrawAmount('');
                    setWithdrawOtp('');
                    setPayoutAmount('');
                    setOtpSent(false);
                    setOtpTimer(0);
                    if (otpIntervalId) clearInterval(otpIntervalId);
                }, 500);
                toast.success('Withdrawal request submitted successfully!');
            } else {
                toast.error(withdrawalRes.data?.message || 'Withdrawal failed');
            }
        } catch (err) {
            console.error('Withdrawal error:', err);
            toast.error(err.response?.data?.message || 'Server error. Please try again.');
        } finally {
            setVerifyingOtp(false);
        }
    };
    
    const isOtpButtonDisabled = () => otpTimer > 0 || sendingOtp || verifyingOtp;
    const isWithdrawDisabled = () => {
        const amountNum = parseFloat(withdrawAmount);
        return (
            verifyingOtp ||
            !otpSent ||
            !withdrawAmount ||
            isNaN(amountNum) ||
            amountNum <= 0 ||
            amountNum < minimumWithdraw ||
            amountNum > displayBalance ||
            !withdrawOtp ||
            withdrawOtp.length !== 6
        );
    };
    
    // Payout button click
    const handlePayoutClick = () => {
        if (payoutAmount && parseFloat(payoutAmount) > 0) {
            setWithdrawAmount(payoutAmount);
        }
        setShowWithdrawModal(true);
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
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex">
                                            <div className="rounded-circle overflow-hidden me-6 flex-shrink-0" style={{marginTop: "-10px"}}>
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
                                    
                                    {/* Remaining Days Countdown Timer */}
                                    <div className="col-12  mt-3">
                                        <div className="countdown-box" style={{                                    
                                            background: "linear-gradient(135deg, #04832f 0%, #0a5c23 100%)",
                                            borderRadius: "8px",
                                            textAlign: "center",
                                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                                        }}>
                                            <div style={{ 
                                                fontSize: "13px", 
                                                color: "rgba(255,255,255,0.8)", 
                                                fontWeight: "500",
                                                letterSpacing: "1px",
                                               paddingTop:"5px"
                                            }}>
                                                REMAINING DAYS
                                            </div>
                                            <div className='pb-1' style={{ 
                                                fontSize: "20px", 
                                                color: "white", 
                                                fontWeight: "bold",
                                                fontFamily: "monospace"
                                            }}>
                                                {formatRemainingTime()}
                                            </div>
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
                <div className="col-12 col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100 border-0 shadow-sm">
                        <div className="d-flex justify-content-between p-2 mt-2 px-3">
                            <p style={{ fontWeight: "900", fontSize: "20px" }}>Subscription / Invest</p>
                            <div className='mint-box'><FaMintbit /></div>
                        </div>
                        <div className="c-box ">
                            <Botsubscription onSuccess={refreshData} />
                            <div className="px-3 p-1">
                                <Link to="Deposit-History" className="text-decoration-none">
                                    <h3 className="bold-text mb-1 hover">
                                        ${userData?.Depositfund?.toLocaleString() || "0.00"}
                                    </h3>
                                </Link>
                                <div className='d-flex justify-content-between'>
                                    <p className='fw-bold'>Deposit Fund</p>
                                    <div className="#">
                                        <FaWallet style={{ fontSize: "33px", color: "green", marginTop: "-35px " }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* All Income Card */}
                <div className="col-12 col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100 border-0">
                        <div className="d-flex justify-content-between p-2 mt-2 px-3">
                            <p style={{ fontWeight: "900", fontSize: "20px" }}>PayOut</p>
                            <div className='mint-box'><GiProfit /></div>
                        </div>
                        <div className="c-box"> 
                            <div className="payout-input-box p-3">
                                <input
                                    type="number"
                                    className="custom-pay-form form-control mb-2"
                                    placeholder='Enter Amount'
                                    value={payoutAmount}
                                    onChange={(e) => setPayoutAmount(e.target.value)}
                                    style={{ padding: "10px" }}
                                />
                                <div className="d-flex align-items-center justify-content-between mt-4">
                                    <Link to="/dashboard/WithdrawalHistory">
                                        <h5 className='mb-0' style={{fontWeight: "800"}}>
                                            ${displayBalance?.toLocaleString() || '0.00'}
                                        </h5>
                                        <p className="mb-3" style={{ color: "#7C8FAC", fontSize: "15px" }}>
                                            Payout Amt
                                        </p>
                                    </Link>
                                    <button 
                                        type="button" 
                                        className="custtom-button"
                                        onClick={handlePayoutClick}
                                    >
                                        PayOut
                                    </button>
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <span style={{ color: "green", fontWeight: "bold" }}>Note :</span>
                                    <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>Min Withdrawal $20</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sales Overview */}
                <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body01 px-3 mt-3">
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
                                    <div style={{ height: "65px" }}>
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
                                        <h4 className="mt-3 fw-semibold d-flex align-content-center hover">
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
                                    <div style={{ height: "65px" }}>
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
                                        <h3 className=" mt-3 fw-bold d-flex align-items-center mt-3 hover">
                                            ${userData?.withdrawal}
                                            <i className="ti ti-arrow-up-right fs-5 text-success ms-1"></i>
                                        </h3>
                                        <p className="mb-3 text-muted fw-medium">Withdrawal</p>
                                    </div>
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
                                        <div style={{ height: "65px" }}>
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
                                            <span className="text-success">${(userData?.strongLeg || 0).toLocaleString()}</span> / 
                                            <span className="text-danger"> ${(userData?.weakerLeg || 0).toLocaleString()}</span>
                                        </h6>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="p-2" style={{ backgroundColor: '#E3F2FD', borderRadius: '8px' }}><i className="ti ti-repeat fs-5" style={{ color: '#1976D2' }}></i></div>
                                            <h6 className="mb-0 fw-semibold">Team Carryforward</h6>
                                        </div>
                                        <h6 className="mb-0 fw-semibold">
                                            <span className="text-success">${(userData?.leftCarry || 0).toLocaleString()}</span> / 
                                            <span className="text-danger"> ${(userData?.rightCarry || 0).toLocaleString()}</span>
                                        </h6>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="p-2" style={{ backgroundColor: '#E3F2FD', borderRadius: '8px' }}><i className="ti ti-calendar-stats fs-5" style={{ color: '#1976D2' }}></i></div>
                                            <h6 className="mb-0 fw-semibold">Current Month Business</h6>
                                        </div>
                                        <h6 className="mb-0 fw-semibold">
                                            <span className="text-success">${(userData?.LeftPerMonth || 0).toLocaleString()}</span> / 
                                            <span className="text-danger"> ${(userData?.RightPerMonth || 0).toLocaleString()}</span>
                                        </h6>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="p-2" style={{ backgroundColor: '#E3F2FD', borderRadius: '8px' }}><i className="ti ti-briefcase fs-5" style={{ color: '#1976D2' }}></i></div>
                                            <h6 className="mb-0 fw-semibold">Total Overall Business</h6>
                                        </div>
                                        <h6 className="mb-0 fw-semibold">
                                            <span className="text-success">${(userData?.LeftBusiness || 0).toLocaleString()}</span> / 
                                            <span className="text-danger"> ${(userData?.RightBusiness || 0).toLocaleString()}</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <div className="modal-overlay">
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4>Withdraw</h4>
                            <button
                                className="modal-close"
                                onClick={() => {
                                    setShowWithdrawModal(false);
                                    setWithdrawAmount('');
                                    setWithdrawOtp('');
                                    setOtpSent(false);
                                    setOtpTimer(0);
                                    if (otpIntervalId) clearInterval(otpIntervalId);
                                    setOtpIntervalId(null);
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="balance-info">
                                <span>Available balance</span>
                                <strong>
                                    ${displayBalance?.toLocaleString() || '0.00'}
                                </strong>
                            </div>

                            <div className='meddle'>
                                <div className="methods-grid mt-3">
                                    <div
                                        className={`method-chip ${selectedMethod === 'BANK CARD' ? 'active' : ''}`}
                                        onClick={() => !verifyingOtp && setSelectedMethod('BANK CARD')}
                                    >
                                        <FaCreditCard />
                                        <span>BANK CARD</span>
                                    </div>
                                    <div
                                        className={`method-chip ${selectedMethod === 'USDT TRC20' ? 'active' : ''}`}
                                        onClick={() => !verifyingOtp && setSelectedMethod('USDT TRC20')}
                                    >
                                        <span>₿</span>
                                        <span>USDT TRC20</span>
                                    </div>
                                </div>
                                <div className="amount-area mb-3">
                                    <div className="amount-label">Enter Amount</div>
                                    <div className="amount-input-wrapper">
                                        <span className="currency-symbol">$</span>
                                        <input
                                            type="number"
                                            className="amount-input"
                                            placeholder="Enter amount"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                            disabled={verifyingOtp}
                                        />
                                    </div>
                                </div>

                                <div className="input-container01 mt-3">
                                    <span className="currency-symbol1">OTP</span>
                                    <span className="divider">|</span>
                                    <input
                                        type="text"
                                        className="amount-input"
                                        placeholder="Enter 6-digit OTP"
                                        maxLength="6"
                                        value={withdrawOtp}
                                        onChange={(e) => setWithdrawOtp(e.target.value.replace(/\D/g, ''))}
                                        disabled={verifyingOtp}
                                    />
                                    <button
                                        className="clear-btn"
                                        onClick={sendOtp}
                                        disabled={isOtpButtonDisabled()}
                                    >
                                        {sendingOtp ? (
                                            <span className="otp-spinner-small"></span>
                                        ) : otpTimer > 0 ? (
                                            `${Math.floor(otpTimer / 60)}:${(otpTimer % 60).toString().padStart(2, '0')}`
                                        ) : (
                                            <IoSend />
                                        )}
                                    </button>
                                </div>

                                <button
                                    className="modal-button mt-3"
                                    onClick={handleWithdraw}
                                    disabled={isWithdrawDisabled()}
                                >
                                    {verifyingOtp ? 'Verifying OTP...' : 'Withdraw Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="success-modal-overlay">
                    <div className="success-modal">
                        <div className="checkmark-circle">
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="success-title">Withdrawal Request Submitted</div>
                        <div className="success-amount">
                            ${successAmount?.toLocaleString() || '0.00'}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;