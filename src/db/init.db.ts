/* eslint-disable no-unused-vars */
import { Bar, iBar } from "../models/bar.model.js";
import { Brew, iBrew } from "../models/brew.model.js";
import { iUser, User } from "../models/user.model.js";
import { encrypt } from "../services/authorization.js";
import { mongooseConnect } from "./mongoose.js";

let aBars: Array<iBar> = [
    {
        id: '1',
        name: 'Bar1',
        description: 'description',
        image: 'image',
        adress: 'adress',
        brews: [],
    },
    {
        id: '2',
        name: 'Bar2',
        description: 'description',
        image: 'image',
        adress: 'adress',
        brews: [],
    },
];

let aBrews: Array<iBrew> = [
    {
        id: '11',
        name: 'Brew1',
        image: 'image',
        video: 'video',
        tasted: true,
        description: 'description',
        cereal: 'Wheat',
        style: 'Blonde',
        type: 'Ale',
    },
    {
        id: '12',
        name: 'Brew2',
        image: 'image',
        video: 'video',
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
        brews: [],
        role: 'Taster',
    },
    {
        name: 'Pipa',
        email: 'pipa@test.com',
        password: '14141414',
        brews: [],
        role: 'Owner',
    },
];

export const initDB = async () => {
    const connect = await mongooseConnect();
    await Bar.deleteMany({})
    await Brew.deleteMany({})
    await User.deleteMany({})


    const bars = await Bar.insertMany(aBars);
    const brews = await Brew.insertMany(aBrews);

    let finalBars = [];
    for (let i = 0; i < bars.length; i++) {
        const bar = bars[i];
        finalBars[i] = await Bar.findByIdAndUpdate(
            bar.id,
            {
                $set: { brews: [brews[i].id] },
            },
            { new: true }
        );
    }
    aUsers = await Promise.all(
        aUsers.map(async (item) => ({
            ...item,
            brews: [brews[0].id],
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
                $set: { brews: [brews[i].id] },
            },
            { new: true }
        );
    }
        
    connect.disconnect();
    return {
        brews,
        users,
        bars: finalBars,
    };
};