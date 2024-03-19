"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== 'production')
    (0, dotenv_1.config)();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var MovieAPI = __importStar(require("./movie-api"));
var client_1 = require("@prisma/client");
var app = (0, express_1.default)();
// create a new express app for us 
var prismaClient = new client_1.PrismaClient();
app.use(express_1.default.json());
// response / request into json
app.use((0, cors_1.default)());
app.get("/api/movies/search", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchTerm, page, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchTerm = req.query.searchTerm;
                page = parseInt(req.query.page);
                return [4 /*yield*/, MovieAPI.searchMovies(searchTerm, page)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); });
app.get("/api/movies/:movieId/summary", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movieId, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                movieId = req.params.movieId;
                return [4 /*yield*/, MovieAPI.getMovieByID(movieId)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); });
app.get("/api/movies/podcasts/search", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchTerm, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchTerm = req.query.searchTerm;
                return [4 /*yield*/, MovieAPI.searchPodcasts(searchTerm)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); });
app.post("/api/movies/favorite", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movieId, favoriteMovie, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                movieId = req.body.movieId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismaClient.favoriteMovies.create({
                        data: {
                            movieId: movieId
                        }
                    })];
            case 2:
                favoriteMovie = _a.sent();
                return [2 /*return*/, res.status(201).json(favoriteMovie)];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ error: "Oops, something went wrong" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/api/movies/favorite", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movies, movieIds, favorites, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, prismaClient.favoriteMovies.findMany()];
            case 1:
                movies = _a.sent();
                movieIds = movies.map(function (movie) { return movie.movieId.toString(); });
                return [4 /*yield*/, MovieAPI.getFavoriteMoviesByIDs(movieIds)];
            case 2:
                favorites = _a.sent();
                return [2 /*return*/, res.json(favorites)];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete("/api/movies/favorite/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movieId, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                movieId = req.body.movieId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismaClient.favoriteMovies.delete({
                        where: {
                            movieId: movieId
                        }
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({ error: "Oops, something went wrong" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Serving on port ".concat(port));
});
