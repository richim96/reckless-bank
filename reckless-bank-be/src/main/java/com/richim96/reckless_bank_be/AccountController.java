package com.richim96.reckless_bank_be;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import com.richim96.reckless_bank_be.model.Account;
import com.richim96.reckless_bank_be.model.AccountRequest;
import com.richim96.reckless_bank_be.model.DepositRequest;
import com.richim96.reckless_bank_be.model.WithdrawalRequest;
import com.richim96.reckless_bank_be.model.TransferRequest;
import com.richim96.reckless_bank_be.AccountService;


@RestController
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/create")
    public ResponseEntity<Account> createAccount(@RequestBody AccountRequest request) {
        Account newAccount = accountService.createAccount(request);
        if (newAccount == null) {
            // TODO: Add more specific error handling (exitsting account vs bad input and creation failure)
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(newAccount);
        
    }

    @PostMapping("/login")
    public ResponseEntity<Account> getAccount(@RequestBody AccountRequest request) {
        Account account = accountService.login(request.name());
        if (account == null) {
            // TODO: Add more specific error handling (account not found vs bad input or processing errors)
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(account);
    }

    @PostMapping("/deposit")
    public ResponseEntity<Account> depositAmount(@RequestBody DepositRequest request) {
        Account account = accountService.deposit(request);
        return ResponseEntity.ok(account);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<Account> withdrawAmount(@RequestBody WithdrawalRequest request) {
        Account account = accountService.withdraw(request);
        return ResponseEntity.ok(account);
    }

    @PostMapping("/transfer")
    public ResponseEntity<Account[]> transferAmount(@RequestBody TransferRequest request) {
        Account[] accounts = accountService.transfer(request);
        return ResponseEntity.ok(accounts);
    }
    
}