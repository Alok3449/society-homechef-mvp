export function generateNutrition(dishName: string): { calories: number; healthScore: number } {
  const name = dishName.toLowerCase();
  let calories = 350;
  let score = 6.0;

  if (name.includes('paneer') || name.includes('chicken') || name.includes('egg') || name.includes('protein')) {
    calories += 120;
    score += 1.2;
  }
  if (name.includes('fried') || name.includes('paratha') || name.includes('butter') || name.includes('cheese')) {
    calories += 180;
    score -= 1.8;
  }
  if (name.includes('salad') || name.includes('grilled') || name.includes('dal') || name.includes('roti') || name.includes('veg')) {
    score += 2.5;
    calories -= 80;
  }

  return {
    calories: Math.round(Math.max(180, Math.min(850, calories))),
    healthScore: Math.round(Math.max(3.5, Math.min(9.8, score)) * 10) / 10,
  };
}