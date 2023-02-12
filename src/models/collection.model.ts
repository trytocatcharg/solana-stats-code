export interface Collections {
    list: Collection[];
    collectionSelected?: Collection; 
}

export interface Collection {
    id: number;
    symbol: string;
    label: string;
    image: string;
}
