import  { useState } from 'react';
import { useUser } from '../../../context/UserContext';

const UserProfile = () => {
  const { userData, user } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState({});

  // Get user data from context
  const userName = userData?.name || user?.Name || user?.name || "Mathew Anderson";
  const userEmail = userData?.email || user?.email || "user@example.com";
  const userMobile = userData?.MobileNo || user?.MobileNo || user?.mobile || "";
  const userRegno = userData?.regno || user?.Regno || user?.regno || "";
  const userProfileImage = userData?.profileImage || "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg";
  const userRole = userData?.role || "Member";

  // Handle comment change
  const handleCommentChange = (postId, value) => {
    setCommentText(prev => ({ ...prev, [postId]: value }));
  };

  // Handle post submit
  const handlePostSubmit = () => {
    if (postText.trim()) {
      // Add API call here
      console.log("Post:", postText);
      setPostText('');
    }
  };

  // Handle comment submit
  const handleCommentSubmit = (postId) => {
    const comment = commentText[postId];
    if (comment?.trim()) {
      // Add API call here
      console.log(`Comment on post ${postId}:`, comment);
      handleCommentChange(postId, '');
    }
  };

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        {/* Breadcrumb */}
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
          <div className="card-body px-4 py-3">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="fw-semibold mb-8">User Profile</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="text-muted text-decoration-none" href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">User Profile</li>
                  </ol>
                </nav>
              </div>
              <div className="col-3">
                <div className="text-center mb-n5">
                  <img 
                    src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/breadcrumb/ChatBc.png" 
                    alt="modernize-img" 
                    className="img-fluid mb-n4" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Header Card */}
        <div className="card overflow-hidden">
          <div className="card-body p-0">
            <img 
              src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/profilebg.jpg" 
              alt="Profile Background" 
              className="img-fluid w-100" 
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="row align-items-center">
              <div className="col-lg-4 order-lg-1 order-2">
                <div className="d-flex align-items-center justify-content-around m-4">
                  <div className="text-center">
                    <i className="ti ti-file-description fs-6 d-block mb-2"></i>
                    <h4 className="mb-0 lh-1">{userData?.posts || 938}</h4>
                    <p className="mb-0">Posts</p>
                  </div>
                  <div className="text-center">
                    <i className="ti ti-user-circle fs-6 d-block mb-2"></i>
                    <h4 className="mb-0 lh-1">{userData?.followers || 3,586}</h4>
                    <p className="mb-0">Followers</p>
                  </div>
                  <div className="text-center">
                    <i className="ti ti-user-check fs-6 d-block mb-2"></i>
                    <h4 className="mb-0 lh-1">{userData?.following || 2,659}</h4>
                    <p className="mb-0">Following</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-n3 order-lg-2 order-1">
                <div className="mt-n5">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <div className="d-flex align-items-center justify-content-center round-110">
                      <div className="border border-4 border-white d-flex align-items-center justify-content-center rounded-circle overflow-hidden round-100">
                        <img 
                          src={userProfileImage} 
                          alt="Profile" 
                          className="w-100 h-100" 
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="mb-0">{userName}</h5>
                    <p className="mb-0">{userRole}</p>
                    {userRegno && <small className="text-muted">ID: {userRegno}</small>}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 order-last">
                <ul className="list-unstyled d-flex align-items-center justify-content-center justify-content-lg-end my-3 mx-4 pe-xxl-4 gap-3">
                  <li>
                    <a className="d-flex align-items-center justify-content-center btn btn-primary p-2 fs-4 rounded-circle" href="#">
                      <i className="ti ti-brand-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a className="btn btn-secondary d-flex align-items-center justify-content-center p-2 fs-4 rounded-circle" href="#">
                      <i className="ti ti-brand-dribbble"></i>
                    </a>
                  </li>
                  <li>
                    <a className="btn btn-danger d-flex align-items-center justify-content-center p-2 fs-4 rounded-circle" href="#">
                      <i className="ti ti-brand-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <button className="btn btn-primary text-nowrap">Add To Story</button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-pills user-profile-tab justify-content-end mt-2 bg-primary-subtle rounded-2 rounded-top-0" role="tablist">
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link hstack gap-2 rounded-0 py-6 ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <i className="ti ti-user-circle fs-5"></i>
                  <span className="d-none d-md-block">Profile</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link hstack gap-2 rounded-0 py-6 ${activeTab === 'followers' ? 'active' : ''}`}
                  onClick={() => setActiveTab('followers')}
                >
                  <i className="ti ti-heart fs-5"></i>
                  <span className="d-none d-md-block">Followers</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link hstack gap-2 rounded-0 py-6 ${activeTab === 'friends' ? 'active' : ''}`}
                  onClick={() => setActiveTab('friends')}
                >
                  <i className="ti ti-user-circle fs-5"></i>
                  <span className="d-none d-md-block">Friends</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link hstack gap-2 rounded-0 py-6 ${activeTab === 'gallery' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gallery')}
                >
                  <i className="ti ti-photo-plus fs-5"></i>
                  <span className="d-none d-md-block">Gallery</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="tab-pane fade show active">
              <div className="row">
                <div className="col-lg-4">
                  {/* Introduction Card */}
                  <div className="card shadow-none border">
                    <div className="card-body">
                      <h4 className="mb-3">Introduction</h4>
                      <p className="card-subtitle">
                        Hello, I am {userName}. I love making websites and graphics. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                      <div className="vstack gap-3 mt-4">
                        <div className="hstack gap-6">
                          <i className="ti ti-briefcase text-dark fs-6"></i>
                          <h6 className="mb-0">Sir, P P Institute Of Science</h6>
                        </div>
                        <div className="hstack gap-6">
                          <i className="ti ti-mail text-dark fs-6"></i>
                          <h6 className="mb-0">{userEmail}</h6>
                        </div>
                        {userMobile && (
                          <div className="hstack gap-6">
                            <i className="ti ti-phone text-dark fs-6"></i>
                            <h6 className="mb-0">{userMobile}</h6>
                          </div>
                        )}
                        <div className="hstack gap-6">
                          <i className="ti ti-map-pin text-dark fs-6"></i>
                          <h6 className="mb-0">Newyork, USA - 100001</h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Photos Card */}
                  <div className="card shadow-none border">
                    <div className="card-body">
                      <h4 className="fw-semibold mb-3">Photos</h4>
                      <div className="row">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <div className="col-4" key={num}>
                            <img 
                              src={`https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-${num}.jpg`}
                              alt={`Photo ${num}`}
                              className="rounded-1 img-fluid mb-9"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8">
                  {/* Post Input */}
                  <div className="card shadow-none border">
                    <div className="card-body">
                      <div className="form-floating mb-3">
                        <textarea 
                          className="form-control" 
                          placeholder="Leave a comment here" 
                          id="floatingTextarea2"
                          style={{ height: '140px' }}
                          value={postText}
                          onChange={(e) => setPostText(e.target.value)}
                        ></textarea>
                        <label htmlFor="floatingTextarea2">Share your thoughts</label>
                      </div>
                      <div className="d-flex align-items-center gap-6 flex-wrap">
                        <div className="hstack align-self-center gap-3">
                          <div className="hstack gap-6">
                            <a className="p-0 hstack justify-content-center round-32 btn btn-primary rounded-circle" href="#">
                              <i className="ti ti-photo"></i>
                            </a>
                            <a href="#" className="text-dark link-primary">Photo / Video</a>
                          </div>
                          <div className="hstack gap-6">
                            <a className="hstack p-0 round-32 justify-content-center btn btn-secondary rounded-circle" href="#">
                              <i className="ti ti-notebook"></i>
                            </a>
                            <a href="#" className="text-dark link-secondary">Article</a>
                          </div>
                        </div>
                        <button className="btn btn-primary ms-auto" onClick={handlePostSubmit}>Post</button>
                      </div>
                    </div>
                  </div>

                  {/* Sample Post */}
                  <div className="card">
                    <div className="card-body border-bottom">
                      <div className="d-flex align-items-center gap-6 flex-wrap">
                        <img src={userProfileImage} alt="Profile" className="rounded-circle" width="40" height="40" />
                        <h6 className="mb-0">{userName}</h6>
                        <span className="fs-2 hstack gap-2">
                          <span className="round-10 text-bg-light rounded-circle d-inline-block"></span> 15 min ago
                        </span>
                      </div>
                      <p className="text-dark my-3">
                        Welcome to my profile! I'm excited to share my journey with all of you. 
                        Stay tuned for more updates and amazing content.
                      </p>
                      <div className="d-flex align-items-center my-3">
                        <div className="d-flex align-items-center gap-2">
                          <a className="round-32 rounded-circle btn btn-primary p-0 hstack justify-content-center" href="#">
                            <i className="ti ti-thumb-up"></i>
                          </a>
                          <span className="text-dark fw-semibold">67</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 ms-4">
                          <a className="round-32 rounded-circle btn btn-secondary p-0 hstack justify-content-center" href="#">
                            <i className="ti ti-message-2"></i>
                          </a>
                          <span className="text-dark fw-semibold">2</span>
                        </div>
                        <a className="text-dark ms-auto d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="#">
                          <i className="ti ti-share"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Followers Tab */}
          {activeTab === 'followers' && (
            <div className="tab-pane fade show active">
              <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">
                  Followers <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">20</span>
                </h3>
                <form className="position-relative">
                  <input type="text" className="form-control search-chat py-2 ps-5" placeholder="Search Followers" />
                  <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></i>
                </form>
              </div>
              <div className="row">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <div className="col-md-6 col-xl-4" key={num}>
                    <div className="card">
                      <div className="card-body p-4 d-flex align-items-center gap-6 flex-wrap">
                        <img 
                          src={`https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-${num}.jpg`}
                          alt="Follower"
                          className="rounded-circle"
                          width="40"
                          height="40"
                        />
                        <div>
                          <h5 className="fw-semibold mb-0">Follower {num}</h5>
                          <span className="fs-2 d-flex align-items-center">
                            <i className="ti ti-map-pin text-dark fs-3 me-1"></i>Country Name
                          </span>
                        </div>
                        <button className="btn btn-outline-primary py-1 px-2 ms-auto">Follow</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Friends Tab */}
          {activeTab === 'friends' && (
            <div className="tab-pane fade show active">
              <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">
                  Friends <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">20</span>
                </h3>
                <form className="position-relative">
                  <input type="text" className="form-control search-chat py-2 ps-5" placeholder="Search Friends" />
                  <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></i>
                </form>
              </div>
              <div className="row">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div className="col-sm-6 col-lg-4" key={num}>
                    <div className="card hover-img">
                      <div className="card-body p-4 text-center border-bottom">
                        <img 
                          src={`https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-${num}.jpg`}
                          alt="Friend"
                          className="rounded-circle mb-3"
                          width="80"
                          height="80"
                        />
                        <h5 className="fw-semibold mb-0">Friend Name</h5>
                        <span className="text-dark fs-2">Friend Role</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="tab-pane fade show active">
              <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">
                  Gallery <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">12</span>
                </h3>
                <form className="position-relative">
                  <input type="text" className="form-control search-chat py-2 ps-5" placeholder="Search Photos" />
                  <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></i>
                </form>
              </div>
              <div className="row">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div className="col-md-6 col-lg-4" key={num}>
                    <div className="card hover-img overflow-hidden">
                      <div className="card-body p-0">
                        <img 
                          src={`https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/products/s${num}.jpg`}
                          alt={`Gallery ${num}`}
                          height="220"
                          className="w-100 object-fit-cover"
                        />
                        <div className="p-4 d-flex align-items-center justify-content-between">
                          <div>
                            <h6 className="mb-0">Image {num}.jpg</h6>
                            <span className="text-dark fs-2">Wed, Dec 14, 2024</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;