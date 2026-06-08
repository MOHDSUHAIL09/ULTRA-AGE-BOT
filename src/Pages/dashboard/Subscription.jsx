import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import apiClient from "../../api/apiClient";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";


const Subscription = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [userName, setUserName] = useState("");
  const [userRegNo, setUserRegNo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [subscriptionAmount] = useState(100);
  const [activationPeriod] = useState("1 Year");

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const regno = userData?.regno || localStorage.getItem("regno");
      const token = localStorage.getItem("token");

      const response = await apiClient.get(`/Dashboard/wallet-balance/${regno}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data?.success) {
        setWalletBalance(response.data.data.balance || 0);
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  const checkUserSubscriptionStatus = async (id) => {
    if (!id.trim()) return;
    setLoading(true);
    setHasChecked(false);

    try {
      const response = await apiClient.get(`/User/check-user-bot-status?loginid=${id}`, {
      });

      if (response.data?.success && response.data.data) {
        setIsValidUser(true);
        setUserName(response.data.data.name);
        setUserRegNo(response.data.data.regno);
        const activeStatus = response.data.data.BotStatus > 0;
        setIsSubscribed(activeStatus);
      } else {
        setIsValidUser(false);
        setUserName("");
        setUserRegNo(null);
        setIsSubscribed(false);
      }
    } catch (error) {
      console.error("Subscription Status Check Error:", error);
      setIsValidUser(false);
      setUserName("");
      setUserRegNo(null);
      setIsSubscribed(false);
    } finally {
      setLoading(false);
      setHasChecked(true);
    }
  };

  useEffect(() => {
    if (loginId.trim() === "") {
      setIsSubscribed(false);
      setHasChecked(false);
      setIsValidUser(false);
      setUserName("");
      setUserRegNo(null);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      checkUserSubscriptionStatus(loginId);
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [loginId]);

  const handleConfirmSubscription = async () => {
    if (!loginId.trim()) {
      toast.error("Please enter User Login ID");
      return;
    }

    if (!isValidUser && hasChecked) {
      toast.error("User ID not found in database!");
      return;
    }

    if (isSubscribed) {
      toast.error("User already has an active subscription!");
      return;
    }

    if (walletBalance < subscriptionAmount) {
      toast.error("Insufficient wallet balance! Please recharge.");
      return;
    }

    setLoading(true);

    try {
      const loggedInRegNo = userData?.regno || localStorage.getItem("regno");

      const response = await apiClient.post(
        "/Dashboard/investment",
        {
          regno: userRegNo,
          rkprice: 100,
          uRegno: loggedInRegNo,
          pkg: "BOT",
          aggrement: ""
        },
      );

      if (response.data?.success) {
        toast.success("Subscribed Successfully!");
        setIsSubscribed(true);
        await fetchWalletBalance();
        // Clear input after successful subscription
        setLoginId("");
        setUserName("");
        setUserRegNo(null);
        setIsValidUser(false);
        setHasChecked(false);
      } else {
        toast.error(response.data?.message || "Subscription failed");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscription-container">
      <div className="subscription-card">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <h2 className="subscription-title mb-0">Ulta Age Subscription Package</h2>
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={() => navigate('/dashboard/Deposit-History')}
          >
            Topup Wallet History
          </button>
        </div>

        {/* Wallet Balance */}
        <div className="wallet-balance-box">
          <span className="wallet-label">Topup Wallet Balance :</span>
          <span className="wallet-amount">
            ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Activation Period */}
        <div className="info-row">
          <span className="info-label">Activation Period:</span>
          <span className="info-value">{activationPeriod}</span>
        </div>

        {/* Subscription Amount */}
        <div className="info-row">
          <span className="info-label">M-Subscription Amount:</span>
          <span className="info-value">${subscriptionAmount}</span>
        </div>

        {/* User Login ID */}
        <div className="info-row">
          <span className="info-label">User Login ID:</span>
          <div className="info-value-with-input">
            <input
              type="text"
              className="login-input"
              placeholder="Enter User Login ID"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              disabled={loading}
            />
            {loading && <span className="status-badge checking">Checking...</span>}
            {!loading && hasChecked && isValidUser && !isSubscribed && (
              <span className="status-badge valid">✓ Valid User</span>
            )}
            {!loading && hasChecked && isValidUser && isSubscribed && (
              <span className="status-badge subscribed">✓ Already Active</span>
            )}
            {!loading && hasChecked && !isValidUser && (
              <span className="status-badge invalid">✗ Invalid User</span>
            )}
          </div>
        </div>

        {/* User Name */}
        <div className="info-row">
          <span className="info-label">User Name:</span>
          <span className="info-value">
            {loading ? "Checking..." : (userName ? userName : (hasChecked && !isValidUser ? "User Not Found" : ""))}
          </span>
        </div>

        {/* Status Message */}
        {hasChecked && isValidUser && (
          <div className={`status-message ${isSubscribed ? "status-active" : "status-inactive"}`}>
            {isSubscribed ? "✅ Already Activated" : "⚠️ Not Activated - Please Subscribe"}
          </div>
        )}

        {/* Confirm Button */}
        <button
          className={`confirm-btn ${isSubscribed ? "btn-disabled" : ""}`}
          onClick={handleConfirmSubscription}
          disabled={loading || !isValidUser || isSubscribed || walletBalance < subscriptionAmount}
        >
          {isSubscribed ? "Already Subscribed" : "CLICK TO CONFIRM"}
        </button>

        {/* Insufficient Balance Warning */}
        {walletBalance < subscriptionAmount && isValidUser && !isSubscribed && (
          <div className="error-warning">
            ⚠️ Insufficient balance! Please recharge your wallet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;