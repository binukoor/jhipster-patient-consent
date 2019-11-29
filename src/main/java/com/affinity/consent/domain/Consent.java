package com.affinity.consent.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Consent.
 */
@Entity
@Table(name = "consent")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Consent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "consent_id", nullable = false)
    private Long consentId;

    @Column(name = "description")
    private String description;

    @Column(name = "indication_benefits")
    private String indicationBenefits;

    @Column(name = "complications")
    private String complications;

    @Column(name = "alternatives")
    private String alternatives;

    @OneToOne
    @JoinColumn(unique = true)
    private PatientBar patient;

    @OneToOne
    @JoinColumn(unique = true)
    private VisitBar visit;

    @OneToOne
    @JoinColumn(unique = true)
    private EstMast institute;

    @OneToOne
    @JoinColumn(unique = true)
    private StatusMast status;

    @OneToOne
    @JoinColumn(unique = true)
    private CategoryMast category;

    @OneToOne
    @JoinColumn(unique = true)
    private ScopeMast scope;

    @OneToOne
    @JoinColumn(unique = true)
    private PersonMast createdBy;

    @OneToMany(mappedBy = "consent")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ConsentProcs> procs = new HashSet<>();

    @OneToMany(mappedBy = "consent")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ConsentDiag> diags = new HashSet<>();

    @OneToMany(mappedBy = "consent")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ConsentFrom> verifiers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getConsentId() {
        return consentId;
    }

    public Consent consentId(Long consentId) {
        this.consentId = consentId;
        return this;
    }

    public void setConsentId(Long consentId) {
        this.consentId = consentId;
    }

    public String getDescription() {
        return description;
    }

    public Consent description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIndicationBenefits() {
        return indicationBenefits;
    }

    public Consent indicationBenefits(String indicationBenefits) {
        this.indicationBenefits = indicationBenefits;
        return this;
    }

    public void setIndicationBenefits(String indicationBenefits) {
        this.indicationBenefits = indicationBenefits;
    }

    public String getComplications() {
        return complications;
    }

    public Consent complications(String complications) {
        this.complications = complications;
        return this;
    }

    public void setComplications(String complications) {
        this.complications = complications;
    }

    public String getAlternatives() {
        return alternatives;
    }

    public Consent alternatives(String alternatives) {
        this.alternatives = alternatives;
        return this;
    }

    public void setAlternatives(String alternatives) {
        this.alternatives = alternatives;
    }

    public PatientBar getPatient() {
        return patient;
    }

    public Consent patient(PatientBar patientBar) {
        this.patient = patientBar;
        return this;
    }

    public void setPatient(PatientBar patientBar) {
        this.patient = patientBar;
    }

    public VisitBar getVisit() {
        return visit;
    }

    public Consent visit(VisitBar visitBar) {
        this.visit = visitBar;
        return this;
    }

    public void setVisit(VisitBar visitBar) {
        this.visit = visitBar;
    }

    public EstMast getInstitute() {
        return institute;
    }

    public Consent institute(EstMast estMast) {
        this.institute = estMast;
        return this;
    }

    public void setInstitute(EstMast estMast) {
        this.institute = estMast;
    }

    public StatusMast getStatus() {
        return status;
    }

    public Consent status(StatusMast statusMast) {
        this.status = statusMast;
        return this;
    }

    public void setStatus(StatusMast statusMast) {
        this.status = statusMast;
    }

    public CategoryMast getCategory() {
        return category;
    }

    public Consent category(CategoryMast categoryMast) {
        this.category = categoryMast;
        return this;
    }

    public void setCategory(CategoryMast categoryMast) {
        this.category = categoryMast;
    }

    public ScopeMast getScope() {
        return scope;
    }

    public Consent scope(ScopeMast scopeMast) {
        this.scope = scopeMast;
        return this;
    }

    public void setScope(ScopeMast scopeMast) {
        this.scope = scopeMast;
    }

    public PersonMast getCreatedBy() {
        return createdBy;
    }

    public Consent createdBy(PersonMast personMast) {
        this.createdBy = personMast;
        return this;
    }

    public void setCreatedBy(PersonMast personMast) {
        this.createdBy = personMast;
    }

    public Set<ConsentProcs> getProcs() {
        return procs;
    }

    public Consent procs(Set<ConsentProcs> consentProcs) {
        this.procs = consentProcs;
        return this;
    }

    public Consent addProcs(ConsentProcs consentProcs) {
        this.procs.add(consentProcs);
        consentProcs.setConsent(this);
        return this;
    }

    public Consent removeProcs(ConsentProcs consentProcs) {
        this.procs.remove(consentProcs);
        consentProcs.setConsent(null);
        return this;
    }

    public void setProcs(Set<ConsentProcs> consentProcs) {
        this.procs = consentProcs;
    }

    public Set<ConsentDiag> getDiags() {
        return diags;
    }

    public Consent diags(Set<ConsentDiag> consentDiags) {
        this.diags = consentDiags;
        return this;
    }

    public Consent addDiag(ConsentDiag consentDiag) {
        this.diags.add(consentDiag);
        consentDiag.setConsent(this);
        return this;
    }

    public Consent removeDiag(ConsentDiag consentDiag) {
        this.diags.remove(consentDiag);
        consentDiag.setConsent(null);
        return this;
    }

    public void setDiags(Set<ConsentDiag> consentDiags) {
        this.diags = consentDiags;
    }

    public Set<ConsentFrom> getVerifiers() {
        return verifiers;
    }

    public Consent verifiers(Set<ConsentFrom> consentFroms) {
        this.verifiers = consentFroms;
        return this;
    }

    public Consent addVerifiers(ConsentFrom consentFrom) {
        this.verifiers.add(consentFrom);
        consentFrom.setConsent(this);
        return this;
    }

    public Consent removeVerifiers(ConsentFrom consentFrom) {
        this.verifiers.remove(consentFrom);
        consentFrom.setConsent(null);
        return this;
    }

    public void setVerifiers(Set<ConsentFrom> consentFroms) {
        this.verifiers = consentFroms;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Consent)) {
            return false;
        }
        return id != null && id.equals(((Consent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Consent{" +
            "id=" + getId() +
            ", consentId=" + getConsentId() +
            ", description='" + getDescription() + "'" +
            ", indicationBenefits='" + getIndicationBenefits() + "'" +
            ", complications='" + getComplications() + "'" +
            ", alternatives='" + getAlternatives() + "'" +
            "}";
    }
}
