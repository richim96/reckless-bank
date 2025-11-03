package com.richim96.reckless_bank_be.model;

import java.util.List;
import org.apache.commons.lang3.tuple.Pair;
import lombok.Data;
import lombok.AllArgsConstructor;


@Data
@AllArgsConstructor
public class Account {
    private String name;
    private Double balance;
    private String[] contacts;
    private List<Pair<String, Double>> transfers;
}
