package com.affinity.consent.repository;
import com.affinity.consent.domain.CategoryMast;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CategoryMast entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoryMastRepository extends JpaRepository<CategoryMast, Long> {

}
