package com.affinity.consent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.affinity.consent.web.rest.TestUtil;

public class ProcMastTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProcMast.class);
        ProcMast procMast1 = new ProcMast();
        procMast1.setId(1L);
        ProcMast procMast2 = new ProcMast();
        procMast2.setId(procMast1.getId());
        assertThat(procMast1).isEqualTo(procMast2);
        procMast2.setId(2L);
        assertThat(procMast1).isNotEqualTo(procMast2);
        procMast1.setId(null);
        assertThat(procMast1).isNotEqualTo(procMast2);
    }
}
