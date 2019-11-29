package com.affinity.consent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.affinity.consent.web.rest.TestUtil;

public class StatusMastTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StatusMast.class);
        StatusMast statusMast1 = new StatusMast();
        statusMast1.setId(1L);
        StatusMast statusMast2 = new StatusMast();
        statusMast2.setId(statusMast1.getId());
        assertThat(statusMast1).isEqualTo(statusMast2);
        statusMast2.setId(2L);
        assertThat(statusMast1).isNotEqualTo(statusMast2);
        statusMast1.setId(null);
        assertThat(statusMast1).isNotEqualTo(statusMast2);
    }
}
