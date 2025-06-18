export class BankAccount{
    #balance;
    #history;
    constructor(owner,balance=0){
        this.owner=owner;
        this.#balance=balance;
        this.#history=[
            {
                type:'Initial',
                amount:balance,
                balance:this.#balance,
                date:new Date().toISOString(),
            },
        ];
    }
    deposit(amount){
        this.#balance+=amount;
        this.#history.push({
            type:'Deposit',
            amount,
            balance:this.#balance,
            date:new Date().toISOString(),
        });
    }
    withdraw(amount){
        if(amount>this.#balance){
            throw new Error('Insufficient Funds');
        }
        this.#balance-=amount;
        this.#history.push({
            type:'WithDraw',
            amount,
            balance:this.#balance,
            date:new Date().toISOString()
        });
    };
    getBalance(){
        return this.#balance;
    }
    getHistory(){
        return this.#history.map((fund)=>({...fund}));
    }
}

export const account = new BankAccount('cla',4300);

// account.deposit(450);
// account.withdraw(350);

// console.log(account.getBalance());
// console.log(account.getHistory());