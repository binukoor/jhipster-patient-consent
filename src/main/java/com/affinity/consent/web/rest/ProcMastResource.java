package com.affinity.consent.web.rest;

import com.affinity.consent.domain.ProcMast;
import com.affinity.consent.repository.ProcMastRepository;
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
 * REST controller for managing {@link com.affinity.consent.domain.ProcMast}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProcMastResource {

    private final Logger log = LoggerFactory.getLogger(ProcMastResource.class);

    private static final String ENTITY_NAME = "procMast";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProcMastRepository procMastRepository;

    public ProcMastResource(ProcMastRepository procMastRepository) {
        this.procMastRepository = procMastRepository;
    }

    /**
     * {@code POST  /proc-masts} : Create a new procMast.
     *
     * @param procMast the procMast to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new procMast, or with status {@code 400 (Bad Request)} if the procMast has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/proc-masts")
    public ResponseEntity<ProcMast> createProcMast(@RequestBody ProcMast procMast) throws URISyntaxException {
        log.debug("REST request to save ProcMast : {}", procMast);
        if (procMast.getId() != null) {
            throw new BadRequestAlertException("A new procMast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProcMast result = procMastRepository.save(procMast);
        return ResponseEntity.created(new URI("/api/proc-masts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /proc-masts} : Updates an existing procMast.
     *
     * @param procMast the procMast to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated procMast,
     * or with status {@code 400 (Bad Request)} if the procMast is not valid,
     * or with status {@code 500 (Internal Server Error)} if the procMast couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/proc-masts")
    public ResponseEntity<ProcMast> updateProcMast(@RequestBody ProcMast procMast) throws URISyntaxException {
        log.debug("REST request to update ProcMast : {}", procMast);
        if (procMast.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProcMast result = procMastRepository.save(procMast);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, procMast.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /proc-masts} : get all the procMasts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of procMasts in body.
     */
    @GetMapping("/proc-masts")
    public List<ProcMast> getAllProcMasts() {
        log.debug("REST request to get all ProcMasts");
        return procMastRepository.findAll();
    }

    /**
     * {@code GET  /proc-masts/:id} : get the "id" procMast.
     *
     * @param id the id of the procMast to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the procMast, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/proc-masts/{id}")
    public ResponseEntity<ProcMast> getProcMast(@PathVariable Long id) {
        log.debug("REST request to get ProcMast : {}", id);
        Optional<ProcMast> procMast = procMastRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(procMast);
    }

    /**
     * {@code DELETE  /proc-masts/:id} : delete the "id" procMast.
     *
     * @param id the id of the procMast to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/proc-masts/{id}")
    public ResponseEntity<Void> deleteProcMast(@PathVariable Long id) {
        log.debug("REST request to delete ProcMast : {}", id);
        procMastRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
