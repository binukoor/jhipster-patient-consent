package com.affinity.consent.web.rest;

import com.affinity.consent.domain.IcdMast;
import com.affinity.consent.repository.IcdMastRepository;
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
 * REST controller for managing {@link com.affinity.consent.domain.IcdMast}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IcdMastResource {

    private final Logger log = LoggerFactory.getLogger(IcdMastResource.class);

    private static final String ENTITY_NAME = "icdMast";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IcdMastRepository icdMastRepository;

    public IcdMastResource(IcdMastRepository icdMastRepository) {
        this.icdMastRepository = icdMastRepository;
    }

    /**
     * {@code POST  /icd-masts} : Create a new icdMast.
     *
     * @param icdMast the icdMast to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new icdMast, or with status {@code 400 (Bad Request)} if the icdMast has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/icd-masts")
    public ResponseEntity<IcdMast> createIcdMast(@RequestBody IcdMast icdMast) throws URISyntaxException {
        log.debug("REST request to save IcdMast : {}", icdMast);
        if (icdMast.getId() != null) {
            throw new BadRequestAlertException("A new icdMast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IcdMast result = icdMastRepository.save(icdMast);
        return ResponseEntity.created(new URI("/api/icd-masts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /icd-masts} : Updates an existing icdMast.
     *
     * @param icdMast the icdMast to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated icdMast,
     * or with status {@code 400 (Bad Request)} if the icdMast is not valid,
     * or with status {@code 500 (Internal Server Error)} if the icdMast couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/icd-masts")
    public ResponseEntity<IcdMast> updateIcdMast(@RequestBody IcdMast icdMast) throws URISyntaxException {
        log.debug("REST request to update IcdMast : {}", icdMast);
        if (icdMast.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IcdMast result = icdMastRepository.save(icdMast);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, icdMast.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /icd-masts} : get all the icdMasts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of icdMasts in body.
     */
    @GetMapping("/icd-masts")
    public List<IcdMast> getAllIcdMasts() {
        log.debug("REST request to get all IcdMasts");
        return icdMastRepository.findAll();
    }

    /**
     * {@code GET  /icd-masts/:id} : get the "id" icdMast.
     *
     * @param id the id of the icdMast to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the icdMast, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/icd-masts/{id}")
    public ResponseEntity<IcdMast> getIcdMast(@PathVariable Long id) {
        log.debug("REST request to get IcdMast : {}", id);
        Optional<IcdMast> icdMast = icdMastRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(icdMast);
    }

    /**
     * {@code DELETE  /icd-masts/:id} : delete the "id" icdMast.
     *
     * @param id the id of the icdMast to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/icd-masts/{id}")
    public ResponseEntity<Void> deleteIcdMast(@PathVariable Long id) {
        log.debug("REST request to delete IcdMast : {}", id);
        icdMastRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
