export type GoalCategory = 'travel' | 'study' | 'finance' | 'health' | 'career';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  startDate?: string;
  endDate?: string;
  budgetSpent?: number;
  photoUrl?: string;
  experience?: string;
  status: 'pending' | 'active' | 'completed';
}