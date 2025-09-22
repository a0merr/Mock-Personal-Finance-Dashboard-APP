import React from 'react';
interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </header>
  );
};
export default DashboardHeader;
