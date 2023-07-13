import { Request, Response } from "express";
import client from "../database/mongo.client";
import User from "../entities/user.entity";

const database = client.db("sample_mflix");
const usersCollection = database.collection("users");

class UserController {
    async getAll(req: Request, res: Response) {
        await client.connect();
        try {
            const usersCursor = usersCollection.find({});
            const users = [];
            for await (const doc of usersCursor) {
                users.push(doc);
              }
              console.log(users.length);
            res.json(users);
        }
        finally {
            await client.close();
        }
    }
    async getOne(req: Request, res: Response) {
        await client.connect();
        const userEmail = req.body.email;
        try {
            const user = await usersCollection.findOne({email: userEmail});
            res.json(user);
        }
        finally {
            await client.close();
        }
    }
    async createOne(req: Request, res: Response) {
        await client.connect();
        console.log(req.body);
        var user = new User(req.body);
        try {
            const insertResult = await usersCollection.insertOne({...user});
            res.json(insertResult);
        }
        finally {
            await client.close();
        }
    }
    async deleteOne(req: Request, res: Response) {
        await client.connect();
        const userEmail = req.body.email;
        try {
            const result = await usersCollection.deleteOne({email: userEmail});
            res.json(result);
        }
        finally {
            await client.close();
        }
    }
    async updateOne(req: Request, res: Response) {
        await client.connect();
        console.log(req.body);
        var user = new User(req.body);
        const userEmail = req.body.email;
        try {
            const insertResult = await usersCollection.updateOne({email: userEmail}, {$set:{...user}})
            res.json(insertResult);
        }
        finally {
            await client.close();
        }
    }
}
export default UserController;