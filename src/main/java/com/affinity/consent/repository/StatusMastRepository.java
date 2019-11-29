package com.affinity.consent.repository;
import com.affinity.consent.domain.StatusMast;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StatusMast entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatusMastRepository extends JpaRepository<StatusMast, Long> {

}
