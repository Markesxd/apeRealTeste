package com.apereal.api.seeder;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apereal.api.observatory.Observatory;
import com.apereal.api.observatory.ObservatoryRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("seeder")
public class Seeder {

    @Autowired
    private ObservatoryRepository repository;

    @PostMapping
    @Transactional
    public void seed() {
        try{
            InputStream is = getClass().getResourceAsStream("/db/municipio_primeira_infancia.csv");
            BufferedReader fileReader = new BufferedReader(new InputStreamReader(is));
            CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.builder().setHeader().setSkipHeaderRecord(true).build());

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {
                Observatory observatory = new Observatory(
                    Long.parseLong(csvRecord.get("ano")),
                    csvRecord.get("id_municipio"),
                    Double.parseDouble(csvRecord.get("taxa_bruta_matricula_pre_escola")),
                    Long.parseLong(csvRecord.get("numero_absoluto_bruto_matricula_pre_escola")),
                    Double.parseDouble(csvRecord.get("taxa_liquida_matricula_pre_escola")),
                    Long.parseLong(csvRecord.get("numero_absoluto_liquido_matricula_pre_escola"))
                );
                repository.save(observatory);
            }
            csvParser.close();

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }
}
