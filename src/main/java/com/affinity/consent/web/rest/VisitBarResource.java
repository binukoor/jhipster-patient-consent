package com.affinity.consent.web.rest;

import com.affinity.consent.domain.VisitBar;
import com.affinity.consent.repository.VisitBarRepository;
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
 * REST controller for managing {@link com.affinity.consent.domain.VisitBar}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VisitBarResource {

    private final Logger log = LoggerFactory.getLogger(VisitBarResource.class);

    private static final String ENTITY_NAME = "visitBar";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VisitBarRepository visitBarRepository;

    public VisitBarResource(VisitBarRepository visitBarRepository) {
        this.visitBarRepository = visitBarRepository;
    }

    /**
     * {@code POST  /visit-bars} : Create a new visitBar.
     *
     * @param visitBar the visitBar to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new visitBar, or with status {@code 400 (Bad Request)} if the visitBar has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/visit-bars")
    public ResponseEntity<VisitBar> createVisitBar(@RequestBody VisitBar visitBar) throws URISyntaxException {
        log.debug("REST request to save VisitBar : {}", visitBar);
        if (visitBar.getId() != null) {
            throw new BadRequestAlertException("A new visitBar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VisitBar result = visitBarRepository.save(visitBar);
        return ResponseEntity.created(new URI("/api/visit-bars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /visit-bars} : Updates an existing visitBar.
     *
     * @param visitBar the visitBar to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated visitBar,
     * or with status {@code 400 (Bad Request)} if the visitBar is not valid,
     * or with status {@code 500 (Internal Server Error)} if the visitBar couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/visit-bars")
    public ResponseEntity<VisitBar> updateVisitBar(@RequestBody VisitBar visitBar) throws URISyntaxException {
        log.debug("REST request to update VisitBar : {}", visitBar);
        if (visitBar.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VisitBar result = visitBarRepository.save(visitBar);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, visitBar.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /visit-bars} : get all the visitBars.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of visitBars in body.
     */
    @GetMapping("/visit-bars")
    public List<VisitBar> getAllVisitBars() {
        log.debug("REST request to get all VisitBars");
        return visitBarRepository.findAll();
    }

    /**
     * {@code GET  /visit-bars/:id} : get the "id" visitBar.
     *
     * @param id the id of the visitBar to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the visitBar, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/visit-bars/{id}")
    public ResponseEntity<VisitBar> getVisitBar(@PathVariable Long id) {
        log.debug("REST request to get VisitBar : {}", id);
        Optional<VisitBar> visitBar = visitBarRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(visitBar);
    }

    /**
     * {@code DELETE  /visit-bars/:id} : delete the "id" visitBar.
     *
     * @param id the id of the visitBar to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/visit-bars/{id}")
    public ResponseEntity<Void> deleteVisitBar(@PathVariable Long id) {
        log.debug("REST request to delete VisitBar : {}", id);
        visitBarRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
