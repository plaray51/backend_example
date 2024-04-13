"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db")); // Adjust the import path to where your database configuration is located
const router = (0, express_1.Router)();
// POST: Create a new applicant
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio, skills } = req.body;
    try {
        const result = yield db_1.default.query('INSERT INTO applicant (name, bio, skills) VALUES ($1, $2, $3) RETURNING *', [name, bio, skills]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}));
// GET: Retrieve all applicants
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM applicant');
        res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}));
// GET: Retrieve a single applicant by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query('SELECT * FROM applicant WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        }
        else {
            res.status(404).send('Applicant not found');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}));
// PUT: Update an existing applicant
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, bio, skills } = req.body;
    try {
        const result = yield db_1.default.query('UPDATE applicant SET name = $1, bio = $2, skills = $3 WHERE id = $4 RETURNING *', [name, bio, skills, id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        }
        else {
            res.status(404).send('Applicant not found');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}));
// DELETE: Remove an applicant
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query('DELETE FROM applicant WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.status(204).json({ message: 'Applicant deleted' });
        }
        else {
            res.status(404).send('Applicant not found');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}));
exports.default = router;
