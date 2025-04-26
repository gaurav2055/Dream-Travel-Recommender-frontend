import { Box, Grid, Slider, Typography } from "@mui/material";

import React from "react";

const traitList = ["adventure", "relax", "nature", "culture", "luxury"];

const TraitSlider = ({ traits, setTraits }) => {
	const handleChange = (trait) => (event, newValue) => {
		setTraits((prev) => ({ ...prev, [trait]: newValue }));
	};

	return (
		<Box mt={3}>
			<Typography variant='h6' gutterBottom>
				Select Your Travel Vibe
			</Typography>
			<Grid container spacing={2}>
				{traitList.map((trait) => (
					<Grid item xs={12} sm={6} md={4} key={trait}>
						<Typography gutterBottom sx={{ textTransform: "capitalize" }}>
							{trait}
						</Typography>
						<Slider
							value={traits[trait] || 0}
							onChange={handleChange(trait)}
							min={0}
							max={5}
							step={1}
							marks
							valueLabelDisplay='auto'
							color='primary'
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default TraitSlider;
