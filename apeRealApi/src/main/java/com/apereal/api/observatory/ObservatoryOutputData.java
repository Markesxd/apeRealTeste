package com.apereal.api.observatory;

public record ObservatoryOutputData(
        Long ano, String id_municipio,
        Double taxa_bruta_matricula_pre_escola,
        Long numero_absoluto_bruto_matricula_pre_escola,
        Double taxa_liquida_matricula_pre_escola,
        Long numero_absoluto_liquido_matricula_pre_escola) {

        public ObservatoryOutputData(Observatory observatory) {
            this(observatory.getAno(),
                observatory.getMunicipio(),
                observatory.getTaxaBruta(),
                observatory.getNumeroBruto(),
                observatory.getTaxaLiquida(),
                observatory.getNumeroLiquido());
        }
}
