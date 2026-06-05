import { useState, useEffect } from 'react';
import { useUser } from '../../../context/UserContext';
import apiClient from '../../../api/apiClient';
import toast from 'react-hot-toast'; 
import Toast from '../../../Componenets/ui/Toast';

const UserProfile = () => {
  const { userData, user, updateUserData } = useUser();
  const [loading, setLoading] = useState(true);
  const [isUpdatingPersonal, setIsUpdatingPersonal] = useState(false);
  const [isUpdatingBank, setIsUpdatingBank] = useState(false);
  const [showMasterPassword, setShowMasterPassword] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const [formData, setFormData] = useState({
    loginId: "",
    fullName: "",
    emailId: "",
    mobileNumber: "",
    masterPassword: "",
    bep20Wallet: "",
    accountHolderName: "",
    bankName: "",
    ifscCode: "",
    accountNumber: "",
    updateMasterPassword: "",
  });

  // Get user data from context
  const userName = userData?.name || user?.Name || user?.name;
  const userEmail = userData?.email || user?.email || "user@example.com";
  const userMobile = userData?.MobileNo || user?.MobileNo || user?.mobile || "";
  const loginid = userData?.loginid || userData?.me;
  const userProfileImage = userData?.profileImage || "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg";

  useEffect(() => {
    if (userData) {
      const savedAccountNumber = localStorage.getItem("accountNumber") || "";
      const savedBep20Wallet = localStorage.getItem("bep20Wallet") || "";
      const savedAccountHolderName = localStorage.getItem("accountHolderName") || "";
      const savedBankName = localStorage.getItem("bankName") || "";
      const savedIfscCode = localStorage.getItem("ifscCode") || "";
      const savedMasterPassword = localStorage.getItem("masterPassword") || "";
      const savedUpiNumber = localStorage.getItem("upiNumber") || "";

      setFormData(prev => ({
        ...prev,
        loginId: userData?.me || userData?.loginid,
        fullName: userData?.name || userName,
        emailId: userData?.email || userEmail,
        mobileNumber: userData?.MobileNo || userMobile,
        regNo: userData?.regno || userData?.RegNo,
        accountNumber: savedAccountNumber,
        bep20Wallet: savedBep20Wallet,
        accountHolderName: savedAccountHolderName,
        bankName: savedBankName,
        ifscCode: savedIfscCode,
        masterPassword: savedMasterPassword,
        upiNumber: savedUpiNumber
      }));
      setLoading(false);
    }
  }, [userData, userName, userEmail, userMobile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // API call to update personal profile
  const updateProfileAPI = async (profileData) => {
    try {
      const requestData = {
        regNo: parseInt(profileData.regNo) || parseInt(userData?.regno),
        fName: profileData.fullName,
        emailID: profileData.emailId,
        mobile: profileData.mobileNumber,
        masterPasword: formData.masterPassword,
      };
      
      const response = await apiClient.post('/User/update-profile', requestData);

      if (response.data?.success) {
        if (updateUserData) {
          updateUserData({
            name: profileData.fullName,
            emailID: profileData.emailId,
            mobile: profileData.mobileNumber
          });
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Profile update error:", error);
      return false;
    }
  };

  // API call to update bank details
  const updateBankDetailsAPI = async (bankData) => {
    try {
      const requestData = {
        regNo: parseInt(bankData.regNo) || parseInt(userData?.regno),
        accountNo: bankData.accountNumber,
        accountHolderName: bankData.accountHolderName,
        bankName: bankData.bankName,
        ifscCode: bankData.ifscCode,
        upiNumber: bankData.upiNumber || "",
        masterPasword: bankData.updateMasterPassword || ""
      };
      
      const response = await apiClient.post('/User/update-details', requestData);

      if (response.data?.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Bank details update error:", error);
      return false;
    }
  };

  // Handler for Personal Details section
  const handlePersonalSubmit = async (e) => {
    e.preventDefault();

    if (isUpdatingPersonal) {
      toast.error("Please wait...");
      return;
    }

    if (!formData.fullName) {
      toast.error("Full name is required");
      return;
    }
    if (!formData.emailId) {
      toast.error("Email ID is required");
      return;
    }
    if (!formData.mobileNumber) {
      toast.error("Mobile number is required");
      return;
    }
    if (!formData.masterPassword) {
      toast.error("Login password is required");
      return;
    }

    setIsUpdatingPersonal(true);

    try {
      const profileUpdateData = {
        fullName: formData.fullName,
        emailId: formData.emailId,
        mobileNumber: formData.mobileNumber,
        regNo: userData?.regno || user?.regno || userData?.RegNo
      };

      const success = await updateProfileAPI(profileUpdateData);
      
      if (success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setIsUpdatingPersonal(false);
      }, 2000);
    }
  };

  // Handler for Bank & Password section
  const handleBankSubmit = async (e) => {
    e.preventDefault();

    if (isUpdatingBank) {
      toast.error("Please wait...");
      return;
    }

    if (!formData.accountHolderName) {
      toast.error("Account holder name is required");
      return;
    }
    if (!formData.bankName) {
      toast.error("Bank name is required");
      return;
    }
    if (!formData.ifscCode) {
      toast.error("IFSC code is required");
      return;
    }
    if (!formData.accountNumber) {
      toast.error("Account number is required");
      return;
    }

    setIsUpdatingBank(true);

    try {
      const bankData = {
        accountNumber: formData.accountNumber,
        accountHolderName: formData.accountHolderName,
        bankName: formData.bankName,
        ifscCode: formData.ifscCode,
        upiNumber: formData.upiNumber,
        updateMasterPassword: formData.updateMasterPassword,
        regNo: userData?.regno || user?.regno || userData?.RegNo
      };

      const success = await updateBankDetailsAPI(bankData);

      if (success) {
        localStorage.setItem("accountNumber", formData.accountNumber);
        localStorage.setItem("bep20Wallet", formData.bep20Wallet);
        localStorage.setItem("accountHolderName", formData.accountHolderName);
        localStorage.setItem("bankName", formData.bankName);
        localStorage.setItem("ifscCode", formData.ifscCode);
        localStorage.setItem("upiNumber", formData.upiNumber);

        if (formData.updateMasterPassword) {
          localStorage.setItem("masterPassword", formData.updateMasterPassword);
          setFormData(prev => ({
            ...prev,
            masterPassword: formData.updateMasterPassword,
            updateMasterPassword: ""
          }));
          toast.success("Bank details and password updated!");
        } else {
          toast.success("Bank details updated successfully!");
        }
      } else {
        toast.error("Failed to update bank details");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setIsUpdatingBank(false);
      }, 2000);
    }
  };

  const handleCopyWallet = () => {
    if (!formData.bep20Wallet) {
      toast.error("No wallet address to copy");
      return;
    }
    navigator.clipboard.writeText(formData.bep20Wallet);
    setCopySuccess("Copied!");
    toast.success("Wallet address copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="body-wrapper">
      <Toast />
      
      <div className="container">
        {/* Profile Header Card */}
        <div className="card overflow-hidden">
          <div className="card-body p-0">
            <img
              src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/profilebg.jpg"
              alt="Profile Background"
              className="img-fluid w-100"
              style={{ height: '150px', objectFit: 'cover' }}
            />
            <div className="row align-items-center">
              <div className="col-lg-4 order-lg-1 order-2">
              </div>
              <div className="col-lg-4 mt-n3 order-lg-2 order-1">
                <div className="mt-n5">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <div className="d-flex align-items-center justify-content-center round-110">
                      <div className="border border-4 border-white d-flex align-items-center justify-content-center rounded-circle overflow-hidden round-100">
                        <img
                          src={userProfileImage}
                          alt="Profile"
                          className="Profile-img"
                          style={{ objectFit: 'cover', width: '100px', height: '100px' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="mb-0">{formData.fullName || userName}</h5>
                    {loginid && <small className="text-muted">Login Id: {formData.loginId || loginid}</small>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Cards Side by Side */}
        <div className="row mt-4">
          {/* Personal Details Card */}
          <div className="col-lg-6 mb-4">
            <form onSubmit={handlePersonalSubmit}>
              <div className="card shadow-none border h-100">
                <div className="card-body">
                  <h4 className="mb-4">Personal Information</h4>

                  <div className="mb-3">
                    <label className="form-label">Login ID</label>
                    <input
                      type="text"
                      name="loginId"
                      value={formData.loginId}
                      className="form-control bg-light"
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email ID</label>
                    <input
                      type="email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Login Password</label>
                    <div className="input-group">
                      <input
                        type={showMasterPassword ? "text" : "password"}
                        name="masterPassword"
                        value={formData.masterPassword}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Login Password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowMasterPassword(!showMasterPassword)}
                      >
                        <i className={showMasterPassword ? "ti ti-eye-off" : "ti ti-eye"}></i>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={isUpdatingPersonal}
                    >
                      {isUpdatingPersonal ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          UPDATING...
                        </>
                      ) : (
                        <>
                          <i className="ti ti-device-floppy me-2"></i>
                          UPDATE PROFILE
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Bank Details Card */}
          <div className="col-lg-6 mb-4">
            <form onSubmit={handleBankSubmit}>
              <div className="card shadow-none border h-100">
                <div className="card-body">
                  <h4 className="mb-4">Bank Account Details</h4>

                  <div className="mb-3">
                    <label className="form-label">BEP20 Wallet Address</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="bep20Wallet"
                        value={formData.bep20Wallet}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="0x..."
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleCopyWallet}
                        title="Copy address"
                      >
                        <i className="ti ti-copy"></i>
                      </button>
                    </div>
                    {copySuccess && <small className="text-success mt-1 d-block">{copySuccess}</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Account Holder Name</label>
                    <input
                      type="text"
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter Account Holder Name"
                      required
                    />
                  </div>
                 
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Bank Name</label>
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Bank Name"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">IFSC Code</label>
                      <input
                        type="text"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="IFSC Code"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Account Number</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter Account Number"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Update Master Password</label>
                    <div className="input-group">
                      <input
                        type={showUpdatePassword ? "text" : "password"}
                        name="updateMasterPassword"
                        value={formData.updateMasterPassword}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter New Master Password"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowUpdatePassword(!showUpdatePassword)}
                      >
                        <i className={showUpdatePassword ? "ti ti-eye-off" : "ti ti-eye"}></i>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={isUpdatingBank}
                    >
                      {isUpdatingBank ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          UPDATING...
                        </>
                      ) : (
                        <>
                          <i className="ti ti-device-floppy me-2"></i>
                          UPDATE BANK DETAILS
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;