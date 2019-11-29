package com.affinity.consent.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ConsentDiag.
 */
@Entity
@Table(name = "consent_diag")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ConsentDiag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(unique = true)
    private IcdMast icd;

    @ManyToOne
    @JsonIgnoreProperties("diags")
    private Consent consent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public ConsentDiag description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public IcdMast getIcd() {
        return icd;
    }

    public ConsentDiag icd(IcdMast icdMast) {
        this.icd = icdMast;
        return this;
    }

    public void setIcd(IcdMast icdMast) {
        this.icd = icdMast;
    }

    public Consent getConsent() {
        return consent;
    }

    public ConsentDiag consent(Consent consent) {
        this.consent = consent;
        return this;
    }

    public void setConsent(Consent consent) {
        this.consent = consent;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ConsentDiag)) {
            return false;
        }
        return id != null && id.equals(((ConsentDiag) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ConsentDiag{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
