package com.affinity.consent.repository;
import com.affinity.consent.domain.ProcMast;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProcMast entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProcMastRepository extends JpaRepository<ProcMast, Long> {

}
