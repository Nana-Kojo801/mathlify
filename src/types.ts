import type { DataModel } from "convex/_generated/dataModel";

export type User = DataModel["users"]["document"]
export type Preset = DataModel["presets"]["document"]

export type GameType  = DataModel["presets"]["document"]["type"]

export type FriendRequest = DataModel["friendRequests"]["document"]

export type FriendMessage = DataModel["friendMessages"]["document"] & {
    sender: User
    receiver: User
}

// Base type from database
type CompetitionDB = DataModel["competitions"]["document"] & {
    entries: {
        casual: {
            userId: User["_id"]
            round: number
            avgTime: number
            score: number
        }[]
        speedSolve: {
            userId: User["_id"]
            round: number
            avgTime: number
            score: number
        }[]
    }
}

// Extended type with mapped user data
export type Competition = Omit<CompetitionDB, 'entries'> & {
    entries: {
        casual: {
            username: string
            avatar: string
            userId: User["_id"]
            round: number
            avgTime: number
            score: number
        }[]
        speedSolve: {
            username: string
            avatar: string
            userId: User["_id"]
            questions: number
            avgTime: number
            score: number
        }[]
    }
}

export type FlowGameDifficulty = {
    range: {
        min: number
        max: number
    }
    quantity: {
        min: number;
        max: number;
    }
    duration: number;
    timeInterval: number
}

export type RapidGameDifficulty = {
    range: {
        min: number
        max: number
    }
    quantity: {
        min: number;
        max: number;
    }
    duration: number;
}