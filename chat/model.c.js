// import { db } from "../config/config.js";

// export const _getChat = async (chat_id) => {
//     try {
//         const chat = await db('message as m')
//             .select('c.chat_id',
//                     'm.msg_id',
//                     'm.message',
//                     'm.sender_id',
//                     'u1.username as user1_username', 
//                     'u1.user_id as user1_id',
//                     'u2.username as user2_username', 
//                     'u2.user_id as user2_id')
//             .join('chat as c','c.chat_id', '=', 'm.chat_id' )
//             .join('users as u1', 'c.fk_user1', '=', 'u1.user_id')
//             .join('users as u2', 'c.fk_user2', '=', 'u2.user_id')
//             .orderBy('m.msg_id')
//             .where('m.chat_id', chat_id);
//         return chat;
//     } catch (error) {
//         console.error(`Error fetching chat ${error}`);
//         throw new Error('Failed to fetch chat');
//     }
// };


// export const _getAllChat = async (user_id) => {
//     try {
//         const chatDetails = await db('chat as c')
//             .select('c.chat_id', 
//                     'u1.username as user1_username', 
//                     'u1.user_id as user1_id',
//                     'u2.username as user2_username', 
//                     'u2.user_id as user2_id')
//             .join('users as u1', 'c.fk_user1', '=', 'u1.user_id')
//             .join('users as u2', 'c.fk_user2', '=', 'u2.user_id')
//             .where('u1.user_id', user_id)
//             // .orWhere('u2.user_id', user_id)
//             .orderBy('c.chat_id');
//         return chatDetails;
//     } catch (error) {
//         console.error('Error fetching all chat details:', error);
//         throw new Error('Failed to fetch chat details');
//     }
// };
import { db } from "../config/config.js";

export const _getChat = async (chat_id) => {
    try {
        const chat = await db('message as m')
            .select('c.chat_id',
                    'm.msg_id',
                    'm.message',
                    'm.sender_id',
                    'u1.username as user1_username', 
                    'u1.user_id as user1_id',
                    'u2.username as user2_username', 
                    'u2.user_id as user2_id')
            .join('chat as c', 'c.chat_id', '=', 'm.chat_id')
            .join('users as u1', 'c.fk_user1', '=', 'u1.user_id')
            .join('users as u2', 'c.fk_user2', '=', 'u2.user_id')
            .where('m.chat_id', chat_id)
            .orderBy('m.msg_id');
        return chat;
    } catch (error) {
        console.error(`Error fetching chat ${error}`);
        throw new Error('Failed to fetch chat');
    }
};

export const _getAllChat = async (user_id) => {
    try {
        const chatDetails = await db('chat as c')
            .select('c.chat_id', 
                    'u1.username as user1_username', 
                    'u1.user_id as user1_id',
                    'u2.username as user2_username', 
                    'u2.user_id as user2_id')
            .join('users as u1', 'c.fk_user1', '=', 'u1.user_id')
            .join('users as u2', 'c.fk_user2', '=', 'u2.user_id')
            .where('u1.user_id', user_id)
            .orWhere('u2.user_id', user_id)
            .orderBy('c.chat_id');
        return chatDetails;
    } catch (error) {
        console.error('Error fetching all chat details:', error);
        throw new Error('Failed to fetch chat details');
    }
};


export const _sendMessage = async({chat_id, sender_id, message}) => {
    try {
        const chat = await db('message')
        .insert({chat_id, sender_id, message}, [
            'chat_id',
            'sender_id',
            'message'
        ])
        return chat
    } catch (error) {
        console.log(`send msg error => ${error}`);
        throw new Error('send msg failed');
    }
}

export const _newChat = async({fk_user1,fk_user2}) => {
    try{
        const newchat = await db('chat')
        .insert({fk_user1,fk_user2}, [
            'fk_user1',
            'fk_user2'
        ])
        return newchat

    }catch(error) {
        console.log(`error create new chat ${error}`);
        throw new Error('new chat failed');
    }
}