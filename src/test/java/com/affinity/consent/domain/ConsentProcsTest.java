package com.affinity.consent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.affinity.consent.web.rest.TestUtil;

public class ConsentProcsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConsentProcs.class);
        ConsentProcs consentProcs1 = new ConsentProcs();
        consentProcs1.setId(1L);
        ConsentProcs consentProcs2 = new ConsentProcs();
        consentProcs2.setId(consentProcs1.getId());
        assertThat(consentProcs1).isEqualTo(consentProcs2);
        consentProcs2.setId(2L);
        assertThat(consentProcs1).isNotEqualTo(consentProcs2);
        consentProcs1.setId(null);
        assertThat(consentProcs1).isNotEqualTo(consentProcs2);
    }
}
