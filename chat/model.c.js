import { db } from "../config/config.js";

export const _getChat = async (user_id1, user_id2) => {
    try {
        const chat = await db('chat')
            .select('*')
            .where(builder => {
                builder.where({ fk_user1: user_id1, fk_user2: user_id2 })
                       .orWhere({ fk_user1: user_id2, fk_user2: user_id1 });
            });
        return chat;
    } catch (err) {
        console.log('chat model => ', err);
        throw new Error('chat model failed');
    }
};
