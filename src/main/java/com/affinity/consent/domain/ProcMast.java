package com.affinity.consent.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ProcMast.
 */
@Entity
@Table(name = "proc_mast")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProcMast implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "proc_code")
    private Integer procCode;

    @Column(name = "proc_name")
    private String procName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getProcCode() {
        return procCode;
    }

    public ProcMast procCode(Integer procCode) {
        this.procCode = procCode;
        return this;
    }

    public void setProcCode(Integer procCode) {
        this.procCode = procCode;
    }

    public String getProcName() {
        return procName;
    }

    public ProcMast procName(String procName) {
        this.procName = procName;
        return this;
    }

    public void setProcName(String procName) {
        this.procName = procName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProcMast)) {
            return false;
        }
        return id != null && id.equals(((ProcMast) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProcMast{" +
            "id=" + getId() +
            ", procCode=" + getProcCode() +
            ", procName='" + getProcName() + "'" +
            "}";
    }
}
