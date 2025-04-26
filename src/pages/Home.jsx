import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import {
	getHybridRecommendations,
	getRecommendations,
	getTraitRecommendations,
	getVibeRecommendations,
} from "../api/recommend";

import ResultsList from "../components/ResultsList";
import SearchBar from "../components/SearchBar";
import TopRecomendations from "../components/TopRecomendations";
import TraitSlider from "../components/TraitSlider";

const Home = () => {
	const [results, setResults] = useState([]);
	const [traits, setTraits] = useState({
		adventure: 3,
		relax: 3,
		nature: 3,
		culture: 3,
		luxury: 3,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [mode, setMode] = useState("hybrid");

	const handleSearch = async ({ query, mode }) => {
		setError("");
		setLoading(true);
		try {
			let res;
			if (mode === "text") res = await getRecommendations(query);
			else if (mode === "hybrid") res = await getHybridRecommendations(query);
			else if (mode === "traits") res = await getTraitRecommendations(query);
			else if (mode === "vibe") res = await getVibeRecommendations(traits);

			setResults(res.data);
		} catch (err) {
			console.error(err);
			setError(
				err.response?.data?.error || "An error occurred while fetching recommendations."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth='lg'>
			<Box py={4}>
				<Typography variant='h4' gutterBottom>
					Dream Travel Recommender ✈️
				</Typography>
				<SearchBar onSearch={handleSearch} mode={mode} setMode={setMode} />
				{mode === "vibe" && <TraitSlider traits={traits} setTraits={setTraits} />}
				{error && (
					<Typography color='error' mt={2}>
						{error}
					</Typography>
				)}
				{loading ? (
					<Typography mt={4}>Loading recommendations...</Typography>
				) : results.length !== 0 ? (
					<ResultsList results={results} />
				) : (
					<TopRecomendations />
				)}
			</Box>
		</Container>
	);
};

export default Home;
