package com.affinity.consent.web.rest;

import com.affinity.consent.domain.ConsentProcs;
import com.affinity.consent.repository.ConsentProcsRepository;
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
 * REST controller for managing {@link com.affinity.consent.domain.ConsentProcs}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConsentProcsResource {

    private final Logger log = LoggerFactory.getLogger(ConsentProcsResource.class);

    private static final String ENTITY_NAME = "consentProcs";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsentProcsRepository consentProcsRepository;

    public ConsentProcsResource(ConsentProcsRepository consentProcsRepository) {
        this.consentProcsRepository = consentProcsRepository;
    }

    /**
     * {@code POST  /consent-procs} : Create a new consentProcs.
     *
     * @param consentProcs the consentProcs to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consentProcs, or with status {@code 400 (Bad Request)} if the consentProcs has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consent-procs")
    public ResponseEntity<ConsentProcs> createConsentProcs(@RequestBody ConsentProcs consentProcs) throws URISyntaxException {
        log.debug("REST request to save ConsentProcs : {}", consentProcs);
        if (consentProcs.getId() != null) {
            throw new BadRequestAlertException("A new consentProcs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConsentProcs result = consentProcsRepository.save(consentProcs);
        return ResponseEntity.created(new URI("/api/consent-procs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consent-procs} : Updates an existing consentProcs.
     *
     * @param consentProcs the consentProcs to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consentProcs,
     * or with status {@code 400 (Bad Request)} if the consentProcs is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consentProcs couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consent-procs")
    public ResponseEntity<ConsentProcs> updateConsentProcs(@RequestBody ConsentProcs consentProcs) throws URISyntaxException {
        log.debug("REST request to update ConsentProcs : {}", consentProcs);
        if (consentProcs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ConsentProcs result = consentProcsRepository.save(consentProcs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consentProcs.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /consent-procs} : get all the consentProcs.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consentProcs in body.
     */
    @GetMapping("/consent-procs")
    public List<ConsentProcs> getAllConsentProcs() {
        log.debug("REST request to get all ConsentProcs");
        return consentProcsRepository.findAll();
    }

    /**
     * {@code GET  /consent-procs/:id} : get the "id" consentProcs.
     *
     * @param id the id of the consentProcs to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consentProcs, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consent-procs/{id}")
    public ResponseEntity<ConsentProcs> getConsentProcs(@PathVariable Long id) {
        log.debug("REST request to get ConsentProcs : {}", id);
        Optional<ConsentProcs> consentProcs = consentProcsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consentProcs);
    }

    /**
     * {@code DELETE  /consent-procs/:id} : delete the "id" consentProcs.
     *
     * @param id the id of the consentProcs to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consent-procs/{id}")
    public ResponseEntity<Void> deleteConsentProcs(@PathVariable Long id) {
        log.debug("REST request to delete ConsentProcs : {}", id);
        consentProcsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
