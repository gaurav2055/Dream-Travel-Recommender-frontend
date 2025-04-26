import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import DestinationCard from "./DestinationCard";
import { getTraitRecommendations } from "../api/recommend";

const TopRecomendations = () => {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	useEffect(() => {
		const topRecomendations = async () => {
			setError("");
			setLoading(true);
			try {
				let res = await getTraitRecommendations("");
				setResults(res.data);
			} catch (error) {
				console.error("Error fetching recommendations:", error?.response?.data?.error);
				setError(
					error.response?.data?.error ||
						"An error occurred while fetching recommendations."
				);
			} finally {
				setLoading(false);
			}
		};
		topRecomendations();
	}, []);

	return (
		<Box mt={4}>
			<Typography variant='h6' gutterBottom>
				Top Recommendations
			</Typography>
			{error && (
				<Typography color='error' mt={2}>
					{error}
				</Typography>
			)}
			{loading ? (
				<Typography mt={4}>Loading recommendations...</Typography>
			) : (
				<Grid container spacing={2}>
					{results.map((destination, idx) => (
						<Grid item xs={12} sm={6} md={4} key={idx}>
							<DestinationCard destination={destination} />
						</Grid>
					))}
				</Grid>
			)}
		</Box>
	);
};

export default TopRecomendations;
