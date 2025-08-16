'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function ExpensePieChart({ expenses }) {
  // Calculate category totals
  const categoryData = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find(item => item.name === expense.category);
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  return (
    <div className="relative w-full h-[400px] lg:h-full p-4">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"></div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ 
              name, 
              percent, 
              x, 
              y, 
              cx, 
              cy 
            }) => {
              const radius = 80;
              const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  style={{
                    filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))',
                    fontSize: '12px',
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: `${x}px ${y}px`
                  }}
                >
                  {`${name}: ${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {categoryData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              backdropFilter: 'blur(4px)',
              color: 'white'
            }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} 
            itemStyle={{ color: 'white' }}
            labelStyle={{ color: '#FFBB28', fontWeight: 'bold' }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px',
            }}
            formatter={(value, entry, index) => {
              return (
                <span style={{ 
                  color: 'white',
                  fontSize: '12px',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}>
                  {value}
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}