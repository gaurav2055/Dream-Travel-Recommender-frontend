import {
	Autocomplete,
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import axios from "axios";

const SearchBar = ({ onSearch, mode, setMode }) => {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	// const [mode, setMode] = useState("hybrid");

	useEffect(() => {
		if (!query) {
			setSuggestions([]);
			return;
		}
		if (query.length < 2) return;

		const delayDebounce = setTimeout(() => {
			axios
				.get(`${process.env.REACT_APP_API_BASE_URL}/suggest`, {
					params: { q: query.toLowerCase() },
				})
				.then((res) => setSuggestions(res.data))
				.catch((err) => console.error("Suggestion error:", err));
		}, 300); // debounce to avoid spamming

		return () => clearTimeout(delayDebounce);
	}, [query]);

	const handleSubmit = () => {
		const selected = query;
		const mainNameOnly = selected?.split(",")[0]?.trim(); // Take just the name
		if (!mainNameOnly && mode !== "vibe" && mode !== "traits") return;
		onSearch({ query: mainNameOnly, mode });
	};

	return (
		<Box display='flex' gap={2} alignItems='center' flexWrap='wrap'>
			<FormControl sx={{ minWidth: 150 }}>
				<InputLabel id='mode-label'>Recommendation Type</InputLabel>
				<Select
					labelId='mode-label'
					value={mode}
					label='Recommendation Type'
					onChange={(e) => setMode(e.target.value)}>
					<MenuItem value='hybrid'>Location</MenuItem>
					{/* <MenuItem value='traits'>Traits Only</MenuItem> */}
					<MenuItem value='vibe'>Vibe (Sliders)</MenuItem>
					<MenuItem value='text'>Exact match to name</MenuItem>
				</Select>
			</FormControl>

			{mode !== "vibe" && mode !== "traits" && (
				// <TextField
				// 	label='Search Destination'
				// 	variant='outlined'
				// 	value={query}
				// 	onChange={(e) => setQuery(e.target.value)}
				// 	sx={{ flex: 1, minWidth: 250 }}
				// />
				<Autocomplete
					freeSolo
					options={suggestions} // array of string destination names
					inputValue={query}
					onInputChange={(e, newInput) => setQuery(newInput)}
					renderInput={(params) => (
						<TextField {...params} label='Search Destination' variant='outlined' />
					)}
					sx={{ flex: 1, minWidth: 250 }}
				/>
			)}

			<Button variant='contained' color='primary' onClick={handleSubmit}>
				Recommend
			</Button>
		</Box>
	);
};

export default SearchBar;
