
import type { FriendMessage, User } from '@/types';
import Dexie, { type Table } from 'dexie';

class MathlifyDB extends Dexie {
    users!: Table<User, string>;
    friendMessages!: Table<FriendMessage, string>;
    friends!: Table<User, string>;

    constructor() {
        super('MathlifyDB');
        this.version(2).stores({
            users: '++_id, username, password, avatar, elo, friends, _creationTime, lastCompetition, lastActive',
            friends: '++_id, username, password, avatar, elo, friends, _creationTime, lastCompetition, lastActive',
            friendMessages: '++_id, senderId, receiverId, message, _creationTime',
        })
    }
}

export const db = new MathlifyDB();