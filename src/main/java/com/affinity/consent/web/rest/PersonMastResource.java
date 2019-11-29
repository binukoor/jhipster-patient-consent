package com.affinity.consent.web.rest;

import com.affinity.consent.domain.PersonMast;
import com.affinity.consent.repository.PersonMastRepository;
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
 * REST controller for managing {@link com.affinity.consent.domain.PersonMast}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PersonMastResource {

    private final Logger log = LoggerFactory.getLogger(PersonMastResource.class);

    private static final String ENTITY_NAME = "personMast";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PersonMastRepository personMastRepository;

    public PersonMastResource(PersonMastRepository personMastRepository) {
        this.personMastRepository = personMastRepository;
    }

    /**
     * {@code POST  /person-masts} : Create a new personMast.
     *
     * @param personMast the personMast to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new personMast, or with status {@code 400 (Bad Request)} if the personMast has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/person-masts")
    public ResponseEntity<PersonMast> createPersonMast(@RequestBody PersonMast personMast) throws URISyntaxException {
        log.debug("REST request to save PersonMast : {}", personMast);
        if (personMast.getId() != null) {
            throw new BadRequestAlertException("A new personMast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PersonMast result = personMastRepository.save(personMast);
        return ResponseEntity.created(new URI("/api/person-masts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /person-masts} : Updates an existing personMast.
     *
     * @param personMast the personMast to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personMast,
     * or with status {@code 400 (Bad Request)} if the personMast is not valid,
     * or with status {@code 500 (Internal Server Error)} if the personMast couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/person-masts")
    public ResponseEntity<PersonMast> updatePersonMast(@RequestBody PersonMast personMast) throws URISyntaxException {
        log.debug("REST request to update PersonMast : {}", personMast);
        if (personMast.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PersonMast result = personMastRepository.save(personMast);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, personMast.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /person-masts} : get all the personMasts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of personMasts in body.
     */
    @GetMapping("/person-masts")
    public List<PersonMast> getAllPersonMasts() {
        log.debug("REST request to get all PersonMasts");
        return personMastRepository.findAll();
    }

    /**
     * {@code GET  /person-masts/:id} : get the "id" personMast.
     *
     * @param id the id of the personMast to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the personMast, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/person-masts/{id}")
    public ResponseEntity<PersonMast> getPersonMast(@PathVariable Long id) {
        log.debug("REST request to get PersonMast : {}", id);
        Optional<PersonMast> personMast = personMastRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(personMast);
    }

    /**
     * {@code DELETE  /person-masts/:id} : delete the "id" personMast.
     *
     * @param id the id of the personMast to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/person-masts/{id}")
    public ResponseEntity<Void> deletePersonMast(@PathVariable Long id) {
        log.debug("REST request to delete PersonMast : {}", id);
        personMastRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
