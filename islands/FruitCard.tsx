import { useState } from "preact/hooks";

interface Fruit {
	genus: string;
	name: string;
	id: number;
	family: string;
	order: string;
	nutritions: Nutritions;
}

interface Nutritions {
	carbohydrates: number;
	protein: number;
	fat: number;
	calories: number;
	sugar: number;
}

const FruitCard = (fruit: Fruit) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div class="w-56">
			<div class="flex">
				<h1 class="text-3xl">{fruit.name}</h1>
				<button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "-" : "+"}</button>
			</div>
			<h3>Family: {fruit.family}</h3>
			{isOpen && (
				<ul>
					<li>Carbs: {fruit.nutritions.carbohydrates}g</li>
					<li>Sugar: {fruit.nutritions.sugar}g</li>
					<li>Fats: {fruit.nutritions.fat}g</li>
					<li>Protein: {fruit.nutritions.protein}g</li>
					<li>Calories: {fruit.nutritions.calories}g</li>
				</ul>
			)}
		</div>
	);
};

export default FruitCard;
