package com.affinity.consent.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A ConsentFrom.
 */
@Entity
@Table(name = "consent_from")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ConsentFrom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "is_verified")
    private Boolean isVerified;

    @NotNull
    @Column(name = "verified_by", nullable = false)
    private String verifiedBy;

    @Column(name = "verified_time")
    private Instant verifiedTime;

    @ManyToOne
    @JsonIgnoreProperties("verifiers")
    private Consent consent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsVerified() {
        return isVerified;
    }

    public ConsentFrom isVerified(Boolean isVerified) {
        this.isVerified = isVerified;
        return this;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }

    public String getVerifiedBy() {
        return verifiedBy;
    }

    public ConsentFrom verifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
        return this;
    }

    public void setVerifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
    }

    public Instant getVerifiedTime() {
        return verifiedTime;
    }

    public ConsentFrom verifiedTime(Instant verifiedTime) {
        this.verifiedTime = verifiedTime;
        return this;
    }

    public void setVerifiedTime(Instant verifiedTime) {
        this.verifiedTime = verifiedTime;
    }

    public Consent getConsent() {
        return consent;
    }

    public ConsentFrom consent(Consent consent) {
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
        if (!(o instanceof ConsentFrom)) {
            return false;
        }
        return id != null && id.equals(((ConsentFrom) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ConsentFrom{" +
            "id=" + getId() +
            ", isVerified='" + isIsVerified() + "'" +
            ", verifiedBy='" + getVerifiedBy() + "'" +
            ", verifiedTime='" + getVerifiedTime() + "'" +
            "}";
    }
}
