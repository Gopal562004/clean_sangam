import React from "react";
import Icon from "../../../../AppIcon";

const AnalyticsDashboard = ({ analytics = {} }) => {
  const {
    totalRegistered = 0,
    totalAttended = 0,
    averageFeedback = 0,
    registrationTrend = [],
    attendanceRate = 0,
    feedbackDistribution = [],
  } = analytics;

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    color = "primary",
    trend = null,
  }) => (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center`}
        >
          <Icon name={icon} size={24} className={`text-${color}`} />
        </div>
        {trend && (
          <div
            className={`flex items-center space-x-1 text-sm ${
              trend?.direction === "up"
                ? "text-success"
                : trend?.direction === "down"
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            <Icon
              name={
                trend?.direction === "up"
                  ? "TrendingUp"
                  : trend?.direction === "down"
                  ? "TrendingDown"
                  : "Minus"
              }
              size={16}
            />
            <span>{trend?.value}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );

  const ProgressBar = ({ label, value, total, color = "primary" }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-sm text-muted-foreground">
            {value}/{total}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`bg-${color} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {percentage?.toFixed(1)}%
        </div>
      </div>
    );
  };

  const FeedbackStars = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={
              star <= rating
                ? "text-warning fill-current"
                : "text-muted-foreground"
            }
          />
        ))}
        <span className="text-sm text-muted-foreground ml-2">
          ({rating?.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Registered"
          value={totalRegistered?.toLocaleString()}
          subtitle="Event registrations"
          icon="Users"
          color="primary"
          trend={{ direction: "up", value: "+12%" }}
        />
        <StatCard
          title="Total Attended"
          value={totalAttended?.toLocaleString()}
          subtitle={`${attendanceRate?.toFixed(1)}% attendance rate`}
          icon="CheckCircle"
          color="success"
          trend={{
            direction: totalAttended > totalRegistered * 0.7 ? "up" : "down",
            value: `${attendanceRate?.toFixed(1)}%`,
          }}
        />
        <StatCard
          title="Average Feedback"
          value={averageFeedback?.toFixed(1)}
          subtitle="Out of 5.0 stars"
          icon="Star"
          color="warning"
          trend={{
            direction:
              averageFeedback >= 4
                ? "up"
                : averageFeedback >= 3
                ? "neutral"
                : "down",
            value: `${averageFeedback?.toFixed(1)}/5`,
          }}
        />
      </div>
      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Overview */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="BarChart3" size={20} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Attendance Overview
            </h3>
          </div>

          <div className="space-y-4">
            <ProgressBar
              label="Attended"
              value={totalAttended}
              total={totalRegistered}
              color="success"
            />
            <ProgressBar
              label="Registered but not attended"
              value={totalRegistered - totalAttended}
              total={totalRegistered}
              color="muted-foreground"
            />
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Attendance Rate
              </span>
              <span
                className={`text-lg font-bold ${
                  attendanceRate >= 70
                    ? "text-success"
                    : attendanceRate >= 50
                    ? "text-warning"
                    : "text-destructive"
                }`}
              >
                {attendanceRate?.toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {attendanceRate >= 70
                ? "Excellent attendance!"
                : attendanceRate >= 50
                ? "Good attendance rate"
                : "Consider improving engagement"}
            </p>
          </div>
        </div>

        {/* Feedback Analysis */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Icon name="MessageSquare" size={20} className="text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Feedback Analysis
            </h3>
          </div>

          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-foreground mb-2">
              {averageFeedback?.toFixed(1)}
            </div>
            <FeedbackStars rating={averageFeedback} />
            <p className="text-sm text-muted-foreground mt-2">
              Based on{" "}
              {feedbackDistribution?.reduce(
                (sum, item) => sum + item?.count,
                0
              )}{" "}
              responses
            </p>
          </div>

          <div className="space-y-3">
            {feedbackDistribution?.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm text-foreground">
                    {item?.rating}
                  </span>
                  <Icon name="Star" size={12} className="text-warning" />
                </div>
                <div className="flex-1">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-warning h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (item?.count /
                            Math.max(
                              ...feedbackDistribution?.map((f) => f?.count)
                            )) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {item?.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Registration Trend */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Registration Trend
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {registrationTrend?.map((item, index) => (
            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-lg font-bold text-foreground">
                {item?.count}
              </div>
              <div className="text-sm text-muted-foreground">
                {item?.period}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Quick Insights
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Peak Registration
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Most registrations occurred in the last 7 days before the event
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Engagement Score
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {attendanceRate >= 70
                ? "High engagement - participants are actively attending"
                : "Consider follow-up strategies to improve attendance"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
