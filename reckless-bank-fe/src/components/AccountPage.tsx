import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Account } from '../utils/types';
import { depositAmount, withdrawAmount, transferAmount } from '../utils/api';


function AccountPage() {
  const [amount, setAmount]= useState(0);
  const [recipient, setRecipient]= useState('');
  
  const location = useLocation();
  const [account, setAccount] = useState<Account>(location.state!.account);
  const navigate = useNavigate();

  const handleDeposit = async () => {
    if (amount <= 0) {
      alert('Invalid amount');
      return;
    }

    try {
      setAccount(await depositAmount(account.name, amount));
      alert(`Deposited amount: ${amount}€`);
    } catch (error) {
      alert('Deposit failed');
    }
  };

  const handleWithdrawal = async() => {
    if (amount <= 0) {
      alert('Invalid amount');
      return;
    }
    if (amount > account.balance) {
      alert('Insufficient balance');
      return;
    }

    try {
      setAccount(await withdrawAmount(account.name, amount));
      alert(`Withdrawn amount: ${amount}€`);
      account.balance = account.balance;
    } catch (error) {
      alert('Withdrawal failed');
    }
  };

  const handleTransfer = async () => {
    if (amount <= 0) {
      alert('Invalid amount');
      return;
    }
    if (amount > account.balance) {
      alert('Insufficient balance');
      return;
    }
    if (recipient == '') {
      alert('Select a recipient');
      return;
    }

    try {
      const accounts: Account[] = await transferAmount(account.name, amount, recipient);
      setAccount(accounts[0]);
      alert(`Transferred ${amount}€ to ${recipient}.`);
    } catch (error) {
      alert('Transfer failed');
    }
  };

  const handleLogout = async () => {
    console.log('Logging out from: ', account.name);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <p className="block text-lg font-medium text-gray-700 mb-2">
            User: <strong>{account.name}</strong>
            <br/>
            Balance: <strong>{account.balance}€</strong>
            <br/>
            Recent transfers (latest 50): <strong>{account.transfers.length}</strong>
          </p>

          <div className="max-h-60 overflow-y-auto rounded-lg shadow-sm">
            <table
              className="min-w-full text-sm text-left w-full bg-white"
              style={{
                border: "2px solid #555",
                borderCollapse: "collapse",
              }}
            >
              <thead style={{ backgroundColor: "#f5f5f5", position: "sticky", top: 0 }}>
                <tr>
                  <th style={{ border: "1px solid #555", padding: "8px" }}>Transfer Recipient</th>
                  <th style={{ border: "1px solid #555", padding: "8px" }}>Amount (€)</th>
                </tr>
              </thead>
              <tbody>
                {account.transfers
                  .flatMap(obj => Object.entries(obj))
                  .map(([recipient, amount], i) => (
                    <tr key={i}>
                      <td style={{ border: "1px solid #aaa", padding: "8px" }}>{recipient}</td>
                      <td style={{ border: "1px solid #aaa", padding: "8px" }}>{amount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <br/>

        <div className="mb-6">
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input // TODO: only accept 2 decimal places
            id="amount"
            type="number"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
            Recipient
          </label>
          <select
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a recipient</option>
            {account.contacts.map((contact: string) => (
              <option key={contact} value={contact}>
                {contact}
              </option>
            ))}
          </select>
        </div>

        <br/>
        
        <div className="flex gap-3">
          <button
            onClick={handleDeposit}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Deposit
          </button>
          <button
            onClick={handleWithdrawal}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Withdraw
          </button>
          <button
            onClick={handleTransfer}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Transfer
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
