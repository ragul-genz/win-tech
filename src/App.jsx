import React, { useState } from 'react';
import DashboardHeader from './components/DashboardHeader';
import DashboardCourses from './components/DashboardCourses';
import DashboardBlogs from './components/DashboardBlogs';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [userRole, setUserRole] = useState(null); // 'admin' | 'user' | null
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeUserTab, setActiveUserTab] = useState('courses');
  
  const [loggedUsers, setLoggedUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  const [blogs, setBlogs] = useState([
    {
        id: 1,
        title: "Introduction to React 19",
        content: "React 19 brings exciting new features like the use hook, Server Components, and improved Actions. This makes state management and data fetching much more intuitive than before. In this article, we'll explore how these new features can drastically reduce boilerplate code.",
        author: "Tech Team",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
        date: "10/24/2023",
        likes: 12,
        likedByUser: false
    },
    {
        id: 2,
        title: "Mastering Tailwind CSS",
        content: "Tailwind CSS is a utility-first framework that allows you to rapidly build custom designs without leaving your HTML. By understanding its core principles, you can create responsive and highly maintainable user interfaces in record time.",
        author: "Admin",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
        date: "11/02/2023",
        likes: 8,
        likedByUser: true
    }
  ]);
  
  const [courses, setCourses] = useState([
    {
        id: 1,
        title: "Boot Camp",
        instructor: "T.Muthuvel Ganesh",
        progress: 0,
        inLibrary: true,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        title: "Full Stack Development Ma...",
        instructor: "A.Vinothkumar",
        progress: 4,
        inLibrary: true,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        title: "B - HTML , CSS & Bootstra...",
        instructor: "Instructor Name",
        progress: 0,
        inLibrary: true,
        image: "https://images.unsplash.com/photo-1627398240411-8fc5f1d41a33?w=800&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        title: "Developer Series",
        instructor: "Instructor Name",
        progress: 0,
        inLibrary: true,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60"
    }
  ]);

  const handleLogin = (role, userId) => {
    setUserRole(role);
    if (role === 'user') {
      const uniqueId = 'WIN' + Math.floor(100000 + Math.random() * 900000);
      setCurrentUser({
        name: userId,
        id: uniqueId,
        email: userId.toLowerCase().replace(/\s+/g, '') + '@gmail.com',
        joined: new Date().toLocaleDateString()
      });

      const getDeviceInfo = () => {
        const ua = navigator.userAgent;
        if (/android/i.test(ua)) return "Android Device";
        if (/iPad|iPhone|iPod/.test(ua)) return "iOS Device";
        if (/Windows/i.test(ua)) return "Windows PC";
        if (/Mac/i.test(ua)) return "Mac OS";
        return "Desktop";
      };
      
      setLoggedUsers(prev => {
        if (!prev.find(u => u.userId === userId)) {
          return [...prev, { 
            userId: userId, 
            device: getDeviceInfo(),
            loginTime: new Date().toISOString(),
            activity: 'Browsing Dashboard'
          }];
        }
        return prev;
      });
    } else {
      setCurrentUser(userId); // admin
    }
  };

  const handleLikeBlog = (blogId) => {
    setBlogs(blogs.map(blog => {
        if (blog.id === blogId) {
            const isLiked = blog.likedByUser;
            return { 
                ...blog, 
                likes: isLiked ? (blog.likes || 1) - 1 : (blog.likes || 0) + 1,
                likedByUser: !isLiked
            };
        }
        return blog;
    }));
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUser(null);
  };

  if (userRole === null) {
    return <Login onLogin={handleLogin} />;
  }

  if (userRole === 'admin') {
    return (
      <AdminDashboard 
        loggedUsers={loggedUsers} 
        courses={courses} 
        setCourses={setCourses} 
        blogs={blogs}
        setBlogs={setBlogs}
        setNotifications={setNotifications}
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <div className="dashboard-layout">
      <DashboardHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        notifications={notifications} 
        setNotifications={setNotifications}
        currentUser={currentUser}
        activeUserTab={activeUserTab}
        setActiveUserTab={setActiveUserTab}
        onLogout={handleLogout}
      />
      
      {/* Navigation Sub-header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
            <button 
                onClick={() => setActiveUserTab('courses')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: activeUserTab === 'courses' ? '600' : '500', color: activeUserTab === 'courses' ? '#4f46e5' : '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <i className='bx bx-book-open'></i> My Courses
            </button>
            <button 
                onClick={() => setActiveUserTab('blogs')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: activeUserTab === 'blogs' ? '600' : '500', color: activeUserTab === 'blogs' ? '#4f46e5' : '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <i className='bx bx-news'></i> Blogs
            </button>
        </div>
        <div>
            <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <i className='bx bx-log-out'></i> Logout
            </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 130px)' }}>
          {activeUserTab === 'courses' ? (
              <DashboardCourses searchQuery={searchQuery} courses={courses} />
          ) : activeUserTab === 'blogs' ? (
              <DashboardBlogs blogs={blogs} onLike={handleLikeBlog} searchQuery={searchQuery} />
          ) : (
              /* User Profile View */
              <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
                  <h2 style={{ fontSize: '2rem', color: '#0f172a', margin: '0 0 30px 0' }}>My Profile</h2>
                  <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', gap: '40px', alignItems: 'center' }}>
                      <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold' }}>
                          {currentUser?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                          <div>
                              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Full Name</p>
                              <h3 style={{ margin: '5px 0 0 0', color: '#0f172a', fontSize: '1.4rem' }}>{currentUser?.name}</h3>
                          </div>
                          <div>
                              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>User ID / Student ID</p>
                              <div style={{ display: 'inline-block', marginTop: '5px', backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '5px 12px', borderRadius: '6px', fontWeight: '600', fontSize: '1.1rem' }}>
                                  {currentUser?.id}
                              </div>
                          </div>
                          <div style={{ display: 'flex', gap: '30px', marginTop: '10px' }}>
                              <div>
                                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Email</p>
                                  <p style={{ margin: '5px 0 0 0', color: '#334155', fontWeight: '500' }}>{currentUser?.email}</p>
                              </div>
                              <div>
                                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Joined On</p>
                                  <p style={{ margin: '5px 0 0 0', color: '#334155', fontWeight: '500' }}>{currentUser?.joined}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
}

export default App;
