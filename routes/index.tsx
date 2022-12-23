import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import FruitCard from "../islands/FruitCard.tsx";

interface Data {
	fruits: Fruit[];
	query: string;
	searchResults: Fruit[];
}

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

export const handler: Handlers<Fruit[]> = {
	async GET(req, ctx) {
		const resp = await fetch("https://www.fruityvice.com//api/fruit/all");

		if (!resp) {
			return new Response("No fruits found", { status: 404 });
		}

		const url = new URL(req.url);
		const fruits: Fruit[] = await resp.json();
		const query = url.searchParams.get("search") || "";
		const searchResults = fruits.filter((fruit) => fruit.name.includes(query));

		return ctx.render({ searchResults, query, fruits });
	},
};

const Home = ({ data }: PageProps<Data>) => {
	const { searchResults, query, fruits } = data;

	if (!data) {
		return <h1>No fruits sorry</h1>;
	}

	return (
		<>
			<Head>
				<title>Fruitinfo: Fruits information</title>
			</Head>
			<form class="px-36 py-12 mx-auto flex flex-col items-center">
				<h1 class="text-3xl">Search Fruits</h1>
				<input
					type="text"
					name="search"
					class="border-2 rounded w-48"
					value={query}
				/>
			</form>
			{searchResults.length ? (
				<div class="flex flex-wrap justify-evenly mx-auto">
					{searchResults.map((fruit) => (
						<FruitCard {...fruit} />
					))}
				</div>
			) : (
				<div class="flex flex-wrap justify-evenly mx-auto">
					{fruits.map((fruit) => (
						<FruitCard {...fruit} />
					))}
				</div>
			)}
		</>
	);
};

export default Home;
