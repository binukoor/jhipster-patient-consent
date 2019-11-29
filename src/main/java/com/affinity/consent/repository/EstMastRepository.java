package com.affinity.consent.repository;
import com.affinity.consent.domain.EstMast;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstMast entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstMastRepository extends JpaRepository<EstMast, Long> {

}
