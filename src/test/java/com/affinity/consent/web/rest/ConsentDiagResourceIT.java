package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.ConsentDiag;
import com.affinity.consent.repository.ConsentDiagRepository;
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
 * Integration tests for the {@link ConsentDiagResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class ConsentDiagResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ConsentDiagRepository consentDiagRepository;

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

    private MockMvc restConsentDiagMockMvc;

    private ConsentDiag consentDiag;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConsentDiagResource consentDiagResource = new ConsentDiagResource(consentDiagRepository);
        this.restConsentDiagMockMvc = MockMvcBuilders.standaloneSetup(consentDiagResource)
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
    public static ConsentDiag createEntity(EntityManager em) {
        ConsentDiag consentDiag = new ConsentDiag()
            .description(DEFAULT_DESCRIPTION);
        return consentDiag;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsentDiag createUpdatedEntity(EntityManager em) {
        ConsentDiag consentDiag = new ConsentDiag()
            .description(UPDATED_DESCRIPTION);
        return consentDiag;
    }

    @BeforeEach
    public void initTest() {
        consentDiag = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsentDiag() throws Exception {
        int databaseSizeBeforeCreate = consentDiagRepository.findAll().size();

        // Create the ConsentDiag
        restConsentDiagMockMvc.perform(post("/api/consent-diags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consentDiag)))
            .andExpect(status().isCreated());

        // Validate the ConsentDiag in the database
        List<ConsentDiag> consentDiagList = consentDiagRepository.findAll();
        assertThat(consentDiagList).hasSize(databaseSizeBeforeCreate + 1);
        ConsentDiag testConsentDiag = consentDiagList.get(consentDiagList.size() - 1);
        assertThat(testConsentDiag.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createConsentDiagWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consentDiagRepository.findAll().size();

        // Create the ConsentDiag with an existing ID
        consentDiag.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsentDiagMockMvc.perform(post("/api/consent-diags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consentDiag)))
            .andExpect(status().isBadRequest());

        // Validate the ConsentDiag in the database
        List<ConsentDiag> consentDiagList = consentDiagRepository.findAll();
        assertThat(consentDiagList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllConsentDiags() throws Exception {
        // Initialize the database
        consentDiagRepository.saveAndFlush(consentDiag);

        // Get all the consentDiagList
        restConsentDiagMockMvc.perform(get("/api/consent-diags?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consentDiag.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getConsentDiag() throws Exception {
        // Initialize the database
        consentDiagRepository.saveAndFlush(consentDiag);

        // Get the consentDiag
        restConsentDiagMockMvc.perform(get("/api/consent-diags/{id}", consentDiag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(consentDiag.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingConsentDiag() throws Exception {
        // Get the consentDiag
        restConsentDiagMockMvc.perform(get("/api/consent-diags/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsentDiag() throws Exception {
        // Initialize the database
        consentDiagRepository.saveAndFlush(consentDiag);

        int databaseSizeBeforeUpdate = consentDiagRepository.findAll().size();

        // Update the consentDiag
        ConsentDiag updatedConsentDiag = consentDiagRepository.findById(consentDiag.getId()).get();
        // Disconnect from session so that the updates on updatedConsentDiag are not directly saved in db
        em.detach(updatedConsentDiag);
        updatedConsentDiag
            .description(UPDATED_DESCRIPTION);

        restConsentDiagMockMvc.perform(put("/api/consent-diags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsentDiag)))
            .andExpect(status().isOk());

        // Validate the ConsentDiag in the database
        List<ConsentDiag> consentDiagList = consentDiagRepository.findAll();
        assertThat(consentDiagList).hasSize(databaseSizeBeforeUpdate);
        ConsentDiag testConsentDiag = consentDiagList.get(consentDiagList.size() - 1);
        assertThat(testConsentDiag.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingConsentDiag() throws Exception {
        int databaseSizeBeforeUpdate = consentDiagRepository.findAll().size();

        // Create the ConsentDiag

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsentDiagMockMvc.perform(put("/api/consent-diags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consentDiag)))
            .andExpect(status().isBadRequest());

        // Validate the ConsentDiag in the database
        List<ConsentDiag> consentDiagList = consentDiagRepository.findAll();
        assertThat(consentDiagList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsentDiag() throws Exception {
        // Initialize the database
        consentDiagRepository.saveAndFlush(consentDiag);

        int databaseSizeBeforeDelete = consentDiagRepository.findAll().size();

        // Delete the consentDiag
        restConsentDiagMockMvc.perform(delete("/api/consent-diags/{id}", consentDiag.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ConsentDiag> consentDiagList = consentDiagRepository.findAll();
        assertThat(consentDiagList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
