import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import apiClient from "../../api/apiClient";
import { toast, ToastContainer } from "react-toastify";
import './InvestFund/invest.css'


const WithdrawalRequest = () => {
    const { userData, refreshData } = useUser();
    const [amount, setAmount] = useState(0);
    const [paymentMode, setPaymentMode] = useState("USDT");
    const [walletAddress, setWalletAddress] = useState("");
    const [bankDetails, setBankDetails] = useState("");
    const [masterPassword, setMasterPassword] = useState("");


    
    const [loading, setLoading] = useState(false);
    const [minWithdrawal, setMinWithdrawal] = useState(20);

    // ✅ Current balance from userData.totalWallet
    const currentBalance = userData?.totalWallet || 0;

    const formatAmount = (amount) => {
        return `$${Number(amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    // Fetch Minimum Withdraw Limit
    const fetchMinimumWithdrawLimit = async () => {
        try {
            const response = await apiClient.get(`/IncomePayout/minimun-withdraw-limit`);
            if (response.data?.success === true) {
                const minLimit = response.data?.data || 20;
                setMinWithdrawal(minLimit);
            } else {
                setMinWithdrawal(20);
            }
        } catch (error) {
            console.error("Error fetching minimum withdraw limit:", error);
            setMinWithdrawal(20);
        }
    };

    useEffect(() => {
        fetchMinimumWithdrawLimit();
    }, []);

    const handleAmountChange = (e) => {
        let value = parseFloat(e.target.value);
        if (isNaN(value)) value = 0;
        setAmount(value);
    };

    const handleSubmit = async () => {
        // Validation
        if (amount < minWithdrawal) {
            toast.error(`Minimum withdrawal amount is ${formatAmount(minWithdrawal)}`);
            return;
        }
        if (amount > currentBalance) {
            toast.error(`Insufficient balance. Available: ${formatAmount(currentBalance)}`);
            return;
        }
        if (!paymentMode) {
            toast.error("Please select payment mode");
            return;
        }
        if (paymentMode === "USDT" && !walletAddress) {
            toast.error("Please enter BEP20 Wallet Address");
            return;
        }
        if (paymentMode === "BANK" && !bankDetails) {
            toast.error("Please enter bank account details");
            return;
        }
        if (!masterPassword) {
            toast.error("Please enter master password");
            return;
        }

        setLoading(true);
        try {
            const regno = userData?.regno || localStorage.getItem("regno");
            const token = localStorage.getItem("token");

            const response = await apiClient.post(
                "/Dashboard/withdrawal-request",
                {
                    regno: regno,
                    amount: amount,
                    paymentMode: paymentMode,
                    walletAddress: walletAddress,
                    bankDetails: bankDetails,
                    masterPassword: masterPassword
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data?.success) {
                toast.success("Withdrawal request submitted successfully!");
                setAmount(0);
                setWalletAddress("");
                setBankDetails("");
                setMasterPassword("");
                await refreshData();
            } else {
                toast.error(response.data?.message || "Withdrawal request failed");
            }
        } catch (error) {
            console.error("Withdrawal error:", error);
            toast.error(error.response?.data?.message || "Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" />
            <div className="withdrawal-container">
                <div className="withdrawal-card">
                    <h3 className="withdrawal-title">Withdrawal Request</h3>
                    
                    {/* Current Balance */}
                    <div className="balance-section">
                        <div className="balance-row">
                            <span className="balance-label">Current Balance:</span>
                            <span className="balance-value">{formatAmount(currentBalance)}</span>
                        </div>
                        <div className="min-withdrawal">
                            <span>Min. Withdrawal {formatAmount(minWithdrawal)}</span>
                        </div>
                    </div>

                    {/* Enter Amount */}
                    <div className="form-group">
                        <label className="form-label">Enter Amount:</label>
                        <div className="amount-input-wrapper">
                            <span className="currency-symbol">$</span>
                            <input
                                type="number"
                                className="amount-input"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {/* Select Payment Mode */}
                    <div className="form-group">
                        <label className="form-label">Select Payment Mode</label>
                        <select
                            className="payment-select"
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                        >
                            <option value="USDT">USDT</option>
                            <option value="BANK">Bank Transfer</option>
                        </select>
                    </div>

                    {/* BEP20 Wallet Address */}
                    {paymentMode === "USDT" && (
                        <div className="form-group">
                            <label className="form-label">BEP20 Wallet Address:</label>
                            <input
                                type="text"
                                className="form-input"
                                value={walletAddress}
                                onChange={(e) => setWalletAddress(e.target.value)}
                                placeholder="Enter BEP20 Wallet Address"
                            />
                        </div>
                    )}

                    {/* Bank Account Details */}
                    {paymentMode === "BANK" && (
                        <div className="form-group">
                            <label className="form-label">Bank Account Details:</label>
                            <textarea
                                className="form-textarea"
                                value={bankDetails}
                                onChange={(e) => setBankDetails(e.target.value)}
                                placeholder="Enter bank account details"
                                rows="3"
                            />
                        </div>
                    )}

                    {/* Enter Master Password */}
                    <div className="form-group">
                        <label className="form-label">Enter Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={masterPassword}
                            onChange={(e) => setMasterPassword(e.target.value)}
                            placeholder="Enter Master Password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "SUBMIT"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default WithdrawalRequest;