package com.affinity.consent.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A EstMast.
 */
@Entity
@Table(name = "est_mast")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EstMast implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "est_code")
    private Integer estCode;

    @Column(name = "est_name")
    private String estName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getEstCode() {
        return estCode;
    }

    public EstMast estCode(Integer estCode) {
        this.estCode = estCode;
        return this;
    }

    public void setEstCode(Integer estCode) {
        this.estCode = estCode;
    }

    public String getEstName() {
        return estName;
    }

    public EstMast estName(String estName) {
        this.estName = estName;
        return this;
    }

    public void setEstName(String estName) {
        this.estName = estName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EstMast)) {
            return false;
        }
        return id != null && id.equals(((EstMast) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EstMast{" +
            "id=" + getId() +
            ", estCode=" + getEstCode() +
            ", estName='" + getEstName() + "'" +
            "}";
    }
}
