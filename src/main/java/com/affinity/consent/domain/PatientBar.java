package com.affinity.consent.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PatientBar.
 */
@Entity
@Table(name = "patient_bar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PatientBar implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "patient_id")
    private Long patientId;

    @Column(name = "patient_no")
    private String patientNo;

    @Column(name = "patient_name")
    private String patientName;

    @Column(name = "age")
    private String age;

    @Column(name = "gender")
    private String gender;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPatientId() {
        return patientId;
    }

    public PatientBar patientId(Long patientId) {
        this.patientId = patientId;
        return this;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getPatientNo() {
        return patientNo;
    }

    public PatientBar patientNo(String patientNo) {
        this.patientNo = patientNo;
        return this;
    }

    public void setPatientNo(String patientNo) {
        this.patientNo = patientNo;
    }

    public String getPatientName() {
        return patientName;
    }

    public PatientBar patientName(String patientName) {
        this.patientName = patientName;
        return this;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getAge() {
        return age;
    }

    public PatientBar age(String age) {
        this.age = age;
        return this;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public PatientBar gender(String gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PatientBar)) {
            return false;
        }
        return id != null && id.equals(((PatientBar) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PatientBar{" +
            "id=" + getId() +
            ", patientId=" + getPatientId() +
            ", patientNo='" + getPatientNo() + "'" +
            ", patientName='" + getPatientName() + "'" +
            ", age='" + getAge() + "'" +
            ", gender='" + getGender() + "'" +
            "}";
    }
}
