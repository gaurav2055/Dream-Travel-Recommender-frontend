import { Box, Grid, Typography } from "@mui/material";

import DestinationCard from "./DestinationCard";
import React from "react";

const ResultsList = ({ results }) => {
	if (!results || results.length === 0) {
		return (
			<Box mt={4} textAlign='center'>
				<Typography variant='body1' color='text.secondary'>
					No results yet. Try a recommendation search.
				</Typography>
			</Box>
		);
	}

	return (
		<Box mt={4}>
			<Typography variant='h6' gutterBottom>
				Top Recommendations
			</Typography>
			<Grid container spacing={2}>
				{results.map((destination, idx) => (
					<Grid item xs={12} sm={6} md={4} key={idx}>
						<DestinationCard destination={destination} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default ResultsList;
