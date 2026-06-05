import React, { useState, useEffect, useMemo } from "react";
import { RiP2pFill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { IoSend, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import apiClient from "../../api/apiClient";
import { toast, ToastContainer } from "react-toastify";


const DepositToDeposit = () => {
    const { userData, investNow, refreshData } = useUser();
    const navigate = useNavigate();

    // Helper: get loginid & regno
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
    const regno = Number(
        JSON.parse(localStorage.getItem('user'))?.Regno ||
        JSON.parse(localStorage.getItem('user'))?.regno ||
        localStorage.getItem('regno')
    );

    // State
    const [amount1, setAmount1] = useState(100);
    const [investUserId1, setInvestUserId1] = useState("");
    const [checkingUser1, setCheckingUser1] = useState(false);
    const [validUser1, setValidUser1] = useState(false);
    const [userName1, setUserName1] = useState("");
    const [loading1, setLoading1] = useState(false);
    const [amount2, setAmount2] = useState(100);
    const [otp, setOtp] = useState("");
    const [loading2, setLoading2] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [otpIntervalId, setOtpIntervalId] = useState(null);
    const [isSendingOtp, setIsSendingOtp] = useState(false);

    const depositOptions = [100, 300, 500, 1000, 10000, 50000];
    const isLoading = !userData;

    // Format amount - direct $ without currency conversion
    const formatAmount = (amount) => {
        if (!amount && amount !== 0) return `$0.00`;
        return `$${Number(amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    const formatBalance = (amount) => {
        if (amount === undefined || amount === null) return `$0.00`;
        const num = Number(amount);
        if (isNaN(num)) return `$0.00`;
        return formatAmount(num);
    };

    const isP2PButtonDisabled = useMemo(() => {
        return !validUser1 || loading1 || amount1 <= 0 || !investUserId1 || investUserId1.trim() === "";
    }, [validUser1, loading1, amount1, investUserId1]);

    const isSelfTransferDisabled = useMemo(() => {
        return loading2 || !otp || otp.trim() === "" || amount2 <= 0;
    }, [loading2, otp, amount2]);

    const checkUser1 = async (id) => {
        if (!id || id.trim() === "") {
            setValidUser1(false);
            setUserName1("");
            return;
        }
        setCheckingUser1(true);
        try {
            const res = await apiClient.get(`/User/check-user?loginid=${id}`);
            const data = res.data;
            const name = data?.data?.Name || data?.data?.name || "";
            if (data?.success && data.data) {
                setValidUser1(true);
                setUserName1(name);
                toast.success(`User found: ${name}`);
            } else {
                setValidUser1(false);
                setUserName1("");
                toast.error("User ID not found");
            }
        } catch (err) {
            console.error("Error checking user:", err);
            setValidUser1(false);
            setUserName1("");
            toast.error("Error checking user");
        } finally {
            setCheckingUser1(false);
        }
    };

    const handleInvest1 = async () => {
        if (!investUserId1 || investUserId1.trim() === "") {
            toast.error("Please enter User ID");
            return;
        }
        if (!amount1 || amount1 <= 0) {
            toast.error("Please enter valid amount");
            return;
        }
        if (!validUser1) {
            toast.error("Please enter a valid User ID");
            return;
        }
        if (amount1 > userData.Depositfund) {
            toast.error(`Insufficient Deposit Wallet balance. Available: ${formatBalance(userData.Depositfund)}`);
            return;
        }
        setLoading1(true);
        try {
            const res = await investNow(investUserId1, amount1);
            if (res.success) {
                toast.success(res.message || "Transfer successful!");
                setAmount1(100);
                setInvestUserId1("");
                setUserName1("");
                setValidUser1(false);
                await refreshData();
            } else {
                toast.error(res.message || "Transfer failed");
            }
        } catch (err) {
            console.error("Transfer error:", err);
            toast.error(err.response?.data?.message || err.message || "Error processing transfer");
        } finally {
            setLoading1(false);
        }
    };

    const sendOtp = async () => {
        if (isSendingOtp || otpTimer > 0) return;
        if (!regno) {
            toast.error("Registration number not found. Please login again.");
            return;
        }
        setIsSendingOtp(true);
        try {
            const response = await apiClient.post(`/User/genrate-otp?loginid=${loginid}&regno=${regno}`, {});
            if (response.data.success || response.data.status === 'success') {
                toast.success("OTP sent successfully!");
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
                toast.error(response.data.message || "Failed to send OTP");
            }
        } catch (error) {
            console.error("OTP send error:", error);
            toast.error(error.response?.data?.message || "Network error");
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleSelfTransfer = async () => {
        if (!amount2 || amount2 <= 0) {
            toast.error("Please enter valid amount");
            return;
        }
        if (amount2 > userData.totalWallet) {
            toast.error(`Insufficient Income Wallet balance. Available: ${formatBalance(userData.totalWallet)}`);
            return;
        }
        if (!otp || otp.trim() === "") {
            toast.error("Please enter OTP");
            return;
        }
        setLoading2(true);
        try {
            const verifyResponse = await apiClient.post('/User/verify-otp', null, {
                params: { loginid, regno, otp }
            });
            if (!verifyResponse.data.success) {
                toast.error(verifyResponse.data.message || "Invalid OTP");
                setLoading2(false);
                return;
            }
            const transferPayload = { regno: regno, reciveId: loginid, amount: amount2 };
            const transferResponse = await apiClient.post("/IncomePayout/fund-transfer", transferPayload);
            if (transferResponse.data.success) {
                toast.success(transferResponse.data.message || "Transfer successful!");
                setAmount2(100);
                setOtp("");
                setOtpTimer(0);
                if (otpIntervalId) {
                    clearInterval(otpIntervalId);
                    setOtpIntervalId(null);
                }
                await refreshData();
            } else {
                toast.error(transferResponse.data.message || "Transfer failed");
            }
        } catch (err) {
            console.error("Transfer error:", err);
            const errorMsg = err.response?.data?.message || err.message || "Network error";
            toast.error(errorMsg);
        } finally {
            setLoading2(false);
        }
    };

    useEffect(() => {
        return () => {
            if (otpIntervalId) clearInterval(otpIntervalId);
        };
    }, [otpIntervalId]);

    return (
        <>
            <ToastContainer position="top-right" />
            <div className="deposit-to-deposit-container">
                <div className="container-fluid py-4">
                    {isLoading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-2 text-muted">Loading Wallet...</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {/* SELF TRANSFER CARD */}
                            <div className="col-12 col-lg-6">
                                <div className="transfer-card">
                                    <div className="transfer-card-header">
                                        <div className="transfer-title">
                                            <RiP2pFill size={24} className="transfer-icon" />
                                            <h5 className="mb-0">Income Wallet To Deposit Wallet</h5>
                                        </div>
                                        <FaHistory
                                            size={20}
                                            className="history-icon"
                                            onClick={() => navigate("/dashboard/AccStatement", { state: { transtype: "fundtransfer" } })}
                                            title="Income Wallet To Deposit Wallet History"
                                        />
                                    </div>
                                    <div className="transfer-card-body">
                                        {/* Wallet Balance */}
                                        <div className="wallet-info income-wallet">
                                            <span className="wallet-label">Income Wallet</span>
                                            <span className="wallet-amount text-success">
                                                {formatBalance(userData.totalWallet)}
                                            </span>
                                        </div>

                                        <div className="transfer-form">
                                            <div className="form-group">
                                                <label className="form-label">SELF TRANSFER</label>
                                                <div className="amount-input-wrapper">
                                                    <span className="currency-sign">$</span>
                                                    <input
                                                        type="number"
                                                        className="amount-input-field"
                                                        value={amount2}
                                                        onChange={(e) => setAmount2(Number(e.target.value))}
                                                    />
                                                    <button className="clear-input-btn" onClick={() => setAmount2(0)}>
                                                        <IoClose />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">USER ID</label>
                                                <input
                                                    type="text"
                                                    className="form-control-readonly"
                                                    value={userData.me || loginid}
                                                    readOnly
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">QUICK AMOUNT</label>
                                                <div className="quick-amount-grid">
                                                    {depositOptions.map((opt) => (
                                                        <button
                                                            key={opt}
                                                            className={`quick-amount-btn ${amount2 === opt ? "active" : ""}`}
                                                            onClick={() => setAmount2(opt)}
                                                        >
                                                            $ {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">ENTER OTP</label>
                                                <div className="otp-input-wrapper">
                                                    <input
                                                        type="number"
                                                        className="otp-input-field"
                                                        value={otp}
                                                        onChange={(e) => setOtp(e.target.value)}
                                                        placeholder="Enter OTP"
                                                    />
                                                    <button
                                                        className="send-otp-btn"
                                                        onClick={sendOtp}
                                                        disabled={isSendingOtp || otpTimer > 0}
                                                    >
                                                        {isSendingOtp ? (
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        ) : otpTimer > 0 ? (
                                                            `${Math.floor(otpTimer / 60)}:${(otpTimer % 60).toString().padStart(2, "0")}`
                                                        ) : (
                                                            <><IoSend /> Send</>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                className="submit-transfer-btn"
                                                onClick={handleSelfTransfer}
                                                disabled={isSelfTransferDisabled}
                                            >
                                                {loading2 ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Processing...
                                                    </>
                                                ) : "Transfer"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* P2P TRANSFER CARD */}
                            <div className="col-12 col-lg-6">
                                <div className="transfer-card">
                                    <div className="transfer-card-header">
                                        <div className="transfer-title">
                                            <RiP2pFill size={24} className="transfer-icon" />
                                            <h5 className="mb-0">Deposit To Deposit</h5>
                                        </div>
                                        <FaHistory
                                            size={20}
                                            className="history-icon"
                                            onClick={() => navigate("/dashboard/Deposit-History", { state: { type: "P2P", tab: "deposit" } })}
                                            title="Deposit To Deposit History"
                                        />
                                    </div>
                                    <div className="transfer-card-body">
                                        {/* Wallet Balance */}
                                        <div className="wallet-info deposit-wallet">
                                            <span className="wallet-label">Deposit Wallet</span>
                                            <span className="wallet-amount text-primary">
                                                {formatBalance(userData.Depositfund)}
                                            </span>
                                        </div>

                                        <div className="transfer-form">
                                            <div className="form-group">
                                                <label className="form-label">P2P AMOUNT</label>
                                                <div className="range-slider-wrapper">
                                                    <input
                                                        type="range"
                                                        className="range-slider"
                                                        min="0"
                                                        max={userData.Depositfund || 10000}
                                                        step="1"
                                                        value={amount1}
                                                        onChange={(e) => setAmount1(Number(e.target.value))}
                                                    />
                                                    <span className="range-value">
                                                        {formatAmount(amount1)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">USER ID</label>
                                                <input
                                                    type="text"
                                                    className="form-control-field"
                                                    value={investUserId1}
                                                    onChange={(e) => {
                                                        setInvestUserId1(e.target.value);
                                                        if (validUser1) {
                                                            setValidUser1(false);
                                                            setUserName1("");
                                                        }
                                                    }}
                                                    onBlur={() => {
                                                        if (investUserId1 && investUserId1.trim() !== "") {
                                                            checkUser1(investUserId1);
                                                        } else {
                                                            setValidUser1(false);
                                                            setUserName1("");
                                                        }
                                                    }}
                                                    placeholder="Enter User ID"
                                                />
                                                {checkingUser1 && <small className="status-msg info">Checking user...</small>}
                                                {validUser1 && <small className="status-msg success">✓ {userName1}</small>}
                                                {investUserId1 && !validUser1 && !checkingUser1 && (
                                                    <small className="status-msg error">✗ Please enter a valid User ID</small>
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">QUICK AMOUNT</label>
                                                <div className="quick-amount-grid">
                                                    {depositOptions.map((opt) => (
                                                        <button
                                                            key={opt}
                                                            className={`quick-amount-btn ${amount1 === opt ? "active" : ""}`}
                                                            onClick={() => setAmount1(opt)}
                                                        >
                                                            $ {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">AMOUNT</label>
                                                <div className="amount-input-wrapper">
                                                    <span className="currency-sign">$</span>
                                                    <input
                                                        type="number"
                                                        className="amount-input-field"
                                                        value={amount1}
                                                        onChange={(e) => setAmount1(Number(e.target.value))}
                                                    />
                                                    <button className="clear-input-btn" onClick={() => setAmount1(0)}>
                                                        <IoClose />
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                className="submit-transfer-btn"
                                                onClick={handleInvest1}
                                                disabled={isP2PButtonDisabled}
                                            >
                                                {loading1 ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Processing...
                                                    </>
                                                ) : "Deposit"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DepositToDeposit;