export interface Member {
    id: number;
    name: string;
    email: string;
    age: number;
    status: 'active' | 'inactive';
    lastTalk: string | null;
    calling: string;
    photo: string;
    phone: string;
    address: string;
    attendance: any[];
}