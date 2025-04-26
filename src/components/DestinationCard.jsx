import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

import React from "react";

const DestinationCard = ({ destination }) => {
	const { name, city, state, country, description, tags = [] } = destination;

	return (
		<Card sx={{ minWidth: 300, maxWidth: 400, margin: 1 }} elevation={4}>
			<CardContent>
				<Typography variant='h6' gutterBottom>
					{name} ({city ? `${city},` : ``} {state && state}, {country && country})
				</Typography>

				<Typography variant='body2' color='text.secondary' gutterBottom>
					{description?.substring(0, 150) || "No description available."}
				</Typography>

				{tags.length > 0 && (
					<Box mt={2}>
						<Typography variant='subtitle2' gutterBottom>
							Tags:
						</Typography>
						<Stack direction='row' spacing={1} flexWrap='wrap'>
							{tags.map((tag, index) => (
								<Chip key={index} label={tag} size='small' color='primary' />
							))}
						</Stack>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

export default DestinationCard;
