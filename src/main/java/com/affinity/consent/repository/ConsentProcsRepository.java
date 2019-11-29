package com.affinity.consent.repository;
import com.affinity.consent.domain.ConsentProcs;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ConsentProcs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsentProcsRepository extends JpaRepository<ConsentProcs, Long> {

}
