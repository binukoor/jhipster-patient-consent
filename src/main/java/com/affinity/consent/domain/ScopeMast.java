package com.affinity.consent.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ScopeMast.
 */
@Entity
@Table(name = "scope_mast")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ScopeMast implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "scope_code")
    private Integer scopeCode;

    @Column(name = "jhi_scope")
    private String scope;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScopeCode() {
        return scopeCode;
    }

    public ScopeMast scopeCode(Integer scopeCode) {
        this.scopeCode = scopeCode;
        return this;
    }

    public void setScopeCode(Integer scopeCode) {
        this.scopeCode = scopeCode;
    }

    public String getScope() {
        return scope;
    }

    public ScopeMast scope(String scope) {
        this.scope = scope;
        return this;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ScopeMast)) {
            return false;
        }
        return id != null && id.equals(((ScopeMast) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ScopeMast{" +
            "id=" + getId() +
            ", scopeCode=" + getScopeCode() +
            ", scope='" + getScope() + "'" +
            "}";
    }
}
