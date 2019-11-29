package com.affinity.consent.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A CategoryMast.
 */
@Entity
@Table(name = "category_mast")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CategoryMast implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cat_code")
    private Integer catCode;

    @Column(name = "category")
    private String category;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCatCode() {
        return catCode;
    }

    public CategoryMast catCode(Integer catCode) {
        this.catCode = catCode;
        return this;
    }

    public void setCatCode(Integer catCode) {
        this.catCode = catCode;
    }

    public String getCategory() {
        return category;
    }

    public CategoryMast category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CategoryMast)) {
            return false;
        }
        return id != null && id.equals(((CategoryMast) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CategoryMast{" +
            "id=" + getId() +
            ", catCode=" + getCatCode() +
            ", category='" + getCategory() + "'" +
            "}";
    }
}
