package com.affinity.consent.web.rest;

import com.affinity.consent.domain.CategoryMast;
import com.affinity.consent.repository.CategoryMastRepository;
import com.affinity.consent.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.affinity.consent.domain.CategoryMast}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CategoryMastResource {

    private final Logger log = LoggerFactory.getLogger(CategoryMastResource.class);

    private static final String ENTITY_NAME = "categoryMast";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CategoryMastRepository categoryMastRepository;

    public CategoryMastResource(CategoryMastRepository categoryMastRepository) {
        this.categoryMastRepository = categoryMastRepository;
    }

    /**
     * {@code POST  /category-masts} : Create a new categoryMast.
     *
     * @param categoryMast the categoryMast to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new categoryMast, or with status {@code 400 (Bad Request)} if the categoryMast has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/category-masts")
    public ResponseEntity<CategoryMast> createCategoryMast(@RequestBody CategoryMast categoryMast) throws URISyntaxException {
        log.debug("REST request to save CategoryMast : {}", categoryMast);
        if (categoryMast.getId() != null) {
            throw new BadRequestAlertException("A new categoryMast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CategoryMast result = categoryMastRepository.save(categoryMast);
        return ResponseEntity.created(new URI("/api/category-masts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /category-masts} : Updates an existing categoryMast.
     *
     * @param categoryMast the categoryMast to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated categoryMast,
     * or with status {@code 400 (Bad Request)} if the categoryMast is not valid,
     * or with status {@code 500 (Internal Server Error)} if the categoryMast couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/category-masts")
    public ResponseEntity<CategoryMast> updateCategoryMast(@RequestBody CategoryMast categoryMast) throws URISyntaxException {
        log.debug("REST request to update CategoryMast : {}", categoryMast);
        if (categoryMast.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CategoryMast result = categoryMastRepository.save(categoryMast);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, categoryMast.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /category-masts} : get all the categoryMasts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of categoryMasts in body.
     */
    @GetMapping("/category-masts")
    public List<CategoryMast> getAllCategoryMasts() {
        log.debug("REST request to get all CategoryMasts");
        return categoryMastRepository.findAll();
    }

    /**
     * {@code GET  /category-masts/:id} : get the "id" categoryMast.
     *
     * @param id the id of the categoryMast to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the categoryMast, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/category-masts/{id}")
    public ResponseEntity<CategoryMast> getCategoryMast(@PathVariable Long id) {
        log.debug("REST request to get CategoryMast : {}", id);
        Optional<CategoryMast> categoryMast = categoryMastRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(categoryMast);
    }

    /**
     * {@code DELETE  /category-masts/:id} : delete the "id" categoryMast.
     *
     * @param id the id of the categoryMast to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/category-masts/{id}")
    public ResponseEntity<Void> deleteCategoryMast(@PathVariable Long id) {
        log.debug("REST request to delete CategoryMast : {}", id);
        categoryMastRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
