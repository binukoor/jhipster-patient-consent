package com.affinity.consent.repository;
import com.affinity.consent.domain.PatientBar;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PatientBar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PatientBarRepository extends JpaRepository<PatientBar, Long> {

}
