package com.affinity.consent.repository;
import com.affinity.consent.domain.ConsentFrom;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ConsentFrom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsentFromRepository extends JpaRepository<ConsentFrom, Long> {

}
