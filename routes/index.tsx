import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import FruitCard from "../islands/FruitCard.tsx";

// import { useState } from "https://esm.sh/v99/preact@10.11.0/hooks/src/index";

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
	async GET(_req, ctx) {
		const resp = await fetch("https://www.fruityvice.com//api/fruit/all");
		if (!resp) {
			return new Response("No fruits found", { status: 404 });
		}
		const fruits: Fruit[] = await resp.json();
		return ctx.render(fruits);
	},
};

const Home = ({ data }: PageProps<Fruit[]>) => {
	if (!data) {
		return <h1>No fruits sorry</h1>;
	}

	return (
		<>
			<Head>
				<title>Fruitinfo: Fruits information</title>
			</Head>
			<div class="p-4 mx-auto max-w-screen-md">
				<h1>Search Fruits</h1>
				<input type="text" class="border-2 rounded" />
			</div>
			{data.map((fruit) => (
				<FruitCard {...fruit} />
			))}
		</>
	);
};

export default Home;
