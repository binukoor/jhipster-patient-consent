package com.affinity.consent.web.rest;

import com.affinity.consent.domain.StatusMast;
import com.affinity.consent.repository.StatusMastRepository;
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
 * REST controller for managing {@link com.affinity.consent.domain.StatusMast}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StatusMastResource {

    private final Logger log = LoggerFactory.getLogger(StatusMastResource.class);

    private static final String ENTITY_NAME = "statusMast";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StatusMastRepository statusMastRepository;

    public StatusMastResource(StatusMastRepository statusMastRepository) {
        this.statusMastRepository = statusMastRepository;
    }

    /**
     * {@code POST  /status-masts} : Create a new statusMast.
     *
     * @param statusMast the statusMast to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new statusMast, or with status {@code 400 (Bad Request)} if the statusMast has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/status-masts")
    public ResponseEntity<StatusMast> createStatusMast(@RequestBody StatusMast statusMast) throws URISyntaxException {
        log.debug("REST request to save StatusMast : {}", statusMast);
        if (statusMast.getId() != null) {
            throw new BadRequestAlertException("A new statusMast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StatusMast result = statusMastRepository.save(statusMast);
        return ResponseEntity.created(new URI("/api/status-masts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /status-masts} : Updates an existing statusMast.
     *
     * @param statusMast the statusMast to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated statusMast,
     * or with status {@code 400 (Bad Request)} if the statusMast is not valid,
     * or with status {@code 500 (Internal Server Error)} if the statusMast couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/status-masts")
    public ResponseEntity<StatusMast> updateStatusMast(@RequestBody StatusMast statusMast) throws URISyntaxException {
        log.debug("REST request to update StatusMast : {}", statusMast);
        if (statusMast.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StatusMast result = statusMastRepository.save(statusMast);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, statusMast.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /status-masts} : get all the statusMasts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of statusMasts in body.
     */
    @GetMapping("/status-masts")
    public List<StatusMast> getAllStatusMasts() {
        log.debug("REST request to get all StatusMasts");
        return statusMastRepository.findAll();
    }

    /**
     * {@code GET  /status-masts/:id} : get the "id" statusMast.
     *
     * @param id the id of the statusMast to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the statusMast, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/status-masts/{id}")
    public ResponseEntity<StatusMast> getStatusMast(@PathVariable Long id) {
        log.debug("REST request to get StatusMast : {}", id);
        Optional<StatusMast> statusMast = statusMastRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(statusMast);
    }

    /**
     * {@code DELETE  /status-masts/:id} : delete the "id" statusMast.
     *
     * @param id the id of the statusMast to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/status-masts/{id}")
    public ResponseEntity<Void> deleteStatusMast(@PathVariable Long id) {
        log.debug("REST request to delete StatusMast : {}", id);
        statusMastRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
