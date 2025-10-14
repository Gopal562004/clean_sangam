import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "../ui/Button";
import RoleSwitchingModal from "./RoleSwitchingModal";
import { getUserProfile } from "../../lib/mongo/userServices";

const Header = ({ user = null, notifications = [], onLogout = () => {} }) => {
  const [fullUser, setFullUser] = useState(user);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch user details by ID
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        setFullUser(data);
      } catch (err) {
        console.error("Error fetching user by ID:", err);
      }
    };
    fetchUser();
  }, []);

  const navigationItems = [
    {
      label: "Dashboard",
      path:
        user?.role === "admin"
          ? "/admin"
          : user?.role === "faculty"
          ? "/faculty"
          : user?.role === "alumni"
          ? "/alumni"
          : user?.role === "recruiter"
          ? "/recruiter"
          : "/student",
      roles: ["admin", "faculty", "alumni", "student", "recruiter"],
      icon: "LayoutDashboard",
    },
    {
      label: "Career Directory",
      path:
        user?.role === "admin"
          ? "/admin/directory"
          : user?.role === "faculty"
          ? "/faculty/directory"
          : user?.role === "alumni"
          ? "/alumni/directory"
          : user?.role === "recruiter"
          ? "/recruiter/directory"
          : "/student/directory",
      roles: ["admin", "faculty", "alumni", "student", "recruiter"],
      icon: "Users",
    },
    {
      label: "Network Hub",
      path:
        user?.role === "admin"
          ? "/admin/network"
          : user?.role === "faculty"
          ? "/faculty/network"
          : user?.role === "alumni"
          ? "/alumni/network"
          : user?.role === "recruiter"
          ? "/recruiter/network"
          : "/student/network",
      roles: ["admin", "faculty", "alumni", "student", "recruiter"],
      icon: "Share2",
    },
    {
      label: "Job Portal",
      path:
        user?.role === "admin"
          ? "/admin/jobs"
          : user?.role === "faculty"
          ? "/faculty/jobs"
          : user?.role === "alumni"
          ? "/alumni/jobs"
          : user?.role === "recruiter"
          ? "/recruiter/jobs"
          : "/student/jobs",
      roles: ["admin", "faculty", "alumni", "student", "recruiter"],
      icon: "Briefcase",
    },
    {
      label: "Career Resources",
      path:
        user?.role === "admin"
          ? "/admin/resources"
          : user?.role === "faculty"
          ? "/faculty/resources"
          : user?.role === "alumni"
          ? "/alumni/resources"
          : user?.role === "recruiter"
          ? "/recruiter/resources"
          : "/student/resources",
      roles: ["admin", "faculty", "alumni", "student", "recruiter"],
      icon: "BookOpen",
    },
    {
      label: "Career Events",
      path:
        user?.role === "admin"
          ? "/admin/events"
          : user?.role === "faculty"
          ? "/faculty/events"
          : user?.role === "alumni"
          ? "/alumni/events"
          : user?.role === "recruiter"
          ? "/recruiter/events"
          : "/student/events",
      roles: ["admin", "faculty", "alumni", "student", "recruiter"],
      icon: "Calendar",
    },
  ];

  const visibleNavItems = navigationItems.filter(
    (item) => !user || item.roles.includes(user.role)
  );

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
    setIsUserMenuOpen(false);
  };

  const isActivePath = (path) => location.pathname === path;

    const Logo = () => (
  <a 
    href="https://update-gradify-ai-carrer-coach.vercel.app/" 
    rel="noopener noreferrer"
    className="flex items-center space-x-3 group"
  >
    <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
      <span className="text-white font-bold text-lg">AI</span>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        Ai-Career
      </span>
      <span className="text-xs text-gray-500 -mt-1">
        Intelligent Career Platform
      </span>
    </div>
  </a>
);

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50 elevation-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {user && (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-4">
                {visibleNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 ${
                      isActivePath(item.path)
                        ? "text-primary bg-primary/10"
                        : "text-text-secondary hover:text-text-primary hover:bg-muted"
                    }`}
                  >
                    <Icon name={item.icon} size={15} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Right Side */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <Button variant="ghost" size="icon">
                    <Icon name="Bell" size={20} />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadNotifications > 9 ? "9+" : unreadNotifications}
                      </span>
                    )}
                  </Button>
                </div>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-3 py-2"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                      {fullUser?.user?.avatar ? (
                        <img
                          src={fullUser.user.avatar}
                          alt={fullUser.user.name || "User Avatar"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon name="User" size={16} color="white" />
                      )}
                    </div>

                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-text-primary">
                        {user.name}
                      </div>
                      <div className="text-xs text-text-secondary capitalize">
                        {user.role}
                      </div>
                    </div>
                    <Icon
                      name="ChevronDown"
                      size={16}
                      className={`transition-transform duration-200 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevation-3 py-1 animate-slide-down">
                      {/* Role-based Profile Link */}
                      <Link
                        to={
                          user.role === "admin"
                            ? `/admin/profile/${user.id}`
                            : user.role === "faculty"
                            ? `/faculty/profile/${user.id}`
                            : user.role === "alumni"
                            ? `/alumni/profile/${user.id}`
                            : user.role === "recruiter"
                            ? `/recruiter/profile/${user.id}`
                            : `/student/profile/${user.id}`
                        }
                        className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Icon name="User" size={16} className="mr-3" />
                        Profile
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Icon name="Settings" size={16} className="mr-3" />
                        Settings
                      </Link>
                      <Link
                        to="#"
                        onClick={() => setIsRoleModalOpen(true)}
                        className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name="Repeat" size={16} className="mr-3" />
                        Role-Switch
                      </Link>
                      <RoleSwitchingModal
                        isOpen={isRoleModalOpen}
                        onClose={() => setIsRoleModalOpen(false)}
                      />

                      <div className="border-t border-border my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name="LogOut" size={16} className="mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-slide-down">
            <nav className="flex flex-col space-y-2">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePath(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-text-secondary hover:text-text-primary hover:bg-muted"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
