package com.affinity.consent.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A VisitBar.
 */
@Entity
@Table(name = "visit_bar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class VisitBar implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "visit_id")
    private Long visitId;

    @Column(name = "visit_type")
    private String visitType;

    @Column(name = "visit_time")
    private Instant visitTime;

    @Column(name = "seen_time")
    private Instant seenTime;

    @Column(name = "dept_code")
    private Integer deptCode;

    @Column(name = "dept_name")
    private String deptName;

    @Column(name = "clinic_code")
    private Integer clinicCode;

    @Column(name = "clinic_name")
    private String clinicName;

    @Column(name = "consultant_code")
    private Integer consultantCode;

    @Column(name = "consultant_name")
    private String consultantName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVisitId() {
        return visitId;
    }

    public VisitBar visitId(Long visitId) {
        this.visitId = visitId;
        return this;
    }

    public void setVisitId(Long visitId) {
        this.visitId = visitId;
    }

    public String getVisitType() {
        return visitType;
    }

    public VisitBar visitType(String visitType) {
        this.visitType = visitType;
        return this;
    }

    public void setVisitType(String visitType) {
        this.visitType = visitType;
    }

    public Instant getVisitTime() {
        return visitTime;
    }

    public VisitBar visitTime(Instant visitTime) {
        this.visitTime = visitTime;
        return this;
    }

    public void setVisitTime(Instant visitTime) {
        this.visitTime = visitTime;
    }

    public Instant getSeenTime() {
        return seenTime;
    }

    public VisitBar seenTime(Instant seenTime) {
        this.seenTime = seenTime;
        return this;
    }

    public void setSeenTime(Instant seenTime) {
        this.seenTime = seenTime;
    }

    public Integer getDeptCode() {
        return deptCode;
    }

    public VisitBar deptCode(Integer deptCode) {
        this.deptCode = deptCode;
        return this;
    }

    public void setDeptCode(Integer deptCode) {
        this.deptCode = deptCode;
    }

    public String getDeptName() {
        return deptName;
    }

    public VisitBar deptName(String deptName) {
        this.deptName = deptName;
        return this;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public Integer getClinicCode() {
        return clinicCode;
    }

    public VisitBar clinicCode(Integer clinicCode) {
        this.clinicCode = clinicCode;
        return this;
    }

    public void setClinicCode(Integer clinicCode) {
        this.clinicCode = clinicCode;
    }

    public String getClinicName() {
        return clinicName;
    }

    public VisitBar clinicName(String clinicName) {
        this.clinicName = clinicName;
        return this;
    }

    public void setClinicName(String clinicName) {
        this.clinicName = clinicName;
    }

    public Integer getConsultantCode() {
        return consultantCode;
    }

    public VisitBar consultantCode(Integer consultantCode) {
        this.consultantCode = consultantCode;
        return this;
    }

    public void setConsultantCode(Integer consultantCode) {
        this.consultantCode = consultantCode;
    }

    public String getConsultantName() {
        return consultantName;
    }

    public VisitBar consultantName(String consultantName) {
        this.consultantName = consultantName;
        return this;
    }

    public void setConsultantName(String consultantName) {
        this.consultantName = consultantName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VisitBar)) {
            return false;
        }
        return id != null && id.equals(((VisitBar) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "VisitBar{" +
            "id=" + getId() +
            ", visitId=" + getVisitId() +
            ", visitType='" + getVisitType() + "'" +
            ", visitTime='" + getVisitTime() + "'" +
            ", seenTime='" + getSeenTime() + "'" +
            ", deptCode=" + getDeptCode() +
            ", deptName='" + getDeptName() + "'" +
            ", clinicCode=" + getClinicCode() +
            ", clinicName='" + getClinicName() + "'" +
            ", consultantCode=" + getConsultantCode() +
            ", consultantName='" + getConsultantName() + "'" +
            "}";
    }
}
