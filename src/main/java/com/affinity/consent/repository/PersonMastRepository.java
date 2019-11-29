package com.affinity.consent.repository;
import com.affinity.consent.domain.PersonMast;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PersonMast entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonMastRepository extends JpaRepository<PersonMast, Long> {

}
