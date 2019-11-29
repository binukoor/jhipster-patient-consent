package com.affinity.consent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.affinity.consent.web.rest.TestUtil;

public class IcdMastTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IcdMast.class);
        IcdMast icdMast1 = new IcdMast();
        icdMast1.setId(1L);
        IcdMast icdMast2 = new IcdMast();
        icdMast2.setId(icdMast1.getId());
        assertThat(icdMast1).isEqualTo(icdMast2);
        icdMast2.setId(2L);
        assertThat(icdMast1).isNotEqualTo(icdMast2);
        icdMast1.setId(null);
        assertThat(icdMast1).isNotEqualTo(icdMast2);
    }
}
