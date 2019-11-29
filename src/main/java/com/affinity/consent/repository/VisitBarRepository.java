package com.affinity.consent.repository;
import com.affinity.consent.domain.VisitBar;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VisitBar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisitBarRepository extends JpaRepository<VisitBar, Long> {

}
