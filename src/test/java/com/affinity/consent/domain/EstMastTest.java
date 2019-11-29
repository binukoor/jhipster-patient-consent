package com.affinity.consent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.affinity.consent.web.rest.TestUtil;

public class EstMastTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstMast.class);
        EstMast estMast1 = new EstMast();
        estMast1.setId(1L);
        EstMast estMast2 = new EstMast();
        estMast2.setId(estMast1.getId());
        assertThat(estMast1).isEqualTo(estMast2);
        estMast2.setId(2L);
        assertThat(estMast1).isNotEqualTo(estMast2);
        estMast1.setId(null);
        assertThat(estMast1).isNotEqualTo(estMast2);
    }
}
