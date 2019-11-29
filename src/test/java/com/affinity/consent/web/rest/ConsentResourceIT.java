package com.affinity.consent.web.rest;

import com.affinity.consent.PatientConsentApp;
import com.affinity.consent.domain.Consent;
import com.affinity.consent.repository.ConsentRepository;
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
 * Integration tests for the {@link ConsentResource} REST controller.
 */
@SpringBootTest(classes = PatientConsentApp.class)
public class ConsentResourceIT {

    private static final Long DEFAULT_CONSENT_ID = 1L;
    private static final Long UPDATED_CONSENT_ID = 2L;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_INDICATION_BENEFITS = "AAAAAAAAAA";
    private static final String UPDATED_INDICATION_BENEFITS = "BBBBBBBBBB";

    private static final String DEFAULT_COMPLICATIONS = "AAAAAAAAAA";
    private static final String UPDATED_COMPLICATIONS = "BBBBBBBBBB";

    private static final String DEFAULT_ALTERNATIVES = "AAAAAAAAAA";
    private static final String UPDATED_ALTERNATIVES = "BBBBBBBBBB";

    @Autowired
    private ConsentRepository consentRepository;

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

    private MockMvc restConsentMockMvc;

    private Consent consent;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConsentResource consentResource = new ConsentResource(consentRepository);
        this.restConsentMockMvc = MockMvcBuilders.standaloneSetup(consentResource)
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
    public static Consent createEntity(EntityManager em) {
        Consent consent = new Consent()
            .consentId(DEFAULT_CONSENT_ID)
            .description(DEFAULT_DESCRIPTION)
            .indicationBenefits(DEFAULT_INDICATION_BENEFITS)
            .complications(DEFAULT_COMPLICATIONS)
            .alternatives(DEFAULT_ALTERNATIVES);
        return consent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consent createUpdatedEntity(EntityManager em) {
        Consent consent = new Consent()
            .consentId(UPDATED_CONSENT_ID)
            .description(UPDATED_DESCRIPTION)
            .indicationBenefits(UPDATED_INDICATION_BENEFITS)
            .complications(UPDATED_COMPLICATIONS)
            .alternatives(UPDATED_ALTERNATIVES);
        return consent;
    }

    @BeforeEach
    public void initTest() {
        consent = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsent() throws Exception {
        int databaseSizeBeforeCreate = consentRepository.findAll().size();

        // Create the Consent
        restConsentMockMvc.perform(post("/api/consents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consent)))
            .andExpect(status().isCreated());

        // Validate the Consent in the database
        List<Consent> consentList = consentRepository.findAll();
        assertThat(consentList).hasSize(databaseSizeBeforeCreate + 1);
        Consent testConsent = consentList.get(consentList.size() - 1);
        assertThat(testConsent.getConsentId()).isEqualTo(DEFAULT_CONSENT_ID);
        assertThat(testConsent.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testConsent.getIndicationBenefits()).isEqualTo(DEFAULT_INDICATION_BENEFITS);
        assertThat(testConsent.getComplications()).isEqualTo(DEFAULT_COMPLICATIONS);
        assertThat(testConsent.getAlternatives()).isEqualTo(DEFAULT_ALTERNATIVES);
    }

    @Test
    @Transactional
    public void createConsentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consentRepository.findAll().size();

        // Create the Consent with an existing ID
        consent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsentMockMvc.perform(post("/api/consents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consent)))
            .andExpect(status().isBadRequest());

        // Validate the Consent in the database
        List<Consent> consentList = consentRepository.findAll();
        assertThat(consentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkConsentIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = consentRepository.findAll().size();
        // set the field null
        consent.setConsentId(null);

        // Create the Consent, which fails.

        restConsentMockMvc.perform(post("/api/consents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consent)))
            .andExpect(status().isBadRequest());

        List<Consent> consentList = consentRepository.findAll();
        assertThat(consentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConsents() throws Exception {
        // Initialize the database
        consentRepository.saveAndFlush(consent);

        // Get all the consentList
        restConsentMockMvc.perform(get("/api/consents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consent.getId().intValue())))
            .andExpect(jsonPath("$.[*].consentId").value(hasItem(DEFAULT_CONSENT_ID.intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].indicationBenefits").value(hasItem(DEFAULT_INDICATION_BENEFITS)))
            .andExpect(jsonPath("$.[*].complications").value(hasItem(DEFAULT_COMPLICATIONS)))
            .andExpect(jsonPath("$.[*].alternatives").value(hasItem(DEFAULT_ALTERNATIVES)));
    }
    
    @Test
    @Transactional
    public void getConsent() throws Exception {
        // Initialize the database
        consentRepository.saveAndFlush(consent);

        // Get the consent
        restConsentMockMvc.perform(get("/api/consents/{id}", consent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(consent.getId().intValue()))
            .andExpect(jsonPath("$.consentId").value(DEFAULT_CONSENT_ID.intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.indicationBenefits").value(DEFAULT_INDICATION_BENEFITS))
            .andExpect(jsonPath("$.complications").value(DEFAULT_COMPLICATIONS))
            .andExpect(jsonPath("$.alternatives").value(DEFAULT_ALTERNATIVES));
    }

    @Test
    @Transactional
    public void getNonExistingConsent() throws Exception {
        // Get the consent
        restConsentMockMvc.perform(get("/api/consents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsent() throws Exception {
        // Initialize the database
        consentRepository.saveAndFlush(consent);

        int databaseSizeBeforeUpdate = consentRepository.findAll().size();

        // Update the consent
        Consent updatedConsent = consentRepository.findById(consent.getId()).get();
        // Disconnect from session so that the updates on updatedConsent are not directly saved in db
        em.detach(updatedConsent);
        updatedConsent
            .consentId(UPDATED_CONSENT_ID)
            .description(UPDATED_DESCRIPTION)
            .indicationBenefits(UPDATED_INDICATION_BENEFITS)
            .complications(UPDATED_COMPLICATIONS)
            .alternatives(UPDATED_ALTERNATIVES);

        restConsentMockMvc.perform(put("/api/consents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsent)))
            .andExpect(status().isOk());

        // Validate the Consent in the database
        List<Consent> consentList = consentRepository.findAll();
        assertThat(consentList).hasSize(databaseSizeBeforeUpdate);
        Consent testConsent = consentList.get(consentList.size() - 1);
        assertThat(testConsent.getConsentId()).isEqualTo(UPDATED_CONSENT_ID);
        assertThat(testConsent.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testConsent.getIndicationBenefits()).isEqualTo(UPDATED_INDICATION_BENEFITS);
        assertThat(testConsent.getComplications()).isEqualTo(UPDATED_COMPLICATIONS);
        assertThat(testConsent.getAlternatives()).isEqualTo(UPDATED_ALTERNATIVES);
    }

    @Test
    @Transactional
    public void updateNonExistingConsent() throws Exception {
        int databaseSizeBeforeUpdate = consentRepository.findAll().size();

        // Create the Consent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsentMockMvc.perform(put("/api/consents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consent)))
            .andExpect(status().isBadRequest());

        // Validate the Consent in the database
        List<Consent> consentList = consentRepository.findAll();
        assertThat(consentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsent() throws Exception {
        // Initialize the database
        consentRepository.saveAndFlush(consent);

        int databaseSizeBeforeDelete = consentRepository.findAll().size();

        // Delete the consent
        restConsentMockMvc.perform(delete("/api/consents/{id}", consent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Consent> consentList = consentRepository.findAll();
        assertThat(consentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
