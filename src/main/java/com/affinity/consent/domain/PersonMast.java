package com.affinity.consent.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PersonMast.
 */
@Entity
@Table(name = "person_mast")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PersonMast implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "pers_code")
    private Integer persCode;

    @Column(name = "person_name")
    private String personName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPersCode() {
        return persCode;
    }

    public PersonMast persCode(Integer persCode) {
        this.persCode = persCode;
        return this;
    }

    public void setPersCode(Integer persCode) {
        this.persCode = persCode;
    }

    public String getPersonName() {
        return personName;
    }

    public PersonMast personName(String personName) {
        this.personName = personName;
        return this;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PersonMast)) {
            return false;
        }
        return id != null && id.equals(((PersonMast) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PersonMast{" +
            "id=" + getId() +
            ", persCode=" + getPersCode() +
            ", personName='" + getPersonName() + "'" +
            "}";
    }
}
