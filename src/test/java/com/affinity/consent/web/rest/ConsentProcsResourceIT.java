package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.ConsentProcs;
import com.affinity.consent.repository.ConsentProcsRepository;
import com.affinity.consent.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.affinity.consent.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ConsentProcsResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class ConsentProcsResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ConsentProcsRepository consentProcsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restConsentProcsMockMvc;

    private ConsentProcs consentProcs;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConsentProcsResource consentProcsResource = new ConsentProcsResource(consentProcsRepository);
        this.restConsentProcsMockMvc = MockMvcBuilders.standaloneSetup(consentProcsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsentProcs createEntity(EntityManager em) {
        ConsentProcs consentProcs = new ConsentProcs()
            .description(DEFAULT_DESCRIPTION);
        return consentProcs;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsentProcs createUpdatedEntity(EntityManager em) {
        ConsentProcs consentProcs = new ConsentProcs()
            .description(UPDATED_DESCRIPTION);
        return consentProcs;
    }

    @BeforeEach
    public void initTest() {
        consentProcs = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsentProcs() throws Exception {
        int databaseSizeBeforeCreate = consentProcsRepository.findAll().size();

        // Create the ConsentProcs
        restConsentProcsMockMvc.perform(post("/api/consent-procs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consentProcs)))
            .andExpect(status().isCreated());

        // Validate the ConsentProcs in the database
        List<ConsentProcs> consentProcsList = consentProcsRepository.findAll();
        assertThat(consentProcsList).hasSize(databaseSizeBeforeCreate + 1);
        ConsentProcs testConsentProcs = consentProcsList.get(consentProcsList.size() - 1);
        assertThat(testConsentProcs.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createConsentProcsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consentProcsRepository.findAll().size();

        // Create the ConsentProcs with an existing ID
        consentProcs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsentProcsMockMvc.perform(post("/api/consent-procs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consentProcs)))
            .andExpect(status().isBadRequest());

        // Validate the ConsentProcs in the database
        List<ConsentProcs> consentProcsList = consentProcsRepository.findAll();
        assertThat(consentProcsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllConsentProcs() throws Exception {
        // Initialize the database
        consentProcsRepository.saveAndFlush(consentProcs);

        // Get all the consentProcsList
        restConsentProcsMockMvc.perform(get("/api/consent-procs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consentProcs.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getConsentProcs() throws Exception {
        // Initialize the database
        consentProcsRepository.saveAndFlush(consentProcs);

        // Get the consentProcs
        restConsentProcsMockMvc.perform(get("/api/consent-procs/{id}", consentProcs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(consentProcs.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingConsentProcs() throws Exception {
        // Get the consentProcs
        restConsentProcsMockMvc.perform(get("/api/consent-procs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsentProcs() throws Exception {
        // Initialize the database
        consentProcsRepository.saveAndFlush(consentProcs);

        int databaseSizeBeforeUpdate = consentProcsRepository.findAll().size();

        // Update the consentProcs
        ConsentProcs updatedConsentProcs = consentProcsRepository.findById(consentProcs.getId()).get();
        // Disconnect from session so that the updates on updatedConsentProcs are not directly saved in db
        em.detach(updatedConsentProcs);
        updatedConsentProcs
            .description(UPDATED_DESCRIPTION);

        restConsentProcsMockMvc.perform(put("/api/consent-procs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsentProcs)))
            .andExpect(status().isOk());

        // Validate the ConsentProcs in the database
        List<ConsentProcs> consentProcsList = consentProcsRepository.findAll();
        assertThat(consentProcsList).hasSize(databaseSizeBeforeUpdate);
        ConsentProcs testConsentProcs = consentProcsList.get(consentProcsList.size() - 1);
        assertThat(testConsentProcs.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingConsentProcs() throws Exception {
        int databaseSizeBeforeUpdate = consentProcsRepository.findAll().size();

        // Create the ConsentProcs

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsentProcsMockMvc.perform(put("/api/consent-procs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consentProcs)))
            .andExpect(status().isBadRequest());

        // Validate the ConsentProcs in the database
        List<ConsentProcs> consentProcsList = consentProcsRepository.findAll();
        assertThat(consentProcsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsentProcs() throws Exception {
        // Initialize the database
        consentProcsRepository.saveAndFlush(consentProcs);

        int databaseSizeBeforeDelete = consentProcsRepository.findAll().size();

        // Delete the consentProcs
        restConsentProcsMockMvc.perform(delete("/api/consent-procs/{id}", consentProcs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ConsentProcs> consentProcsList = consentProcsRepository.findAll();
        assertThat(consentProcsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
