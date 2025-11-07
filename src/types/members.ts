export interface Member {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'inactive';
    lastTalk: string;
    calling: string;
}