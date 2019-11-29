package com.affinity.consent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.affinity.consent.web.rest.TestUtil;

public class ConsentFromTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConsentFrom.class);
        ConsentFrom consentFrom1 = new ConsentFrom();
        consentFrom1.setId(1L);
        ConsentFrom consentFrom2 = new ConsentFrom();
        consentFrom2.setId(consentFrom1.getId());
        assertThat(consentFrom1).isEqualTo(consentFrom2);
        consentFrom2.setId(2L);
        assertThat(consentFrom1).isNotEqualTo(consentFrom2);
        consentFrom1.setId(null);
        assertThat(consentFrom1).isNotEqualTo(consentFrom2);
    }
}
