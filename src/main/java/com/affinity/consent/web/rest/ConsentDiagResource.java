package com.affinity.consent.web.rest;

import com.affinity.consent.domain.ConsentDiag;
import com.affinity.consent.repository.ConsentDiagRepository;
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
 * REST controller for managing {@link com.affinity.consent.domain.ConsentDiag}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConsentDiagResource {

    private final Logger log = LoggerFactory.getLogger(ConsentDiagResource.class);

    private static final String ENTITY_NAME = "consentDiag";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsentDiagRepository consentDiagRepository;

    public ConsentDiagResource(ConsentDiagRepository consentDiagRepository) {
        this.consentDiagRepository = consentDiagRepository;
    }

    /**
     * {@code POST  /consent-diags} : Create a new consentDiag.
     *
     * @param consentDiag the consentDiag to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consentDiag, or with status {@code 400 (Bad Request)} if the consentDiag has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consent-diags")
    public ResponseEntity<ConsentDiag> createConsentDiag(@RequestBody ConsentDiag consentDiag) throws URISyntaxException {
        log.debug("REST request to save ConsentDiag : {}", consentDiag);
        if (consentDiag.getId() != null) {
            throw new BadRequestAlertException("A new consentDiag cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConsentDiag result = consentDiagRepository.save(consentDiag);
        return ResponseEntity.created(new URI("/api/consent-diags/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consent-diags} : Updates an existing consentDiag.
     *
     * @param consentDiag the consentDiag to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consentDiag,
     * or with status {@code 400 (Bad Request)} if the consentDiag is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consentDiag couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consent-diags")
    public ResponseEntity<ConsentDiag> updateConsentDiag(@RequestBody ConsentDiag consentDiag) throws URISyntaxException {
        log.debug("REST request to update ConsentDiag : {}", consentDiag);
        if (consentDiag.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ConsentDiag result = consentDiagRepository.save(consentDiag);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consentDiag.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /consent-diags} : get all the consentDiags.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consentDiags in body.
     */
    @GetMapping("/consent-diags")
    public List<ConsentDiag> getAllConsentDiags() {
        log.debug("REST request to get all ConsentDiags");
        return consentDiagRepository.findAll();
    }

    /**
     * {@code GET  /consent-diags/:id} : get the "id" consentDiag.
     *
     * @param id the id of the consentDiag to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consentDiag, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consent-diags/{id}")
    public ResponseEntity<ConsentDiag> getConsentDiag(@PathVariable Long id) {
        log.debug("REST request to get ConsentDiag : {}", id);
        Optional<ConsentDiag> consentDiag = consentDiagRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consentDiag);
    }

    /**
     * {@code DELETE  /consent-diags/:id} : delete the "id" consentDiag.
     *
     * @param id the id of the consentDiag to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consent-diags/{id}")
    public ResponseEntity<Void> deleteConsentDiag(@PathVariable Long id) {
        log.debug("REST request to delete ConsentDiag : {}", id);
        consentDiagRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
