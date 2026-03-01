import { FiUsers, FiUser, FiShield } from "react-icons/fi";

export default function DashboardStats({ users, variant = "default" }) {
  const totalUsers = users.length;
  const regularUsers = users.filter((u) => u.role === "user").length;
  const adminUsers = users.filter((u) => u.role === "admin").length;

  const stats = [
  {
    label: "ผู้ใช้ทั่วไป",
    value: regularUsers,
    icon: FiUser,
    gradient: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-500",
    borderColor: "border-green-200",
  },
  {
    label: "ผู้ดูแลระบบ",
    value: adminUsers,
    icon: FiShield,
    gradient: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
    borderColor: "border-purple-200",
  },
];


  // Variant 1: Default (Current)
  const renderDefault = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                <Icon className={`${stat.iconColor} text-xl`} />
              </div>
              <div className={`bg-gradient-to-br ${stat.gradient} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                {stat.value}
              </div>
            </div>
            <h3 className="text-slate-600 text-sm font-medium">{stat.label}</h3>
          </div>
        );
      })}
    </div>
  );

  // Variant 2: Gradient Background (with original colors)
  const renderGradient = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full -mr-12 -mt-12`}></div>
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`${stat.iconColor} text-lg`} />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <h3 className="text-slate-600 text-xs md:text-sm font-medium">{stat.label}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Variant 3: Large Icon & Number
  const renderLarge = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`${stat.bgColor} p-4 rounded-xl`}>
                <Icon className={`${stat.iconColor} text-3xl`} />
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                <h3 className="text-slate-600 text-sm font-medium mt-1">{stat.label}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Variant 4: Minimal
  const renderMinimal = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-slate-50 border border-slate-200 rounded-lg p-5 hover:bg-white transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <Icon className={`${stat.iconColor} text-xl`} />
              <h3 className="text-slate-700 text-sm font-medium">{stat.label}</h3>
            </div>
            <div className={`text-2xl font-bold ${stat.iconColor}`}>{stat.value}</div>
          </div>
        );
      })}
    </div>
  );

  // Variant 5: Card with Badge
  const renderBadge = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -mr-10 -mt-10`}></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`${stat.iconColor} text-2xl`} />
                </div>
                <span className={`bg-gradient-to-br ${stat.gradient} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {stat.value}
                </span>
              </div>
              <h3 className="text-slate-700 font-semibold">{stat.label}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Variant 6: Modern Glass
  const renderGlass = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 hover:bg-white hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-xl shadow-sm`}>
                <Icon className={`${stat.iconColor} text-2xl`} />
              </div>
              <div className={`text-3xl font-bold bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
            </div>
            <h3 className="text-slate-700 font-medium">{stat.label}</h3>
          </div>
        );
      })}
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case "gradient":
        return renderGradient();
      case "large":
        return renderLarge();
      case "minimal":
        return renderMinimal();
      case "badge":
        return renderBadge();
      case "glass":
        return renderGlass();
      default:
        return renderDefault();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">แดชบอร์ด</h2>
      {renderVariant()}
    </div>
  );
}
