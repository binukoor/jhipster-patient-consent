package com.affinity.consent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.affinity.consent.web.rest.TestUtil;

public class ConsentDiagTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConsentDiag.class);
        ConsentDiag consentDiag1 = new ConsentDiag();
        consentDiag1.setId(1L);
        ConsentDiag consentDiag2 = new ConsentDiag();
        consentDiag2.setId(consentDiag1.getId());
        assertThat(consentDiag1).isEqualTo(consentDiag2);
        consentDiag2.setId(2L);
        assertThat(consentDiag1).isNotEqualTo(consentDiag2);
        consentDiag1.setId(null);
        assertThat(consentDiag1).isNotEqualTo(consentDiag2);
    }
}
