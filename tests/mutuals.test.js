const request = require("supertest");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const server = require("../index");

dotenv.config({path: "../.env"});

let conn;

beforeAll(async () => {
    conn = mongoose.createConnection("mongodb://127.0.0.1:27017/devmsass");
    conn.createCollection("mutuals");
});

afterAll(async () => {
    await conn.dropCollection("mutuals");
    await conn.close();
})

describe("Test the database connection", () => {

    test("Connection defined", () => {
        expect(conn).toBeDefined();
    });
});

describe("Testing mutuals", () => {
    test("Creating a mutual", async () => {
        const res = await request(server).post('/api/mutuals/creation').send({
            "name": "Mutuelle Responsable",
            "type": "single",
            "helps": [{
                "nameHelp": "Aide décès",
                "desHelp": "Aide accordée lors du décès d'un membre de sa famille",
            }],
            "emailUser": "mbailassem1st@gmail.com",
        });
        expect(res.statusCode).toBe(201);
    });

    test("Creating mutuals", async () => {
        const res = await request(server).post('/api/mutuals/creation').send({
            "name": "Mutuelle",
            "type": "single",
            "helps": [{
                "nameHelp": "Aide décès",
                "desHelp": "Aide accordée lors du décès d'un membre de sa famille",
            }],
            "emailUser": "mbailassem1st@gmail.com",
        });

        const res2 = await request(server).post('/api/mutuals/creation').send({
            "name": "Mutuelle Animale",
            "type": "single",
            "helps": [{
                "nameHelp": "Aide décès",
                "desHelp": "Aide accordée lors du décès d'un membre de sa famille",
            }],
            "emailUser": "mbailassem1st@gmail.com",
        });
        expect(res.statusCode).toBe(201);
        expect(res2.statusCode).toBe(201);
    });

    test("Mutuals with same names", async () => {
        const res = await request(server).post('/api/mutuals/creation').send({
            "name": "Mutuelle Responsable",
            "type": "single",
            "helps": [{
                "nameHelp": "Aide décès",
                "desHelp": "Aide accordée lors du décès d'un membre de sa famille",
            }],
            "emailUser": "mbailassem1st@gmail.com",
        });
        expect(res.statusCode).toBe(403);
    })

    test("Get a mutual", async () => {
        const res = await request(server).get('/api/mutuals/Mutuelle');
        expect(res.statusCode).toBe(200);
    });

    test("Get mutuals", async () => {
        const res = await request(server).get('/api/mutuals');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreater(1);
    });

    test("Invite members", () => {

    })

    test("Join a mutual", () => {

    })
});

describe("Testing dues", () => {
    test("Paying his dues", () => {

    })
    test("Prevent members", () => {

    })
});

describe("Testing refund", () => {
    test("Get refund", () => {

    })
})