package com.affinity.consent.web.rest;

import com.affinity.consent.domain.PatientBar;
import com.affinity.consent.repository.PatientBarRepository;
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
 * REST controller for managing {@link com.affinity.consent.domain.PatientBar}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PatientBarResource {

    private final Logger log = LoggerFactory.getLogger(PatientBarResource.class);

    private static final String ENTITY_NAME = "patientBar";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PatientBarRepository patientBarRepository;

    public PatientBarResource(PatientBarRepository patientBarRepository) {
        this.patientBarRepository = patientBarRepository;
    }

    /**
     * {@code POST  /patient-bars} : Create a new patientBar.
     *
     * @param patientBar the patientBar to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new patientBar, or with status {@code 400 (Bad Request)} if the patientBar has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/patient-bars")
    public ResponseEntity<PatientBar> createPatientBar(@RequestBody PatientBar patientBar) throws URISyntaxException {
        log.debug("REST request to save PatientBar : {}", patientBar);
        if (patientBar.getId() != null) {
            throw new BadRequestAlertException("A new patientBar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PatientBar result = patientBarRepository.save(patientBar);
        return ResponseEntity.created(new URI("/api/patient-bars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /patient-bars} : Updates an existing patientBar.
     *
     * @param patientBar the patientBar to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated patientBar,
     * or with status {@code 400 (Bad Request)} if the patientBar is not valid,
     * or with status {@code 500 (Internal Server Error)} if the patientBar couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/patient-bars")
    public ResponseEntity<PatientBar> updatePatientBar(@RequestBody PatientBar patientBar) throws URISyntaxException {
        log.debug("REST request to update PatientBar : {}", patientBar);
        if (patientBar.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PatientBar result = patientBarRepository.save(patientBar);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, patientBar.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /patient-bars} : get all the patientBars.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of patientBars in body.
     */
    @GetMapping("/patient-bars")
    public List<PatientBar> getAllPatientBars() {
        log.debug("REST request to get all PatientBars");
        return patientBarRepository.findAll();
    }

    /**
     * {@code GET  /patient-bars/:id} : get the "id" patientBar.
     *
     * @param id the id of the patientBar to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the patientBar, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/patient-bars/{id}")
    public ResponseEntity<PatientBar> getPatientBar(@PathVariable Long id) {
        log.debug("REST request to get PatientBar : {}", id);
        Optional<PatientBar> patientBar = patientBarRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(patientBar);
    }

    /**
     * {@code DELETE  /patient-bars/:id} : delete the "id" patientBar.
     *
     * @param id the id of the patientBar to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/patient-bars/{id}")
    public ResponseEntity<Void> deletePatientBar(@PathVariable Long id) {
        log.debug("REST request to delete PatientBar : {}", id);
        patientBarRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
