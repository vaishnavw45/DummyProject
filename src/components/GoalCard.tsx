import React from 'react';
import { Goal } from '../types';
import { Calendar, DollarSign, Image, PenLine, Rocket, Trash2 } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  onStart?: (id: string) => void;
  onComplete?: (id: string, data: Partial<Goal>) => void;
  onDelete?: (id: string) => void;
}

export function GoalCard({ goal, onStart, onComplete, onDelete }: GoalCardProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    endDate: '',
    budgetSpent: '',
    photoUrl: '',
    experience: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete?.(goal.id, {
      endDate: formData.endDate,
      budgetSpent: Number(formData.budgetSpent),
      photoUrl: formData.photoUrl,
      experience: formData.experience
    });
    setIsEditing(false);
  };

  const categoryColors = {
    travel: 'bg-blue-100 text-blue-800',
    study: 'bg-purple-100 text-purple-800',
    finance: 'bg-green-100 text-green-800',
    health: 'bg-red-100 text-red-800',
    career: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${categoryColors[goal.category]}`}>
            {goal.category}
          </span>
        </div>
        {goal.status === 'completed' && (
          <div className="animate-bounce">
            <Rocket className="text-blue-500" size={24} />
          </div>
        )}
      </div>
      
      <p className="text-gray-600 mb-4">{goal.description}</p>

      {goal.status === 'active' && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Complete Goal
        </button>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <div className="mt-1 relative">
              <Calendar className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input
                type="date"
                className="pl-10 w-full rounded-md border border-gray-300 p-2"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Budget Spent</label>
            <div className="mt-1 relative">
              <DollarSign className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input
                type="number"
                className="pl-10 w-full rounded-md border border-gray-300 p-2"
                value={formData.budgetSpent}
                onChange={(e) => setFormData({ ...formData, budgetSpent: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <div className="mt-1 relative">
              <Image className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input
                type="url"
                className="pl-10 w-full rounded-md border border-gray-300 p-2"
                value={formData.photoUrl}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <div className="mt-1 relative">
              <PenLine className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <textarea
                className="pl-10 w-full rounded-md border border-gray-300 p-2"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
                rows={3}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Complete
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {goal.status === 'pending' && (
        <div className="flex space-x-4">
          <button
            onClick={() => onStart?.(goal.id)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start Goal
          </button>
          <button
            onClick={() => onDelete?.(goal.id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="inline-block mr-2" size={16} />
            Delete
          </button>
        </div>
      )}

      {goal.status === 'completed' && (
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{new Date(goal.startDate!).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-medium">{new Date(goal.endDate!).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Budget Spent</p>
              <p className="font-medium">${goal.budgetSpent}</p>
            </div>
          </div>
          {goal.photoUrl && (
            <img
              src={goal.photoUrl}
              alt="Goal completion"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          {goal.experience && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Experience</p>
              <p className="text-gray-700">{goal.experience}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}