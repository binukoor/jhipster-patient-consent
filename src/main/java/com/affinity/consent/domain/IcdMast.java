package com.affinity.consent.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A IcdMast.
 */
@Entity
@Table(name = "icd_mast")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IcdMast implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "icd")
    private String icd;

    @Column(name = "disease")
    private String disease;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIcd() {
        return icd;
    }

    public IcdMast icd(String icd) {
        this.icd = icd;
        return this;
    }

    public void setIcd(String icd) {
        this.icd = icd;
    }

    public String getDisease() {
        return disease;
    }

    public IcdMast disease(String disease) {
        this.disease = disease;
        return this;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IcdMast)) {
            return false;
        }
        return id != null && id.equals(((IcdMast) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "IcdMast{" +
            "id=" + getId() +
            ", icd='" + getIcd() + "'" +
            ", disease='" + getDisease() + "'" +
            "}";
    }
}
