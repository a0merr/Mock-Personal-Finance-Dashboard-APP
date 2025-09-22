import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ChartData {
  month: string;
  [key: string]: number | string;
}

interface Account {
  id: number;
  name: string;
  balance: number;
  type: string;
  institution: string;
}

interface ChartsSectionProps {
  netWorthHistory: ChartData[];
  incomeExpenses: ChartData[];
  investmentPerformance: ChartData[];
  accounts: Account[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({
  netWorthHistory,
  incomeExpenses,
  investmentPerformance,
  accounts
}) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Net Worth Chart */}
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-foreground font-medium mb-4">Net Worth Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={netWorthHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Net Worth']}
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="netWorth" 
                  stroke="#0088FE" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Income vs Expenses Chart */}
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-foreground font-medium mb-4">Income vs Expenses</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeExpenses}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  formatter={(value) => [`$${value}`, '']}
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                />
                <Legend />
                <Bar dataKey="income" fill="#00C49F" name="Income" />
                <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Investment Performance and Accounts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Investment Performance */}
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-foreground font-medium mb-4">Investment Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={investmentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'value') return [`$${value.toLocaleString()}`, 'Portfolio Value'];
                    return [`$${value.toLocaleString()}`, 'Monthly Gain'];
                  }}
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0088FE" 
                  strokeWidth={2}
                  name="Portfolio Value"
                />
                <Line 
                  type="monotone" 
                  dataKey="gain" 
                  stroke="#00C49F" 
                  strokeWidth={2}
                  name="Monthly Gain"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Account Distribution */}
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-foreground font-medium mb-4">Account Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={accounts.filter(a => a.balance > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="balance"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {accounts.filter(a => a.balance > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']}
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartsSection;
