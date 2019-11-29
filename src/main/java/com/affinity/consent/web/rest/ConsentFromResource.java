package com.affinity.consent.web.rest;

import com.affinity.consent.domain.ConsentFrom;
import com.affinity.consent.repository.ConsentFromRepository;
import com.affinity.consent.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.affinity.consent.domain.ConsentFrom}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConsentFromResource {

    private final Logger log = LoggerFactory.getLogger(ConsentFromResource.class);

    private static final String ENTITY_NAME = "consentFrom";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsentFromRepository consentFromRepository;

    public ConsentFromResource(ConsentFromRepository consentFromRepository) {
        this.consentFromRepository = consentFromRepository;
    }

    /**
     * {@code POST  /consent-froms} : Create a new consentFrom.
     *
     * @param consentFrom the consentFrom to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consentFrom, or with status {@code 400 (Bad Request)} if the consentFrom has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consent-froms")
    public ResponseEntity<ConsentFrom> createConsentFrom(@Valid @RequestBody ConsentFrom consentFrom) throws URISyntaxException {
        log.debug("REST request to save ConsentFrom : {}", consentFrom);
        if (consentFrom.getId() != null) {
            throw new BadRequestAlertException("A new consentFrom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConsentFrom result = consentFromRepository.save(consentFrom);
        return ResponseEntity.created(new URI("/api/consent-froms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consent-froms} : Updates an existing consentFrom.
     *
     * @param consentFrom the consentFrom to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consentFrom,
     * or with status {@code 400 (Bad Request)} if the consentFrom is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consentFrom couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consent-froms")
    public ResponseEntity<ConsentFrom> updateConsentFrom(@Valid @RequestBody ConsentFrom consentFrom) throws URISyntaxException {
        log.debug("REST request to update ConsentFrom : {}", consentFrom);
        if (consentFrom.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ConsentFrom result = consentFromRepository.save(consentFrom);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consentFrom.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /consent-froms} : get all the consentFroms.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consentFroms in body.
     */
    @GetMapping("/consent-froms")
    public List<ConsentFrom> getAllConsentFroms() {
        log.debug("REST request to get all ConsentFroms");
        return consentFromRepository.findAll();
    }

    /**
     * {@code GET  /consent-froms/:id} : get the "id" consentFrom.
     *
     * @param id the id of the consentFrom to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consentFrom, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consent-froms/{id}")
    public ResponseEntity<ConsentFrom> getConsentFrom(@PathVariable Long id) {
        log.debug("REST request to get ConsentFrom : {}", id);
        Optional<ConsentFrom> consentFrom = consentFromRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consentFrom);
    }

    /**
     * {@code DELETE  /consent-froms/:id} : delete the "id" consentFrom.
     *
     * @param id the id of the consentFrom to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consent-froms/{id}")
    public ResponseEntity<Void> deleteConsentFrom(@PathVariable Long id) {
        log.debug("REST request to delete ConsentFrom : {}", id);
        consentFromRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
