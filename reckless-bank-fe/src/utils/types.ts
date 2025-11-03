export class Account {
    name: string = '';
    balance: number = 0.0;
    contacts: string[] = [];
    transfers: Record<string, number>[] = [];
}
