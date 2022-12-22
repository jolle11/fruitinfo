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
	return (
		<div>
			<p>{fruit.name}</p>
			<p>{fruit.nutritions.protein}</p>
		</div>
	);
};

export default FruitCard;
