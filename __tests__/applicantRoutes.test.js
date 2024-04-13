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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('Applicant API endpoints', () => {
    let server;
    let createdApplicantId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        server = app_1.default.listen(4000);
        // Create a user for testing
        const res = yield (0, supertest_1.default)(server)
            .post('/awesome/applicant')
            .send({
            name: 'John Doe',
            bio: 'Software engineer with expertise in JavaScript and Node.js',
            skills: ['JavaScript', 'Node.js']
        });
        createdApplicantId = res.body.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clean up - delete the user created for testing
        if (createdApplicantId) {
            yield (0, supertest_1.default)(server)
                .delete(`/awesome/applicant/${createdApplicantId}`);
            server.close();
        }
    }));
    // Test for PUT request (update)
    it('should update the created applicant', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedApplicant = {
            name: 'John Smith',
            bio: 'Updated bio for John Smith',
            skills: ['JavaScript', 'Node.js', 'TypeScript']
        };
        const updateRes = yield (0, supertest_1.default)(server)
            .put(`/awesome/applicant/${createdApplicantId}`)
            .send(updatedApplicant);
        expect(updateRes.statusCode).toEqual(200);
        expect(updateRes.body).toHaveProperty('id', createdApplicantId);
        expect(updateRes.body.name).toEqual(updatedApplicant.name);
        expect(updateRes.body.bio).toEqual(updatedApplicant.bio);
        expect(updateRes.body.skills).toEqual(updatedApplicant.skills);
    }));
    // Test for DELETE request
    it('should delete the created applicant', () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteRes = yield (0, supertest_1.default)(server)
            .delete(`/awesome/applicant/${createdApplicantId}`);
        expect(deleteRes.statusCode).toEqual(204);
        // Ensure the applicant is actually deleted
        const getRes = yield (0, supertest_1.default)(server).get(`/awesome/applicant/${createdApplicantId}`);
        expect(getRes.statusCode).toEqual(404);
    }));
});
