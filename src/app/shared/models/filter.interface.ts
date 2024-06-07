export type Status = 'alive' | 'dead' | 'unknown';

export interface FilterCharacters {
    name?: string;
    status?: Status;
    species?: string;
    type?: string;
    gender?: string;
    id?: number;
    [key: string]: any;
}
