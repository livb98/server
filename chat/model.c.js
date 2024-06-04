import { db } from "../config/config.js";

export const _getChat = async () => {
    try {
        const result = await db('users')
            .select('users.username', 'chat.message')
            .join('chat', 'users.user_id', '=', 'chat.fk_user1');
        return result;
    } catch (error) {
        console.error('Error fetching users and chat IDs:', error);
        throw new Error('Failed to fetch users and chat IDs');
    }
};

export const _sendMessage = async({message, fk_user1, fk_user2}) => {
    try {
        const chat = await db('chat')
        .insert({message, fk_user1, fk_user2}, [
            'message',
            'fk_user1',
            'fk_user2'
        ])
        return chat
    } catch (error) {
        console.log(`send msg error => ${error}`);
        throw new Error('send msg failed');
    }
}
