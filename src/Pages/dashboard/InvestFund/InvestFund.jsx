import React, { useState, useEffect } from 'react';
import { useUser } from '../../../context/UserContext';
import apiClient from '../../../api/apiClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const InvestmentPackage = () => {
    const navigate = useNavigate();
    const { userData, refreshData } = useUser();
    const [loginId, setLoginId] = useState("");
    const [userName, setUserName] = useState("");
    const [investAmount, setInvestAmount] = useState("");
    const [agreementId, setAgreementId] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkingUser, setCheckingUser] = useState(false);
    const [validUser, setValidUser] = useState(false);
    const [userRegNo, setUserRegNo] = useState(null);
    const [walletBalance, setWalletBalance] = useState(94209.00);

    const regno = userData?.regno || localStorage.getItem("regno");
    const token = localStorage.getItem("token");

    const formatAmount = (amount) => {
        return `$${Number(amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    const fetchWalletBalance = async () => {
        try {
            const response = await apiClient.get(`/Dashboard/wallet-balance/${regno}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data?.success) {
                setWalletBalance(response.data.data?.balance || 94209.00);
            }
        } catch (error) {
            console.error("Error fetching wallet balance:", error);
        }
    };

    useEffect(() => {
        fetchWalletBalance();
    }, []);

    const checkUser = async (id) => {
        if (!id || id.trim() === "") {
            setValidUser(false);
            setUserName("");
            setUserRegNo(null);
            return;
        }
        setCheckingUser(true);
        try {
            const response = await apiClient.get(`/User/check-user?loginid=${id}`);
            if (response.data?.success && response.data.data) {
                setValidUser(true);
                setUserName(response.data.data.name || response.data.data.Name);
                setUserRegNo(response.data.data.regno);
                toast.success(`User found: ${response.data.data.name}`);
            } else {
                setValidUser(false);
                setUserName("");
                setUserRegNo(null);
                toast.error("User ID not found");
            }
        } catch (error) {
            console.error("Error checking user:", error);
            setValidUser(false);
            setUserName("");
            setUserRegNo(null);
            toast.error("Error checking user");
        } finally {
            setCheckingUser(false);
        }
    };

    useEffect(() => {
        if (!loginId.trim()) {
            setValidUser(false);
            setUserName("");
            setUserRegNo(null);
            return;
        }
        const timer = setTimeout(() => {
            checkUser(loginId);
        }, 800);
        return () => clearTimeout(timer);
    }, [loginId]);

    const handleSubmit = async () => {
        if (!loginId.trim()) {
            toast.error("Please enter User Login ID");
            return;
        }
        if (!validUser) {
            toast.error("Please enter a valid User ID");
            return;
        }
        if (!investAmount || parseFloat(investAmount) <= 0) {
            toast.error("Please enter valid investment amount");
            return;
        }
        if (parseFloat(investAmount) < 100) {
            toast.error("Minimum investment amount is $100");
            return;
        }
        if (parseFloat(investAmount) > walletBalance) {
            toast.error(`Insufficient balance. Available: ${formatAmount(walletBalance)}`);
            return;
        }
        if (!agreementId.trim()) {
            toast.error("Please enter Agreement ID");
            return;
        }

        setLoading(true);
        try {
            const response = await apiClient.post(
                "/Dashboard/investment",
                {
                    regno: parseInt(userRegNo),
                    rkprice: parseFloat(investAmount),
                    uRegno: parseInt(regno),
                    pkg: "INV",
                    aggrement: agreementId
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data?.success) {
                toast.success("Investment successful!");
                setInvestAmount("");
                setAgreementId("");
                setLoginId("");
                setUserName("");
                setValidUser(false);
                await refreshData();
                await fetchWalletBalance();
            } else {
                toast.error(response.data?.message || "Investment failed");
            }
        } catch (error) {
            console.error("Investment error:", error);
            toast.error(error.response?.data?.message || "Network error");
        } finally {
            setLoading(false);
        }
    };

    const goToWalletHistory = () => {
        navigate('/dashboard/deposit-history');
    };

    const goToAgreementForm = () => {
        navigate('/dashboard/AgreementForm', { state: { loginId: loginId || userData?.me } });
    };

    return (
        <>
            <ToastContainer position="top-right" />
            <div className="container mt-4" style={{ maxWidth: "1000px" }}>
                <div className="card">
                    <div className="card-body">
                        <div className='d-flex justify-content-between'>
                            <h4 className="card-title text-center mb-3">Ultra Age Investment Package</h4>
                            <button
                                className="btn btn-secondary mb-4"
                                onClick={goToWalletHistory}
                            >
                                Topup Wallet History
                            </button>
                        </div>

                        {/* Wallet Balance */}
                        <div className="alert alert-danger  d-flex justify-content-between py-2 ">
                            <strong>Topup Wallet Balance :</strong>{' '}
                            <span style={{ color: "green", fontSize: "15px", fontWeight: "bold" }}>
                                {formatAmount(walletBalance)}
                            </span>
                        </div>

                        {/* User Login ID */}
                        <div className="mb-2 row">
                            <label className="col-5 col-form-label">User Login ID:</label>
                            <div className="col-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter User Login ID"
                                    value={loginId}
                                    onChange={(e) => setLoginId(e.target.value)}
                                    disabled={loading}
                                />

                            </div>
                        </div>

                        {/* User Name */}
                        <div className="mb-2 row">
                            <label className="col-5 col-form-label">User Name:</label>
                            <div className="col-7 position-relative">
                                <input
                                    type="text"
                                    placeholder='User Name'
                                    className="form-control"
                                    value={checkingUser ? "Checking..." : (userName || "")}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Invest Amount */}
                        <div className="mb-2 row">
                            <label className="col-5 col-form-label">Invest Amount:</label>
                            <div className="col-7">
                                <div className="input-group01">
                                    <span className="input-group-text">$</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter amount (min $100)"
                                        value={investAmount}
                                        onChange={(e) => setInvestAmount(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Enter Agreement Id */}
                        <div className="mb-2 row">
                            <label className="col-5 col-form-label">Enter Agreement Id:</label>
                            <div className="col-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Agreement ID"
                                    value={agreementId}
                                    onChange={(e) => setAgreementId(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="d-flex gap-2 mt-3">
                            <button
                                className="btn btn-primary flex-grow-1"
                                onClick={handleSubmit}
                                disabled={loading || !validUser || !investAmount || !agreementId}
                            >
                                {loading ? "Processing..." : "CLICK TO CONFIRM"}
                            </button>
                        </div>

                        {/* Agreement Link */}
                        <div className="text-center mt-3">
                            <button
                                className="btn btn-link p-0"
                                onClick={goToAgreementForm}
                            >
                                Click here to fill the agreement form
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvestmentPackage;

