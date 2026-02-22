import { Tabs, Tab } from "@mui/material";

const TabSelector = ({ activeTab, onTabChange, tabs }) => {
  return (
    <Tabs
      value={activeTab}
      onChange={(e, val) => onTabChange(val)}
      variant="standard"
      centered
      sx={{
        width: "100%",
        borderBottom: 1,
        borderColor: "divider",
        mb: 3,
        "& .MuiTabs-indicator": { backgroundColor: "#3b82f6", height: 3 },
      }}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          value={tab.id}
          label={tab.label}
          icon={<tab.icon sx={{ fontSize: { xs: "1.4rem", sm: "2rem" } }} />}
          iconPosition="top"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            minHeight: { xs: 60, sm: 80 },
            minWidth: { xs: 64, sm: 100 },
            fontSize: { xs: "0.7rem", sm: "0.875rem" },
            color: "#64748b",
            "&.Mui-selected": { color: "#3b82f6" },
            "& .MuiSvgIcon-root": { mb: { xs: 0.3, sm: 1 } },
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabSelector;
