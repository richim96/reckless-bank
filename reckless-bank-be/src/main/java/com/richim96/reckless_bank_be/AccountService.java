package com.richim96.reckless_bank_be;

import java.util.List;
import java.util.ArrayList;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.richim96.reckless_bank_be.model.Account;
import com.richim96.reckless_bank_be.model.AccountRequest;
import com.richim96.reckless_bank_be.model.DepositRequest;
import com.richim96.reckless_bank_be.model.WithdrawalRequest;
import com.richim96.reckless_bank_be.model.TransferRequest;
import com.richim96.reckless_bank_be.AccountRepository;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
    
    public Account createAccount(AccountRequest request) {
        if (accountRepository.getAccountByName(request.name()) != null) {
            return null;
        }

        String name = request.name();
        Double initialBalance = 0.0;
        String[] contacts = accountRepository.getContacts(name);
        List<Pair<String, Double>> transfers = new ArrayList<>();

        return accountRepository.save(new Account(name, initialBalance, contacts, transfers));
    }

    public Account login(String name) {
        Account account = accountRepository.getAccountByName(name);
        if (account == null) {
            return null;
        }
        account.setContacts(accountRepository.getContacts(name));

        return account;
    }

    public Account deposit(DepositRequest request) {
        Account account = accountRepository.getAccountByName(request.name());

        if (account == null || request.amount() <= 0) {
            return null;
        }

        Double newBalance = account.getBalance() + request.amount();
        account.setBalance(newBalance);
        accountRepository.updateBalance(account);

        return account;
    }

    public Account withdraw(WithdrawalRequest request) {
        Account account = accountRepository.getAccountByName(request.name());

        if (account == null || account.getBalance() < request.amount() || request.amount() <= 0) {
            return null;
        }

        Double newBalance = account.getBalance() - request.amount();
        account.setBalance(newBalance);
        accountRepository.updateBalance(account);

        return account;
    }

    public Account[] transfer(TransferRequest request) {
        Account sender = accountRepository.getAccountByName(request.sender());
        Account recipient = accountRepository.getAccountByName(request.recipient());

        if (sender == null || recipient == null || sender.getBalance() <= request.amount() || request.amount() <= 0) {
            return null;
        }

        Double newSenderBalance = sender.getBalance() - request.amount();
        Double newRecipientBalance = recipient.getBalance() + request.amount();

        sender.setBalance(newSenderBalance);
        recipient.setBalance(newRecipientBalance);
        if (sender.getTransfers().size() == 50) {
            sender.getTransfers().remove(0);
        }
        sender.getTransfers().add(Pair.of(request.recipient(), request.amount()));

        accountRepository.updateBalance(sender);
        accountRepository.updateTransfers(sender);
        accountRepository.updateBalance(recipient);

        return new Account[] { sender, recipient };
    }
}