package com.apereal.api.observatory;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ObservatoryRepository extends JpaRepository<Observatory, Long> {
    public Page<Observatory> findByAno(Long ano, Pageable p);
    public List<Observatory> findByMunicipio(String m);
}
