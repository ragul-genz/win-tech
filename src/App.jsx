import React, { useState } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Checkout from './components/Checkout';
import CourseDetails from './components/CourseDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CoursesPage from './components/CoursesPage';
import PracticePage from './components/PracticePage';
import ReviewsPage from './components/ReviewsPage';
import BlogsPage from './components/BlogsPage';
import ContactPage from './components/ContactPage';
import StudentDashboard from './components/StudentDashboard';
import VerificationPage from './components/VerificationPage';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'about' | 'courses' | 'practice' | 'reviews' | 'blogs' | 'contact' | 'login' | 'checkout' | 'dashboard' | 'course_details'
  const [checkoutCourse, setCheckoutCourse] = useState(null); // The course user is buying
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null); // Course for details page
  const [userRole, setUserRole] = useState(null); // 'admin' | 'user' | null
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeUserTab, setActiveUserTab] = useState('courses');
  
  const [loggedUsers, setLoggedUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  const [orders, setOrders] = useState([
      { id: 'ORD-1001', studentName: 'Arun Kumar', email: 'arun@gmail.com', courseTitle: 'Full Stack Development', amount: 2999, status: 'PAID', date: 'Aug 12, 2026', paymentMethod: 'UPI', paymentId: 'pay_xyz123', transactionId: 'txn_987xyz', courseId: 2, userId: 'STU-1001' },
      { id: 'ORD-1002', studentName: 'Priya S', email: 'priya@gmail.com', courseTitle: 'Boot Camp', amount: 3999, status: 'PAID', date: 'Aug 12, 2026', paymentMethod: 'Card', paymentId: 'pay_abc456', transactionId: 'txn_654cba', courseId: 1, userId: 'STU-1002' },
      { id: 'ORD-1003', studentName: 'Ravi K', email: 'ravi@gmail.com', courseTitle: 'Full Stack Development', amount: 2999, status: 'FAILED', date: 'Aug 11, 2026', paymentMethod: 'UPI', paymentId: 'pay_fail01', transactionId: 'txn_fail01', courseId: 2, userId: 'STU-1004' },
      { id: 'ORD-1004', studentName: 'Karthik R', email: 'karthik@gmail.com', courseTitle: 'Developer Series', amount: 4999, status: 'REFUNDED', date: 'Aug 10, 2026', paymentMethod: 'Net Banking', paymentId: 'pay_ref01', transactionId: 'txn_ref01', courseId: 4, userId: 'STU-1003' }
  ]);
  
  const [certificateSettings, setCertificateSettings] = useState(() => {
    const saved = localStorage.getItem('win_certificate_settings');
    return saved ? JSON.parse(saved) : {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
      title: 'CERTIFICATE OF COMPLETION',
      platformName: 'Win Tech Academy',
      signature: '',
      signatoryName: 'Dr. XYZ',
      designation: 'Founder & CEO',
      textTemplate: 'This is to certify that\n{student_name}\n\nhas successfully completed\n{course_name}',
      idPrefix: 'CERT',
      enableQR: true,
      enableVerification: true
    };
  });
  
  const [mockAdminStudents, setMockAdminStudents] = useState([
      {
          id: 'STU-1001',
          name: 'Arun Kumar',
          email: 'arun@gmail.com',
          joinedDate: 'Aug 10, 2026',
          status: 'Active',
          active_device_id: 'DV-82A91',
          active_device_name: 'Chrome · Windows',
          spent: 6497,
          avatar: 'A',
          enrollments: [
              {
                  courseId: 2, // Full Stack Masterclass
                  progressPercentage: 60,
                  completedCount: 3,
                  totalCount: 5,
                  lastWatched: 'Day_3: CSS Basics',
                  modules: [
                      {
                          name: 'Module 1 - Web Basics',
                          episodes: [
                              { id: 1, title: 'Day_1: Introduction to Full Stack Development', status: 'completed' },
                              { id: 2, title: 'Day_2: Introduction to HTML', status: 'completed' },
                              { id: 3, title: 'Day_3: CSS Basics', status: 'playing' }
                          ]
                      },
                      {
                          name: 'Module 2 - JavaScript & React',
                          episodes: [
                              { id: 4, title: 'Day_4: JavaScript Fundamentals', status: 'locked' },
                              { id: 5, title: 'Day_5: React Intro', status: 'locked' }
                          ]
                      }
                  ]
              }
          ],
          orders: [
              { id: 'ORD-1001', courseName: 'Full Stack Development Masterclass', amount: 6999, status: 'Paid', date: 'Aug 10, 2026' }
          ],
          certificates: []
      },
      {
          id: 'STU-1002',
          name: 'Priya S',
          email: 'priya@gmail.com',
          joinedDate: 'Aug 09, 2026',
          status: 'Active',
          spent: 3999,
          avatar: 'P',
          enrollments: [
              {
                  courseId: 1, // Boot Camp
                  progressPercentage: 100,
                  completedCount: 2,
                  totalCount: 2,
                  lastWatched: 'Day 2: Fundamentals',
                  modules: [
                      {
                          name: 'Module 1 - Basics',
                          episodes: [
                              { id: 1, title: 'Day 1: Introduction to Boot Camp', status: 'completed' },
                              { id: 2, title: 'Day 2: Fundamentals', status: 'completed' }
                          ]
                      }
                  ]
              }
          ],
          orders: [
              { id: 'ORD-0950', courseName: 'Boot Camp', amount: 3999, status: 'Paid', date: 'Aug 09, 2026' }
          ],
          certificates: [
              { id: 'CERT-82931', courseName: 'Boot Camp', date: 'Aug 12, 2026' }
          ]
      },
      {
          id: 'STU-1003',
          name: 'Karthik R',
          email: 'karthik@gmail.com',
          joinedDate: 'Aug 07, 2026',
          status: 'Active',
          spent: 4999,
          avatar: 'K',
          enrollments: [
              {
                  courseId: 4, // Developer Series
                  progressPercentage: 25,
                  completedCount: 1,
                  totalCount: 4,
                  lastWatched: 'Day 1: System Design Basics',
                  modules: [
                      {
                          name: 'Module 1 - Architecture',
                          episodes: [
                              { id: 1, title: 'Day 1: System Design Basics', status: 'completed' }
                          ]
                      }
                  ]
              }
          ],
          orders: [
              { id: 'ORD-0899', courseName: 'Developer Series', amount: 4999, status: 'Paid', date: 'Aug 07, 2026' }
          ],
          certificates: []
      }
  ]);
  
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
        category: "Web Development",
        level: "Beginner",
        duration: "30 Hours",
        language: "English",
        rating: 4.8,
        reviewsCount: 1240,
        progress: 0,
        inLibrary: true,
        price: 3999,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
        description: "A comprehensive boot camp designed to take you from zero to hero in web development. Learn the core fundamentals required to build modern applications.",
        whatYouWillLearn: [
            "Understand the basic architecture of the web.",
            "Write clean, semantic HTML and CSS.",
            "Learn programming fundamentals with JavaScript.",
            "Set up your development environment like a pro."
        ],
        requirements: ["No prior coding experience needed", "A computer with internet access"],
        faq: [
            { question: "Is this course for absolute beginners?", answer: "Yes, we start from the very basics." },
            { question: "Do I get a certificate?", answer: "Yes, upon completion you will receive a verifiable certificate." }
        ],
        status: 'Published',
        episodes: [
            { id: 1, title: "Day 1: Introduction to Boot Camp", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "Welcome to the boot camp. Today we will cover the basics and set up our environment.", duration: "12:30", status: "Published", isPreview: true },
            { id: 2, title: "Day 2: Fundamentals", videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY", description: "Diving deep into the core fundamentals of programming.", duration: "45:00", status: "Published", isPreview: false }
        ]
    },
    {
        id: 2,
        title: "Full Stack Development Masterclass",
        instructor: "A.Vinothkumar",
        category: "Web Development",
        level: "Intermediate",
        duration: "120 Hours",
        language: "English",
        rating: 4.9,
        reviewsCount: 3450,
        progress: 4,
        inLibrary: true,
        price: 6999,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
        description: "Master Full Stack Development by building real-world projects. From frontend UI to backend APIs and databases, this course covers everything you need to become a professional developer.",
        whatYouWillLearn: [
            "Build responsive and dynamic web applications.",
            "Master React.js for the frontend.",
            "Build robust REST APIs using Node.js and Express.",
            "Manage databases efficiently."
        ],
        requirements: ["Basic understanding of HTML, CSS, and JavaScript", "Familiarity with programming concepts"],
        faq: [
            { question: "What stack is used?", answer: "We focus on the MERN stack (MongoDB, Express, React, Node)." }
        ],
        status: 'Published',
        episodes: [
            { id: 1, title: "Day_1: Introduction to Full Stack Development", videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY", description: "Course Overview and Introduction.", duration: "18:45", status: "Published", isPreview: true },
            { id: 2, title: "Day_2: Introduction to HTML", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "Install IDE and Develop an E-Commerce Website Using HTML.", duration: "25:10", status: "Published", isPreview: false },
            { id: 3, title: "Day_3: CSS Basics", videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY", description: "Develop a price tag in E-Commerce Website using CSS.", duration: "32:20", status: "Published", isPreview: false },
            { id: 4, title: "Day_4: JavaScript Fundamentals", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "Variables, Functions, and DOM manipulation.", duration: "28:15", status: "Published", isPreview: false },
            { id: 5, title: "Day_5: React Intro", videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY", description: "Components, Props, and State.", duration: "40:00", status: "Published", isPreview: false }
        ]
    },
    {
        id: 3,
        title: "B - HTML , CSS & Bootstrap",
        instructor: "Instructor Name",
        category: "Programming",
        level: "Beginner",
        duration: "15 Hours",
        language: "English",
        rating: 4.6,
        reviewsCount: 890,
        progress: 0,
        inLibrary: true,
        price: 0,
        image: "https://images.unsplash.com/photo-1627398240411-8fc5f1d41a33?w=800&auto=format&fit=crop&q=60",
        description: "Learn how to build beautiful, responsive websites quickly using HTML, CSS, and the powerful Bootstrap framework.",
        whatYouWillLearn: [
            "Create responsive layouts using Bootstrap grid.",
            "Style web pages beautifully with custom CSS.",
            "Build a complete portfolio website from scratch."
        ],
        requirements: ["Basic computer skills"],
        faq: [],
        episodes: [
            { id: 1, title: "Day 1: HTML Basics", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "Learning HTML from scratch." }
        ]
    },
    {
        id: 4,
        title: "Developer Series",
        instructor: "Instructor Name",
        category: "AI & ML",
        level: "Advanced",
        duration: "45 Hours",
        language: "English",
        rating: 4.7,
        reviewsCount: 560,
        progress: 0,
        inLibrary: true,
        price: 4999,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
        description: "An advanced series covering modern software engineering practices, system design, and algorithms.",
        whatYouWillLearn: [
            "Understand scalable system design.",
            "Write optimized and clean code.",
            "Prepare for top-tier tech interviews."
        ],
        requirements: ["Solid programming experience", "Understanding of basic data structures"],
        faq: [],
        episodes: [
            { id: 1, title: "Episode 1: Introduction", videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY", description: "Welcome to the developer series." }
        ]
    }
  ]);

  const handleLogin = (role, userId) => {
    setUserRole(role);
    if (role === 'user') {
      const uniqueId = 'WIN' + Math.floor(100000 + Math.random() * 900000);
      const userEmail = userId.email || (userId.toLowerCase().replace(/\s+/g, '') + '@gmail.com');
      const userName = userId.fullName || userId;
      
      const savedData = JSON.parse(localStorage.getItem(`win_user_${userEmail}`) || '{"enrolledCourseIds":[], "completedEpisodes":{}, "wishlistCourseIds":[], "certificates":[]}');

      setCurrentUser({
        name: userName,
        id: uniqueId,
        email: userEmail,
        joined: new Date().toLocaleDateString(),
        enrolledCourseIds: savedData.enrolledCourseIds || [],
        completedEpisodes: savedData.completedEpisodes || {},
        wishlistCourseIds: savedData.wishlistCourseIds || [],
        certificates: savedData.certificates || []
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
    
    // If we have a pending checkout, go to checkout, else dashboard
    if (role === 'user' && checkoutCourse) {
        setCurrentView('checkout');
    } else {
        setCurrentView('dashboard');
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
    setCurrentView('home');
  };

  const handleEnrollCourse = (course) => {
      if (!userRole) {
          setCheckoutCourse(course);
          setCurrentView('login');
      } else if (userRole === 'user') {
          if (!currentUser.enrolledCourseIds.includes(course.id)) {
              setCheckoutCourse(course);
              setCurrentView('checkout');
          } else {
              alert(`You are already enrolled in ${course.title}.`);
              setCurrentView('dashboard');
              setActiveUserTab('courses');
          }
      }
  };

  const updateUserProgress = (updater) => {
      setCurrentUser(prev => {
          const nextUser = updater(prev);
          if (nextUser && nextUser.email) {
              const dataToSave = {
                  enrolledCourseIds: nextUser.enrolledCourseIds,
                  completedEpisodes: nextUser.completedEpisodes,
                  wishlistCourseIds: nextUser.wishlistCourseIds,
                  certificates: nextUser.certificates
              };
              localStorage.setItem(`win_user_${nextUser.email}`, JSON.stringify(dataToSave));
          }
          return nextUser;
      });
  };

  const confirmPurchase = (courseId) => {
      const course = courses.find(c => c.id === courseId);
      if (course && currentUser) {
          const newOrder = {
              id: `ORD-${1000 + orders.length + 1}`,
              studentName: currentUser.name,
              email: currentUser.email,
              courseTitle: course.title,
              amount: course.price,
              status: 'PAID',
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              paymentMethod: 'UPI',
              paymentId: `pay_${Math.floor(Math.random()*1000000)}`,
              transactionId: `txn_${Math.floor(Math.random()*1000000)}`,
              courseId: course.id,
              userId: currentUser.id || 'STU-NEW'
          };
          setOrders(prev => [newOrder, ...prev]);
      }

      updateUserProgress(prev => ({
          ...prev,
          enrolledCourseIds: [...prev.enrolledCourseIds, courseId]
      }));
      setCheckoutCourse(null);
      alert(`Payment Success! You have enrolled in the course.`);
      setCurrentView('dashboard');
      setActiveUserTab('courses');
  };

  const renderPublicPage = () => {
      switch (currentView) {
          case 'home':
              return <HomePage onNavigate={setCurrentView} />;
          case 'about':
              return <AboutPage />;
          case 'courses':
              return (
                  <CoursesPage 
                      courses={courses} 
                      onCourseClick={handleEnrollCourse} 
                      onCourseDetailsClick={(course) => {
                          setSelectedCourseDetails(course);
                          setCurrentView('course_details');
                      }}
                  />
              );
          case 'practice':
              return <PracticePage onLoginClick={() => setCurrentView('login')} />;
          case 'reviews':
              return <ReviewsPage />;
          case 'blogs':
              return <BlogsPage />;
          case 'contact':
              return <ContactPage />;
          case 'course_details':
              return (
                  <CourseDetails 
                      course={selectedCourseDetails}
                      currentUser={currentUser}
                      onBack={() => setCurrentView('courses')}
                      onEnroll={handleEnrollCourse}
                      updateUserProgress={updateUserProgress}
                  />
              );
          default:
              return null;
      }
  };

  if (currentView === 'verify') {
      return <VerificationPage onNavigate={setCurrentView} />;
  }

  const publicViews = ['home', 'about', 'courses', 'practice', 'reviews', 'blogs', 'contact', 'course_details'];

  if (publicViews.includes(currentView)) {
      return (
          <div style={{ fontFamily: 'Inter, sans-serif' }}>
              <Navbar 
                  currentView={currentView} 
                  onNavigate={setCurrentView} 
                  onLoginClick={(mode) => setCurrentView(mode)} 
                  userRole={userRole}
                  currentUser={currentUser}
              />
              {renderPublicPage()}
              <Footer onNavigate={setCurrentView} />
          </div>
      );
  }

  if (currentView === 'login' || currentView === 'signup') {
    return (
        <Login 
            initialView={currentView === 'signup' ? 'signup' : 'signin'}
            onLogin={handleLogin} 
            onBack={() => {
                setCheckoutCourse(null);
                setCurrentView('home');
            }} 
        />
    );
  }

  if (currentView === 'checkout') {
      return (
          <Checkout 
              course={checkoutCourse} 
              onConfirmPurchase={confirmPurchase}
              orders={orders}
              setOrders={setOrders}
              onCancel={() => {
                  setCheckoutCourse(null);
                  setCurrentView('home');
              }}
          />
      );
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
        adminStudents={mockAdminStudents}
        setAdminStudents={setMockAdminStudents}
        certificateSettings={certificateSettings}
        setCertificateSettings={(newSettings) => {
            setCertificateSettings(newSettings);
            localStorage.setItem('win_certificate_settings', JSON.stringify(newSettings));
        }}
        orders={orders}
        setOrders={setOrders}
        onLogout={handleLogout} 
      />
    );
  }

  // user dashboard rendering
  return (
      <StudentDashboard 
          currentUser={currentUser}
          courses={courses}
          notifications={notifications}
          setNotifications={setNotifications}
          onLogout={handleLogout}
          updateUserProgress={updateUserProgress}
          onNavigate={setCurrentView}
          certificateSettings={certificateSettings}
          orders={orders}
      />
  );
}

export default App;
