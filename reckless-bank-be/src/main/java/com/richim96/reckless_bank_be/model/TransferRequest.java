package com.richim96.reckless_bank_be.model;

public record TransferRequest(String sender, Double amount, String recipient) {
}