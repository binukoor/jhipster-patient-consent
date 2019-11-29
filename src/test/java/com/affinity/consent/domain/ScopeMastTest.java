package com.affinity.consent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.affinity.consent.web.rest.TestUtil;

public class ScopeMastTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ScopeMast.class);
        ScopeMast scopeMast1 = new ScopeMast();
        scopeMast1.setId(1L);
        ScopeMast scopeMast2 = new ScopeMast();
        scopeMast2.setId(scopeMast1.getId());
        assertThat(scopeMast1).isEqualTo(scopeMast2);
        scopeMast2.setId(2L);
        assertThat(scopeMast1).isNotEqualTo(scopeMast2);
        scopeMast1.setId(null);
        assertThat(scopeMast1).isNotEqualTo(scopeMast2);
    }
}
