import React from "react";
import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import Icon from "../../../AppIcon";
import BreadcrumbTrail from "../../../ui/BreadcrumbTrail";

const EventDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        <BreadcrumbTrail currentPage="event" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Event Dashboard
            </h1>
            <p className="text-muted-foreground">
              Discover amazing events and manage your creations
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="mb-8 border-b border-border">
            <nav className="-mb-px flex space-x-8">
              <NavLink
                to="browse"
                className={({ isActive }) =>
                  `py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`
                }
              >
                <Icon name="Search" size={18} />
                <span>Browse Events</span>
              </NavLink>

              <NavLink
                to="my-events"
                className={({ isActive }) =>
                  `py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`
                }
              >
                <Icon name="Settings" size={18} />
                <span>My Events</span>
              </NavLink>
              <NavLink
                to="registered-events" // <-- NEW PATH
                className={({ isActive }) =>
                  `py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`
                }
              >
                <Icon name="UserCheck" size={18} />
                <span>Registered Events</span>
              </NavLink>
            </nav>
          </div>

          {/* Outlet for nested routes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default EventDashboard;
