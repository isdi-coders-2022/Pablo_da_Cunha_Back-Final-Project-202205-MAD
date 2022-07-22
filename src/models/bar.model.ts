import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
import { iRelationField } from '../interfaces/relation.field.js';

mongooseConnect();

export interface iBar {
    id?: string;
    name: string;
    description: string;
    image: string;
    adress: string;    
    brews?: Array<iRelationField>;
}

const barSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    image: { type: mongoose.SchemaTypes.String, required: true },
    adress: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    brews: [{ type: mongoose.Types.ObjectId, ref: 'Brew' }],
});

barSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject.__v;
    },
});

export const Bar = mongoose.model('Bar', barSchema);

export function insertManyBar() {
    Bar.insertMany([
        {
            name: "Cafeteria Restaurante La Golondrina",
            description: "Enjoy panoramic views of Moscow at diner with encompassing glass ceilings. As its name suggests, White Rabbit Restaurant & Bar in Russia whimsically embraces an Alice in Wonderland theme. There is more to the bar than aesthetics, though. The award-winning dishes are what makes customers come back for more. White Rabbit is listed as the 18th best restaurant in the world by British magazine Restaurant – with a kitchen helmed by Chef Vladimir Mukhin, one of Russia’s best culinary talents.",
            image: "https://images.lifestyleasia.com/wp-content/uploads/2017/01/09122411/whiterabbit.jpg",
            adress: "C. de la Santísima Trinidad, 10, 28010 Madrid",   
            brews: [
                           "62d6972dcac903d7f04e4b2f",
                           "62d6971bcac903d7f04e4b2e",
                           "62d696dbcac903d7f04e4b2c",
                           "62d696cbcac903d7f04e4b2b",
                           "62d696bbcac903d7f04e4b2a",
                           "62d696a7cac903d7f04e4b29",
                           
                               
        
                            
                    ],
            },
            {
            name: "La Blanca Doble",
            description: "Subsix at Maldives takes the term “beach club” to a whole new depth. This underwater space at PER AQUUM Niyama resort in the Maldives is formerly billed as the world’s first underwater nightclub – but now functions partly as a restaurant. Located 500 metres off-shore from PER AQUUM in the Maldives’ Dhaalu Atoll, resort guests are whisked out to Subsix via speed boat, and then descend down below sea level via a grand staircase. What we’re worried about is getting back to shore after a few drinks, though. We might just sit this one out for a while.",
            image: "https://images.lifestyleasia.com/wp-content/uploads/2017/01/09123159/maldives0615-underwater.jpg",
            adress: "C. de la Santísima Trinidad, 6, 28010 Madrid",   
            brews: [    
                        "62d696a7cac903d7f04e4b29",
                        "62d696cbcac903d7f04e4b2b",
                        "62d696dbcac903d7f04e4b2c",
                        "62d6972dcac903d7f04e4b2f",
                        "62d69739cac903d7f04e4b30",
                        "62d69648cac903d7f04e4b28",
                                  
        
                            
                    ],
            },
            {
            name: "Tapeando",
            description: "A Manhattan rooftop bar finally has the answer to drinking outdoors in the middle of a New York City winter – without freezing your toes off. 230 Fifth has pop-up igloos that can host up to 11 people at a time – and features sofas, lamps, rugs and even televisions. Each igloo is made from PVC one meter thick, designed to keep our wind, rain and snow while keeping heat inside. The drinks menu includes seasonally appropriate cocktails liked spiced whisky martinis and rum-spiked hot apple cider.",
            image: "https://images.lifestyleasia.com/wp-content/uploads/2017/01/09141758/Screen-Shot-2017-01-09-at-2.17.08-PM.png",
            adress: "C. de Bravo Murillo, 26, 28015 Madrid",   
            brews: [    
                        "62d696bbcac903d7f04e4b2a",
                        "62d696cbcac903d7f04e4b2b",
                        "62d696dbcac903d7f04e4b2c",
                        "62d6971bcac903d7f04e4b2e",
                        "62d6972dcac903d7f04e4b2f",
                        "62d69739cac903d7f04e4b30",
                            
                            
                    ],
            },	
            {
            name: "Oh! Mandril",
            description: "If there’s any bar we can imagine Daenerys Targaryen sipping wine at, this is it. This biomechanical themed lounge by Swiss artist H.R Giger is modelled after his other-worldly designs in Alien. The interior is covered with skeletal arches of vertebrae that crisscross the vaulted ceiling of an ancient castle, looming over guests sat on equally eerie chair designs. If you’re not so experimental with your drinks, don’t worry – the bar offers a rather standard menu to go along with the spooky decor.",
            image: "https://images.lifestyleasia.com/wp-content/uploads/2017/01/09122531/gigerbar_gruyeres_024.jpg",
            adress: "C/ Gral. Álvarez de Castro, 21, 28010 Madrid",   
            brews: [
                        "62d69648cac903d7f04e4b28",
                        "62d696a7cac903d7f04e4b29",
                        "62d696bbcac903d7f04e4b2a",
                        "62d696cbcac903d7f04e4b2b",
                        "62d696dbcac903d7f04e4b2c",
                        "62d6971bcac903d7f04e4b2e",
                                         

                            
                    ],
            },	
    ])
        .catch(function (error) {
            console.log(error); // Failure
        });
}

// insertManyBar()