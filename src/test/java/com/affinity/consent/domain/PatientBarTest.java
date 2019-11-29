package com.affinity.consent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.affinity.consent.web.rest.TestUtil;

public class PatientBarTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PatientBar.class);
        PatientBar patientBar1 = new PatientBar();
        patientBar1.setId(1L);
        PatientBar patientBar2 = new PatientBar();
        patientBar2.setId(patientBar1.getId());
        assertThat(patientBar1).isEqualTo(patientBar2);
        patientBar2.setId(2L);
        assertThat(patientBar1).isNotEqualTo(patientBar2);
        patientBar1.setId(null);
        assertThat(patientBar1).isNotEqualTo(patientBar2);
    }
}
