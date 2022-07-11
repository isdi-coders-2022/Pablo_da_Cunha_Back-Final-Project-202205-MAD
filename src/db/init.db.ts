/* eslint-disable no-unused-vars */
import { Bar, iBar } from "../models/bar.model.js";
import { Beer, iBeer } from "../models/beer.model.js";
import { iUser, User } from "../models/user.model.js";
import { encrypt } from "../services/authorization.js";
import { mongooseConnect } from "./mongoose.js";

let aBars: Array<iBar> = [
    {
        name: 'Bar1',
        description: 'description',
        image: 'image',
        adress: 'adress',
        beers: [],
    },
    {
        name: 'Bar2',
        description: 'description',
        image: 'image',
        adress: 'adress',
        beers: [],
    },
];

let aBeers: Array<iBeer> = [
    {
        name: 'Beer1',
        image: 'image',
        tasted: true,
        description: 'description',
        cereal: 'Wheat',
        style: 'Blonde',
        type: 'Ale',
    },
    {
        name: 'Beer2',
        image: 'image',
        tasted: false,
        description: 'description',
        cereal: 'Barley',
        style: 'Red',
        type: 'Lager',
    },
];

let aUsers: Array<iUser> = [
    {
        name: 'Pipo',
        email: 'pipo@test.com',
        password: '141414',
        beers: [],
        role: 'Taster',
    },
    {
        name: 'Pipa',
        email: 'pipa@test.com',
        password: '14141414',
        beers: [],
        role: 'Owner',
    },
];

export const initDB = async () => {
    const connect = await mongooseConnect();
    await Bar.deleteMany({})
    await Beer.deleteMany({})
    await User.deleteMany({})


    const bars = await Bar.insertMany(aBars);
    const beers = await Beer.insertMany(aBeers);

    let finalBars = [];
    for (let i = 0; i < bars.length; i++) {
        const bar = bars[i];
        finalBars[i] = await Bar.findByIdAndUpdate(
            bar.id,
            {
                $set: { beers: [beers[i].id] },
            },
            { new: true }
        );
    }
    aUsers = await Promise.all(
        aUsers.map(async (item) => ({
            ...item,
            beers: [beers[0].id],
            passwd: await encrypt(item.password),
        }))
    );
    const users = await User.insertMany(aUsers);

    let finalUsers = [];
    for (let i = 0; i < users.length; i++) {
        const item = users[i];
        finalUsers[i] = await User.findByIdAndUpdate(
            item.id,
            {
                $set: { beers: [beers[i].id] },
            },
            { new: true }
        );
    }
        
    connect.disconnect();
    return {
        beers,
        users,
        bars: finalBars,
    };
};