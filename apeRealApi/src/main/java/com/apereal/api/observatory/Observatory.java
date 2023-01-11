package com.apereal.api.observatory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "oca")
@Entity(name = "Observatory")
@EqualsAndHashCode(of = "id")
public class Observatory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long ano;
    @Column(name = "id_municipio")
    private String municipio;
    @Column(name = "taxa_bruta_matricula_pre_escola")
    private Double taxaBruta;
    @Column(name = "numero_absoluto_bruto_matricula_pre_escola")
    private Long numeroBruto;
    @Column(name = "taxa_liquida_matricula_pre_escola")
    private Double taxaLiquida;
    @Column(name = "numero_absoluto_liquido_matricula_pre_escola")
    private Long numeroLiquido;

    public Observatory(Long ano, String id_municipio, Double taxa_bruta_matricula_pre_escola, Long numero_absoluto_bruto_matricula_pre_escola, Double taxa_liquida_matricula_pre_escola, Long numero_absoluto_liquido_matricula_pre_escola) { 
        this.ano = ano;
        this.municipio = id_municipio;
        this.taxaBruta = taxa_bruta_matricula_pre_escola;
        this.numeroBruto = numero_absoluto_bruto_matricula_pre_escola;
        this.taxaLiquida = taxa_liquida_matricula_pre_escola;
        this.numeroLiquido = numero_absoluto_liquido_matricula_pre_escola;
    }
}
