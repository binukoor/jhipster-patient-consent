package com.affinity.consent.repository;
import com.affinity.consent.domain.ScopeMast;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ScopeMast entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ScopeMastRepository extends JpaRepository<ScopeMast, Long> {

}
