package com.affinity.consent.web.rest;

import com.affinity.consent.domain.EstMast;
import com.affinity.consent.repository.EstMastRepository;
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
 * REST controller for managing {@link com.affinity.consent.domain.EstMast}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EstMastResource {

    private final Logger log = LoggerFactory.getLogger(EstMastResource.class);

    private static final String ENTITY_NAME = "estMast";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstMastRepository estMastRepository;

    public EstMastResource(EstMastRepository estMastRepository) {
        this.estMastRepository = estMastRepository;
    }

    /**
     * {@code POST  /est-masts} : Create a new estMast.
     *
     * @param estMast the estMast to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estMast, or with status {@code 400 (Bad Request)} if the estMast has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/est-masts")
    public ResponseEntity<EstMast> createEstMast(@RequestBody EstMast estMast) throws URISyntaxException {
        log.debug("REST request to save EstMast : {}", estMast);
        if (estMast.getId() != null) {
            throw new BadRequestAlertException("A new estMast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstMast result = estMastRepository.save(estMast);
        return ResponseEntity.created(new URI("/api/est-masts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /est-masts} : Updates an existing estMast.
     *
     * @param estMast the estMast to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estMast,
     * or with status {@code 400 (Bad Request)} if the estMast is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estMast couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/est-masts")
    public ResponseEntity<EstMast> updateEstMast(@RequestBody EstMast estMast) throws URISyntaxException {
        log.debug("REST request to update EstMast : {}", estMast);
        if (estMast.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstMast result = estMastRepository.save(estMast);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, estMast.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /est-masts} : get all the estMasts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estMasts in body.
     */
    @GetMapping("/est-masts")
    public List<EstMast> getAllEstMasts() {
        log.debug("REST request to get all EstMasts");
        return estMastRepository.findAll();
    }

    /**
     * {@code GET  /est-masts/:id} : get the "id" estMast.
     *
     * @param id the id of the estMast to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estMast, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/est-masts/{id}")
    public ResponseEntity<EstMast> getEstMast(@PathVariable Long id) {
        log.debug("REST request to get EstMast : {}", id);
        Optional<EstMast> estMast = estMastRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(estMast);
    }

    /**
     * {@code DELETE  /est-masts/:id} : delete the "id" estMast.
     *
     * @param id the id of the estMast to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/est-masts/{id}")
    public ResponseEntity<Void> deleteEstMast(@PathVariable Long id) {
        log.debug("REST request to delete EstMast : {}", id);
        estMastRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
