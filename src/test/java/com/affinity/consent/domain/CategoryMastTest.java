package com.affinity.consent.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.affinity.consent.web.rest.TestUtil;

public class CategoryMastTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoryMast.class);
        CategoryMast categoryMast1 = new CategoryMast();
        categoryMast1.setId(1L);
        CategoryMast categoryMast2 = new CategoryMast();
        categoryMast2.setId(categoryMast1.getId());
        assertThat(categoryMast1).isEqualTo(categoryMast2);
        categoryMast2.setId(2L);
        assertThat(categoryMast1).isNotEqualTo(categoryMast2);
        categoryMast1.setId(null);
        assertThat(categoryMast1).isNotEqualTo(categoryMast2);
    }
}
