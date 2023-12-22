const request = require("supertest");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const server = require("../index");

dotenv.config({path: "../.env"});

let conn;

beforeAll(async () => {
    conn = mongoose.createConnection("mongodb://127.0.0.1:27017/devmsass");
});

afterAll(async () => {
    if(await conn.dropCollection("mutuals")){
        await conn.close();
    }
});

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
                "desHelp": "Aide accordée lors du décès d'un membre de sa famille"
            }],
            "emailUser": "mbailassem1st@gmail.com"
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
        expect(res.body.length).toBeGreaterThan(1);
    });

    test("Join a mutual", async () => {
        const res = await request(server).put('/api/mutuals/Mutuelle/add').send({
            "emailUser": "mam@gmail.com"

        });
        expect(res.statusCode).toBe(200);
    })

    test("Get admins", async () => {
        const res = await request(server).get('/api/mutuals/Mutuelle/admins');
        expect(res.statusCode).toBe(200);
    });

    test("Is a mutual a package ?", async () => {
        const res = await request(server).get('/api/mutuals/Mutuelle/package');
        expect(res.body).toEqual({val: false});
    });
});

describe.skip("Testing dues", () => {
    test("Paying his dues", () => {

    })
    test("Prevent members", () => {

    })
});

describe.skip("Testing refund", () => {
    test("Get refund", () => {

    })
})