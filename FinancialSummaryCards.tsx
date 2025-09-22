import React from 'react';

interface Account {
  id: number;
  name: string;
  balance: number;
  type: string;
  institution: string;
}

interface FinancialSummaryCardsProps {
  accounts: Account[];
}

const FinancialSummaryCards: React.FC<FinancialSummaryCardsProps> = ({ accounts }) => {
  const totalNetWorth = accounts.reduce((sum, account) => sum + account.balance, 0);
  const totalInvestments = accounts
    .filter(account => account.type === 'investment' || account.type === 'retirement')
    .reduce((sum, account) => sum + account.balance, 0);
  const totalCash = accounts
    .filter(account => account.type === 'bank')
    .reduce((sum, account) => sum + account.balance, 0);
  const totalDebt = Math.abs(accounts
    .filter(account => account.type === 'credit')
    .reduce((sum, account) => sum + account.balance, 0));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h3 className="text-muted-foreground text-sm font-medium">Net Worth</h3>
        <p className="text-2xl font-bold text-foreground">${totalNetWorth.toLocaleString()}</p>
        <p className="text-sm text-green-600">+12.5% YoY</p>
      </div>
      
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h3 className="text-muted-foreground text-sm font-medium">Investments</h3>
        <p className="text-2xl font-bold text-foreground">${totalInvestments.toLocaleString()}</p>
        <p className="text-sm text-green-600">+18.2% YoY</p>
      </div>
      
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h3 className="text-muted-foreground text-sm font-medium">Cash</h3>
        <p className="text-2xl font-bold text-foreground">${totalCash.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Across 2 accounts</p>
      </div>
      
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h3 className="text-muted-foreground text-sm font-medium">Debt</h3>
        <p className="text-2xl font-bold text-foreground">${totalDebt.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Credit cards</p>
      </div>
    </div>
  );
};

export default FinancialSummaryCards;
