package com.affinity.consent.repository;
import com.affinity.consent.domain.ConsentDiag;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ConsentDiag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsentDiagRepository extends JpaRepository<ConsentDiag, Long> {

}
