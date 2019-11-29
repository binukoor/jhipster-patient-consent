package com.affinity.consent.web.rest;

import com.affinity.consent.domain.ScopeMast;
import com.affinity.consent.repository.ScopeMastRepository;
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
 * REST controller for managing {@link com.affinity.consent.domain.ScopeMast}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ScopeMastResource {

    private final Logger log = LoggerFactory.getLogger(ScopeMastResource.class);

    private static final String ENTITY_NAME = "scopeMast";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ScopeMastRepository scopeMastRepository;

    public ScopeMastResource(ScopeMastRepository scopeMastRepository) {
        this.scopeMastRepository = scopeMastRepository;
    }

    /**
     * {@code POST  /scope-masts} : Create a new scopeMast.
     *
     * @param scopeMast the scopeMast to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new scopeMast, or with status {@code 400 (Bad Request)} if the scopeMast has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/scope-masts")
    public ResponseEntity<ScopeMast> createScopeMast(@RequestBody ScopeMast scopeMast) throws URISyntaxException {
        log.debug("REST request to save ScopeMast : {}", scopeMast);
        if (scopeMast.getId() != null) {
            throw new BadRequestAlertException("A new scopeMast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ScopeMast result = scopeMastRepository.save(scopeMast);
        return ResponseEntity.created(new URI("/api/scope-masts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /scope-masts} : Updates an existing scopeMast.
     *
     * @param scopeMast the scopeMast to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated scopeMast,
     * or with status {@code 400 (Bad Request)} if the scopeMast is not valid,
     * or with status {@code 500 (Internal Server Error)} if the scopeMast couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/scope-masts")
    public ResponseEntity<ScopeMast> updateScopeMast(@RequestBody ScopeMast scopeMast) throws URISyntaxException {
        log.debug("REST request to update ScopeMast : {}", scopeMast);
        if (scopeMast.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ScopeMast result = scopeMastRepository.save(scopeMast);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, scopeMast.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /scope-masts} : get all the scopeMasts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of scopeMasts in body.
     */
    @GetMapping("/scope-masts")
    public List<ScopeMast> getAllScopeMasts() {
        log.debug("REST request to get all ScopeMasts");
        return scopeMastRepository.findAll();
    }

    /**
     * {@code GET  /scope-masts/:id} : get the "id" scopeMast.
     *
     * @param id the id of the scopeMast to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the scopeMast, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/scope-masts/{id}")
    public ResponseEntity<ScopeMast> getScopeMast(@PathVariable Long id) {
        log.debug("REST request to get ScopeMast : {}", id);
        Optional<ScopeMast> scopeMast = scopeMastRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(scopeMast);
    }

    /**
     * {@code DELETE  /scope-masts/:id} : delete the "id" scopeMast.
     *
     * @param id the id of the scopeMast to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/scope-masts/{id}")
    public ResponseEntity<Void> deleteScopeMast(@PathVariable Long id) {
        log.debug("REST request to delete ScopeMast : {}", id);
        scopeMastRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
