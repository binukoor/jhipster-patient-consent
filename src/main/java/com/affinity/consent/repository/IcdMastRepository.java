package com.affinity.consent.repository;
import com.affinity.consent.domain.IcdMast;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IcdMast entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IcdMastRepository extends JpaRepository<IcdMast, Long> {

}
