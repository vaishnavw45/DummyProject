import React from 'react';
import { Plus, ListTodo, CheckCircle, Home } from 'lucide-react';
import { Goal, GoalCategory } from './types';
import { GoalCard } from './components/GoalCard';
import { AddGoalModal } from './components/AddGoalModal';

function App() {
  const [activeTab, setActiveTab] = React.useState<'home' | 'active' | 'completed'>('home');
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [goals, setGoals] = React.useState<Goal[]>([]);

  const addGoal = (goalData: { title: string; description: string; category: GoalCategory }) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      ...goalData,
      status: 'pending'
    };
    setGoals([...goals, newGoal]);
  };

  const startGoal = (id: string) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, status: 'active', startDate: new Date().toISOString() } : goal
    ));
  };

  const completeGoal = (id: string, data: Partial<Goal>) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, ...data, status: 'completed' } : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const filteredGoals = goals.filter(goal => {
    switch (activeTab) {
      case 'home':
        return goal.status === 'pending';
      case 'active':
        return goal.status === 'active';
      case 'completed':
        return goal.status === 'completed';
      default:
        return false;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Home className="mr-2" size={20} />
                Home
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'active'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ListTodo className="mr-2" size={20} />
                Active Goals
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'completed'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CheckCircle className="mr-2" size={20} />
                Completed Goals
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {filteredGoals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onStart={startGoal}
              onComplete={completeGoal}
              onDelete={deleteGoal}
            />
          ))}
          {filteredGoals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No goals found in this category</p>
            </div>
          )}
        </div>
      </main>

      {activeTab === 'home' && (
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={24} />
        </button>
      )}

      <AddGoalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addGoal}
      />
    </div>
  );
}

export default App;