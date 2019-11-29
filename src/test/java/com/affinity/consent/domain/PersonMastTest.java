package com.affinity.consent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.affinity.consent.web.rest.TestUtil;

public class PersonMastTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonMast.class);
        PersonMast personMast1 = new PersonMast();
        personMast1.setId(1L);
        PersonMast personMast2 = new PersonMast();
        personMast2.setId(personMast1.getId());
        assertThat(personMast1).isEqualTo(personMast2);
        personMast2.setId(2L);
        assertThat(personMast1).isNotEqualTo(personMast2);
        personMast1.setId(null);
        assertThat(personMast1).isNotEqualTo(personMast2);
    }
}
