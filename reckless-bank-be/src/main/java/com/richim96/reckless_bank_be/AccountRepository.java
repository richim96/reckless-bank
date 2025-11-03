package com.richim96.reckless_bank_be;

import org.springframework.stereotype.Repository;
import com.richim96.reckless_bank_be.model.Account;
import java.util.HashMap;

@Repository
public class AccountRepository {
    private final HashMap<String, Account> accounts = new HashMap<>();

    public Account save(Account account) {
        if (accounts.containsKey(account.getName())) {
            return null;
        }
        accounts.put(account.getName(), account);

        return account;
    }

    public Account getAccountByName(String name) {
        if (!accounts.containsKey(name)) {
            return null;
        }
        return accounts.get(name);
    }

    public void updateBalance(Account account) {
        accounts.get(account.getName()).setBalance(account.getBalance());
    }

    public void updateTransfers(Account account) {
        accounts.get(account.getName()).setTransfers(account.getTransfers());
    }

    public String[] getContacts(String senderName) {
        return accounts.keySet().stream()
                .filter(name -> !name.equals(senderName))
                .toArray(String[]::new);
    }
}
