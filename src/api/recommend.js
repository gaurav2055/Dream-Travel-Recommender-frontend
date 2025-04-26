import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const getRecommendations = (query, top_n = 5) =>
	api.get(`/recommend`, { params: { query, top_n } });

export const getHybridRecommendations = (query, top_n = 5, alpha = 0.7) =>
	api.get(`/recommend-hybrid`, { params: { query, top_n, alpha } });

export const getTraitRecommendations = (query, top_n = 5) =>
	api.get(`/recommend-traits`, { params: { query, top_n } });

export const getVibeRecommendations = (traits, top_n = 5) =>
	api.post(`/recommend-vibe?top_n=${top_n}`, traits);
