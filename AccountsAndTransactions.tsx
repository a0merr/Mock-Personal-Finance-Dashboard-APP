import React from 'react';

interface Account {
  id: number;
  name: string;
  balance: number;
  type: string;
  institution: string;
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
}

interface AccountsAndTransactionsProps {
  accounts: Account[];
  recentTransactions: Transaction[];
}

const AccountsAndTransactions: React.FC<AccountsAndTransactionsProps> = ({
  accounts,
  recentTransactions
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Accounts List */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h3 className="text-foreground font-medium mb-4">Your Accounts</h3>
        <div className="space-y-4">
          {accounts.map(account => (
            <div key={account.id} className="flex justify-between items-center p-3 rounded-md bg-muted/50">
              <div>
                <h4 className="font-medium text-foreground">{account.name}</h4>
                <p className="text-sm text-muted-foreground">{account.institution}</p>
              </div>
              <p className={`text-lg font-semibold ${account.balance >= 0 ? 'text-foreground' : 'text-destructive'}`}>
                ${Math.abs(account.balance).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h3 className="text-foreground font-medium mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {recentTransactions.map(transaction => (
            <div key={transaction.id} className="flex justify-between items-center p-3 rounded-md bg-muted/50">
              <div>
                <h4 className="font-medium text-foreground">{transaction.description}</h4>
                <p className="text-sm text-muted-foreground">
                  {transaction.date} • {transaction.category}
                </p>
              </div>
              <p className={`font-semibold ${transaction.amount >= 0 ? 'text-green-600' : 'text-foreground'}`}>
                {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsAndTransactions;
