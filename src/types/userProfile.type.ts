import { ItemInstance } from "./itemInstance.type";

export interface UserProfile {
    id: string;
    balance: number;
    bank: number;
    xp: number;
    lastDaily?: Date;
    inventory?: ItemInstance[];
}