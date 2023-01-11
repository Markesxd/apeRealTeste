package com.apereal.api.controller;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apereal.api.observatory.Observatory;
import com.apereal.api.observatory.ObservatoryOutputData;
import com.apereal.api.observatory.ObservatoryRepository;

@RestController
@RequestMapping("dados")
public class ObservatoryController {
    
    @Autowired
    private ObservatoryRepository repository;

    @GetMapping
    public Page<ObservatoryOutputData> list(@PageableDefault(sort = {"ano"}) Pageable paginacao) {
        return this.repository.findAll(paginacao).map(ObservatoryOutputData::new); 
    }

    @GetMapping("/ano/{ano}")
    public Page<ObservatoryOutputData> ano(@PathVariable Long ano, Pageable paginacao) {
        return repository.findByAno(ano, paginacao).map(ObservatoryOutputData::new);
    }

    @GetMapping("/municipio/{municipios}")
    public List<ObservatoryOutputData> cidade(@PathVariable List<String> municipios) {
        List<ObservatoryOutputData> response = Collections.<ObservatoryOutputData>emptyList();
        List<ObservatoryOutputData> aux;
        System.out.println(municipios);
        for(String municipio : municipios) {
            aux = repository.findByMunicipio(municipio).stream().map(ObservatoryOutputData::new).toList(); 
            response = Stream.concat(response.stream(), aux.stream()).toList();
        }
        return response;
    }
}
