import React, { useState, useEffect } from 'react';
import CustomTable from '../../Componenets/ui/customtable/CustomTable';
import Pagination from '../../Componenets/ui/pagination/Pagination';
import apiClient from '../../api/apiClient';
import { useUser } from '../../context/UserContext';

const DownlineTeam = () => {
  const { userData } = useUser();
  const [loading, setLoading] = useState(false);
  const [downlineData, setDownlineData] = useState([]);
  const [recordCount, setRecordCount] = useState(0);
  const [totalBusiness, setTotalBusiness] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [findlvl, setFindlvl] = useState(1);  
  const [type, setType] = useState(1);
  const [levelOptions, setLevelOptions] = useState([1, 2, 3, 4, 5]);
  const pageSize = 10;

  // Columns as per image - S.NO., DOWNLINE INFO, SPONSOR, INVESTED AMOUNT, ACTION
  const columns = [
    { header: "S.No.", key: "sno" },
    { header: "Downline Info", key: "downlineInfo" },
    { header: "Sponsor", key: "sponsor" },
    { header: "Invested Amount", key: "Stake" },
    { header: "Action", key: "action" }
  ];

  useEffect(() => {
    fetchDownlineTeam();
  }, [currentPage, findlvl, type]);

  const fetchDownlineTeam = async () => {
    setLoading(true);
    try {
      const regno = userData?.regno || localStorage.getItem("regno");

      const response = await apiClient.post(
        '/Dashboard/downline-team',
        {
          mregno: parseInt(regno),
          type: type,
          findlvl: findlvl,
          pageIndex: currentPage,
          pageSize: pageSize
        },
      );

      if (response.data.success) {
        const data = response.data.data.data || [];
        const dataWithSNo = data.map((item, index) => ({
          ...item,
          sno: (currentPage - 1) * pageSize + index + 1
        }));
        setDownlineData(dataWithSNo);
        setRecordCount(response.data.data.recordCount || 0);
        setTotalBusiness(response.data.data.totalBusiness || 0);
      }
    } catch (error) {
      console.error("Error fetching downline team:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLevelChange = (e) => {
    setFindlvl(parseInt(e.target.value));
    setCurrentPage(1);
  };
  const handleTypeChange = (e) => {
    setType(parseInt(e.target.value));
    setCurrentPage(1);
  };
  
  // Chat with user function
  const handleChat = (user) => {
    // Navigate to chat page or open chat modal
    console.log("Chat with:", user);
    // Example: navigate(`/chat?user=${user.regno}`);
  };

  return (
    <div className="Table-container container-fluid p-3">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h4 className="fw-bold " style={{ color: "#2A3547" }}>Downline Team</h4>
        </div>
        
        {/* Summary Cards */}
        <div className="d-flex gap-3">
          <div className="bg-primary-subtle rounded-3 p-2 text-center" style={{ minWidth: "50px" }}>
            <span className="text-muted fs-2">Total Members</span>
            <h5 className="fw-bold mb-0 text-primary">{recordCount}</h5>
          </div>
          <div className="bg-success-subtle rounded-3 p-2 text-center" style={{ minWidth: "150px" }}>
            <span className="text-muted fs-2">Team Business</span>
            <h5 className="fw-bold mb-0 text-success">${totalBusiness?.toLocaleString() || '0'}</h5>
          </div>
        </div>
      </div>


      {/* Filters Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            <div className="col-md-3">
              <label className="form-label fw-semibold mb-1 fs-2">Select Level</label>
              <select 
                className="form-select form-select-sm"
                value={findlvl} 
                onChange={handleLevelChange}
              >
                {levelOptions.map(level => (
                  <option key={level} value={level}>Level {level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <CustomTable 
        columns={columns.map(col => col.header)} 
        loading={loading}
        emptyMessage="No downline members found"
      >
        {downlineData.map((item, index) => (
          <tr key={index}>
            <td className="py-2 px-3">{item.sno}</td>
            <td className="py-2 px-3">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2">
                  <div>
                    <span className="fw-semibold d-block">{item.name || '-'}</span>
                    <span className="text-muted fs-2">{item.loginid || '-'}</span>
                  </div>
                </div>
                <div className="mt-1">
                  <small className="text-muted">
                    <i className="ti ti-calendar me-1"></i>
                    {item.regdate?.split('T')[0] || '-'} {item.regdate?.split('T')[1]?.split('.')[0] || ''}
                  </small>
                </div>
              </div>
            </td>
            <td className="py-2 px-3">
              <div className="d-flex flex-column">
                <span className="fw-semibold">{item.Sponsor || '-'}</span>
                <span className="text-muted fs-2">{item.introName || '-'}</span>
              </div>
            </td>
            <td className="py-2 px-3">
              <div className="d-flex flex-column">
                <span className="fw-bold text-success">${item.Stake?.toLocaleString() || '0'}</span>
                <span className="text-muted fs-2">
                  <i className="ti ti-calendar me-1"></i>
                  {item.TopupDate?.split('T')[0] || '-'} {item.TopupDate?.split('T')[1]?.split('.')[0] || ''}
                </span>
              </div>
            </td>
            <td className="py-2 px-3">
              <button 
                className="btn btn-sm btn-primary rounded-2 d-flex align-items-center gap-1"
                onClick={() => handleChat(item)}
              >
                <i className="ti ti-message fs-5"></i>
                <span>Chat</span>
              </button>
            </td>
          </tr>
        ))}
      </CustomTable>
      {/* Pagination Section */}
      {!loading && recordCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(recordCount / pageSize)}
          totalRecords={recordCount}
          onPageChange={handlePageChange}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};

export default DownlineTeam;