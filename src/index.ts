import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as MovieAPI from './movie-api';
import { PrismaClient } from "@prisma/client"

const app = express();
// create a new express app for us 

const prismaClient = new PrismaClient();

app.use(express.json());
// response / request into json

app.use(cors());

app.get("/api/movies/search", async (req, res) => {
    // get 
    // http://localhost:4000/api/movies/search?searchTerm=sky&page=1
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);
    const results = await MovieAPI.searchMovies(searchTerm, page);
    return res.json(results);
})

app.get("/api/movies/:movieId/summary", async (req, res) => {
    // get 
    // http://localhost:4000/api/movies/333367/summary
    const movieId = req.params.movieId;
    const results = await MovieAPI.getMovieByID(movieId);
    return res.json(results);
})


app.get("/api/movies/podcasts/search", async (req, res) => {
    // get 
    // http://localhost:4000/api/movies/podcasts/search?searchTerm=sky

    const searchTerm = req.query.searchTerm as string;
    const results = await MovieAPI.searchPodcasts(searchTerm);
    return res.json(results);;
})

app.post("/api/movies/favorite", async (req, res) => {
    const movieId = req.body.movieId;
    try {
        const favoriteMovie = await prismaClient.favoriteMovies.create({
            data: {
                movieId: movieId
            }
        });
        return res.status(201).json(favoriteMovie);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Oops, something went wrong"});
    }
})

app.get("/api/movies/favorite", async (req, res) => {
    try {
        const movies = await prismaClient.favoriteMovies.findMany();
        const movieIds = movies.map((movie) => movie.movieId.toString());
        const favorites = await MovieAPI.getFavoriteMoviesByIDs(movieIds);
        return res.json(favorites);
    } catch (error) {
        console.log(error);
    }
})

app.delete("/api/movies/favorite/", async (req, res) => {
    const movieId = req.body.movieId;

    try {
        await prismaClient.favoriteMovies.delete({
            where: {
                movieId: movieId
            }
        })
        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Oops, something went wrong"});
    }
})

app.listen(4000, () => {
    console.log("server running on localhost:4000");
})