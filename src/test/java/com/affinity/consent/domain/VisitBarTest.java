package com.affinity.consent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.affinity.consent.web.rest.TestUtil;

public class VisitBarTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VisitBar.class);
        VisitBar visitBar1 = new VisitBar();
        visitBar1.setId(1L);
        VisitBar visitBar2 = new VisitBar();
        visitBar2.setId(visitBar1.getId());
        assertThat(visitBar1).isEqualTo(visitBar2);
        visitBar2.setId(2L);
        assertThat(visitBar1).isNotEqualTo(visitBar2);
        visitBar1.setId(null);
        assertThat(visitBar1).isNotEqualTo(visitBar2);
    }
}
